import type { UserType } from "@/types"
export interface SignupResponseType{
	"user": UserType,
	"token": string
}