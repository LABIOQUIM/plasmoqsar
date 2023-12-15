import { useQuery } from "@tanstack/react-query";

import { getQSARMolecule } from "./getQSARMolecule";

export function useQSARMoleculeQuery(id: string) {
  return useQuery({
    queryKey: ["molecule", id],
    queryFn: () => getQSARMolecule(id),
    enabled: false,
  });
}
