import { useQuery } from "react-query";
import { QueryKeys } from "@/shared/hooks/queries/queryKeys";
import { getRecentDecks } from "@/shared/services/DeckService";


export function useRecentDecks() {
    return useQuery([QueryKeys.recentDecks], () => getRecentDecks());
}