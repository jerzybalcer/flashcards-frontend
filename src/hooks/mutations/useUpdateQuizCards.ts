import { AxiosError } from "axios";
import { useApiClient } from '../general/useApiClient';
import { QuizStat } from "../../model/QuizStat";
import humps from "humps";

export const useUpdateQuizCards = () => {
    const { apiClient } = useApiClient();

    const updateQuizCards = async (deckId: number, resultCards: QuizStat[]) =>
        apiClient
            .put(`/decks/${deckId}/quiz/results`, 
                humps.decamelizeKeys(resultCards), 
                { headers: {'Content-Type': 'application/json'} }
            )
            .then(res => res.data as number)
            .catch((err: AxiosError) => Promise.reject(err));

  return updateQuizCards;
};
