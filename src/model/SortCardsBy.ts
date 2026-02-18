export enum SortCardsBy {
    ForeignWord = 'foreignWord',
    TranslatedWord = 'translatedWord',
    DateAdded = 'dateAdded',
    // DateOfLastQuiz = 'dateOfLastQuiz'
}

export const SortCardsByOptions: Record<SortCardsBy, string> = {
    [SortCardsBy.ForeignWord]: 'foreign word',
    [SortCardsBy.TranslatedWord]: 'translated word',
    [SortCardsBy.DateAdded]: 'date added',
    // [SortCardsBy.DateOfLastQuiz]: 'date of last quiz',
}