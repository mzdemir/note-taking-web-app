import {InfoIcon, ShowPasswordIcon, HidePasswordIcon} from "../assets/images/Icons"
import GoBackLink from "../components/mobile/GoBackLink"

import useMediaQuery from "../hooks/useMediaQuery"
import useTogglePassword from "../hooks/useTogglePassword"
import useChangePassword from "../hooks/auth/useChangePassword"

import {useActionState} from "react"

export default function ChangePassword() {
	const isDesktop = useMediaQuery()
	const changePassword = useChangePassword()
	const {showPassword, handleShowPassword} = useTogglePassword()

	const [error, submitAction, isPending] = useActionState(changePassword, null)

	// prettier-ignore
	return (
		<div className="settings-item">
			{!isDesktop && <GoBackLink where="Settings" />}
			<h1 className="setting-title text-preset-1">Change Password</h1>

			<form action={submitAction} className="password-form text-preset-4">
				<label>
					Old Password
					<input
						className={`input-bar ${error?.oldPasswordError && "error"}`}
						type={!showPassword.old ? "password" : "text"}
						name="old-password"
					/>
					<button 
						type="button" 
						className="show-password-icon" 
						onClick={() => handleShowPassword("old")} 
						aria-label="Click to show password">
						{!showPassword.old ? <ShowPasswordIcon /> :	<HidePasswordIcon />}
					</button>
					{error?.oldPasswordError && (
						<span className={`hint-text text-preset-6 ${error?.oldPasswordError && "error"}`}>
							<InfoIcon /> {error?.oldPasswordError}
						</span>
					)}
				</label>

				<label>
					New Password
					<input
						className={`input-bar ${error?.passwordError && "error"}`}
						type={!showPassword.new ? "password" : "text"}
						name="new-password"
					/>
					<button 
						type="button" 
						className="show-password-icon" 
						onClick={() => handleShowPassword("new")}
						aria-label="Click to show password">
						{!showPassword.new ? <ShowPasswordIcon /> :	<HidePasswordIcon />}
					</button>
					<span className={`hint-text text-preset-6 ${error?.passwordError && "error"}`}>
						<InfoIcon /> {error?.passwordError ? error?.passwordError : "At least 8 characters"}
					</span>
				</label>

				<label>
					Confirm New Password
					<input className="input-bar" type={!showPassword.confirm ? "password" : "text"} name="confirm-password" />
					<button 
						type="button" 
						className="show-password-icon" 
						onClick={() => handleShowPassword("confirm")}
						aria-label="Click to show password">
						{!showPassword.confirm ? <ShowPasswordIcon /> :	<HidePasswordIcon />}
					</button>
					{error?.resetError && (
						<span className={`hint-text text-preset-6 ${error?.resetError && "error"}`}>
							<InfoIcon /> {error.resetError}
						</span>
					)}
					{error?.error && (
						<span className={`hint-text text-preset-6 ${error?.error && "error"}`}>
							<InfoIcon /> {error.error}
						</span>
					)}
				</label>
				<button type="submit" disabled={isPending} className="primary-btn" aria-busy={isPending}>
					Save Password
				</button>
			</form>
		</div>
	)
}
