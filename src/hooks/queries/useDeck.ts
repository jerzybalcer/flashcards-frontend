import { useQuery } from "react-query";
import { QueryKeys } from "./queryKeys";
import { useApiClient } from "../general/useApiClient";
import { AxiosError } from "axios";
import humps from "humps";
import { Deck } from "../../model/Deck";

export function useDeck(deckId: number) {
    const { apiClient } = useApiClient();

    const getDeck = async (deckId: number) =>
    apiClient
        .get(`/decks/${deckId}`)
        .then(res => humps.camelizeKeys(res.data) as Deck)
        .catch((err: AxiosError) => Promise.reject(err));

    return useQuery([QueryKeys.deck, deckId], () => getDeck(deckId));
}