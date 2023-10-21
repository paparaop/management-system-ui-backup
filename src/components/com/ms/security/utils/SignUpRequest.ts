import { Role } from "./Role"

export interface SignUpRequest {
    firstName?: string
    lastName?: string
    email?: string
    password?: string
    roles?: Role[]
}