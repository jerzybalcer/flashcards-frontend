import { useQuery } from "react-query";
import { getQuizCards } from "../../services/DeckService";
import { QueryKeys } from "./queryKeys";

export function useQuizCards(deckId: number, numberOfCards: number) {
    return useQuery([QueryKeys.quizCards, deckId], () => getQuizCards(deckId, numberOfCards), { staleTime: Infinity });
}