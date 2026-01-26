import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui'

export default function AdminDashboard() {
    const { dbUser, loading } = useAuth()

    if (loading) return <div>Loading...</div>
    if (dbUser?.role !== 'admin') return <div className="p-10 text-center">Access Denied</div>

    // In a real app, fetch these stats from API
    const stats = [
        { label: 'Total Users', value: 154 },
        { label: 'Active Jobs', value: 42 },
        { label: 'Applications', value: 320 },
    ]

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="text-3xl font-bold text-brand-600 mb-2">{stat.value}</div>
                        <div className="text-slate-600 font-medium">{stat.label}</div>
                    </div>
                ))}
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="flex gap-4">
                    <Button variant="outline">Manage Users</Button>
                    <Button variant="outline">Manage Jobs</Button>
                </div>
            </div>
        </div>
    )
}
