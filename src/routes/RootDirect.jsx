import useAuthContext from "../hooks/useAuthContext"
import {Navigate} from "react-router"

const RootRedirect = () => {
	const {session} = useAuthContext()

	if (session === undefined) {
		return <></>
	}

	return session ? <Navigate to="/notes" /> : <Navigate to="/login" />
}

export default RootRedirect
