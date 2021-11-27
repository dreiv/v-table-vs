import { defineStore } from "pinia";

import { genId } from "@/utils";
import { Student, State } from "./types";

export const useMainStore = defineStore("mainStore", {
  state: (): State => ({
    students: [],
    selectedStudent: null,
  }),

  actions: {
    /**
     * @param {Student} student
     */
    updateStudent(data: Student) {
      this.students = this.students.map((student) =>
        student.id === data.id ? { ...data } : student
      );

      // after updating remove the selected student
      this.selectedStudent = null;
    },

    /**
     * @param id
     */
    removeStudent(id?: string) {
      this.students = this.students.filter((student) => student.id !== id);
    },

    /**
     * @param {Student} student
     */
    addStudent({ name, section }: Student) {
      this.students = [...this.students, { id: genId(), name, section }];
    },
  },
});
