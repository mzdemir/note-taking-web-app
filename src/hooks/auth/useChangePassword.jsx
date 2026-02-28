import supabase from "../../supabase-client"
import useAuthContext from "../useAuthContext"
import useToastContext from "../useToastContext"

export default function useChangePassword() {
	const {session} = useAuthContext()
	const {setShowToast} = useToastContext()

	return async function changePassword(previousState, formData) {
		const oldPassword = formData.get("old-password")
		const newPassword = formData.get("new-password")
		const confirmPassword = formData.get("confirm-password")

		if (!oldPassword) return {oldPasswordError: "Field can't be empty"}
		if (!newPassword) return {passwordError: "Field can't be empty"}
		if (newPassword.length < 8) return {passwordError: "Password must be at least 8 characters."}
		if (!confirmPassword) return {resetError: "Field can't be empty"}
		if (confirmPassword.length < 8) return {resetError: "Password must be at least 8 characters."}

		const passwordConfirmed = newPassword === confirmPassword ? confirmPassword : null

		try {
			const {error: oldPasswordError} = await supabase.auth.signInWithPassword({
				email: session.user.email,
				password: oldPassword,
			})

			if (oldPasswordError) {
				console.error("Old password is wrong:", oldPasswordError.message)
				return {oldPasswordError: "Old password is wrong"}
			}

			if (passwordConfirmed) {
				const {error: resetError} = await supabase.auth.updateUser({password: passwordConfirmed})

				if (resetError) {
					console.error("Supabase password change error:", resetError.message)
					return {error: resetError.message}
				}
			} else {
				return {resetError: "Passwords don't match!"}
			}

			return setShowToast({
				isVisible: true,
				message: "Password changed successfully!",
				link: null,
				navigateTo: null,
			})
		} catch (error) {
			console.error("Unexpected error during password change:", error.message)
			return {error: "An unexpected error occurred. Please try again."}
		}
	}
}
