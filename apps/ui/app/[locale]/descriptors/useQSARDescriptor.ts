import { useQuery } from "@tanstack/react-query";

import { getQSARDescriptor } from "./getQSARDescriptor";

export function useQSARDescriptorQuery(id: string) {
  return useQuery({
    queryKey: ["descriptor", id],
    queryFn: () => getQSARDescriptor(id),
    enabled: false,
  });
}
