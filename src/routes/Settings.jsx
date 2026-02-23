import {SunIcon, FontIcon, LockIcon, LogoutIcon} from "../components/shared/Icons"
import Button from "../components/shared/Button"
import useMediaQuery from "../hooks/useMediaQuery"

import {useAuth} from "../context/AuthContext"
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
			{!isDesktop && <h1 className="text-preset-1">Settings</h1>}
			<div className="settings-menu text-preset-4">
				<NavLink to="/settings/color-theme" className="settings-menu-item">
					<SunIcon /> Color Theme
				</NavLink>
				<NavLink to="/settings/font-theme" className="settings-menu-item">
					<FontIcon /> Font Theme
				</NavLink>
				<NavLink to="/settings/change-password" className="settings-menu-item">
					<LockIcon /> Change Password
				</NavLink>
				{isDesktop && <hr />}
				<Button className="settings-menu-item" onClick={handleSignOut}>
					<LogoutIcon /> Logout
				</Button>
			</div>
			<Outlet />
		</>
	)
}
