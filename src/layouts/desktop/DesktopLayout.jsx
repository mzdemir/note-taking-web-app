import {Outlet} from "react-router"
import {Logo} from "../../components/shared/Icons"
import SideNav from "../../components/desktop/SideNav"
import PageHeader from "../../components/desktop/PageHeader"

export default function DesktopLayout() {
	return (
		<>
			<SideNav />
			<div className="main-content-desktop">
				<PageHeader />
				<Outlet />
			</div>
		</>
	)
}
