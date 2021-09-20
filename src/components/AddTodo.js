import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, notification } from "antd";
import React, { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";
import { v4 as uuidv4 } from "uuid";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

export default function AddTodo() {
  const [todoForm] = Form.useForm();
  const { showDialog, setShowDialog, addTodo } = useContext(TodoContext);
  const breakpoints = useBreakpoint();
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: breakpoints.xs ? "center" : "flex-end",
        }}
      >
        <Button onClick={() => setShowDialog(true)} type="default">
          <PlusOutlined /> Add Todo
        </Button>
      </div>
      {/* Add Todo Dialog Box */}
      <Modal
        title="New Todo"
        visible={showDialog}
        onCancel={() => setShowDialog(false)}
        footer={null}
        afterClose={() => {
          todoForm.resetFields();
        }}
      >
        <Form
          initialValues={{
            title: "",
            description: "",
          }}
          form={todoForm}
          layout="vertical"
          onFinish={({ title, description }) => {
            const todo = {
              id: uuidv4(),
              title,
              description,
            };
            addTodo(todo);
          }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Title field is required!",
              },
            ]}
          >
            <Input placeholder="Do something..." />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Description is required!",
              },
            ]}
          >
            <Input.TextArea
              rows={5}
              placeholder="Description about your task..."
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                marginRight: 10,
              }}
            >
              Submit
            </Button>
            <Button
              type="default"
              htmlType="submit"
              // On click, close the dialog box
              onClick={() => setShowDialog(false)}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
