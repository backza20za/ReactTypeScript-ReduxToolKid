import { EmployeesData } from '../../model/employees.model'
export interface EmployeeResult {
    status: string;
    message: string;
    response: EmployeesData[];
}