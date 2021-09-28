import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Popconfirm, Typography } from "antd";
import { React } from "react";
import { useDispatch } from "react-redux";
import {
  deleteTodo,
  openEditDialog,
  markTodo,
} from "../redux/slices/todoSlice";
const { Paragraph } = Typography;

export default function TodoCard({ id, title, description, completed }) {
  const dispatch = useDispatch();
  return (
    <Card
      actions={
        completed
          ? []
          : [
              <EditOutlined
                key="edit"
                onClick={() =>
                  dispatch(openEditDialog({ id, title, description }))
                }
              />,
              <Popconfirm
                title="Are you sure to delete this task?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => {
                  dispatch(deleteTodo(id));
                }}
              >
                <DeleteOutlined />
              </Popconfirm>,
              <CheckOutlined
                key="check"
                onClick={() => dispatch(markTodo(id))}
              />,
            ]
      }
    >
      <Card.Meta
        title={title}
        description={
          <Paragraph
            ellipsis={{
              rows: 2,
              expandable: true,
            }}
          >
            {description}
          </Paragraph>
        }
      />
    </Card>
  );
}
