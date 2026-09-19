export interface Task {
  id: number;
  name: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done';
  assignedUserId?: number | null;
  dueDate?: string;
}