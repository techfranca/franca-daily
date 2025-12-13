export interface User {
  name: string;
}

export interface DailyReport {
  user: string;
  date: string;
  time: string;
  question1: string;
  question2: string;
  question3: string;
}

export interface DailyFormData {
  question1: string;
  question2: string;
  question3: string;
}

export type UserName = "Gabriel" | "Bruna" | "Guilherme" | "Leonardo" | "Davidson";