import { TodoItem, TODOSTATENUM } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TodoState {
  todos: TodoItem[];
}

const initialState: TodoState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoItem>) => {
      state.todos.unshift(action.payload);
    },
    toggleTodo: (
      state,
      action: PayloadAction<Pick<TodoItem, "id" | "state">>
    ) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.state = action.payload.state;
        todo.updatedAt = new Date().toString();
      }
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    clearAllCompleted: (state) => {
      state.todos = state.todos.filter(
        (todo) => todo.state !== TODOSTATENUM.COMPLETED
      );
    },

    editTodo: (
      state,
      action: PayloadAction<Pick<TodoItem, "id"> & Partial<TodoItem>>
    ) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.updatedAt = new Date().toString();
        todo.title = action.payload.title || todo.title;
        todo.state = action.payload.state || todo.state;
      }
    },
  },
});
export const { addTodo, toggleTodo, removeTodo, editTodo, clearAllCompleted } =
  todoSlice.actions;
