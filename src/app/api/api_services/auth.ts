import { DataLogin } from "@/types/AuthForm"
import ApiService from "."

export const AuthServices = {
    signup: (dataForm: FormData) => {
        return ApiService.post('/auth/register', dataForm)
    },
    login: (dataForm: DataLogin) => {
        return ApiService.post('/auth/login', dataForm)
    },
    logout: () => {
        return ApiService.post('/auth/logout',{},true)
    }
}