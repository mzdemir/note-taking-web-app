import supabase from "../../supabase-client"

import {useActionState} from "react"
import {Logo} from "../shared/Icons"

export default function ForgotPassword() {
	const [error, submitAction, isPending] = useActionState(async (previousState, formData) => {
		try {
			const email = formData.get("email")
			const {error} = await supabase.auth.resetPasswordForEmail(email, {
				redirectTo: "http://localhost:5173/reset-password",
			})

			if (error) throw error
		} catch (error) {
			console.error(error)
		}
	}, null)

	return (
		<div className="login-wrapper">
			<Logo />
			<div>
				<h1 className="text-preset-1">Forgotten your password?</h1>
				<p className="text-preset-5">Enter your email below, and we'll send you a link to reset it. </p>
			</div>
			<form action={submitAction} className="login-form">
				<label>
					Email Addres
					<input
						className="input-bar"
						type="email"
						name="email"
						placeholder="email@example.com"
						required
						aria-required="true"
						aria-invalid={error ? "true" : "false"}
						aria-describedby={error ? "signup-error" : undefined}
						disabled={isPending}
					/>
				</label>

				{/* prettier-ignore */}
				<button 
          type="submit" 
          disabled={isPending} 
          className="primary-btn text-preset-3" 
          aria-busy={isPending}>
					Send Reset Link
				</button>
			</form>
		</div>
	)
}
