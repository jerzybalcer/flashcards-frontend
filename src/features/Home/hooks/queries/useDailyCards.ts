import { useQuery } from "react-query";
import { QueryKeys } from "@/shared/hooks/queries/queryKeys";
import { getDailyCards } from "@/shared/services/CardService";


export function useDailyCards() {
    return useQuery([QueryKeys.dailyCards], () => getDailyCards());
}