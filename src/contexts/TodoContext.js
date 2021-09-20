import { notification } from "antd";
import React, { createContext, useState } from "react";

export const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [showDialog, setShowDialog] = useState(false);

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
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
