import {Logo, GoogleIcon, ShowPasswordIcon, HidePasswordIcon, InfoIcon} from "../shared/Icons"

import useTogglePassword from "../../hooks/useTogglePassword"
import useSignUpUser from "../../hooks/auth/useSignUpUser"
import useSignInWithGoogle from "../../hooks/auth/useSignInWithGoogle"

import {useActionState} from "react"
import {Link} from "react-router"

export default function Signup() {
	const singUp = useSignUpUser()
	const {signInWithGoogle} = useSignInWithGoogle()
	const {showPassword, handleShowPassword} = useTogglePassword()

	const [error, submitAction, isPending] = useActionState(singUp, null)

	// prettier-ignore
	return (
		<div className="auth-wrapper text-preset-5">
			<Logo />
			<div>
				<h1 className="text-preset-1">Create Your Account</h1>
				<p>Sign up to start organizing your notes and boost your productivity.</p>
			</div>
			<form action={submitAction} className="auth-form" noValidate aria-label="Sign up form" aria-describedby="form-description">
				<label className="text-preset-4">
					Email Addres
					<input
						className={`input-bar ${error?.emailError && "error"}`}
						type="email"
						name="email"
						placeholder="email@example.com"
						aria-required="true"
						aria-invalid={error ? "true" : "false"}
						aria-describedby={error ? "signup-error" : undefined}
						disabled={isPending}
					/>
					{error?.emailError && 
						<p className={`hint-text text-preset-6 ${error?.emailError && "error"}`}>
							<InfoIcon/> {error.emailError}
						</p>}
				</label>

				<label className="text-preset-4">
					Password
					<input
						className={`input-bar ${error?.passwordError && "error"}`}
						type={!showPassword.old ? "password" : "text"}
						name="password"
						placeholder=""
						aria-required="true"
						aria-invalid={error ? "true" : "false"}
						aria-describedby={error ? "signup-error" : undefined}
						disabled={isPending}
						autoComplete="new-password"
					/>
					<button type="button" className="show-password-icon" onClick={() => handleShowPassword("old")}>
						{!showPassword.old ? <ShowPasswordIcon /> : <HidePasswordIcon/>}
					</button>

					<p className={`hint-text text-preset-6 ${error?.passwordError && "error"}`}>
						<InfoIcon/> {error?.passwordError ? error?.passwordError : "At least 8 characters" }
					</p>
					
					{error?.error && 
					<p className={`hint-text text-preset-6 ${error?.error && "error"}`}>
						<InfoIcon/> {error.error}
					</p>}
				</label>

				<button type="submit" disabled={isPending} className="primary-btn text-preset-3" aria-busy={isPending}>
					Sign Up
				</button>
			</form>

			<div className="google-login">
				<p>Or log in with:</p>
				<button className="google-btn text-preset-3" onClick={signInWithGoogle} aria-label="Sign in with Google">
					<GoogleIcon /> Google
				</button>
			</div>

			<p>
				Already have an account?{" "}
				<Link to="/login" className="signup-link">Login</Link>
			</p>
		</div>
	)
}
