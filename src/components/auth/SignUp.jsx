import {useAuth} from "../../context/AuthContext"
import {useActionState} from "react"
import {Link, useNavigate} from "react-router"
import {Logo, GoogleIcon, ShowPasswordIcon} from "../shared/Icons"

import useTogglePassword from "../../hooks/useTogglePassword"
export default function Signup() {
	const {signUpUser} = useAuth()
	const navigate = useNavigate()
	const {showPassword, handleShowPassword} = useTogglePassword()

	const [error, submitAction, isPending] = useActionState(async (previousState, formData) => {
		const email = formData.get("email")
		const password = formData.get("password")

		const {success, data, error: signUpError} = await signUpUser(email, password)

		if (signUpError) {
			return new Error(signUpError)
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
				<h1 className="text-preset-1">Create Your Account</h1>
				<p className="text-preset-5">Sign up to start organizing your notes and boost your productivity.</p>
			</div>
			<form
				action={submitAction}
				className="login-form text-preset-5"
				aria-label="Sign up form"
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
					Sign Up
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
				Already have an account?
				<Link to="/login" className="signup-link">
					Login
				</Link>
			</p>
		</div>
	)
}
