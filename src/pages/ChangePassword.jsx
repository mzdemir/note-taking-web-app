import GoBack from "../components/mobile/GoBack"
import {InfoIcon, ShowPasswordIcon} from "../components/shared/Icons"

export default function ChangePassword() {
	return (
		<div className="main-content">
			<GoBack where="Settings" />
			<h1 className="page-title text-preset-1">Change Password</h1>
			<form className="password-form">
				<label className="text-preset-4">
					Old Password
					<input className="search-bar" type="password" name="old-password" />
					<ShowPasswordIcon className="show-password-icon" />
				</label>

				<label className="text-preset-4">
					New Password
					<input className="search-bar" type="password" name="new-password" />
					<ShowPasswordIcon className="show-password-icon" />
					<span className="hint-text text-preset-6">
						<InfoIcon /> At least 8 characters
					</span>
				</label>

				<label className="text-preset-4">
					Confirm New Password
					<input className="search-bar" type="password" name="confirm-password" />
					<ShowPasswordIcon className="show-password-icon" />
				</label>
				<button className="save-password-btn text-preset-4">Save Password</button>
			</form>
		</div>
	)
}
