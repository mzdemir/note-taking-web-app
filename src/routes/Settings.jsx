import {SunIcon, FontIcon, LockIcon, LogoutIcon} from "../components/shared/Icons"
import useMediaQuery from "../hooks/useMediaQuery"
import {useToast} from "../context/ToastContext"

import {useAuth} from "../context/AuthContext"
import {NavLink, Outlet, useNavigate} from "react-router"

export default function Settings() {
	const isDesktop = useMediaQuery()
	const {logout} = useAuth()
	const navigate = useNavigate()
	const {setShowToast} = useToast()

	const handleSignOut = async (e) => {
		e.preventDefault()

		const {success} = await logout()
		if (success) {
			navigate("/")
		} else {
			setShowToast({
				isVisible: true,
				variant: "error",
				message: "Something went wrong. Please try again.",
				link: null,
				navigateTo: null,
			})
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
				<button className="settings-menu-item" onClick={handleSignOut}>
					<LogoutIcon /> Logout
				</button>
			</div>
			<Outlet />
		</>
	)
}
