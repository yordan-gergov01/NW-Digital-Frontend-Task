import { Typography } from '@mui/joy'
import Sheet from '@mui/joy/Sheet'

export default function Footer() {
    return (
        <Sheet
            component="footer"
            sx={{
                height: '5dvh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 1,
                fontSize: 'sm',
            }}
        >
            <Typography level="body-sm">
                &copy; {new Date().getFullYear()} Domain Management. All rights reserved.
            </Typography>
        </Sheet>
    )
}
