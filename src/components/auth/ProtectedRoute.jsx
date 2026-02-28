import useAuthContext from "../../hooks/useAuthContext"
import {Navigate} from "react-router"

const ProtectedRoute = ({children}) => {
	const {session} = useAuthContext()

	if (session === undefined) {
		return
	}

	return session ? <>{children}</> : <Navigate to="/login" />
}

export default ProtectedRoute
