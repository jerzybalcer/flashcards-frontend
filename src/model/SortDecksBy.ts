export enum SortDecksBy {
    Name = 'name',
    NumberOfCards = 'numberOfCards',
    // DateOfLastQuiz = 'dateOfLastQuiz'
}

export const SortDecksByOptions: Record<SortDecksBy, string> = {
    [SortDecksBy.Name]: 'name',
    [SortDecksBy.NumberOfCards]: 'number of flashcards',
    // [SortDecksBy.DateOfLastQuiz]: 'date of last quiz',
}