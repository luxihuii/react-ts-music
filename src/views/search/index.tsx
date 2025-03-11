import { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { SearchWrapper } from './style'
import { getSearch } from '@/service'
import { useSearchParams } from 'react-router-dom'

interface IProps {
  children?: ReactNode
}

const Search: FC<IProps> = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') || ''
  const [songs, setSongs] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        console.log('搜索内容:', query)
        try {
          const response = await getSearch(query)
          console.log(response.data.result.songs)
        } catch (error) {
          console.log('搜索失败')
        }
      }
    }

    fetchData() // 调用 async 函数
  }, [query])

  return <SearchWrapper>搜索页面</SearchWrapper>
}

export default memo(Search)
