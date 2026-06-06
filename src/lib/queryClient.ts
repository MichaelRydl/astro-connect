import { QueryClient } from "@tanstack/react-query";

// NASA data se mění nanejvýš jednou denně → delší staleTime, žádné refetchy
// při fokusu okna a jen jeden retry (kvůli limitům DEMO_KEY).
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30,
      gcTime: 1000 * 60 * 60,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
