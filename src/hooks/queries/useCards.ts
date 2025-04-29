import { useInfiniteQuery } from "react-query";
import { getCards } from "../../services/DeckService";
import { QueryKeys } from "./queryKeys";

export function useCards(deckId: number, searchPhrase: string | null, pageSize: number = 10) {
    return useInfiniteQuery(
        [QueryKeys.cards, deckId, searchPhrase], 
        ({ pageParam }) => getCards(Number(deckId), pageParam, pageSize, searchPhrase), 
        { 
            getNextPageParam: (lastPage) => 
                lastPage.page * lastPage.pageSize < lastPage.total ? lastPage.page + 1 : undefined,
            staleTime: 20000
        },
    );
}