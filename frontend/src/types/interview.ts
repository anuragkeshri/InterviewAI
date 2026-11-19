export type InterviewFormData = {
  jobRole: string;
  experience: string;
  difficulty: string;
  numberOfQuestions: number;
  topics: string;
  questionType: string;
};

export type AnswerEvaluation = {
  score: number;
  strengths: string[];
  missingPoints: string[];
  feedback: string;
  suggestedAnswer: string;
};

export type InterviewAttempt = {
  id: number;
  question: string;
  answer: string;
  jobRole: string;
  experience: string;
  score: number;
  strengths: string[];
  missingPoints: string[];
  feedback: string;
  suggestedAnswer: string;
  createdAt: string;
};

export type InterviewHistoryResponse = {
  total: number;
  attempts: InterviewAttempt[];
};