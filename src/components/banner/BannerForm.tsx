import { useState, useEffect } from 'react'
import { Button, Card, CardActions, CardContent, Input, Typography } from '@mui/joy'
import { useNavigate, useParams } from 'react-router-dom'
import BannerService from '../../services/banner.service'
import { BannerDto } from '../../services/dto/banner.dto'

export default function BannerForm() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [banner, setBanner] = useState<BannerDto>({ link: '', imageUrl: '' })

    useEffect(() => {
        // existing banners are loaded here using an asynchronous function because BannerService returns Promise
        async function fetchBanner() {
            if (id) {
                const existingBanner = await BannerService.getBanner(id)
                if (existingBanner) {
                    setBanner(existingBanner)
                }
            }
        }
        fetchBanner()
    }, [id])

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setBanner({ ...banner, [event.target.name]: event.target.value })
    }

    // the goal is to use this logic both to create a banner and to updating it
    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()

        if (id) {
            await BannerService.updateBanner(id, banner)
        } else {
            await BannerService.createBanner(banner)
        }
        navigate('/banners')
    }

    return (
        <Card>
            <CardContent>
                <Typography level="h4">{id ? 'Edit Banner' : 'Create Banner'}</Typography>
                <Input
                    name="link"
                    placeholder="Link"
                    value={banner.link}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <Input
                    name="imageUrl"
                    placeholder="Image URL"
                    value={banner.imageUrl}
                    onChange={handleChange}
                    required
                    fullWidth
                />
            </CardContent>
            <CardActions>
                <Button
                    onClick={handleSubmit}
                    color="primary"
                >
                    {id ? 'Update' : 'Create'}
                </Button>
                <Button
                    onClick={() => navigate('/banners')}
                    variant="plain"
                >
                    Cancel
                </Button>
            </CardActions>
        </Card>
    )
}
