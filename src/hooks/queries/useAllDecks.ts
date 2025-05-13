import { useQuery } from "react-query";
import { getAllDecks } from "../../services/DeckService";
import { QueryKeys } from "./queryKeys";
import { SortDecksBy } from "../../model/SortDecksBy";
import { SortDirection } from "../../model/SortDirection";

export function useAllDecks(searchPhrase: string | null, sortBy: SortDecksBy, direction: SortDirection) {
    return useQuery([QueryKeys.allDecks, searchPhrase, sortBy, direction], () => getAllDecks(searchPhrase, sortBy, direction))
}