import { useQuery } from "@tanstack/react-query";

import { getQSARMolecules } from "./getQSARMolecules";

export function useQSARMoleculesQuery() {
  return useQuery({
    queryKey: ["user-molecules"],
    queryFn: () => getQSARMolecules(),
  });
}
