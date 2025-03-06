import GlobalStyles from '@mui/joy/GlobalStyles'
import Sheet from '@mui/joy/Sheet'
import IconButton from '@mui/joy/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'

import ColorSchemeToggle from './ColorSchemeToggle'

import { toggleSidebar } from '../utils'
import { useAuth } from '../context/auth/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Header() {
    const { logout, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate('/login')
    }

    return (
        <Sheet
            sx={{
                display: { xs: 'flex', md: 'flex' },
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'fixed',
                top: 0,
                width: '100vw',
                height: 'var(--Header-height)',
                zIndex: 9995,
                p: 2,
                gap: 1,
                borderBottom: 'none',
            }}
        >
            <GlobalStyles
                styles={(theme) => ({
                    ':root': {
                        '--Header-height': '52px',
                        [theme.breakpoints.up('md')]: {
                            '--Header-height': '0px',
                        },
                    },
                })}
            />
            <IconButton
                onClick={() => toggleSidebar()}
                variant="outlined"
                color="neutral"
                size="sm"
            >
                <MenuIcon />
            </IconButton>

            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 5 }}>
                {isAuthenticated && (
                    <Button
                        onClick={handleLogout}
                        color="danger"
                        variant="solid"
                        size="sm"
                    >
                        Logout
                    </Button>
                )}
                <ColorSchemeToggle sx={{ height: 40, width: 40 }} />
            </Box>
        </Sheet>
    )
}
