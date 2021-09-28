import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  addTodo,
  closeDialog,
  editTodo,
  openAddDialog,
} from "../redux/slices/todoSlice";

export default function AddEditTodo() {
  // Pull values from redux store
  const { mode, formValue, showDialog } = useSelector((store) => store.todo);

  const dispatch = useDispatch();

  // Form instance
  const [todoForm] = Form.useForm();

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
        <Button
          onClick={() => dispatch(openAddDialog())}
          type="default"
          style={{
            backgroundColor: "teal",
            color: "white",
          }}
        >
          <PlusOutlined /> Add Todo
        </Button>
      </div>
      {/* Add Todo Dialog Box */}
      <Modal
        title={`${mode === "ADD" ? "New" : "Edit"} Todo`}
        visible={showDialog}
        onCancel={() => dispatch(closeDialog())}
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
              dispatch(addTodo(todo));
            } else {
              // Edit existing todo
              const todo = {
                id: formValue.id,
                title,
                description,
              };
              dispatch(editTodo(todo));
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
              onClick={() => dispatch(closeDialog())}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
