import { NavLink, useNavigate } from "react-router-dom"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "../ui/navigation-menu"
import { useDispatch } from "react-redux"
import { updateSearch } from "../../slice/searchSlice"
import { Menu } from "lucide-react"

const navItems = ["Home", "Articles", "Tutorials", "About", "Contact"]
function Header() {

    const dispatch = useDispatch()
    const navigator = useNavigate()

    return (
        <header className="bg-white border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">DevDraft</h1>
                            <p className="text-xs text-gray-500">Craft your code story</p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <NavigationMenu className="hidden lg:flex ">
                        <NavigationMenuList className="space-x-8">
                            {navItems.map((item) => (
                                <NavigationMenuItem key={item}>
                                    <NavLink
                                        to={`/${(item !== "Home") ? item.toLowerCase() : ""}`}
                                        className={({ isActive }) =>
                                            `font-medium transition-colors duration-200 ${isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                                            }`
                                        }
                                    >
                                        {item}
                                    </NavLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* Search + CTA */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <div className="relative">
                            <Input
                                placeholder="Search articles..."
                                className="w-full pl-10"
                                onChange={(e) => {
                                    dispatch(updateSearch(e.target.value))
                                }}
                            />
                            <svg
                                className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <Button
                            className="cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 text-white transition"
                            onClick={() => {
                                navigator('/add-post')
                            }}
                        >
                            Write Article
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <Sheet>
                        <SheetTrigger className="lg:hidden p-2 rounded-md text-gray-600  hover:bg-gray-100">
                            <Menu />
                        </SheetTrigger>
                        <SheetContent side="left" className="pt-35 bg-[#fff]">
                            <nav className="flex flex-col gap-4">
                                {["Home", "Articles", "Tutorials", "About", "Contact"].map((item) => (
                                    <SheetClose asChild key={item}>
                                        <NavLink
                                            to={`/${(item !== "Home") ? item.toLowerCase() : ""}`}
                                            className="text-black hover:text-blue-600 py-2 px-5 font-medium transition-colors duration-200"
                                        >
                                            {item}
                                        </NavLink>
                                    </SheetClose>
                                ))}
                            </nav>
                            <div className="mt-6 mx-5">
                                <Input placeholder="Search articles..." className="mb-3 " />
                                <SheetClose asChild>
                                    <Button onClick={() => { navigator('/add-post') }} className="w-full px-10 bg-gradient-to-r from-blue-600 to-purple-600 cursor-pointer">Write Article</Button>
                                </SheetClose>
                            </div>

                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export { navItems };
export default Header
