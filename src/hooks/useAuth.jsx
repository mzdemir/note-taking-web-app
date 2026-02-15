import {useState, useEffect} from "react"
import supabase from "../supabase-client"

export default function useAuth() {
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

	return {session, signInUser, logout, signUpUser}
}
