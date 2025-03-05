import { Grid } from '@mui/joy'
import InfiniteScroll from 'react-infinite-scroll-component'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { PageRequest } from '../services/dto/page.request.ts'
import { PageResponse } from '../services/dto/page.response.ts'

export default function ScrollableCards<T>(props: {
    loadMore: (page: PageRequest) => Promise<PageResponse<T> | undefined>
    mapCard: (value: T, deleteItem: (id: string) => void) => React.JSX.Element
}) {
    const [cards, setCards] = useState<React.JSX.Element[]>([])
    const [page, setPage] = useState<number>(0)
    const [hasMore, setHasMore] = useState<boolean>(true)

    // prevent loadBanners to be called only on initial rendering
    const isMounted = useRef(false)

    const deleteItem = useCallback((id: string) => {
        setCards((prevCardsState) => {
            // added check in case it is undefined
            const i = prevCardsState.findIndex((card) => card.key == id || card.props.key === id)
            if (i != -1) {
                const newCards = [...prevCardsState]
                newCards.splice(i, 1)
                return newCards
            }
            return prevCardsState
        })
    }, [])

    const loadBanners = useCallback(async () => {
        try {
            const newCards = await props.loadMore({ page, pageSize: 12 })

            if (!newCards) return

            // check if the banner array is empty to avoid endless display of loader
            setHasMore(newCards.content.length > 0 && newCards.maxPageNumber > page + 1)
            setCards((prevCards) => [
                ...prevCards,
                ...newCards.content.map((value) => props.mapCard(value, deleteItem)),
            ])

            // changed the page not to increment on the initial load, and then
            setPage((prevPage) => prevPage + 1)
        } catch (error) {
            console.error(error)
        }
    }, [deleteItem, page, props])

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true
            loadBanners().catch(console.error)
        }
    }, [])

    const loadMore = () => {
        loadBanners().catch((reason) => console.error(reason))
    }

    return (
        <InfiniteScroll
            dataLength={cards.length}
            next={loadMore}
            hasMore={hasMore}
            scrollableTarget="scroll"
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ marginTop: '16px', textAlign: 'center' }}>
                    {cards.length === 0 && <b>There are no more items available...</b>}
                </p>
            }
        >
            <Grid
                container
                spacing={2}
                sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
            >
                {...cards}
            </Grid>
        </InfiniteScroll>
    )
}
