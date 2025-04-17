import { useQuery } from "react-query";
import { getCards } from "../../services/DeckService";
import { QueryKeys } from "./queryKeys";

export function useCards(deckId: number, isDisabled: boolean = false) {
    return useQuery([QueryKeys.cards, deckId], () => getCards(Number(deckId)), { enabled: !isDisabled, staleTime: 1000 * 60 * 5 });
}