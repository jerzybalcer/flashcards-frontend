import { useQuery } from "react-query";
import { QueryKeys } from "./queryKeys";
import { useApiClient } from "../general/useApiClient";
import { AxiosError } from "axios";
import { QuizFlashCard } from "../../model/QuizFlashCard";

export function useQuizCards(deckId: number, numberOfCards: number) {
    const { apiClient } = useApiClient();

    const getQuizCards = async (deckId: number, numberOfCards: number) =>
        apiClient
            .get(`/decks/${deckId}/quiz/cards?number_of_cards=${numberOfCards}`)
            .then(res => res.data as QuizFlashCard[])
            .catch((err: AxiosError) => Promise.reject(err));

    return useQuery([QueryKeys.quizCards, deckId], () => getQuizCards(deckId, numberOfCards), { staleTime: Infinity });
}