import { CardModel } from '../model/CardModel'
import './App.css'

interface CardProps {
    card: CardModel;
}

export const Card: React.FC<CardProps> = ({ card })  => {
    return (<div>
        <p>{card.originalWord} - {card.translatedWord}</p>
    </div>)
}
