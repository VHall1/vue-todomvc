<script setup lang="ts">
import TodoItem from "@/components/TodoItem.vue";
import { ref } from "vue";
import { useTodoStore } from "./stores/todo";

const { todos, createTodo, updateTodo } = useTodoStore();

const newTodo = ref("");
const handleNewTodo = (payload: KeyboardEvent) => {
  if (payload.key !== "Enter") return;
  createTodo(newTodo.value);
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
        @keydown="handleNewTodo"
      />
    </div>

    <div class="mt-5">
      <div v-for="todo in todos" :key="todo.id" class="py-4">
        <TodoItem :todo="todo" @update-todo="({ id, ...payload }) => updateTodo(id, payload)" />
      </div>
    </div>
  </div>
</template>
