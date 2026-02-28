import {Logo, GoogleIcon, ShowPasswordIcon, HidePasswordIcon, InfoIcon} from "../shared/Icons"

import useTogglePassword from "../../hooks/useTogglePassword"
import useSignInUser from "../../hooks/auth/useSignInUser"
import useSignInWithGoogle from "../../hooks/auth/useSignInWithGoogle"

import {useActionState} from "react"
import {Link} from "react-router"

export default function Login() {
	const singIn = useSignInUser()
	const {signInWithGoogle} = useSignInWithGoogle()
	const {showPassword, handleShowPassword} = useTogglePassword()
	const [error, submitAction, isPending] = useActionState(singIn, null)

	// prettier-ignore
	return (
		<div className="auth-wrapper text-preset-5">
			<Logo />
			<div>
				<h1 className="text-preset-1">Welcome to Note</h1>
				<p>Please log in to continue</p>
			</div>
			<form 
				action={submitAction} 
				className="auth-form"  
				noValidate aria-label="Sign in form" 
				aria-describedby="form-description" 
				autoComplete="off">
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
						autoComplete="email"
					/>
					{error?.emailError && 
						<p className={`hint-text text-preset-6 ${error?.emailError && "error"}`}>
							<InfoIcon/>{error.emailError}
						</p>}
				</label>

				<label className="text-preset-4">
					<Link className="forgot text-preset-6" to="/forgot-password">Forgot?</Link>
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
						autoComplete="current-password"
					/>
					<button type="button" className="show-password-icon" onClick={() => handleShowPassword("old")}>
						{!showPassword.old ? <ShowPasswordIcon /> : <HidePasswordIcon/>}
					</button>

					{error?.passwordError && 
						<p className={`hint-text text-preset-6 ${error?.passwordError && "error"}`}>
							<InfoIcon/>{error.passwordError}
						</p>}

					{error?.error && 
					<p className={`hint-text text-preset-6 ${error?.error && "error"}`}>
						<InfoIcon/> {error.error}
					</p>}
				</label>

				<button type="submit" disabled={isPending} className="primary-btn text-preset-3" aria-busy={isPending}>
					Login
				</button>
			</form>
			<div className="google-login">
				<p>Or log in with:</p>
				<button className="google-btn text-preset-3" onClick={signInWithGoogle} aria-label="Sign in with Google">
					<GoogleIcon /> Google
				</button>
			</div>

			<p>
				No account yet?{" "}
				<Link to="/sign-up" className="signup-link">Sign Up</Link>
			</p>
		</div>
	)
}
