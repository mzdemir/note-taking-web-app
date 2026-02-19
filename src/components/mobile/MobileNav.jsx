import {Logo, HomeIcon, ArchivedIcon, TagsIcon, SearchIcon, SettingsIcon} from "../shared/Icons"

import {NavLink} from "react-router"

export default function MobileNav() {
	return (
		<header className="mobile-header">
			<div className="logo-wrapper">{<Logo />}</div>
			<nav className="bottom-navbar">
				<NavLink to="/notes" className="nav-links">
					{<HomeIcon />}
					<span>Home</span>
				</NavLink>
				<NavLink to="/search" className="nav-links">
					{<SearchIcon />}
					<span>Search</span>
				</NavLink>
				<NavLink to="/archived" className="nav-links">
					{<ArchivedIcon />}
					<span>Archived</span>
				</NavLink>
				<NavLink to="/tags" className="nav-links">
					{<TagsIcon />}
					<span>Tags</span>
				</NavLink>
				<NavLink to="/settings" className="nav-links">
					{<SettingsIcon />}
					<span>Settings</span>
				</NavLink>
			</nav>
		</header>
	)
}
