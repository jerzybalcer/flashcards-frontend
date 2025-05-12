export enum SortDecksBy {
    Name = 'name',
    NumberOfCards = 'numberOfCards',
    // DateOfLastQuiz = 'dateOfLastQuiz'
}

export const SortDecksByOptions: Record<SortDecksBy, string> = {
    [SortDecksBy.Name]: 'Name',
    [SortDecksBy.NumberOfCards]: 'Number of flashcards',
    // [SortDecksBy.DateOfLastQuiz]: 'Date of last quiz',
}