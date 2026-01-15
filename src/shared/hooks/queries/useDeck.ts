import { useQuery } from "react-query";
import { getDeck } from "../../services/DeckService";
import { QueryKeys } from "./queryKeys";

export function useDeck(deckId: number, isDisabled: boolean = false) {
    return useQuery([QueryKeys.deck, deckId], () => getDeck(deckId), { enabled: !isDisabled });
}