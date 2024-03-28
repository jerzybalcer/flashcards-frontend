import { AxiosError } from "axios";
import { apiClient } from './AxiosInstance';
import { FlashCard } from "../model/FlashCard";

export const getCards = async () =>
    apiClient
        .get(`/cards`)
        .then(res => res.data as FlashCard[])
        .catch((err: AxiosError) => Promise.reject(err));

export const addCard = async (card: FlashCard) =>
    apiClient
        .post(`/card`, {foreign_word: card.foreignWord, translated_word: card.translatedWord}, { headers: {'Content-Type': 'application/json'} })
        .then(res => res.data as number)
        .catch((err: AxiosError) => Promise.reject(err));

export const editCard = async (id: number, card: FlashCard) =>
    apiClient
        .put(`/card/${id}`, card, { headers: {'Content-Type': 'application/json'} })
        .catch((err: AxiosError) => Promise.reject(err));

export const deleteCard = async (id: number) =>
    apiClient
        .delete(`/card/${id}`)
        .catch((err: AxiosError) => Promise.reject(err));

export const addCardsFromFile = async (file: File) =>
    apiClient
        .post(`/card`, 
            new FormData().append('file', file), 
            { headers: {'Content-Type': 'multipart/formdata'} })
        .then(res => res.data as number)
        .catch((err: AxiosError) => Promise.reject(err));