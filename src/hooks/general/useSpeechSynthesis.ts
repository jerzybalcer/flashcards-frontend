export function useSpeechSynthesis() {
    const readWord = (word: string, language: string): void => {
        const readableWord = new SpeechSynthesisUtterance(word);
        readableWord.lang = language;
        window.speechSynthesis.speak(readableWord);
    };

    const isAvailable = (language: string): boolean => {
        const voices = window.speechSynthesis.getVoices();
        const langs = voices.map(voice => voice.lang);
        return langs.some(lang => lang.includes(language));
    }

    return { readWord, isAvailable };
}
