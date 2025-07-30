<script setup lang="ts">
import { useTodoStore } from "@/stores/todo";
import type { Todo } from "@/types";
import { EditIcon, TrashIcon } from "lucide-vue-next";
import { nextTick, ref } from "vue";

const props = defineProps<{ todo: Todo }>();
const emit = defineEmits<{
  (
    e: "update-todo",
    payload: {
      id: string;
      description?: string;
      done?: boolean;
    },
  ): void;
}>();

const { deleteTodo } = useTodoStore();

const isEdit = ref(false);
const editInput = ref<HTMLInputElement | null>(null);
const editedDescription = ref(props.todo.description);

const handleEditStart = () => {
  isEdit.value = true;
  nextTick(() => {
    editInput.value?.focus();
  });
};

const handleEditKeydown = (payload: KeyboardEvent) => {
  if (payload.key !== "Enter") return;
  handleEditEnd();
};

const handleEditEnd = () => {
  isEdit.value = false;
  if (editedDescription.value !== props.todo.description) {
    emit("update-todo", { id: props.todo.id, description: editedDescription.value });
  }
};

const isHover = ref(false);

const handleMouseOver = () => (isHover.value = true);
const handleMouseLeave = () => (isHover.value = false);

function handleDoneChange(ev: Event) {
  const target = ev.target as HTMLInputElement;
  emit("update-todo", { id: props.todo.id, done: target.checked });
}
</script>
<template>
  <div class="relative" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
    <label :for="todo.id" class="text-2xl flex items-center" :class="{ 'line-through': todo.done }">
      <input
        :id="todo.id"
        class="size-10 mr-5 flex-shrink-0"
        type="checkbox"
        :checked="todo.done"
        @change="handleDoneChange"
      />

      <input
        v-if="isEdit"
        @blur="handleEditEnd"
        @keydown="handleEditKeydown"
        v-model="editedDescription"
        ref="editInput"
      />
      <span v-else class="text-balance">
        {{ todo.description }}
      </span>
    </label>

    <div v-if="isHover && !isEdit" class="absolute top-0 right-0 flex gap-1">
      <button
        class="px-2 py-1 text-xs bg-blue-500 text-white rounded"
        @click.stop="handleEditStart"
      >
        <EditIcon />
      </button>
      <button
        class="px-2 py-1 text-xs bg-red-500 text-white rounded"
        @click.stop="deleteTodo(todo.id)"
      >
        <TrashIcon />
      </button>
    </div>
  </div>
</template>
