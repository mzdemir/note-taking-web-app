import Tags from "../../routes/Tags"
import {ArchivedIcon, HomeIcon, Logo} from "../shared/Icons"

import {NavLink} from "react-router"

export default function SideNav() {
	return (
		<aside className="desktop-sidenav text-preset-4">
			<div className="logo-wrapper">
				<Logo />
			</div>
			<nav className="sidenavbar">
				<div className="top-items">
					<NavLink to="/notes">
						<HomeIcon /> All Notes
					</NavLink>
					<NavLink to="archived">
						<ArchivedIcon /> Archived Notes
					</NavLink>
				</div>
				<hr />

				<h2>Tags</h2>
				<Tags />
			</nav>
		</aside>
	)
}
