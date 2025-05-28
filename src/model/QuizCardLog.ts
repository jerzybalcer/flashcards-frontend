export interface QuizCardLog {
    cardId: number;
    timestamp: Date;
    answerCorrect: boolean;
    responseTime: number;
    // answerType: string;
    answerType: number;
}