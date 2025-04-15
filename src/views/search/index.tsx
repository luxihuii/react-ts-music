// import { memo, useEffect, useState } from 'react'
// import type { FC, ReactNode } from 'react'
// import { SearchWrapper } from './style'
// import { getSearch } from '@/service'
// import { useSearchParams } from 'react-router-dom'
// import { useAppDispatch } from '@/store'
// import { fetchCurrentSongAction } from '../player/store/player'
// import { ISong } from '@/store/data-type'

// interface IProps {
//   children?: ReactNode
// }

// const Search: FC<IProps> = () => {
//   const [searchParams] = useSearchParams()
//   const query = searchParams.get('query') || ''
//   const [songs, setSongs] = useState([])

//     const dispatch = useAppDispatch()
//     function handlePlayClick(id: any) {
//         dispatch(fetchCurrentSongAction(id))
//     }

//   useEffect(() => {
//     const fetchData = async () => {
//       if (query) {
//         console.log('搜索内容:', query)
//         try {
//           const response = await getSearch(query)
//           console.log(response.data.result.songs)
//           setSongs(response.data.result.songs.slice(0, 10))
//         } catch (error) {
//           console.log('搜索失败')
//         }
//       }
//     }

//     fetchData() // 调用 async 函数
//   }, [query])

//   return (
//     <SearchWrapper>
//       <div className="list">
//           {songs
//             .flat()
//             .map((item: ISong, index) => {
//               return (
//                 <div className="item" key={item.id}>
//                   <div className="rank">{index + 1}</div>
//                   <div className="info">
//                     <div className="name">{item.name}</div>
//                     <div className="operator">
//                       <button
//                         className="btn sprite_02 play"
//                         onClick={() => handlePlayClick(item.id)}
//                       ></button>
//                       <button className="btn sprite_icon2 add"></button>
//                       <button className="btn sprite_02 favor"></button>
//                     </div>
//                   </div>
//                 </div>
//               )
//             })}
//       </div>
//     </SearchWrapper>
//   )
// }

// export default memo(Search)

import { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { SearchWrapper } from './style'
import { getSearch } from '@/service'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch } from '@/store'
import { fetchCurrentSongAction } from '../player/store/player'
import { ISong } from '@/store/data-type'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

interface IProps {
  children?: ReactNode
}

const Search: FC<IProps> = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') || ''
  const [songs, setSongs] = useState<ISong[]>([])

  const dispatch = useAppDispatch()

  const handlePlayClick = (id: number) => {
    if(id === -1) {
        console.error('获取失败')
    }
    dispatch(fetchCurrentSongAction(id))
  }

  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        try {
          const response = await getSearch(query)
          setSongs(
            Array.from({ length: 10 }, () => response.data.result.songs).flat()
          )
        } catch (error) {
          console.error('搜索失败:', error)
        }
      }
    }
    fetchData()
  }, [query])

  // 使用React.memo优化行组件
  const Row = memo(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const item = songs[index]
      if (!item) return null

      return (
        <div className="item" style={style}>
          <div className="rank">{index + 1}</div>
          <div className="info">
            <div className="name">{item.name}</div>
            <div className="operator">
              <button
                className="btn sprite_02 play"
                onClick={() => handlePlayClick(item.id || -1)}
              />
              <button className="btn sprite_icon2 add" />
              <button className="btn sprite_02 favor" />
            </div>
          </div>
        </div>
      )
    }
  )

  return (
    <SearchWrapper>
      <div className="list">
        {songs.length > 0 ? (
          <AutoSizer>
            {({ height, width }) => (
              <List
                height={height || 600}
                itemCount={songs.length}
                itemSize={60} // 每行高度
                width={width || '100%'}
              >
                {Row}
              </List>
            )}
          </AutoSizer>
        ) : (
          <div className="empty">暂无搜索结果</div>
        )}
      </div>
    </SearchWrapper>
  )
}

export default memo(Search)