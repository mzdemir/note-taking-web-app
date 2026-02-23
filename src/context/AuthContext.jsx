import {createContext, useState, useEffect, useContext} from "react"
import supabase from "../supabase-client"

const AuthContext = createContext()

export function AuthProvider({children}) {
	const [session, setSession] = useState(undefined)

	useEffect(() => {
		async function getInitialSession() {
			try {
				const {data, error} = await supabase.auth.getSession()
				if (error) {
					throw error
				}
				setSession(data.session)
			} catch (error) {
				console.error("Error getting session:", error.message)
			}
		}

		getInitialSession()

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session)
		})
	}, [])

	async function signInUser(email, password) {
		try {
			const {data, error} = await supabase.auth.signInWithPassword({
				email: email.toLowerCase(),
				password: password,
			})
			if (error) {
				console.error("Supabase sign-in error:", error.message)
				return {success: false, error: error.message}
			}
			return {success: true, data}
		} catch (error) {
			console.error("Unexpected error during sign-in:", error.message)
			return {success: false, error: "An unexpected error occurred. Please try again."}
		}
	}

	async function logout() {
		try {
			const {error} = await supabase.auth.signOut()
			if (error) {
				console.error("Supabase sign-out error:", error.message)
				return {success: false, error: error.message}
			}
			return {success: true}
		} catch (error) {
			console.error("Unexpected error during sign-out:", error.message)
			return {success: false, error: "An unexpected error occurred during sign out."}
		}
	}

	async function signUpUser(email, password) {
		try {
			const {data, error} = await supabase.auth.signUp({
				email: email.toLowerCase(),
				password: password,
			})
			if (error) {
				console.error("Supabase sign-up error:", error.message)
				return {success: false, error: error.message}
			}
			return {success: true, data}
		} catch (error) {
			console.error("Unexpected error during sign-up:", error.message)
			return {success: false, error: "An unexpected error occurred. Please try again."}
		}
	}

	async function changePassword(oldPassword, newPassword) {
		try {
			const {error: oldPasswordError} = await supabase.auth.signInWithPassword({
				email: session.user.email,
				password: oldPassword,
			})

			if (oldPasswordError) {
				console.error("Old password is wrong:", oldPasswordError.message)
				return {success: false, error: oldPasswordError.message}
			}

			const {error} = await supabase.auth.updateUser({password: newPassword})
			if (error) {
				console.error("Supabase password change error:", error.message)
				return {success: false, error: error.message}
			}

			return {success: true}
		} catch (error) {
			console.error("Unexpected error during password change:", error.message)
			return {success: false, error: "An unexpected error occurred. Please try again."}
		}
	}

	return (
		<AuthContext.Provider value={{session, signInUser, logout, signUpUser, changePassword}}>
			{children}
		</AuthContext.Provider>
	)
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
	return useContext(AuthContext)
}
