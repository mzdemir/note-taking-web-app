import {SunIcon, FontIcon, LockIcon, LogoutIcon} from "../components/shared/Icons"
import useMediaQuery from "../hooks/useMediaQuery"

import useAuth from "../hooks/useAuth"
import {NavLink, Outlet, useNavigate} from "react-router"

export default function Settings() {
	const isDesktop = useMediaQuery()
	const {logout} = useAuth()
	const navigate = useNavigate()

	const handleSignOut = async (e) => {
		e.preventDefault()

		const {success} = await logout()
		if (success) {
			navigate("/")
		}
	}

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
				<button className="settings-item text-preset-4" onClick={handleSignOut}>
					<LogoutIcon /> Logout
				</button>
			</div>
			<Outlet />
		</>
	)
}
