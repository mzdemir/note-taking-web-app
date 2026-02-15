import useAuth from "../hooks/useAuth"
import {Navigate} from "react-router"

const RootRedirect = () => {
	const {session} = useAuth()

	if (session === undefined) {
		return <div>Loading...</div>
	}

	return session ? <Navigate to="/notes" /> : <Navigate to="/login" />
}

export default RootRedirect
