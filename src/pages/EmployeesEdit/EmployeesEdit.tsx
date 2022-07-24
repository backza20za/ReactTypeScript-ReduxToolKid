import React, { useState } from "react";
import { useMatch, Navigate } from "react-router-dom";
import { useAppDispatch } from '../../store/store'
import { useSelector } from 'react-redux'
import { employeesSelector, getEmployeesByID, editEmployees, delEmployees } from '../../store/slices/employeesSlices'
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
  const match = useMatch("/employeesedit/:id");
  let id: any = match?.params.id;
  const [status, setStatus] = React.useState<string>("")
  const [removeStatus, setRemoveStatus] = React.useState<string>("")
  const getEmployee = useSelector(employeesSelector)
  React.useEffect(() => {
    dispatch(getEmployeesByID(id))

  }, [])

  const onFinish = async (values: any) => {
    const response = await dispatch(editEmployees(values))
    setStatus(response.meta.requestStatus)
  };
  const onRemove = async (id: string): Promise<void> => {
    const response = await dispatch(delEmployees(id))
    setRemoveStatus(response.meta.requestStatus)
  }
  // const bookName = getBook.books[0].name

  return (

    <>
      {getEmployee.employees.map((item, index) => {
        return (
          <Form
            key={index}
            onFinish={onFinish}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
          >
            <Form.Item name="id" hidden={true} label="id" initialValue={item.id} >
              <Input />
            </Form.Item>
            <Form.Item name="name" label="Name" initialValue={item.name} >
              <Input />
            </Form.Item>
            <Form.Item name="position" label="Position" initialValue={item.position}>
              <Input type="text" />
            </Form.Item>
            <Form.Item name="salary" label="Salary" initialValue={item.salary}>
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Submit">
              <Button type="primary" htmlType="submit" className="login-form-button">
                Update Employee
              </Button>
              <Button style={{ marginLeft: 10 }} type="primary" danger htmlType="button" onClick={async () => {
                const response = await dispatch(delEmployees(item.id))
                setRemoveStatus(response.meta.requestStatus)
              }}>
                Remove Employee
              </Button>
            </Form.Item>
          </Form>
        )
      })}
      {status !== "" ? status === "rejected" ? <Alert message="Edit Employee Failed" type="error" /> : <Navigate to="/employees" /> : <div></div>}
      {removeStatus !== "" ? removeStatus === "rejected" ? <Alert message="Remove Employee Failed" type="error" /> : <Navigate to="/employees" /> : <div></div>}
    </>

  );
};

export default ShopEdit;
