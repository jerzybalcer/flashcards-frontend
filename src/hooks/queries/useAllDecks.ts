import { useQuery } from "react-query";
import { getAllDecks } from "../../services/DeckService";
import { QueryKeys } from "./queryKeys";
import { SortDecksBy } from "../../model/SortDecksBy";
import { SortDirection } from "../../model/SortDirection";

export function useAllDecks(sortBy: SortDecksBy, direction: SortDirection) {
    return useQuery([QueryKeys.allDecks, sortBy, direction], () => getAllDecks(sortBy, direction))
}