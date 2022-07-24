import { Table, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table';
import React from 'react';
import { useAppDispatch } from '../../store/store'
import { useSelector } from 'react-redux'
import { EmployeesData } from '../../model/employees.model'
import { employeesSelector, getEmployees } from '../../store/slices/employeesSlices'
import { useNavigate } from 'react-router-dom'

interface sourceData {
  key: number;
  id: string;
  name: string;
  position: string;
  salary: number;
}

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const employees = useSelector(employeesSelector)
  const navigate = useNavigate()
  const columns: ColumnsType<EmployeesData> = [
    {
      title: 'Id',
      width: 10,
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      width: 70,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Position',
      width: 50,
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Salary',
      width: 50,
      dataIndex: 'Salary',
      render: (_, record) => <p style={{ paddingTop: 13 }}>{`${record.salary.toFixed(2)} ฿`}</p>,
      key: 'Salary',
    },
    {
      title: 'Action',
      key: 'operation',
      width: 100,
      render: (_, record) => <Button onClick={() => navigate("/employeesedit/" + record.id)} type="primary">{`Edit : ${record.name}`}</Button>,
    },
  ];

  const data: sourceData[] = [];
  for (let i = 0; i < employees.employees.length; i++) {
    data.push({
      key: i,
      id: employees.employees[i].id,
      name: employees.employees[i].name,
      position: employees.employees[i].position,
      salary: employees.employees[i].salary,
    });
  }

  React.useEffect(() => {
    dispatch(getEmployees())
  }, [dispatch])

  return (
    <>
      <Button style={{ marginBottom: 10 }} onClick={() => {
        navigate("/addemployees")
      }}><PlusCircleOutlined />Add Employee</Button>

      <Table columns={columns} dataSource={data} scroll={{ x: 600 }} />
    </>

  )
}

export default App;