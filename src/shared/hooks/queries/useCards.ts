import { useInfiniteQuery } from "react-query";
import { getCards } from "../../services/DeckService";
import { QueryKeys } from "./queryKeys";
import { SortCardsBy } from "@/model/SortCardsBy";
import { SortDirection } from "@/model/SortDirection";

export function useCards(deckId: number, searchPhrase: string | null, pageSize: number = 10, sortBy: SortCardsBy, sortDirection: SortDirection) {
    return useInfiniteQuery(
        [QueryKeys.cards, deckId, searchPhrase, sortBy, sortDirection], 
        ({ pageParam }) => getCards(Number(deckId), pageParam, pageSize, searchPhrase, sortBy, sortDirection), 
        { 
            getNextPageParam: (lastPage) => 
                lastPage.page * lastPage.pageSize < lastPage.total ? lastPage.page + 1 : undefined,
            staleTime: 20000,
            keepPreviousData: true,
        },
    );
}