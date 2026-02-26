import supabase from "../../supabase-client"

import {useNavigate} from "react-router"
export default function useSignInUser() {
	const navigate = useNavigate()

	return async function signUp(previousState, formData) {
		const email = formData.get("email")
		const password = formData.get("password")

		if (!email) return {emailError: "Please enter your email address."}
		if (!email.includes("@")) return {emailError: "Please enter a valid email address."}
		if (!password) return {passwordError: "Please enter your password."}
		if (password.length < 8) return {passwordError: "Password must be at least 8 characters."}

		try {
			const {data, error} = await supabase.auth.signInWithPassword({
				email: email.toLowerCase(),
				password: password,
			})

			if (error) {
				if (error.message.includes("Invalid login credentials")) {
					return {error: "Incorrect email or password. Please try again."}
				}

				console.error("Supabase sign-in error:", error.message)
				return {error: "Something went wrong. Please try again."}
			}

			if (data?.session) navigate("/notes")
			return null
		} catch (error) {
			console.error("An unexpected error while signing in:", error.message)
			return {error: "An unexpected error while signing in. Please try again."}
		}
	}
}
