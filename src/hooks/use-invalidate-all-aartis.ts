import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export function useInvalidateAllAartis() {
  const queryClient = useQueryClient();
  return useCallback(
    () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["allAartis"] }),
        queryClient.invalidateQueries({ queryKey: ["categories"] }),
        queryClient.invalidateQueries({ queryKey: ["featured"] }),
        queryClient.invalidateQueries({ queryKey: ["recents"] }),
      ]),
    [queryClient],
  );
}
