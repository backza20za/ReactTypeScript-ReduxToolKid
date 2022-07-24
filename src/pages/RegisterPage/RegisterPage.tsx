import {
  Button,
  Form,
  Input,
  Card, Alert
} from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import { register } from '../../store/slices/authenSlices';
import { RegisterType } from '../../types/sendType/authen.type';

// type RegisterPageProps = {
//   //
// };
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegisterPage: React.FC = () => {
  const [form] = Form.useForm();
  const [status, setstatus] = useState("")
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const onFinish = async (values: RegisterType) => {
    const response = await dispatch(register(values))
    if (response.meta.requestStatus === "rejected") {
      setstatus(response.meta.requestStatus)
    } else {
      navigate("/")
    }
    // console.log('Received values of form: ', values);
  };

  return (
    <div style={{
      display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "100vh",
    }}>
      <Card >
        <h1 style={{
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        }}>Register</h1>
        < Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="username"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}

          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="name"
            label="Name"
            tooltip="What do you want others to call you?"
            rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>

            <Link to="/login"><Button htmlType="submit" type="primary" ghost style={{ marginLeft: 5 }}>
              Login
            </Button>
            </Link>
          </Form.Item>

        </Form >
        {status !== "" ? status === "rejected" ? <Alert message="Register Failed Page" type="error" /> : <Alert message="Success" type="success" /> : <div></div>}
      </Card>
    </div>

  );
};

export default RegisterPage;