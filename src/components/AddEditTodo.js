import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, notification } from "antd";
import React, { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";
import { v4 as uuidv4 } from "uuid";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

export default function AddEditTodo() {
  // Form instance
  const [todoForm] = Form.useForm();

  // Pull context values
  const {
    showDialog,
    setShowDialog,
    addTodo,
    editTodo,
    mode,
    formValue,
    openAddDialog,
  } = useContext(TodoContext);

  // Fill the form with the values provided in "formValue"
  todoForm.setFieldsValue(formValue);

  // For Responsive design
  const breakpoints = useBreakpoint();
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: breakpoints.xs ? "center" : "flex-end",
        }}
      >
        <Button onClick={openAddDialog} type="default">
          <PlusOutlined /> Add Todo
        </Button>
      </div>
      {/* Add Todo Dialog Box */}
      <Modal
        title={`${mode === "ADD" ? "New" : "Edit"} Todo`}
        visible={showDialog}
        onCancel={() => setShowDialog(false)}
        footer={null}
        afterClose={() => {
          todoForm.resetFields();
        }}
      >
        <Form
          form={todoForm}
          layout="vertical"
          onFinish={({ title, description }) => {
            // When form is submitted
            if (mode === "ADD") {
              // Add new todo
              const todo = {
                id: uuidv4(),
                title,
                description,
                completed: false,
              };
              addTodo(todo);
            } else {
              // Edit existing todo
              const todo = {
                id: formValue.id,
                title,
                description,
              };
              editTodo(todo);
            }
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
              {mode === "ADD" ? "Add" : "Save"} Todo
            </Button>
            <Button
              type="default"
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
