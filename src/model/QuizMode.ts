export enum QuizMode {
    SingleChoice = 'singleChoice',
    OpenText = 'openText',
    TrueFalse = 'trueOrFalse',
    Mixed = 'mixed'
}

export const QuizModes: Record<QuizMode, string> = {
    [QuizMode.SingleChoice]: 'Single choice',
    [QuizMode.OpenText]: 'Open text',
    [QuizMode.TrueFalse]: 'True / false',
    [QuizMode.Mixed]: 'Mixed',
}