import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Popconfirm } from "antd";
import Meta from "antd/lib/card/Meta";
import { React, useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";

export default function TodoCard({ id, title, description }) {
  const { deleteTodo } = useContext(TodoContext);
  return (
    <Card
      actions={[
        <EditOutlined key="edit" />,
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
        <CheckOutlined key="check" />,
      ]}
    >
      <Meta title={title} description={description} />
    </Card>
  );
}
