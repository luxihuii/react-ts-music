import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getArtistList,
  getBanner,
  getHotRecommend,
  getNewAlbum,
  getPlayList,
  getPlayListDetail,
  getRadioList
} from '../service/recommend'
import type { IBanner } from './data-type'
import type {
  ISongItem,
  IAlbum,
  ISong,
  IPlayList,
  IArtist,
  IRadio
} from '@/store/data-type'
import { withRetryAndTimeout } from '@/service/error-handle/withRetryAndTimeout'
import { fallback_artistList, fallback_banners, fallback_hotRecommends, fallback_newAlbums, fallback_playList, fallback_radioList } from '@/service/error-handle/fallback_data'

/**
 * Promise.all 默认情况下会在遇到第一个错误时就终止并抛出错误
 * 在每个 Promise 内部添加错误处理，确保即使某个 Promise 出错，也不会影响其他 Promise 的执行
 */

// 通用的安全请求函数
const safeFetch = async <T>(fetchFunction: Function, defaultValue: T) => {
  try {
    const response = await fetchFunction()
    return response.data || defaultValue
  } catch (error) {
    console.error('Request failed:', error)
    return defaultValue // 返回默认值
  }
}

const getBannerWithRetry = withRetryAndTimeout(getBanner) // 重试 3 次，超时 5 秒
const getHotRecommendWithRetry = withRetryAndTimeout(getHotRecommend)
const getNewAlbumWithRetry = withRetryAndTimeout(getNewAlbum)
const getPlayListWithRetry = withRetryAndTimeout(getPlayList)
const getArtistListWithRetry = withRetryAndTimeout(getArtistList)
const getRadioListWithRetry = withRetryAndTimeout(getRadioList)
const getPlayListDetailWithRetry = withRetryAndTimeout(getPlayListDetail)

// 获取推荐数据
export const fetchRecommendDataAction = createAsyncThunk(
  'fetchRecommendData',
  async () => {
    const [banners, hotRecommends, newAlbums, playList, artistList, radioList] =
      await Promise.all([
        safeFetch(getBannerWithRetry, fallback_banners),
        safeFetch(() => getHotRecommendWithRetry(8), fallback_hotRecommends),
        safeFetch(getNewAlbumWithRetry, fallback_newAlbums),
        safeFetch(getPlayListWithRetry, fallback_playList),
        safeFetch(() => getArtistListWithRetry(5), fallback_artistList),
        safeFetch(() => getRadioListWithRetry(5), fallback_radioList)
      ])

    return {
      banners: banners.banners,
      hotRecommends: hotRecommends.result,
      newAlbums: newAlbums.albums,
      playList: playList.list,
      artistList: artistList.artists,
      radioList: radioList.list
    }
  }
)

const rankingIds = [19723756, 3779629, 2884035]
export const fetchRankingDataAction = createAsyncThunk(
  'fetchRankingData',
  async () => {
    const rankingPromises = rankingIds.map((id, index) =>
      getPlayListDetailWithRetry(id, 10).catch((error) => {
        console.error(`Failed to fetch ranking data${index}:`, error)
        return { data: { songs: [] } }
      })
    )

    let rankingsRes = await Promise.all(rankingPromises)

    return {
      rankings: rankingsRes.map((res) => res.data.songs)
    }
  }
)

export interface IRecommendState {
  banners: IBanner[]
  hotRecommends: ISongItem[]
  newAlbums: IAlbum[]
  playList: IPlayList[]
  rankings: ISong[][]
  artistList: IArtist[]
  radioList: IRadio[]
}

const initialState: IRecommendState = {
  banners: [],
  hotRecommends: [],
  newAlbums: [],
  playList: [],
  rankings: [],
  artistList: [],
  radioList: []
}


// 使用 createSlice 会为每个 reducer 函数自动生成相应的 action 类型（type）
const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {},
  // extraReducers 将外部 action 的处理逻辑与 slice 的本地 reducers 分开
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendDataAction.pending, () => {
        console.log('pending')
      })
      .addCase(
        fetchRecommendDataAction.fulfilled,
        (
          state,
          {
            payload
          }: {
            payload: {
              banners: IBanner[]
              hotRecommends: ISongItem[]
              newAlbums: IAlbum[]
              playList: IPlayList[]
              artistList: IArtist[]
              radioList: IRadio[]
            }
          }
        ) => {
          state.banners = payload.banners
          state.hotRecommends = payload.hotRecommends
          state.newAlbums = payload.newAlbums
          state.playList = payload.playList
          state.artistList = payload.artistList
          state.radioList = payload.radioList
        }
      )
      .addCase(fetchRecommendDataAction.rejected, () => {
        console.log('rejected')
      })

      .addCase(fetchRankingDataAction.pending, () => {
        console.log('pending')
      })
      .addCase(
        fetchRankingDataAction.fulfilled,
        (
          state,
          {
            payload
          }: {
            payload: {
              rankings: ISong[][]
            }
          }
        ) => {
          state.rankings = payload.rankings
        }
      )
      .addCase(fetchRankingDataAction.rejected, () => {
        console.log('rejected')
      })
  }
})

export default recommendSlice.reducer
