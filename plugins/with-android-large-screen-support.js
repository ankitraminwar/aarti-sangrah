const path = require("path");

const {
  AndroidConfig,
  withAndroidManifest,
  withAndroidStyles,
  withFinalizedMod,
} = require("@expo/config-plugins");
const { writeXMLAsync } = require("@expo/config-plugins/build/utils/XML");

const { Manifest, Styles } = AndroidConfig;

const CUTOUT_MODE = "android:windowLayoutInDisplayCutoutMode";
const STATUS_BAR_COLOR = "android:statusBarColor";

function withAndroidLargeScreenSupport(config) {
  config = withAndroidManifest(config, (config) => {
    const mainActivity = Manifest.getMainActivityOrThrow(config.modResults);

    delete mainActivity.$["android:screenOrientation"];

    return config;
  });

  config = withAndroidStyles(config, (config) => {
    config.modResults = Styles.removeStylesItem({
      xml: config.modResults,
      parent: Styles.getAppThemeGroup(),
      name: STATUS_BAR_COLOR,
    });

    config.modResults = Styles.assignStylesValue(config.modResults, {
      parent: Styles.getAppThemeGroup(),
      name: CUTOUT_MODE,
      value: "always",
      targetApi: "35",
      add: true,
    });

    return config;
  });

  return withFinalizedMod(config, [
    "android",
    async (config) => {
      const { platformProjectRoot } = config.modRequest;
      const manifestPath = path.join(platformProjectRoot, "app/src/main/AndroidManifest.xml");
      const stylesPath = await Styles.getProjectStylesXMLPathAsync(config.modRequest.projectRoot, {
        kind: "values",
      });

      const manifest = await Manifest.readAndroidManifestAsync(manifestPath);
      const mainActivity = Manifest.getMainActivityOrThrow(manifest);
      delete mainActivity.$["android:screenOrientation"];
      await Manifest.writeAndroidManifestAsync(manifestPath, manifest);

      let styles = await Styles.readStylesXMLAsync({ path: stylesPath });
      styles = Styles.removeStylesItem({
        xml: styles,
        parent: Styles.getAppThemeGroup(),
        name: STATUS_BAR_COLOR,
      });
      styles = Styles.assignStylesValue(styles, {
        parent: Styles.getAppThemeGroup(),
        name: CUTOUT_MODE,
        value: "always",
        targetApi: "35",
        add: true,
      });
      await writeXMLAsync({ path: stylesPath, xml: styles });

      return config;
    },
  ]);
}

module.exports = withAndroidLargeScreenSupport;
