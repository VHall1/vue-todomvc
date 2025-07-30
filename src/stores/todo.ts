import type { Todo } from "@/types";
import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";
import { ref } from "vue";

export const useTodoStore = defineStore("todo", () => {
  const todos = ref<Todo[]>([]);

  const createTodo = (description: string) => {
    todos.value.push({
      id: uuid(),
      done: false,
      description,
    });
  };

  const deleteTodo = (id: string) => {
    todos.value = todos.value.filter((todo) => todo.id !== id);
  };

  return { todos, createTodo, deleteTodo };
});
