import {useAuth} from "../context/AuthContext"
import {Navigate} from "react-router"

const RootRedirect = () => {
	const {session} = useAuth()

	if (session === undefined) {
		return <></>
	}

	return session ? <Navigate to="/notes" /> : <Navigate to="/login" />
}

export default RootRedirect
