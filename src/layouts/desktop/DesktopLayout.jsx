import {Outlet} from "react-router"
import {Logo} from "../../components/shared/Icons"

export default function DesktopLayout() {
	return (
		<>
			<h1>Sidebar</h1>
			<h2>Header</h2>
			<Outlet />
		</>
	)
}
