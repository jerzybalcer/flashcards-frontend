import { useEffect, useState } from "react";
import { FlashCardSide } from "../model/FlashCardSide";

export const useLearnSettings = () => {
    const getIsAutoReadEnabled = (): boolean => {
        return JSON.parse(localStorage.getItem('isAutoReadEnabled') ?? 'false');
    }

    const getDefaultSide = (): FlashCardSide => {
        return (localStorage.getItem('defaultSide') ?? 'foreign') as FlashCardSide;
    }
    const [isAutoReadEnabled, setAutoReadEnabled] = useState<boolean>(getIsAutoReadEnabled);
    const [defaultSide, setDefaultSide] = useState<FlashCardSide>(getDefaultSide);

    useEffect(() => localStorage.setItem('isAutoReadEnabled', isAutoReadEnabled.toString()), [isAutoReadEnabled]);
    useEffect(() => localStorage.setItem('defaultSide', defaultSide), [defaultSide]);
    
    return { isAutoReadEnabled, defaultSide, setAutoReadEnabled, setDefaultSide };
}