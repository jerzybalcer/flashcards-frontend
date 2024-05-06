import { AxiosError } from "axios";
import { Deck } from "../model/Deck";
import { apiClient } from "./AxiosInstance";
import { FlashCard } from "../model/FlashCard";
// import humps from "humps";

export const getDecks = async () =>
    apiClient
        .get(`/decks`)
        .then(res => res.data as Deck[])
        .catch((err: AxiosError) => Promise.reject(err));

export const addDeck = async (deck: Deck) =>
    apiClient
        .post(`/decks`, 
            { name: deck.name, language: deck.languageId }, 
            { headers: {'Content-Type': 'application/json'} })
        .then(res => res.data as number)
        .catch((err: AxiosError) => Promise.reject(err));

export const deleteDeck = async (id: number) =>
    apiClient
        .delete(`/decks/${id}`)
        .catch((err: AxiosError) => Promise.reject(err));

export const getCards = async (deckId: number) =>
    apiClient
        .get(`/decks/${deckId}/cards`)
        .then(res => res.data as FlashCard[])
        .catch((err: AxiosError) => Promise.reject(err));

export const addCardsFromFile = async (deckId: number, file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    return apiClient
        .post(`/decks/${deckId}/cards`, formData)
        .then(res => res.data as number)
        .catch((err: AxiosError) => Promise.reject(err));
}

export const addCard = async (deckId: number, card: FlashCard) =>
    apiClient
        .post(`/decks/${deckId}/cards`, 
            { foreign_word: card.foreignWord, translated_word: card.translatedWord }, 
            { headers: {'Content-Type': 'application/json'} })
        .then(res => res.data as number)
        .catch((err: AxiosError) => Promise.reject(err));

export const getQuizCards = async (deckId: number) =>
    apiClient
        .get(`/decks/${deckId}/quiz/cards`)
        .then(res => res.data as FlashCard[])
        .catch((err: AxiosError) => Promise.reject(err));

// export const updateQuizCards = async (deckId: number, resultCards: QuizStat[]) =>
//     apiClient
//         .put(`/decks/${deckId}/quiz/results`, humps.decamelizeKeys(resultCards), { headers: {'Content-Type': 'application/json'} })
//         .then(res => res.data as number)
//         .catch((err: AxiosError) => Promise.reject(err));