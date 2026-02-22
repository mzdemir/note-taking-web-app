import {Logo, GoogleIcon, ShowPasswordIcon} from "../shared/Icons"
import useAuth from "../../hooks/useAuth"

import useTogglePassword from "../../hooks/useTogglePassword"
import {useActionState} from "react"
import {useNavigate, Link} from "react-router"

export default function Login() {
	const {signInUser} = useAuth()
	const navigate = useNavigate()
	const {showPassword, handleShowPassword} = useTogglePassword()

	const [error, submitAction, isPending] = useActionState(async (previousState, formData) => {
		const email = formData.get("email")
		const password = formData.get("password")

		const {success, data, error: signInError} = await signInUser(email, password)

		if (signInError) {
			return new Error(signInError)
		}
		if (success && data?.session) {
			navigate("/notes")
			return null
		}
		return null
	}, null)

	return (
		<div className="login-wrapper">
			<Logo />
			<div>
				<h1 className="text-preset-1">Welcome to Note</h1>
				<p className="text-preset-5">Please log in to continue</p>
			</div>
			<form
				action={submitAction}
				className="login-form text-preset-5"
				aria-label="Sign in form"
				aria-describedby="form-description">
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

				<label>
					<Link className="forgot text-preset-6" to="/forgot-password">
						Forgot?
					</Link>
					Password
					<input
						className="input-bar"
						type={!showPassword.old ? "password" : "text"}
						name="password"
						placeholder=""
						required
						aria-required="true"
						aria-invalid={error ? "true" : "false"}
						aria-describedby={error ? "signup-error" : undefined}
						disabled={isPending}
					/>
					<button type="button" className="show-password-icon" onClick={() => handleShowPassword("old")}>
						<ShowPasswordIcon />
					</button>
				</label>

				<button type="submit" disabled={isPending} className="primary-btn text-preset-3" aria-busy={isPending}>
					Login
				</button>

				{error && (
					<div id="signup-error" role="alert" className="sign-form-error-message">
						{error.message}
					</div>
				)}
			</form>

			<div className="google-login">
				<p className="text-preset-5">Or log in with:</p>
				<button className="google-btn">
					<GoogleIcon /> Google
				</button>
			</div>

			<p className="text-preset-5">
				No account yet?
				<Link to="/sign-up" className="signup-link">
					{" "}
					Sign Up
				</Link>
			</p>
		</div>
	)
}
