import { useQuery } from "react-query";
import { QueryKeys } from "@/shared/hooks/queries/queryKeys";
import { getGoals } from "@/shared/services/UserService";


export function useGoals() {
    return useQuery([QueryKeys.goals], () => getGoals());
}