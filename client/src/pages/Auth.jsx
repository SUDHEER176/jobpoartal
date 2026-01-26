// Auth Page Wrapper
import { useSearchParams, Link } from 'react-router-dom'
import SignIn from '../components/auth/SignIn'
import SignUp from '../components/auth/SignUp'
import { Logo } from '../components/Logo'

export default function AuthPage() {
    const [searchParams] = useSearchParams()
    const mode = searchParams.get('mode')
    const isSignUp = mode === 'signup'

    return (
        <div className="relative">
            <div className="absolute top-0 left-0 w-full p-6 z-50">
                <Link to="/" className="text-white hover:opacity-80 transition-opacity block">
                    <Logo className="text-white" />
                </Link>
            </div>
            {isSignUp ? <SignUp /> : <SignIn />}
        </div>
    )

}
