import { Box } from '@mui/joy'
import { useColorScheme } from '@mui/joy'

export default function Logo() {
    const { mode } = useColorScheme()

    return (
        <Box
            component="img"
            src={mode === 'light' ? '../public/logo-lightMode.png' : '../public/logo-darkMode.png'}
            alt="Domain Management"
            sx={{ height: 150 }}
        />
    )
}
