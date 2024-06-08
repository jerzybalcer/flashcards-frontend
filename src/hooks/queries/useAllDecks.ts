import { useQuery } from "react-query";
import { getAllDecks } from "../../services/DeckService";
import { QueryKeys } from "./queryKeys";

export function useAllDecks() {
    return useQuery(QueryKeys.allDecks, getAllDecks)
}