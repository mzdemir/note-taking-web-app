import supabase from "../../supabase-client"
import {Logo, ShowPasswordIcon} from "../shared/Icons"
import useTogglePassword from "../../hooks/useTogglePassword"
import {useActionState, useEffect} from "react"

export default function ResetPassword() {
	const {showPassword, handleShowPassword} = useTogglePassword()

	useEffect(() => {
		const {
			data: {subscription},
		} = supabase.auth.onAuthStateChange(async (event, session) => {
			if (event === "PASSWORD_RECOVERY") {
				console.log("success", session)
			}
		})
		return () => subscription.unsubscribe()
	}, [])

	const [error, submitAction, isPending] = useActionState(async (previousState, formData) => {
		const newPassword = formData.get("password")
		const confirmPassword = formData.get("confirm-password")

		if (newPassword === confirmPassword) {
			const confirmedPassword = newPassword
			const {error: resetError} = await supabase.auth.updateUser({password: confirmedPassword})
			if (resetError) console.error(resetError.message)
		} else {
			console.error("Passwords don't match")
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
					New Password
					<input
						className="input-bar"
						type={!showPassword.new ? "password" : "text"}
						name="password"
						required
						aria-required="true"
						aria-invalid={error ? "true" : "false"}
						aria-describedby={error ? "resetError" : undefined}
						disabled={isPending}
					/>
					<button type="button" className="show-password-icon" onClick={() => handleShowPassword("new")}>
						<ShowPasswordIcon />
					</button>
				</label>

				<label>
					Confirm New Password
					<input
						className="input-bar"
						type={!showPassword.confirm ? "password" : "text"}
						name="confirm-password"
						required
						aria-required="true"
						aria-invalid={error ? "true" : "false"}
						aria-describedby={error ? "resetError" : undefined}
						disabled={isPending}
					/>
					<button type="button" className="show-password-icon" onClick={() => handleShowPassword("confirm")}>
						<ShowPasswordIcon />
					</button>
				</label>

				<button type="submit" disabled={isPending} className="primary-btn text-preset-3" aria-busy={isPending}>
					Reset Password
				</button>
			</form>
		</div>
	)
}
