import {useAuth} from "../../context/AuthContext"

export default function useInsertNote() {
	const {session} = useAuth()
	console.log(session)
	return
}
