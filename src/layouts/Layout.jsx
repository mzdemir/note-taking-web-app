import {Outlet} from "react-router"
import MobileNav from "../components/mobile/MobileNav"
import SideNav from "../components/desktop/SideNav"
import DesktopHeader from "../components/desktop/DesktopHeader"

import useMediaQuery from "../hooks/useMediaQuery"

export default function DesktopLayout() {
	const isDesktop = useMediaQuery()

	// prettier-ignore
	return (
		<>
			{isDesktop ? <SideNav /> : <MobileNav /> }
			<main className="main">
				{isDesktop ? <DesktopHeader /> : null}
				<Outlet />
			</main>
		</>
	)
}
