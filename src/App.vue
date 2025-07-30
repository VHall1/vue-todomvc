<script setup lang="ts">
import { v4 as uuid } from "uuid";
import { ref } from "vue";

const newTodo = ref("");
const hoveredTodoId = ref<string | null>(null);

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

const editTodo = (id: string) => {
  // Implement edit logic here
  alert(`Edit todo: ${id}`);
};

const deleteTodo = (id: string) => {
  todos.value = todos.value.filter((todo) => todo.id !== id);
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
          class="text-2xl flex items-center relative"
          :class="{ 'line-through': todo.done }"
          @mouseover="hoveredTodoId = todo.id"
          @mouseleave="hoveredTodoId = null"
        >
          <input :id="todo.id" class="size-10 mr-5" type="checkbox" v-model="todo.done" />
          {{ todo.description }}
          <button
            v-if="hoveredTodoId === todo.id"
            class="ml-4 px-2 py-1 text-xs bg-blue-500 text-white rounded"
            @click.stop="editTodo(todo.id)"
            style="position: absolute; right: 60px;"
          >Edit</button>
          <button
            v-if="hoveredTodoId === todo.id"
            class="ml-2 px-2 py-1 text-xs bg-red-500 text-white rounded"
            @click.stop="deleteTodo(todo.id)"
            style="position: absolute; right: 0;"
          >Delete</button>
        </label>
      </div>
    </div>
  </div>
</template>
