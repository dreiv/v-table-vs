export interface Student {
  name: string;
  id?: string;
  section: string;
}

export interface StudentState {
  students: Student[];
  selectedStudent: Student | null;
}
