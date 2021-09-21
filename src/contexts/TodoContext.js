import { notification } from "antd";
import React, { createContext, useState } from "react";

export const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [showDialog, setShowDialog] = useState(false);

  // Form mode -> by default in ADD mode.
  // Should store either "ADD" or "EDIT"
  const [mode, setMode] = useState("ADD");

  const [formValue, setFormValue] = useState({
    title: "",
    description: "",
  });

  const openAddDialog = () => {
    setMode("ADD");
    setFormValue({
      title: "",
      description: "",
    });
    setShowDialog(true);
  };

  const openEditDialog = (values) => {
    // Set the form mode to edit
    setMode("EDIT");

    // Set values to the form with provided values in the argument
    setFormValue(values);

    // Finally, open the dialog
    setShowDialog(true);
  };

  const addTodo = (todo) => {
    // Add the new todo to the existing list...
    setTodos([todo, ...todos]);

    // Close the dialog
    setShowDialog(false);

    notification.success({
      message: "Todo added!",
      description: "Your todo has been added successfully!",
      duration: 2,
      placement: "topLeft",
    });
  };

  const editTodo = (editedTodo) => {
    // Array.Map
    const newTodos = todos.map((todo) => {
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
    setTodos(newTodos);

    // Show notification
    notification.success({
      message: "Todo edited!",
      description: "Your todo has been edited successfully!",
      duration: 2,
      placement: "topLeft",
    });

    // Close the dialog
    setShowDialog(false);
  };

  const markTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: true,
        };
      } else {
        return todo;
      }
    });

    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    // Filter out all todos except the one that matches the id..
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);

    // Show notification to the user
    notification.success({
      message: "Todo deleted successfully!",
      placement: "topLeft",
    });
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        showDialog,
        setShowDialog,
        addTodo,
        deleteTodo,
        mode,
        openEditDialog,
        openAddDialog,
        formValue,
        editTodo,
        markTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
