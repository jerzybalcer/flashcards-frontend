export enum SortDecksBy {
    Name = 'name',
    Language = 'language_id',
    NumberOfCards = 'numberOfCards',
    // DateOfLastQuiz = 'dateOfLastQuiz'
}

export const SortDecksByOptions: Record<SortDecksBy, string> = {
    [SortDecksBy.Name]: 'Name',
    [SortDecksBy.Language]: 'Language',
    [SortDecksBy.NumberOfCards]: 'Number of flashcards',
    // [SortDecksBy.DateOfLastQuiz]: 'Date of last quiz',
}