// Redux state for todo
import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    showDialog: false,
    mode: "ADD",
    formValue: {
      title: "",
      description: "",
    },
  },
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    openAddDialog: (state) => {
      // setMode("ADD");
      state.mode = "ADD";

      // setFormValue({
      //   title: "",
      //   description: "",
      // });
      state.formValue = {
        title: "",
        description: "",
      };

      // setShowDialog(true);
      state.showDialog = true;
    },
    openEditDialog: (state, action) => {
      // Set the form mode to edit
      // setMode("EDIT");
      state.mode = "EDIT";

      // Set values to the form with provided values in the argument
      // setFormValue(values);
      state.formValue = action.payload;

      // Finally, open the dialog
      // setShowDialog(true);
      state.showDialog = true;
    },
    closeDialog: (state) => {
      state.showDialog = false;
    },
    addTodo: (state, action) => {
      // Add the new todo to the existing list...
      // setTodos([todo, ...todos]);
      state.todos = [action.payload, ...state.todos];

      // Close the dialog
      // setShowDialog(false);
      state.showDialog = false;

      notification.success({
        message: "Todo added!",
        description: "Your todo has been added successfully!",
        duration: 2,
        placement: "topLeft",
      });
    },
    editTodo: (state, action) => {
      const editedTodo = action.payload;
      // Array.Map
      const newTodos = state.todos.map((todo) => {
        // If the todo's id matches with the one about to edited,
        // replace that todo with the edited version
        if (editedTodo.id === todo.id) {
          return editedTodo;
        } else {
          return todo;
        }
      });

      // const foundIndex = todos.findIndex((todo) => todo.id === editedTodo.id);
      // todos[foundIndex] = editedTodo;

      // Update the todo list with new todos
      // setTodos(newTodos);
      state.todos = newTodos;

      // Show notification
      notification.success({
        message: "Todo edited!",
        description: "Your todo has been edited successfully!",
        duration: 2,
        placement: "topLeft",
      });

      // Close the dialog
      // setShowDialog(false);
      state.showDialog = false;
    },
    deleteTodo: (state, action) => {
      const id = action.payload;
      // Filter out all todos except the one that matches the id..
      const updatedTodos = state.todos.filter((todo) => todo.id !== id);

      // setTodos(updatedTodos);
      state.todos = updatedTodos;

      // Show notification to the user
      notification.success({
        message: "Todo deleted successfully!",
        placement: "topLeft",
      });
    },
    markTodo: (state, action) => {
      const id = action.payload;
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: true,
          };
        } else {
          return todo;
        }
      });

      // setTodos(updatedTodos);
      state.todos = updatedTodos;
    },
  },
});

export const {
  openAddDialog,
  openEditDialog,
  closeDialog,
  addTodo,
  editTodo,
  deleteTodo,
  markTodo,
  setTodos,
} = todoSlice.actions;

export default todoSlice.reducer;
