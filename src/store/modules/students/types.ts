export interface Student {
  name: string;
  id?: string;
  section: string;
}

export interface State {
  students: Student[];
  selectedStudent: Student | null;
}
