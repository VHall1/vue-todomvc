<script setup lang="ts">
import { DeleteIcon, EditIcon } from "lucide-vue-next";
import { ref } from "vue";
import { useTodoStore } from "./stores/todo";

const { todos, createTodo, deleteTodo } = useTodoStore();

const hoveredTodoId = ref<string | null>(null);

const editTodoId = ref<string | null>(null);
const handleEdit = (id: string) => (editTodoId.value = id);

const newTodo = ref("");
const handleKeydown = (payload: KeyboardEvent) => {
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
          <input
            :id="todo.id"
            class="size-10 mr-5 flex-shrink-0"
            type="checkbox"
            v-model="todo.done"
          />

          <input
            v-if="editTodoId === todo.id"
            @blur="editTodoId = null"
            v-model="todo.description"
          />
          <span v-else class="text-balance">
            {{ todo.description }}
          </span>

          <div v-if="hoveredTodoId === todo.id" class="absolute right-0 flex gap-1">
            <button
              class="px-2 py-1 text-xs bg-blue-500 text-white rounded"
              @click="handleEdit(todo.id)"
            >
              <EditIcon />
            </button>
            <button
              v-if="hoveredTodoId === todo.id"
              class="px-2 py-1 text-xs bg-red-500 text-white rounded"
              @click="deleteTodo(todo.id)"
            >
              <DeleteIcon />
            </button>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>
