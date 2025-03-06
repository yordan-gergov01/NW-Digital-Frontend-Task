import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BannerDto } from '../../services/dto/banner.dto.ts'
import { Button, Card, CardActions, CardOverflow, Skeleton, Grid, Typography } from '@mui/joy'
import Box from '@mui/joy/Box'
import IconButton from '@mui/joy/IconButton'
import { Delete } from '@mui/icons-material'
import Image from '../Image.tsx'
import ConfirmModal from '../ConfirmModal.tsx'

export default function BannerCard(props: { banner?: BannerDto; delete?: () => void }) {
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    return (
        <>
            <Grid
                xs={12}
                sm={6}
                md={4}
                lg={3}
            >
                <Card sx={{ height: 400, maxWidth: 350, width: '100%', margin: 'auto' }}>
                    <CardOverflow>
                        <Image url={props.banner?.imageUrl} />
                    </CardOverflow>
                    <Box>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2,
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography
                                level="title-lg"
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    width: '100%',
                                }}
                            >
                                <Skeleton
                                    loading={!props.banner}
                                    variant="text"
                                    sx={{ width: '100%', height: '100%' }}
                                >
                                    {props.banner?.link}
                                </Skeleton>
                            </Typography>
                        </Box>
                    </Box>
                    <CardActions>
                        <IconButton
                            variant="outlined"
                            size="sm"
                            sx={{ width: '20%', alignSelf: 'center' }}
                            onClick={() => setIsOpen(true)}
                        >
                            <Delete />
                        </IconButton>
                        <Button
                            variant="solid"
                            type={'button'}
                            size="md"
                            onClick={() => navigate(`/banners/${props.banner?.id}`)}
                            color="primary"
                            sx={{ width: '75%', alignSelf: 'center', fontWeight: 600 }}
                        >
                            Edit
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
            <ConfirmModal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                confirm={() => props.delete && props.delete()}
                action="delete this banner"
            />
        </>
    )
}
