import EasySpeech from 'easy-speech'
import { useEffect, useState } from 'react';

export function useSpeechSynthesis() {
    const [isAvailable, setIsAvailable] = useState<boolean>(false);

    const readWord = async (word: string, language: string): Promise<void> => {
        await EasySpeech.speak({
            text: word,
            voice: EasySpeech.voices().find(v => v.lang.startsWith(language)),
        });
    };

    const isLanguageAvailable = (language: string): boolean => {
        if(!isAvailable) return false;

        const voices = EasySpeech.voices();
        const langs = voices.map(v => v.lang);
        return langs.some(lang => lang.includes(language));
    }

    useEffect(() => {
        EasySpeech.init({ maxTimeout: 200, interval: 50 })
            .then(() => setIsAvailable(true))
            .catch(() => setIsAvailable(false))
    }, []);

    return { readWord, isLanguageAvailable };
}
