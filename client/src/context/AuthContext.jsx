import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)
    const [dbUser, setDbUser] = useState(null)

    const fetchDbUser = async (userId, currentUser = null) => {
        try {
            const res = await fetch(`/api/auth/me/${userId}`)
            const data = await res.json()
            if (data.success) {
                const dbProfile = data.data.profile || {};
                const meta = currentUser?.user_metadata || {};
                const metaAvatar = meta.avatar_url || meta.picture;

                // If DB user exists but avatar is missing and we have one from Google, sync it.
                if (currentUser && metaAvatar && (!dbProfile.avatar || dbProfile.avatar !== metaAvatar)) {
                    console.log('Avatar mismatch, syncing update...');
                    const role = meta.role || data.data.role || 'seeker';
                    const profile = {
                        ...dbProfile,
                        name: meta.full_name || meta.name || dbProfile.name,
                        avatar: metaAvatar
                    };
                    await syncUserWithDb(role, profile, currentUser);
                } else {
                    setDbUser(data.data)
                }
            } else if (currentUser) {
                console.log('User not found in DB, syncing...', currentUser);
                // Auto-sync if user exists in Supabase but not DB
                const role = currentUser.user_metadata?.role || 'seeker';

                // Extract profile info from metadata (Google Auth provides these)
                const meta = currentUser.user_metadata || {};
                const metaAvatar = meta.avatar_url || meta.picture;

                const profile = {
                    name: meta.full_name || meta.name || '',
                    avatar: meta.avatar_url || meta.picture || '',
                    ...(meta.profile || {})
                };

                await syncUserWithDb(role, profile, currentUser);
            }
        } catch (error) {
            console.error('Error fetching user:', error)
        } finally {
            setLoading(false)
        }
    }

    const syncUserWithDb = async (role = 'seeker', profile = {}, overrideUser = null) => {
        const currentUser = overrideUser || user;
        if (!currentUser) return

        try {
            const res = await fetch('/api/auth/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: currentUser.id,
                    email: currentUser.email,
                    role,
                    profile
                })
            })
            const data = await res.json()
            if (data.success) setDbUser(data.data)
            return data
        } catch (error) {
            console.error('Sync Error:', error)
        }
    }

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setUser(session?.user ?? null)
            if (session?.user) fetchDbUser(session.user.id, session.user)
            else setLoading(false)
        })

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            setUser(session?.user ?? null)
            if (session?.user) fetchDbUser(session.user.id, session.user)
            else {
                setDbUser(null)
                setLoading(false)
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    const signOut = async () => {
        await supabase.auth.signOut()
        setDbUser(null)
        setUser(null)
        setSession(null)
    }

    return (
        <AuthContext.Provider value={{ user, session, dbUser, loading, syncUserWithDb, signOut, refreshUser: () => fetchDbUser(user?.id, user) }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
