import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../app/features/authSlice'

const Navbar = () => {

    const {user} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutUser = () => {
        navigate('/')
        dispatch(logout())
    }

    return (
        <div className="shadow bg-white/80 backdrop-blur-sm w-full fixed top-0 left-0 z-50">
            <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3 text-slate-800">

                {/* Left: Logo */}
                <Link>
                    <img src="/logo.svg" alt="logo" className="h-14 w-auto" />
                </Link>

                {/* Right: User + Button */}
                <div className="flex items-center gap-4 text-sm">
                    <p className="max-sm:hidden text-2xl font-semibold bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text">
                        Welcome! {user?.name}
                    </p>

                    <button
                        onClick={logoutUser}
                        className="bg-green-600 hover:bg-green-700 transition-all duration-200 text-white rounded-full px-6 py-2.5 cursor-pointer shadow-sm hover:shadow-md"
                    >
                        Logout
                    </button>
                </div>

            </nav>
        </div>
    )
}

export default Navbar