import React from "react";
import { useAppDispatch } from '../../store/store'
import { addEmployees } from '../../store/slices/employeesSlices'
import { Navigate } from 'react-router-dom'
import {
  Form,
  Input,
  Button,
  Alert
} from 'antd';


type ShopEditProps = {
  //
};

const ShopEdit: React.FC<any> = () => {

  const dispatch = useAppDispatch()
  const [status, setStatus] = React.useState<string>("")
  const onFinish = async (values: any) => {
    const response = await dispatch(addEmployees(values))
    setStatus(response.meta.requestStatus)
  };

  return (
    <>
      <Form
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
      >
        <Form.Item name="name" label="Name" >
          <Input />
        </Form.Item>
        <Form.Item name="position" label="Position" >
          <Input type="text" />
        </Form.Item>
        <Form.Item name="salary" label="Salary" >
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Submit">
          <Button type="primary" htmlType="submit" className="login-form-button">
            Add Employee
          </Button>
        </Form.Item>
      </Form>
      {status !== "" ? status === "rejected" ? <Alert message="Add Employee Failed" type="error" /> : <Navigate to="/employees" /> : <div></div>}
    </>

  );
};

export default ShopEdit;
