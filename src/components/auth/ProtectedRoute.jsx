import useAuth from "../../hooks/useAuth"
import {Navigate} from "react-router"

const ProtectedRoute = ({children}) => {
	const {session} = useAuth()

	if (session === undefined) {
		return
	}

	return session ? <>{children}</> : <Navigate to="/login" />
}

export default ProtectedRoute
