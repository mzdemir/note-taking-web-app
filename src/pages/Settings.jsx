import {SunIcon, FontIcon, LockIcon, LogoutIcon} from "../components/shared/Icons"
import useMediaQuery from "../hooks/useMediaQuery"

import {NavLink, Outlet} from "react-router"

export default function Settings() {
	const isDesktop = useMediaQuery()

	return (
		<>
			{!isDesktop && <h1 className="page-title text-preset-1">Settings</h1>}
			<div className="note-list settings-menu">
				<NavLink to="/settings/color-theme" className="settings-item text-preset-4">
					<SunIcon /> Color Theme
				</NavLink>
				<NavLink to="/settings/font-theme" className="settings-item text-preset-4">
					<FontIcon /> Font Theme
				</NavLink>
				<NavLink to="/settings/change-password" className="settings-item text-preset-4">
					<LockIcon /> Change Password
				</NavLink>
				{isDesktop && <hr />}
				<button className="settings-item text-preset-4">
					<LogoutIcon /> Logout
				</button>
			</div>
			<Outlet />
		</>
	)
}
