import { useQuery } from "react-query";
import { QueryKeys } from "./queryKeys";
import { useApiClient } from "../general/useApiClient";
import { AxiosError } from "axios";
import { Deck } from "../../model/Deck";

export function useAllDecks() {
    const { apiClient } = useApiClient();

    const getAllDecks = async () =>
        apiClient
            .get(`/decks`)
            .then(res => res.data as Deck[])
            .catch((err: AxiosError) => Promise.reject(err));
            
    return useQuery(QueryKeys.allDecks, getAllDecks)
}