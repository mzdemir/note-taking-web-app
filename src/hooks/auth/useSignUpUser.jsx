import supabase from "../../supabase-client"

import {useNavigate} from "react-router"
export default function useSignUpUser() {
	const navigate = useNavigate()
	return async function signUpUser(previousState, formData) {
		const email = formData.get("email")
		const password = formData.get("password")

		if (!email) return {emailError: "Please enter your email address."}
		if (!email.includes("@")) return {emailError: "Please enter a valid email address."}
		if (!password) return {passwordError: "Please enter your password."}
		if (password.length < 8) return {passwordError: "Password must be at least 8 characters."}

		try {
			const {data, error} = await supabase.auth.signUp({
				email: email.toLowerCase(),
				password: password,
			})

			if (error) {
				console.error("Supabase sign-up error:", error.message)
				return {error: error.message}
			}

			if (data?.session) navigate("/notes")
			return null
		} catch (error) {
			console.error("Unexpected error during sign-up:", error.message)
			return {error: "An unexpected error occurred. Please try again."}
		}
	}
}
