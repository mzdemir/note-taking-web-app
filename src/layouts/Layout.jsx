import {Outlet} from "react-router"
import MobileNav from "../components/mobile/MobileNav"
import SideNav from "../components/desktop/SideNav"
import DesktopHeader from "../components/desktop/DesktopHeader"
import Toast from "../components/shared/Toast"

import useMediaQuery from "../hooks/useMediaQuery"
import {useToast} from "../context/ToastContext"

export default function DesktopLayout() {
	const isDesktop = useMediaQuery()
	const {showToast} = useToast()

	// prettier-ignore
	return (
		<>
			{isDesktop ? <SideNav /> : <MobileNav /> }
			<main className="main">
				{isDesktop ? <DesktopHeader /> : null}
				<Outlet />
			</main>
			{showToast.isVisible && <Toast />}
		</>
	)
}
