import { NavLink } from "react-router-dom"
import { navItems } from "../Header/Header"

export default function Footer() {

    return (
        <footer className=" w-full border-t mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-600">

                <div>
                    <h4 className="text-gray-900 font-semibold mb-4">DevDraft</h4>
                    <p className="text-gray-500">Build for my fellow devs. Stay connected and grow together.</p>
                </div>

                <div>
                    <h4 className="text-gray-900 font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                        {
                            navItems.map((Item) => (
                                <li key={Item}>
                                    <NavLink
                                        to={`/${Item.toLowerCase()}`}
                                        className={({ isActive }) => {
                                            return `hover:text-blue-600 transition-colors ${isActive ? "text-blue-600" : ""}`
                                        }}
                                    >
                                        {Item}
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div>
                    <h4 className="text-gray-900 font-semibold mb-4">Connect</h4>
                    <ul className="space-y-2">
                        <li><a href="mailto:info@devdraft.com" className="hover:text-blue-600">Email</a></li>
                        <li><a href="https://twitter.com" className="hover:text-blue-600">Twitter</a></li>
                        <li><a href="https://github.com" className="hover:text-blue-600">GitHub</a></li>
                        <li><a href="https://linkedin.com" className="hover:text-blue-600">LinkedIn</a></li>
                    </ul>
                </div>
            </div>

            <div className="text-center text-gray-400 text-xs pb-4">
                &copy; {new Date().getFullYear()} DevDraft. All rights reserved.
            </div>
        </footer>
    )
}
