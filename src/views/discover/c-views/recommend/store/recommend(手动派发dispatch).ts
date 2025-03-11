import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getBanner, getHotRecommend, getNewAlbum } from '../service/recommend'
import type { IBanner } from './data-type'
import type { ISongItem, IAlbum } from '@/store/data-type'

/**
 * 手动派发action：在异步操作完成后，手动调用 dispatch 来派发一个 action 来更新状态；
 * 更多控制：提供更多的控制，可以在异步操作完成后执行额外的逻辑，然后再派发 action；
 * 可能冗余：createAsyncThunk 可以自动派发 fulfilled action，除非需要执行额外的逻辑或派发不同的action使用 dispatch。
 */

export const fetchRecommendDataAction = createAsyncThunk(
  'fetchdata',
  (arg, { dispatch }) => {
    // 1.顶部的banners
    getBanner().then((res: any) => {
      dispatch(changeBannerAction(res.data.banners)) // 手动触发 Redux action来更新状态
    })

    // 2.热门推荐
    getHotRecommend().then((res: any) => {
      dispatch(changeHotRecommendAction(res.data.result))
    })

    // 3.新碟上架
    getNewAlbum().then((res: any) => {
      dispatch(changeNewAlbumAction(res.data.albums))
    })
  }
)

export interface IRecommendState {
  banners: IBanner[]
  hotRecommends: ISongItem[]
  newAlbums: IAlbum[]
}

const initialState: IRecommendState = {
  banners: [],
  hotRecommends: [],
  newAlbums: []
}

const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    changeBannerAction(state, { payload }) {
      state.banners = payload
    },
    changeHotRecommendAction(state, { payload }) {
      state.hotRecommends = payload
    },
    changeNewAlbumAction(state, { payload }) {
      state.newAlbums = payload
    }
  },
  // extraReducers 将外部 action 的处理逻辑与 slice 的本地 reducers 分开
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendDataAction.pending, () => {
        console.log('pending')
      })
      .addCase(fetchRecommendDataAction.fulfilled, () => {
        // 状态更新已经在各自的action中处理，这里不需要重复处理
        console.log('fulfilled')
      })
      .addCase(fetchRecommendDataAction.rejected, () => {
        console.log('rejected')
      })
  }
})

export const {
  changeBannerAction,
  changeHotRecommendAction,
  changeNewAlbumAction
} = recommendSlice.actions
export default recommendSlice.reducer
