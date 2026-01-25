import Navigation from "../components/Navigation"

import {Outlet} from "react-router"
export default function MobileLayout() {
	return (
		<>
			<Navigation />
			<Outlet />
			{/* New noe button goes here */}
		</>
	)
}
