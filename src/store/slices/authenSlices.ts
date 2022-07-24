import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from '../store'
import httpClient from '../../utils/httpClient'
// import axios from "axios"
import { AxiosRequestConfig } from "axios"
import { LoginResult, RegisterResult, ReLoginResult } from '../../types/responseType/authen.type'
import { LoginType, RegisterType } from '../../types/sendType/authen.type'
// import { config } from "process"

interface UsersState {
    username: string,
    isFletching: boolean,
    isLogin: boolean,
    token: string,
    status: string,
    message?: string
}

const initialState: UsersState = {
    username: "",
    isFletching: false,
    isLogin: false,
    token: "",
    status: "",
    message: ""
}

export const register = createAsyncThunk(
    'users/register',
    // if you type your function argument here
    async (values: RegisterType): Promise<RegisterResult> => {
        const response = await httpClient.post<RegisterResult>(`/authen/register`, values)
        return response.data


    }
)
export const login = createAsyncThunk(
    'users/login',
    // if you type your function argument here
    async (values: LoginType): Promise<LoginResult> => {
        const response = await httpClient.post<LoginResult>(`/authen/login`, values)
        if (response.data.status === "Success") {
            // localStorage.setItem("token", response.data.token)
            localStorage.setItem("token", response.data.token)
            return response.data
        } else {
            return response.data
        }
    }
)
export const reLogin = createAsyncThunk(
    'users/reLogin',
    // if you type your function argument here
    async (): Promise<ReLoginResult> => {
        // แบบทางการ
        const a = "Authorization"
        httpClient.interceptors.request.use((config?: AxiosRequestConfig) => {
            if (config && config.headers) {
                config.headers[a] = `Bearer ${localStorage.getItem("token")}`;
            }
            return config;
        });

        const response = await httpClient.get<ReLoginResult>(`/authen/getprofile`)
        return response.data

        // แบบธรรมดา

        // const response = await axios.get<ReLoginResult>(`${process.env.REACT_APP_NODE_URL}/authen/getprofile`, {
        //     headers: {
        //         "Authorization": `Bearer ${localStorage.getItem("token")}`
        //     }
        // })
        // return response.data
    }
)



const authenSlice = createSlice({
    name: 'authen',
    initialState,
    reducers: {
        // fill in primary logic here
        logout: (state) => {
            state.username = ""
            state.isFletching = false
            state.isLogin = false
            state.token = ""
            state.status = ""
            state.message = ""
        },
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state, action) => {
            state.status = ""
            state.message = ""
            state.isFletching = true
            state.isLogin = false
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.status = action.payload.status
            state.message = action.payload.message
            state.isFletching = false
            state.isLogin = false
        })
        builder.addCase(register.rejected, (state, action) => {
            state.status = ""
            state.message = ""
            state.isFletching = false
            state.isLogin = false
        })
        builder.addCase(login.pending, (state, action) => {
            state.status = ""
            state.username = ""
            state.token = ""
            state.isFletching = true
            state.isLogin = false
            state.message = ""
        })
        builder.addCase(login.fulfilled, (state, action) => {
            if (action.payload.status === "Success") {
                state.status = action.payload.status
                state.username = action.payload.username
                state.token = action.payload.token
                state.isFletching = false
                state.isLogin = true
                state.message = action.payload.message
            } else {
                state.status = action.payload.status
                state.username = action.payload.username
                state.token = action.payload.token
                state.isFletching = false
                state.isLogin = false
                state.message = action.payload.message
            }
        })
        builder.addCase(login.rejected, (state, action) => {
            state.status = ""
            state.username = ""
            state.token = ""
            state.isFletching = false
            state.isLogin = false
            state.message = ""
        })
        builder.addCase(reLogin.pending, (state, action) => {
            state.status = ""
            state.username = ""
            state.token = ""
            state.isFletching = true
            state.isLogin = false
            state.message = ""
        })
        builder.addCase(reLogin.fulfilled, (state, action) => {
            state.status = action.payload.status
            state.username = action.payload.username
            state.token = action.payload.token
            state.isFletching = false
            state.isLogin = true
            state.message = action.payload.message
        })
        builder.addCase(reLogin.rejected, (state, action) => {
            state.status = ""
            state.username = ""
            state.token = ""
            state.isFletching = false
            state.isLogin = false
            state.message = ""
        })
    },
})
export const { logout } = authenSlice.actions
// หรือใช้แทน useAppSelector
export const authenSelector = (state: RootState) => state.auth
// หรือใช้แทน useAppSelector

export default authenSlice.reducer