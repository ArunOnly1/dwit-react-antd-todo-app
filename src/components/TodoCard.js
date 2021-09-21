import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Popconfirm } from "antd";
import Meta from "antd/lib/card/Meta";
import { React, useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";

export default function TodoCard({ id, title, description, completed }) {
  const { deleteTodo, openEditDialog, markTodo } = useContext(TodoContext);
  return (
    <Card
      actions={
        completed
          ? []
          : [
              <EditOutlined
                key="edit"
                onClick={() => openEditDialog({ id, title, description })}
              />,
              <Popconfirm
                title="Are you sure to delete this task?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => {
                  deleteTodo(id);
                }}
              >
                <DeleteOutlined />
              </Popconfirm>,
              <CheckOutlined key="check" onClick={() => markTodo(id)} />,
            ]
      }
    >
      <Meta title={title} description={description} />
    </Card>
  );
}
