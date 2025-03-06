import { createContext, useContext, useEffect, useState } from 'react'

export interface TypeAuthContext {
    user: { email: string } | null
    login: (email: string, password: string) => void
    logout: () => void
    isAuthenticated: boolean
}

const AuthContext = createContext<TypeAuthContext | null>(null)

export function AuthProvider(props: { children: React.ReactNode }) {
    const [user, setUser] = useState<{ email: string } | null>(null)

    useEffect(() => {
        const token = localStorage.getItem('auth_token')

        if (token) {
            const tokenParsed = JSON.parse(token)

            if (tokenParsed && tokenParsed.expiresIn && tokenParsed.expiresIn > Date.now()) {
                setUser({ email: tokenParsed.email })
            } else {
                localStorage.removeItem('auth_token')
            }
        }
    }, [])

    function login(email: string, password: string) {
        if (email && password) {
            const token = {
                email,
                expiresIn: Date.now() + 1000 * 60 * 60 * 24,
            }
            localStorage.setItem('auth_token', JSON.stringify(token))
            setUser({ email })
        }
    }

    function logout() {
        localStorage.removeItem('auth_token')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)

    if (!context) throw new Error('UseAuth function must be used within Provider')
    return context
}
