import { useEffect } from 'react'
import BannerForm from '../../components/banner/BannerForm'
import { usePageData } from '../../context/page-data/page-data.context'

export default function BannerCreatePage() {
    const { setPageData } = usePageData()

    // use context to set the Page's title
    useEffect(() => {
        setPageData({ title: 'Create New Banner' })
    }, [setPageData])

    return <BannerForm />
}
