import supabase from "../../supabase-client"

import {Logo, InfoIcon} from "../shared/Icons"
import {useActionState} from "react"

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
			return error
		}
	}, null)

	// prettier-ignore
	return (
		<div className="auth-wrapper text-preset-5">
			<Logo />
			<div>
				<h1 className="text-preset-1">Forgotten your password?</h1>
				<p >Enter your email below, and we'll send you a link to reset it. </p>
			</div>
			<form action={submitAction} className="auth-form" noValidate aria-label="Forgot password form" aria-describedby="form-description">
				<label className="text-preset-4">
					Email Addres
					<input
						className="input-bar"
						type="email"
						name="email"
						placeholder="email@example.com"
						aria-required="true"
						aria-invalid={error ? "true" : "false"}
						aria-describedby={error ? "signup-error" : undefined}
						disabled={isPending}
						autoComplete="off"
					/>
				</label>
				{error && 
					<p className="hint-text text-preset-6"><InfoIcon />{error.message}!</p>
				}

				<button className="primary-btn text-preset-3" disabled={isPending} aria-busy={isPending}>
					Send Reset Link
				</button>
			</form>
		</div>
	)
}
