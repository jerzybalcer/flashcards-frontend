import { useQuery } from "react-query";
import { QueryKeys } from "./queryKeys";
import { useApiClient } from "../general/useApiClient";
import { Language } from "../../model/Language";
import { AxiosError } from "axios";

export function useLanguages() {
    const { apiClient } = useApiClient();

    const getLanguages = () => 
        apiClient
            .get(`/languages`)
            .then(res => res.data as Language[])
            .catch((err: AxiosError) => Promise.reject(err));

    return useQuery(QueryKeys.languages, getLanguages);
}