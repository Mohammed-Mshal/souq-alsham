export type DataFormSignup= {
    name: string
    phone: string
    code: string
    email: string
    password: string
    birthday: string
    gender: string
    image: null | File
}
export type DataLogin= {
    email: string
    password: string
}