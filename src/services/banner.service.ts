import { PageRequest } from './dto/page.request.ts'
import { BannerDto } from './dto/banner.dto.ts'
import { PageResponse } from './dto/page.response.ts'

class BannerService {
    private readonly BANNER_KEY = 'banners'

    async createBanner(banner: BannerDto) {
        // adding unique id on each new banner
        if (!banner.id) {
            banner.id = crypto.randomUUID()
        }

        this.saveBanners([banner, ...this.listBanners()])
    }

    async getBanners(page: PageRequest) {
        if (!page.page) page.page = 0
        if (!page.pageSize) page.pageSize = 12

        let banners = this.listBanners()
        const total = banners.length

        const start = Math.min(page.page * page.pageSize, total)
        const end = Math.min(start + page.pageSize, total)

        banners = banners.slice(start, end)

        if (page.orderBy) {
            banners = banners.sort((a, b) => {
                const valueA = (Object.entries(a).find((value) => value[0] === page.orderBy) ||
                    [])[1]
                const valueB = (Object.entries(b).find((value) => value[0] === page.orderBy) ||
                    [])[1]
                if (valueA < valueB) return -1
                if (valueA > valueB) return 1
                return 0
            })
            if (page.orderType === 'desc') {
                banners = banners.reverse()
            }
        }

        return {
            content: banners,
            pageSize: page.pageSize,
            pageNumber: page.page,
            maxPageNumber: Math.ceil(total / page.pageSize),
        } as PageResponse<BannerDto>
    }

    async getBanner(id: string) {
        return this.listBanners().find((banner) => banner.id === id)
    }

    async updateBanner(id: string, banner: BannerDto) {
        const banners = this.listBanners()
        const updatedBannerIndex = banners.findIndex((banner) => banner.id === id)

        if (updatedBannerIndex !== -1) {
            banners[updatedBannerIndex] = { ...banners[updatedBannerIndex], ...banner }
            this.saveBanners(banners)
        }
    }

    async deleteBanner(id: string) {
        const banners = this.listBanners().filter((banner) => banner.id !== id)
        this.saveBanners(banners)
    }

    private listBanners() {
        return JSON.parse(localStorage.getItem(this.BANNER_KEY) || '[]') as BannerDto[]
    }

    private saveBanners(banners: BannerDto[]) {
        localStorage.setItem(this.BANNER_KEY, JSON.stringify(banners))
    }
}

export default new BannerService()
