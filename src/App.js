import { Col, Row } from "antd";
import "antd/dist/antd.css";
import Title from "antd/lib/typography/Title";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddEditTodo from "./components/AddEditTodo";
import TodoCard from "./components/TodoCard";
import { setTodos } from "./redux/slices/todoSlice";

// 1st create a user interface
// 2nd create logic for each feature - step by step

export default function App() {
  const { todos } = useSelector((store) => store.todo);

  const dispatch = useDispatch();

  // When page loads, sync up / retrieve the todos from localStorage
  // to the redux state i.e. "todos"
  useEffect(() => {
    console.log("Syncing todos from localStorage");
    const todos = JSON.parse(localStorage.getItem("todos"));
    dispatch(setTodos(todos));
  }, []);

  // When todos array from redux gets updated, save to localstorage.
  useEffect(() => {
    console.log("Todo list has been updated! Saving to localStorage....");
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      {/* Dialog that adds / edit todo */}
      <AddEditTodo />

      {/* Content */}
      <section>
        <Title level={1}>My Todos</Title>

        {/* Todo cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            marginBottom: 100,
          }}
        >
          {/* If there are no todos display a helper message to the user */}
          {todos.filter((todo) => !todo.completed).length === 0 &&
            "No Todos...Please add todos from the top-right button."}

          <Row gutter={[10, 10]}>
            {todos
              // Filter out the todos which are not completed.
              .filter((todo) => !todo.completed)
              .map((todo) => (
                // xl = extra large screens
                // lg = large screens
                // md = medium screens
                // sm = small screens
                // xs = extra small screens
                <Col key={todo.id} xl={3} lg={4} md={6} sm={12} xs={24}>
                  <TodoCard
                    id={todo.id}
                    title={todo.title}
                    description={todo.description}
                    completed={todo.completed}
                  />
                </Col>
              ))}
          </Row>
        </div>
      </section>

      {/* Completed todos */}
      <section>
        <Title level={1}>Completed Todos</Title>

        {/* Todo cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            marginBottom: 100,
          }}
        >
          {/* If there are no todos display a helper message to the user */}
          {todos.filter((todo) => todo.completed).length === 0 &&
            "No Completed Todos...Press the check button to mark them as completed."}

          <Row gutter={[10, 10]}>
            {todos
              // Filter out the todos which are completed
              // .filter((todo) => todo.completed)
              .filter((todo) => {
                if (todo.completed === true) {
                  return true;
                } else {
                  return false;
                }
              })
              .map((todo) => (
                // xl = extra large screens
                // lg = large screens
                // md = medium screens
                // sm = small screens
                // xs = extra small screens
                <Col key={todo.id} xl={3} lg={4} md={6} sm={12} xs={24}>
                  <TodoCard
                    id={todo.id}
                    title={todo.title}
                    description={todo.description}
                    completed={todo.completed}
                  />
                </Col>
              ))}
          </Row>
        </div>
      </section>
    </>
  );
}
