import axios from "axios";
import humps from 'humps'
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { FlashCard } from "../model/FlashCard";
import { FlashCardListElement } from "./FlashCardListElement";

interface FlashCardListProps {
    searchPhrase: string;
}

export const FlashCardList: React.FC<FlashCardListProps> = ({ searchPhrase }) => {
    const [flashCards, setFlashCards] = useState<FlashCard[]>([]);

    useEffect(() => {
        const dataFetch = async () => {
        const data: unknown[] = (await axios.get('http://127.0.0.1:5000/cards')).data;

        const camelizedData = data.map(obj => humps.camelizeKeys(obj));

        setFlashCards(camelizedData as FlashCard[]);
        };

        dataFetch();
        
    }, []);

    const search = (cards: FlashCard[]) => {
        return cards.filter(c => 
            c.foreignWord.toLowerCase().includes(searchPhrase.toLowerCase())
            || 
            c.translatedWord.toLowerCase().includes(searchPhrase.toLowerCase())
        )
    }

    return <Box>{search(flashCards).map((flashCard, index) => <FlashCardListElement flashCard={flashCard} key={index}/>)}</Box>
}