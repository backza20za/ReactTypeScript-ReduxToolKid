export interface RegisterResult {
    status: string;
    response?: string;
    message: string;
}
export interface LoginResult {
    status: string,
    response: string,
    token: string,
    username: string,
    message: string
}
export interface ReLoginResult {
    status: string,
    response: string,
    token: string,
    username: string,
    message: string
}
