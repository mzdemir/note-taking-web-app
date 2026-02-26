import supabase from "../../supabase-client"

import {useNavigate} from "react-router"
export default function useResetPassword() {
	const navigate = useNavigate()

	return async function resetPassword(prevState, formData) {
		try {
			const newPassword = formData.get("password")
			if (newPassword.length < 8) return {passwordError: "Password must be at least 8 characters."}

			const confirmPassword = formData.get("confirm-password")
			const passwordConfirmed = newPassword === confirmPassword ? confirmPassword : null

			if (passwordConfirmed) {
				const {error} = await supabase.auth.updateUser({password: passwordConfirmed})

				if (error) throw error
			} else {
				return {resetError: "Passwords don't match!"}
			}

			navigate("/notes")
		} catch (error) {
			console.error(error)
			return {resetError: error.message}
		}
	}
}
