import { useQuery } from "react-query";
import { getDeck } from "../../services/DeckService";
import { QueryKeys } from "./queryKeys";

export function useDeck(deckId: number) {
    return useQuery([QueryKeys.deck, deckId], () => getDeck(deckId), { staleTime: 1000 * 60 * 5 });
}