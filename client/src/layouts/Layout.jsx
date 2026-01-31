import { Header } from '../components/Header'
import Footer from '../components/Footer'

import { Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
    const location = useLocation()
    const isHome = location.pathname === '/'

    return (
        <div className="min-h-screen bg-white dark:bg-black font-sans text-slate-900 dark:text-white transition-colors duration-300">
            <Header />
            <main className={!isHome ? 'pt-16' : ''}>
                <Outlet />
            </main>
            <Footer />

        </div>
    )
}
