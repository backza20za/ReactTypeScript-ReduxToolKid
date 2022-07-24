import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from '../store'
import httpClient from '../../utils/httpClient'
// import axios from "axios"
import { AxiosRequestConfig } from "axios"
import { EmployeeResult } from '../../types/responseType/employees.type'
import { EmployeesData } from '../../model/employees.model'

// import { config } from "process"

interface EmployeesState {
    status: string
    message: string
    employees: EmployeesData[]
}

const initialState: EmployeesState = {
    status: "",
    message: "",
    employees: [],
}

export const getEmployees = createAsyncThunk(
    'employees/findall',
    // if you type your function argument here
    async (): Promise<EmployeeResult> => {
        const response = await httpClient.get<EmployeeResult>(`/employees/`)
        return response.data
    }
)
export const getEmployeesByID = createAsyncThunk(
    'employees/findById',
    // if you type your function argument here
    async (id: any): Promise<EmployeeResult> => {
        const response = await httpClient.get<EmployeeResult>(`/employees/${id}`)
        return response.data
    }
)
export const addEmployees = createAsyncThunk(
    'employees/addEmployees',
    // if you type your function argument here
    async (values: FormData): Promise<EmployeeResult> => {
        const response = await httpClient.post<EmployeeResult>(`/employees/`, values, {
            headers: {
                "Content-Type": `multipart/form-data`
            }
        })
        return response.data
    }
)
export const editEmployees = createAsyncThunk(
    'employees/editEmployees',
    // if you type your function argument here
    async (values: any): Promise<EmployeeResult> => {
        const a = "Content-Type"
        httpClient.interceptors.request.use((config?: AxiosRequestConfig) => {
            if (config && config.headers) {
                config.headers[a] = `multipart/form-data`;
            }
            return config;
        });
        const response = await httpClient.put<EmployeeResult>(`/employees/`, values)
        return response.data
    }
)
export const delEmployees = createAsyncThunk(
    'employees/delEmployees',
    // if you type your function argument here
    async (values: string): Promise<EmployeeResult> => {
        const response = await httpClient.delete<EmployeeResult>(`/employees/${values}`)
        return response.data
    }
)


const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        // fill in primary logic here
    },
    extraReducers: (builder) => {
        builder.addCase(getEmployees.pending, (state, action) => {
            state.status = ""
            state.message = ""
            state.employees = []
        })
        builder.addCase(getEmployees.fulfilled, (state, action) => {
            state.status = action.payload.status
            state.message = action.payload.message
            state.employees = action.payload.response
        })
        builder.addCase(getEmployees.rejected, (state, action) => {
            state.status = ""
            state.message = ""
            state.employees = []
        })
        builder.addCase(getEmployeesByID.pending, (state, action) => {
            state.status = ""
            state.message = ""
            state.employees = []
        })
        builder.addCase(getEmployeesByID.fulfilled, (state, action) => {
            state.status = action.payload.status
            state.message = action.payload.message
            state.employees = action.payload.response
        })
        builder.addCase(getEmployeesByID.rejected, (state, action) => {
            state.status = ""
            state.message = ""
            state.employees = []
        })
    },
})

// หรือใช้แทน useAppSelector
export const employeesSelector = (state: RootState) => state.employees
// หรือใช้แทน useAppSelector

export default employeesSlice.reducer