export enum QuizMode {
    SingleChoice = 'singleChoice',
    OpenText = 'openText',
    TrueFalse = 'trueOrFalse',
    Mixed = 'mixed'
}

export const QuizModes: Record<QuizMode, string> = {
    [QuizMode.SingleChoice]: 'single choice',
    [QuizMode.OpenText]: 'open text',
    [QuizMode.TrueFalse]: 'true / false',
    [QuizMode.Mixed]: 'mixed',
}