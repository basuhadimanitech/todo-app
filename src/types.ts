export type TaskStatus = 'pending' | 'inProgress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
}

