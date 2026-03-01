import {Logo, HomeIcon, ArchivedIcon, TagsIcon, SearchIcon, SettingsIcon} from "../../assets/images/Icons"

import {NavLink} from "react-router"

export default function MobileNav() {
	return (
		<header className="mobile-header">
			<div className="logo-wrapper">{<Logo />}</div>
			<nav className="bottom-navbar">
				<NavLink to="/notes" className="nav-links" aria-label="Home">
					{<HomeIcon />}
					<span className="text-preset-6">Home</span>
				</NavLink>
				<NavLink to="/search" className="nav-links" aria-label="Search">
					{<SearchIcon />}
					<span className="text-preset-6">Search</span>
				</NavLink>
				<NavLink to="/archived" className="nav-links" aria-label="Archived">
					{<ArchivedIcon />}
					<span className="text-preset-6">Archived</span>
				</NavLink>
				<NavLink to="/tags" className="nav-links" aria-label="Tags">
					{<TagsIcon />}
					<span className="text-preset-6">Tags</span>
				</NavLink>
				<NavLink to="/settings" className="nav-links" aria-label="Settings">
					{<SettingsIcon />}
					<span className="text-preset-6">Settings</span>
				</NavLink>
			</nav>
		</header>
	)
}
