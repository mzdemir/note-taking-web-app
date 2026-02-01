import {Outlet} from "react-router"
import {Logo} from "../../components/shared/Icons"
import MobileNav from "../../components/mobile/MobileNav"

export default function MobileLayout() {
	return (
		<>
			<MobileNav />
			<div className="main-content">
				<Outlet />
			</div>
		</>
	)
}

function MobileShell() {}
