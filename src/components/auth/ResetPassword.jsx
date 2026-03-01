import supabase from "../../supabase-client"
import {Logo, ShowPasswordIcon, HidePasswordIcon, InfoIcon} from "../../assets/images/Icons"
import useTogglePassword from "../../hooks/useTogglePassword"
import {useActionState, useEffect} from "react"
import useResetPassword from "../../hooks/auth/useResetPassword"

export default function ResetPassword() {
	const resetPassword = useResetPassword()
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

	const [error, submitAction, isPending] = useActionState(resetPassword, null)

	// prettier-ignore
	return (
		<div className="auth-wrapper text-preset-5">
			<Logo />
			<div>
				<h1 className="text-preset-1">Forgotten your password?</h1>
				<p>Enter your email below, and we'll send you a link to reset it. </p>
			</div>
			<form action={submitAction} className="auth-form" noValidate aria-label="Reset password form" aria-describedby="form-description">
				<label className="text-preset-4">
					New Password
					<input
						className={`input-bar ${error?.passwordError && "error"}`}
						type={!showPassword.new ? "password" : "text"}
						name="password"
						aria-required="true"
						aria-invalid={error ? "true" : "false"}
						aria-describedby={error ? "resetError" : undefined}
						disabled={isPending}
					/>
					<button type="button" className="show-password-icon" onClick={() => handleShowPassword("new")}>
						{!showPassword.new ? <ShowPasswordIcon /> : <HidePasswordIcon/>}
					</button>

					<p className={`hint-text text-preset-6 ${error?.passwordError && "error"}`}>
						<InfoIcon/> {error?.passwordError ? error?.passwordError : "At least 8 characters" }
					</p>
				</label>

				<label className="text-preset-4">
					Confirm New Password
					<input
						className={`input-bar ${error?.emailError && "error"}`}
						type={!showPassword.confirm ? "password" : "text"}
						name="confirm-password"
						aria-required="true"
						aria-invalid={error ? "true" : "false"}
						aria-describedby={error ? "resetError" : undefined}
						disabled={isPending}
					/>
					<button type="button" className="show-password-icon" onClick={() => handleShowPassword("confirm")}>
						{!showPassword.confirm ? <ShowPasswordIcon /> : <HidePasswordIcon/>}
					</button>
					{error?.resetError && 
						<p className="hint-text text-preset-6"><InfoIcon/>{error.resetError}</p>
					}
				</label>

				<button type="submit" disabled={isPending} className="primary-btn text-preset-3" aria-busy={isPending}>
					Reset Password
				</button>
			</form>
		</div>
	)
}
