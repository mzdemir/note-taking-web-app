import {Outlet} from "react-router"
import MobileNav from "../components/mobile/MobileNav"
import SideNav from "../components/desktop/SideNav"
import DesktopHeader from "../components/desktop/DesktopHeader"
import Toast from "../components/shared/Toast"

import useMediaQuery from "../hooks/useMediaQuery"
import useToastContext from "../hooks/useToastContext"
export default function DesktopLayout() {
	const isDesktop = useMediaQuery()
	const {showToast} = useToastContext()

	// prettier-ignore
	return (
		<>
			{isDesktop ? <SideNav /> : <MobileNav /> }
			<main className="main" aria-live="polite">
				{isDesktop ? <DesktopHeader /> : null}
				<Outlet />
			</main>
			{showToast.isVisible && <Toast />}
		</>
	)
}
