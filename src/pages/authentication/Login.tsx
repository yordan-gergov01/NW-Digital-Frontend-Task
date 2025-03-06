import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth/AuthContext'
import { Box, Button, Input, Typography } from '@mui/joy'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { login } = useAuth()
    const navigate = useNavigate()

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()

        login(email, password)
        navigate('/banners')
    }

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 10 }}>
            <Typography level="h2">Login</Typography>
            <Input
                name="email"
                type="email"
                placeholder="Email Adress"
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Input
                name="password"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Button
                onClick={handleSubmit}
                color="primary"
            >
                Login
            </Button>
        </Box>
    )
}
