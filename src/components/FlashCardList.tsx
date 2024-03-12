import { useQuery } from "react-query";
import { getCards } from "../services/CardService";
import { Center, Flex, Spinner, Text } from "@chakra-ui/react";
import { FlashCard } from './../model/FlashCard';
import { apiClient } from "../services/AxiosInstance";

import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5000",
});

/* eslint-disable @typescript-eslint/no-explicit-any */
import humps from 'humps'
import { FlashCardListElement } from "./FlashCardListElement";

axiosInstance.interceptors.request.use(function (config) {
    // const data: any = config.data;
    // config.data = data.map((obj: any) => humps.decamelizeKeys(obj))
    console.log('request');
    return config;
  }, function (error) {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
    const responseData: any = response.data;
    response.data = responseData.map((obj: any) => humps.camelizeKeys(obj));
    console.log('response');
    return response;
  }, function (error) {
    return Promise.reject(error); 
});

interface FlashCardListProps {
    searchPhrase: string;
}

export const FlashCardList: React.FC<FlashCardListProps> = ({ searchPhrase }) => {
  const { isLoading, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      axiosInstance.get('/cards').then((res) =>
        res.data,
      ),
    })

    const search = (cards: FlashCard[]) => {
        return cards.filter(c => 
            c.foreignWord.toLowerCase().includes(searchPhrase.toLowerCase())
            || 
            c.translatedWord.toLowerCase().includes(searchPhrase.toLowerCase())
        )
    }

    return (
        <Flex direction='column' height='100%'>
            {isLoading && <Flex
                height="100vh"
                justify='center'
                alignItems='center'
            >
                <Spinner size='xl' />
            </Flex>}
            <Flex flex={1} overflowY='auto' direction='column'>
            {!isLoading 
            && search(data!).map((obj: FlashCard, index: number) => <FlashCardListElement key={index} flashCard={obj} />)}
            </Flex>
        </Flex>
    )
}