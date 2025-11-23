export interface MenuItem {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  calories: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum ChefState {
  IDLE = 'IDLE',
  THINKING = 'THINKING',
  SPEAKING = 'SPEAKING'
}