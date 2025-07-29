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
  <div class="max-w-xl mx-auto">
    <h1 class="text-7xl font-extralight text-center text-red-700 mt-10">todos</h1>

    <div class="mt-5">
      <label for="new-todo" class="sr-only">Create a new todo</label>
      <input
        class="p-4 w-full shadow-lg outline-1 placeholder:italic placeholder:text-2xl"
        id="new-todo"
        v-model="newTodo"
        placeholder="What needs to be done?"
        @keydown="handleKeydown"
      />
    </div>

    <div class="mt-5">
      <div v-for="todo in todos" :key="todo.id" class="py-4">
        <label
          :for="todo.id"
          class="text-2xl flex items-center"
          :class="{ 'line-through': todo.done }"
        >
          <input :id="todo.id" class="size-10 mr-5" type="checkbox" v-model="todo.done" />
          {{ todo.description }}
        </label>
      </div>
    </div>
  </div>
</template>
