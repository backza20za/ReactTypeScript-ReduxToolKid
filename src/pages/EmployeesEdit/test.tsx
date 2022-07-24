import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMatch } from "react-router-dom";
import { useAppDispatch } from '../../store/store'
import { useSelector } from 'react-redux'
import { employeesSelector, getEmployeesByID, editEmployees } from '../../store/slices/employeesSlices'
import {
    Form,
    Input,
    Button,
} from 'antd';


type ShopEditProps = {
    //
};

const ShopEdit: React.FC<any> = () => {

    const dispatch = useAppDispatch()
    const match = useMatch("/employeesedit/:id");
    let id: any = match?.params.id;

    const getEmployee = useSelector(employeesSelector)
    React.useEffect(() => {
        dispatch(getEmployeesByID(id))

    }, [])

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        dispatch(editEmployees(values))
    };
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
                                Update
                            </Button>
                        </Form.Item>
                    </Form>


                )
            })}

        </>

    );
};

export default ShopEdit;
