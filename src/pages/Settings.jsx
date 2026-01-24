import {SunIcon, FontIcon, LockIcon, LogoutIcon} from "../components/Icons"

import {Link} from "react-router"

export default function Settings() {
	return (
		<>
			<div className="main-content">
				<h1 className="page-title text-preset-1">Settings</h1>
				<aside className="settings-menu">
					<Link to="/settings/color-theme">
						<SunIcon /> Color Theme
					</Link>
					<Link to="/settings/font-theme">
						<FontIcon /> Font Theme
					</Link>
					<Link to="/settings/change-password">
						<LockIcon />
						Change Password
					</Link>
					<button>
						<LogoutIcon /> Logout
					</button>
				</aside>
			</div>
		</>
	)
}
