import { useQuery } from "react-query";
import { getLanguages } from "../../services/LanguageService";
import { QueryKeys } from "./queryKeys";

export function useLanguages() {
    return useQuery(QueryKeys.languages, getLanguages);
}