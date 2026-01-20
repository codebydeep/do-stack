import useAuthStore from "@/store/useAuthStore";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom"

interface RequiredAuthProps {
    children: ReactNode
}

const RequiredAuth = ({ children }: RequiredAuthProps) => {

    const { authUser } = useAuthStore();

    if(!authUser){
        return (
            <Navigate to="/signin"
            replace
            />
        )
    }
  return <>{ children }</>
}
export default RequiredAuth
