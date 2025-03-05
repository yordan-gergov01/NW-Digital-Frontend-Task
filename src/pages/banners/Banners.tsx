import BannerService from '../../services/banner.service.ts'
import ScrollableCards from '../../components/ScrollableCards.tsx'
import { useEffect } from 'react'
import { usePageData } from '../../context/page-data/page-data.context.ts'
import BannerCard from '../../components/banner/BannerCard.tsx'
import FAB from '../../components/FAB.tsx'

export default function Banners() {
    const { setPageData } = usePageData()

    useEffect(() => {
        setPageData({ title: 'Banners' })
    }, [setPageData])

    return (
        <>
            <ScrollableCards
                loadMore={(page) => BannerService.getBanners(page)}
                mapCard={(banner, deleteItem) => (
                    <BannerCard
                        key={banner.id}
                        banner={banner}
                        delete={async () => {
                            try {
                                deleteItem(banner.id!)
                                await BannerService.deleteBanner(banner.id!)
                            } catch (error) {
                                console.error('Failed deleting banner:', error)
                            }
                        }}
                    />
                )}
            />
            <FAB />
        </>
    )
}
