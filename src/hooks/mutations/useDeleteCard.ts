import { AxiosError } from "axios";
import { useApiClient } from '../general/useApiClient';

export const useDeleteCard = () => {
    const { apiClient } = useApiClient();

    const deleteCard = async (id: number) =>
        apiClient
            .delete(`/card/${id}`)
            .catch((err: AxiosError) => Promise.reject(err));

  return deleteCard;
};
