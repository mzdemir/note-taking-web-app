import supabase from "../../supabase-client"

export default function useSignInWithGoogle() {
	async function signInWithGoogle() {
		try {
			const {error} = await supabase.auth.signInWithOAuth({
				provider: "google",
				options: {
					redirectTo: `${window.location.origin}/notes`,
				},
			})

			if (error) throw error
		} catch (error) {
			console.error("Google sign-in error:", error.message)
		}
	}

	return {signInWithGoogle}
}
