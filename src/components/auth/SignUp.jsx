import {Link} from "react-router-dom"
import {useAuth} from "../context/AuthContext"
import {useActionState} from "react"
import {useNavigate} from "react-router-dom"

export default function Signup() {
	const {signUpNewUser} = useAuth()
	const navigate = useNavigate()

	const [error, submitAction, isPending] = useActionState(async (previousState, formData) => {
		const email = formData.get("email")
		const password = formData.get("password")

		const {success, data, error: signUpError} = await signUpNewUser(email, password)

		if (signUpError) {
			return new Error(signUpError)
		}
		if (success && data?.session) {
			navigate("/dashboard")
			return null
		}
		return null
	}, null)

	return
}
