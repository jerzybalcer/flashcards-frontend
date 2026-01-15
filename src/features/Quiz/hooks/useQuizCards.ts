import { QueryKeys } from "@/shared/hooks/queries/queryKeys";
import { getQuizCards } from "@/shared/services/DeckService";
import { useQuery } from "react-query";


export function useQuizCards(deckId: number, numberOfCards: number) {
    return useQuery([QueryKeys.quizCards, deckId], () => getQuizCards(deckId, numberOfCards), { staleTime: Infinity });
}