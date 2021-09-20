import { Col, Row } from "antd";
import "antd/dist/antd.css";
import Title from "antd/lib/typography/Title";
import { useContext } from "react";
import AddTodo from "./components/AddTodo";
import TodoCard from "./components/TodoCard";
import { TodoContext } from "./contexts/TodoContext";
import "./style.css";

// Todo
export default function App() {
  const { todos } = useContext(TodoContext);
  console.log(todos);
  return (
    <>
      {/* Dialog that adds / edit todo */}
      <AddTodo />

      {/* Content */}
      <div>
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
          {todos.length === 0 &&
            "No Todos...Please add todos from the top-right button."}

          <Row gutter={[10, 10]}>
            {todos.map((todo) => (
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
                />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
}
