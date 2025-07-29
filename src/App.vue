<script setup lang="ts">
import { v4 as uuid } from "uuid";
import { ref } from "vue";

const newTodo = ref("");

interface Todo {
  id: string;
  done: boolean;
  description: string;
}

const todos = ref<Todo[]>([]);

const handleKeydown = (payload: KeyboardEvent) => {
  if (payload.key !== "Enter") return;
  todos.value.push({
    id: uuid(),
    description: newTodo.value,
    done: false,
  });
  newTodo.value = "";
};
</script>
<template>
  <h1 class="text-3xl font-bold">todos</h1>
  <div>
    <label for="new-todo" class="sr-only">Create a new todo</label>
    <input
      id="new-todo"
      v-model="newTodo"
      placeholder="What needs to be done?"
      @keydown="handleKeydown"
    />
  </div>

  <div v-for="todo in todos" :key="todo.id">
    <input type="checkbox" v-model="todo.done" />
    <label>{{ todo.description }}</label>
  </div>
</template>
