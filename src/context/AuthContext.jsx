import {createContext, useState, useEffect, useContext} from "react"
import supabase from "../supabase-client"

const AuthContext = createContext()

export function AuthProvider({children}) {
	const [session, setSession] = useState(undefined)

	useEffect(() => {
		async function getInitialSession() {
			try {
				const {data, error} = await supabase.auth.getSession()
				if (error) throw error
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

	return <AuthContext.Provider value={{session, logout}}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
	return useContext(AuthContext)
}
