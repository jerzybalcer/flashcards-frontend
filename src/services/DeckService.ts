import humps, { decamelize } from 'humps';
import { AxiosError } from "axios";
import { Deck } from "../model/Deck";
import { apiClient } from "./AxiosInstance";
import { FlashCard } from "../model/FlashCard";
import { NewDeck } from "../model/NewDeck";
import { QuizStat } from "../model/QuizStat";
import { QuizFlashCard } from "../model/QuizFlashCard";
import { PaginatedResponse } from '../model/PaginatedResponse';
import { camelizeKeys } from 'humps';
import { SortCardsBy } from '../model/SortCardsBy';
import { SortDirection } from '../model/SortDirection';
import { SortDecksBy } from '../model/SortDecksBy';

export const getDeck = async (deckId: number) =>
    apiClient
        .get(`/decks/${deckId}`)
        .then(res => humps.camelizeKeys(res.data) as Deck)
        .catch((err: AxiosError) => Promise.reject(err));

export const getAllDecks = async (searchPhrase: string | null, sortBy: SortDecksBy, direction: SortDirection) =>
    apiClient
        .get(`/decks`, { 
            params: {
                search_text: searchPhrase,
                sort_by: decamelize(sortBy),
                sort_direction: direction
            } 
        })
        .then(res => res.data as Deck[])
        .catch((err: AxiosError) => Promise.reject(err));

export const addDeck = async (deck: NewDeck) =>
    apiClient
        .post(`/decks`, 
            { name: deck.name, language_id: deck.languageId }, 
            { headers: {'Content-Type': 'application/json'} })
        .then(res => res.data as number)
        .catch((err: AxiosError) => Promise.reject(err));

export const deleteDeck = async (id: number) =>
    apiClient
        .delete(`/decks/${id}`)
        .catch((err: AxiosError) => Promise.reject(err));

export const getCards = async (deckId: number, page: number, pageSize: number, searchPhrase: string | null, sortBy: SortCardsBy, sortDirection: SortDirection) => 
    apiClient
        .get(`/decks/${deckId}/cards`, { 
            params: {
                page: page,
                page_size: pageSize,
                search_text: searchPhrase,
                sort_by: decamelize(sortBy),
                sort_direction: sortDirection
            } 
        })
        .then(res => camelizeKeys(res.data) as PaginatedResponse<FlashCard>)
        .catch((err: AxiosError) => Promise.reject(err));

export const addCardsFromFile = async (deckId: number, file: File, delimiter: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('delimiter', delimiter)

    return apiClient
        .post(`/decks/${deckId}/file`, formData)
        .then(res => res.data as number)
        .catch((err: AxiosError) => Promise.reject(err));
}

export const addCard = async (deckId: number, card: FlashCard) =>
    apiClient
        .post(`/decks/${deckId}/cards`, 
            { foreign_word: card.foreignWord, translated_word: card.translatedWord, example_sentence: card.exampleSentence }, 
            { headers: {'Content-Type': 'application/json'} })
        .then(res => res.data as number)
        .catch((err: AxiosError) => Promise.reject(err));

export const getQuizCards = async (deckId: number, numberOfCards: number) =>
    apiClient
        .get(`/decks/${deckId}/quiz/cards?number_of_cards=${numberOfCards}`)
        .then(res => res.data as QuizFlashCard[])
        .catch((err: AxiosError) => Promise.reject(err));

export const updateQuizCards = async (deckId: number, resultCards: QuizStat[]) =>
    apiClient
        .put(`/decks/${deckId}/quiz/results`, 
            humps.decamelizeKeys(resultCards), 
            { headers: {'Content-Type': 'application/json'} }
        )
        .then(res => res.data as number)
        .catch((err: AxiosError) => Promise.reject(err));