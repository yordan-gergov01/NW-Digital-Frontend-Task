import { useEffect } from 'react'
import { usePageData } from '../../context/page-data/page-data.context.ts'
import BannerForm from '../../components/banner/BannerForm.tsx'
import { useParams } from 'react-router-dom'
import BannerService from '../../services/banner.service.ts'

export default function Banner() {
    const { setPageData } = usePageData()
    const { id } = useParams()

    useEffect(() => {
        async function getBanner() {
            if (id) {
                try {
                    const bannerForUpdate = await BannerService.getBanner(id)

                    if (bannerForUpdate) {
                        setPageData({ title: `Edit: ${bannerForUpdate.link}` })
                    }
                } catch (error) {
                    console.error('Error fetching banner', error)
                }
            } else {
                setPageData({ title: 'Create Banner' })
            }
        }
        getBanner()
    }, [id, setPageData])

    return <BannerForm />
}
