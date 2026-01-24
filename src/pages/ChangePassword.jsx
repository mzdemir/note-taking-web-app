import {InfoIcon, ShowPasswordIcon} from "../components/Icons"

export default function ChangePassword() {
	return (
		<>
			<h1>Change Password</h1>
			<form>
				<label>
					Old Password
					<input type="password" name="old-password" />
					<ShowPasswordIcon />
				</label>

				<label>
					New Password
					<input type="password" name="new-password" />
					<ShowPasswordIcon />
					<span>
						<InfoIcon /> At least 8 characters
					</span>
				</label>

				<label>
					Confirm New Password
					<input type="password" name="confirm-password" />
					<ShowPasswordIcon />
				</label>
				<button>Save Password</button>
			</form>
		</>
	)
}
