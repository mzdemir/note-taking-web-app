import Tags from "../../pages/Tags"
import {ArchivedIcon, HomeIcon, Logo} from "../shared/Icons"

import {Link} from "react-router"

export default function SideNav() {
	return (
		<aside className="desktop-sidenav text-preset-4">
			<div className="logo-wrapper">
				<Logo />
			</div>
			<nav className="sidenavbar">
				<div>
					<Link to="/">
						<HomeIcon /> All Notes
					</Link>
					<Link to="archived">
						<ArchivedIcon /> Archived Notes
					</Link>
				</div>
				<hr />
				<div className="sidebar-tags-list">
					<h2>Tags</h2>
					<Tags />
				</div>
			</nav>
		</aside>
	)
}
