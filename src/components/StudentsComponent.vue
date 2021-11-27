<script setup lang="ts">
import { ref } from 'vue'
import { useStore, Student } from '@/store';

// get the store
const store = useStore();

// subscribe to changes on store
// .....
// when the selected student is set, update the form
// to display the selected student, if it is set to
// null, then the form fields will be cleared
store.$subscribe(({ events }: any) => {
  if (events.key === 'selectedStudent') {
    item.value = events.newValue
      ? { ...events.newValue }
      : { name: "", section: "" };
  }
})

// ref for holding form values
const item = ref({ name: "", section: "" });

/**
 * - gets values from form
 * - calls method on store to add student
 * - clears form values
 */
const addStudent = () => {
  store.addStudent(item.value);

  item.value = { name: "", section: "" }
};

/**
 * - sets store property selectedStudent
 * - updates input form fields with values
 */
const setSelectedStudent = (student: Student) => {
  store.selectedStudent = student;
}

/**
 * - gets form values
 * - gets id from selectedStudent
 * - calls updateStudent method on store
 */
const updateStudent = () => {
  const id = store.selectedStudent?.id || ""
  store.updateStudent({ ...item.value, id });
};
</script>

<template>
  <input v-model="item.name" placeholder="name" />
  <input v-model="item.section" placeholder="section" />

  <div>
    <button v-if="store.selectedStudent === null" @click="addStudent">ADD STUDENT</button>

    <template v-else>
      <button @click="updateStudent()">UPDATE STUDENT</button>
      <button @click="store.selectedStudent = null">CANCEL</button>
    </template>
  </div>

  <div>Count {{ store.students.length }}</div>

  <ul>
    <li v-for="(item, index) in store.students" :key="index">
      <pre>{{ JSON.stringify(item, null, 2) }}</pre>
      <div>
        <button @click="setSelectedStudent(item)">EDIT</button>&nbsp;
        <button @click="store.removeStudent(item.id)">DELETE</button>
      </div>
    </li>
  </ul>
</template>
