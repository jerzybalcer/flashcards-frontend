export enum SortCardsBy {
    ForeignWord = 'foreignWord',
    TranslatedWord = 'translatedWord',
    DateAdded = 'dateAdded',
    DateOfLastQuiz = 'dateOfLastQuiz'
}

export const SortCardsByOptions: Record<SortCardsBy, string> = {
    [SortCardsBy.ForeignWord]: 'Foreign word',
    [SortCardsBy.TranslatedWord]: 'Translated word',
    [SortCardsBy.DateAdded]: 'Date added',
    [SortCardsBy.DateOfLastQuiz]: 'Date of last quiz',
}