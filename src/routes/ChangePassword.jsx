import GoBackLink from "../components/mobile/GoBackLink"
import {InfoIcon, ShowPasswordIcon} from "../components/shared/Icons"
import useMediaQuery from "../hooks/useMediaQuery"

export default function ChangePassword() {
	const isDesktop = useMediaQuery()

	return (
		<>
			{!isDesktop && <GoBackLink where="Settings" />}
			<h1 className="setting-title text-preset-1">Change Password</h1>

			<form className="password-form text-preset-4">
				<label>
					Old Password
					<input className="input-bar" type="password" name="old-password" />
					<ShowPasswordIcon className="show-password-icon" />
				</label>

				<label>
					New Password
					<input className="input-bar" type="password" name="new-password" />
					<ShowPasswordIcon className="show-password-icon" />
					<span className="hint-text text-preset-6">
						<InfoIcon /> At least 8 characters
					</span>
				</label>

				<label>
					Confirm New Password
					<input className="input-bar" type="password" name="confirm-password" />
					<ShowPasswordIcon className="show-password-icon" />
				</label>
				<button className="save-password-btn text-preset-4">Save Password</button>
			</form>
		</>
	)
}
