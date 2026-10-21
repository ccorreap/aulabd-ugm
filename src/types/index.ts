export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  role: 'student' | 'teacher';
  career: string;
  university: string;
  xp: number;
  completedActivities: string[];
}

export interface DataTypeQuizQuestion {
  id: string;
  title: string;
  scenario: string;
  options: string[];
  correctAnswer: string;
  sqlServerNote: string;
  explanation: string;
  category: 'Numéricos' | 'Lógicos' | 'Alfanuméricos' | 'Fecha';
}

export interface Flashcard {
  id: string;
  term: string;
  category: string;
  definition: string;
  ugmNote: string;
  iconName: string;
}

export interface ExcelHotspot {
  id: string;
  label: string;
  targetId: string;
  description: string;
}
