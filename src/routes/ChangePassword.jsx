import {InfoIcon, ShowPasswordIcon} from "../components/shared/Icons"
import GoBackLink from "../components/mobile/GoBackLink"

import useMediaQuery from "../hooks/useMediaQuery"
import useTogglePassword from "../hooks/useTogglePassword"
import {useAuth} from "../context/AuthContext"
import {useToast} from "../context/ToastContext"
import {useActionState} from "react"

export default function ChangePassword() {
	const isDesktop = useMediaQuery()
	const {showPassword, handleShowPassword} = useTogglePassword()
	const {changePassword} = useAuth()
	const {setShowToast} = useToast()

	const [_error, submitAction, isPending] = useActionState(async (previousState, formData) => {
		const oldPassword = formData.get("old-password")
		const newPassword = formData.get("new-password")
		const confirmPassword = formData.get("confirm-password")

		if (newPassword === confirmPassword) {
			const confirmedPassword = newPassword
			const {success, error} = await changePassword(oldPassword, confirmedPassword)

			if (error) return new Error(error.message)
			if (success) {
				setShowToast({
					isVisible: true,
					message: "Password changed successfully!",
					link: null,
					navigateTo: null,
				})
			}
		}
	}, null)

	return (
		<div className="settings-item">
			{!isDesktop && <GoBackLink where="Settings" />}
			<h1 className="setting-title text-preset-1">Change Password</h1>

			<form action={submitAction} className="password-form text-preset-4">
				<label>
					Old Password
					<input className="input-bar" type={!showPassword.old ? "password" : "text"} name="old-password" />
					<button type="button" className="show-password-icon" onClick={() => handleShowPassword("old")}>
						<ShowPasswordIcon />
					</button>
				</label>

				<label>
					New Password
					<input className="input-bar" type={!showPassword.new ? "password" : "text"} name="new-password" />
					<button type="button" className="show-password-icon" onClick={() => handleShowPassword("new")}>
						<ShowPasswordIcon />
					</button>
					<span className="hint-text text-preset-6">
						<InfoIcon /> At least 8 characters
					</span>
				</label>

				<label>
					Confirm New Password
					<input className="input-bar" type={!showPassword.confirm ? "password" : "text"} name="confirm-password" />
					<button type="button" className="show-password-icon" onClick={() => handleShowPassword("confirm")}>
						<ShowPasswordIcon />
					</button>
				</label>
				<button type="submit" disabled={isPending} className="primary-btn" aria-busy={isPending}>
					Save Password
				</button>
			</form>
		</div>
	)
}
