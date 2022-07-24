import {
  Button,
  Form,
  Input,
  Card, Alert
} from 'antd';
import React from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';

import { login, authenSelector } from '../../store/slices/authenSlices'
import { LoginType } from '../../types/sendType/authen.type';


// type LoginPageProps = {
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

const LoginPage: React.FC = () => {
  const [form] = Form.useForm();
  const [status, setstatus] = React.useState("")
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const authendecate = useSelector(authenSelector)

  const onFinish = async (values: LoginType) => {
    const response = await dispatch(login(values))

    if (authendecate.status === "Success") {
      navigate("/employees")
    } else {
      setstatus(response.meta.requestStatus)
    }
    // console.log('Received values of form: ', values);
  };
  return (
    <div style={{
      display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "100vh",
    }}>
      <Card>
        <h1 style={{
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        }}>Login</h1>
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

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>

            <Link to="/register"><Button htmlType="button" type="primary" ghost style={{ marginLeft: 5 }}>
              Register
            </Button>
            </Link>
          </Form.Item>

        </Form >
        {status !== "" ? status === "rejected" ? <Alert message="Login Failed" type="error" /> : authendecate.status === 'Error' ? <Alert message={authendecate.message} type="error" /> : <Navigate to="/login" />
          : <div></div>}
      </Card>
    </div>

  );
};

export default LoginPage;