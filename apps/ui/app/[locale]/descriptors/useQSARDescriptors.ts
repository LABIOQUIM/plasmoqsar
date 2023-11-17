import { useQuery } from "@tanstack/react-query";

import { getQSARDescriptors } from "./getQSARDescriptors";

export function useQSARDescriptorsQuery() {
  return useQuery({
    queryKey: ["user-descriptors"],
    queryFn: () => getQSARDescriptors(),
  });
}
