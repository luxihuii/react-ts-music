import { ISong } from '@/store/data-type'
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { getSongDetail, getSongLyric, getSongMp3 } from '../service/player'
import { ILyric, parseLyric } from '@/utils/parse-lyric'
import { IRootState } from '@/store'
import { showErrorAlert, withRetryAndTimeout } from '@/service/error-handle/withRetryAndTimeout'

interface IThunkState {
  state: IRootState
}

const getSongMp3WithRetry = withRetryAndTimeout(getSongMp3); // 重试 3 次，超时 5 秒
const getSongDetailWithRetry = withRetryAndTimeout(getSongDetail);
const getSongLyricWithRetry = withRetryAndTimeout(getSongLyric);

export const fetchCurrentSongAction = createAsyncThunk<
  void,
  number,
  IThunkState
>('currentSong', async (id, { dispatch, getState }) => {
  // 准备播放某一首歌曲时，分成两种情况
  // 从列表中尝试是否可以获取到这首歌
  const playSongList = getState().player.playSongList
  const playMp3List = getState().player.playMp3List
  const playLyricsList = getState().player.playLyricsList
  const findIndex = playSongList.findIndex((item) => item.id === id)
  if (findIndex === -1) {
    try {
      // 如果没找到，发起请求获取歌曲 MP3、歌曲信息、歌词
      const [mp3Res, songRes, lyricRes] = await Promise.all([
        getSongMp3WithRetry(id), // 获取歌曲 MP3
        getSongDetailWithRetry(id), // 获取歌曲信息
        getSongLyricWithRetry(id) // 获取歌词
      ])
      // const [mp3Res, songRes, lyricRes] = await Promise.all([
      //   getSongMp3(id), // 获取歌曲 MP3
      //   getSongDetail(id), // 获取歌曲信息
      //   getSongLyric(id) // 获取歌词
      // ])

      // 处理 MP3 数据
      if (mp3Res.data.data[0]?.url.length) {
        const mp3 = mp3Res.data.data[0].url
        const newPlayMp3List = [...playMp3List, mp3]
        dispatch(changePlayMp3Action(mp3))
        dispatch(changePlayMp3ListAction(newPlayMp3List))
      }

      // 处理歌曲信息
      if (songRes.data.songs.length) {
        const song = songRes.data.songs[0]
        const newPlaySongList = [...playSongList, song]
        dispatch(changeCurrentSongAction(song))
        dispatch(changePlaySongListAction(newPlaySongList))
        dispatch(changePlaySongIndexAction(newPlaySongList.length - 1))
      }

      // 处理歌词信息
      if (lyricRes.data.lrc.lyric.length) {
        const lyricString = lyricRes.data.lrc.lyric
        const lyrics = parseLyric(lyricString)
        const newPlayLyricsList = [...playLyricsList, lyrics]
        dispatch(changeLyricsAction(lyrics))
        dispatch(changePlayLyricsListAction(newPlayLyricsList))
      }
    } catch (error) {
      // 显示错误提示
      showErrorAlert('获取歌曲数据失败，请稍后重试')
    }
  } else {
    // 1.找到MP3
    const mp3 = playMp3List[findIndex]
    dispatch(changePlayMp3Action(mp3))

    // 2.找到歌曲
    const song = playSongList[findIndex]
    dispatch(changeCurrentSongAction(song))
    dispatch(changePlaySongIndexAction(findIndex))

    // 3.找到歌词
    const lyrics = playLyricsList[findIndex]
    dispatch(changeLyricsAction(lyrics))
  }
})

/** 上一首，下一首+播放模式 改变音乐 */
export const changeMusicAction = createAsyncThunk<void, boolean, IThunkState>(
  'changemusic',
  async (isNext, { dispatch, getState }) => {
    // 获取state中的数据
    const player = getState().player
    const playMode = player.playMode
    const songIndex = player.playSongIndex
    const songList = player.playSongList
    const mp3List = player.playMp3List
    const lyricsList = player.playLyricsList

    // 根据不同模式计算不同下一首歌曲的索引
    let newIndex = songIndex
    if (playMode === 1) {
      // 随机播放
      newIndex = Math.floor(Math.random() * songList.length)
    } else {
      newIndex =
        (isNext ? songIndex + 1 : songIndex - 1 + songList.length) %
        songList.length
    }

    const song = songList[newIndex]
    dispatch(changePlayMp3Action(mp3List[newIndex]))
    dispatch(changeCurrentSongAction(song))
    dispatch(changePlaySongIndexAction(newIndex))
    dispatch(changeLyricsAction(lyricsList[newIndex]))
  }
)

/** 音乐列表点击改变播放音乐 */
export const selectMusicAction = createAsyncThunk<void, number, IThunkState>(
  'selectmusic',
  async (index, { dispatch, getState }) => {
    // 获取state中的数据
    const player = getState().player
    const songList = player.playSongList
    const mp3List = player.playMp3List
    const lyricsList = player.playLyricsList

    const song = songList[index]
    dispatch(changePlayMp3Action(mp3List[index]))
    dispatch(changeCurrentSongAction(song))
    dispatch(changePlaySongIndexAction(index))
    dispatch(changeLyricsAction(lyricsList[index]))
  }
)

/** 音乐列表点击删除音乐 */
export const removeMusicAction = createAsyncThunk<void, number, IThunkState>(
  'removeMusic',
  async (index, { dispatch, getState }) => {
    // 获取当前状态
    const state = getState().player
    const { playSongList, playMp3List, playLyricsList, playSongIndex } = state

    // 删除选中的歌曲
    const newPlaySongList = playSongList.filter((_, idx) => idx !== index)
    const newPlayMp3List = playMp3List.filter((_, idx) => idx !== index)
    const newPlayLyricsList = playLyricsList.filter((_, idx) => idx !== index)

    // 如果删除的是当前播放的歌曲，需要更新当前歌曲和索引
    let newPlaySongIndex = playSongIndex
    if (playSongIndex === index) {
      // 如果列表为空，则没有当前歌曲
      if (newPlaySongList.length === 0) {
        dispatch(changeCurrentSongAction(initialState.currentSong))
        dispatch(changePlayMp3Action(initialState.mp3))
        dispatch(changeLyricsAction(initialState.lyrics))
        newPlaySongIndex = initialState.playSongIndex
      } else {
        // 否则，选择列表中的下一首歌曲
        newPlaySongIndex =
          playSongIndex >= newPlaySongList.length ? 0 : playSongIndex
        const newCurrentSong = newPlaySongList[newPlaySongIndex]
        const newMp3 = newPlayMp3List[newPlaySongIndex]
        const newLyrics = newPlayLyricsList[newPlaySongIndex]

        dispatch(changeCurrentSongAction(newCurrentSong))
        dispatch(changePlayMp3Action(newMp3))
        dispatch(changeLyricsAction(newLyrics))
      }
    } else if (playSongIndex > index) {
      // 如果删除的歌曲在当前播放歌曲之前，需要递减索引
      newPlaySongIndex = playSongIndex - 1
    }

    // 更新Redux状态
    dispatch(changePlaySongListAction(newPlaySongList))
    dispatch(changePlayMp3ListAction(newPlayMp3List))
    dispatch(changePlayLyricsListAction(newPlayLyricsList))
    dispatch(changePlaySongIndexAction(newPlaySongIndex))
  }
)

/** 音乐列表点击清空音乐 */
export const removeListMusicAction = createAsyncThunk<void, void, IThunkState>(
  'removeListMusic',
  async (_, { dispatch, getState }) => {
    // 获取当前状态，判断列表是否为空
    const state = getState().player
    if(state.playSongList.length === 0) return

    // 更新Redux状态
    dispatch(changeCurrentSongAction(null))
    dispatch(changePlaySongIndexAction(-1))
    dispatch(changePlayMp3Action(''))
    dispatch(changeLyricsAction([]))
    dispatch(changePlaySongListAction([]))
    dispatch(changePlayMp3ListAction([]))
    dispatch(changePlayLyricsListAction([]))
  }
)

interface IPlayerState {
  currentSong: ISong | null
  lyrics: ILyric[]
  lyricIndex: number
  mp3: string
  playSongList: ISong[]
  playMp3List: string[]
  playLyricsList: ILyric[][]
  playSongIndex: number
  playMode: number
}

// const initialState: IPlayerState = {
//   currentSong: {
//     name: '天下',
//     id: 191254,
//     pst: 0,
//     t: 0,
//     ar: [
//       {
//         id: 6472,
//         name: '张杰',
//         tns: [],
//         alias: []
//       }
//     ],
//     alia: [],
//     pop: 100,
//     st: 0,
//     rt: '',
//     fee: 8,
//     v: 281,
//     crbt: null,
//     cf: '',
//     al: {
//       id: 19318,
//       name: '明天过后',
//       picUrl:
//         'https://p2.music.126.net/ixIs5kkukgNYMmeDsc35_g==/29686813955450.jpg',
//       tns: [],
//       pic: 29686813955450
//     },
//     dt: 219093,
//     h: {
//       br: 320002,
//       fid: 0,
//       size: 8766738,
//       vd: -54249,
//       sr: 44100
//     },
//     m: {
//       br: 192002,
//       fid: 0,
//       size: 5260060,
//       vd: -51663,
//       sr: 44100
//     },
//     l: {
//       br: 128002,
//       fid: 0,
//       size: 3506721,
//       vd: -50006,
//       sr: 44100
//     },
//     sq: {
//       br: 953356,
//       fid: 0,
//       size: 26109263,
//       vd: -54137,
//       sr: 44100
//     },
//     hr: null,
//     a: null,
//     cd: '1',
//     no: 5,
//     rtUrl: null,
//     ftype: 0,
//     rtUrls: [],
//     djId: 0,
//     copyright: 2,
//     s_id: 0,
//     mark: 17179877888,
//     originCoverType: 1,
//     originSongSimpleData: null,
//     tagPicList: null,
//     resourceState: true,
//     version: 281,
//     songJumpInfo: null,
//     entertainmentTags: null,
//     awardTags: null,
//     displayTags: null,
//     single: 0,
//     noCopyrightRcmd: null,
//     mv: 5779666,
//     rtype: 0,
//     rurl: null,
//     mst: 9,
//     cp: 636011,
//     publishTime: 1219766400000
//   },
//   lyrics: [],
//   lyricIndex: -1,
//   mp3: 'http://m701.music.126.net/20250226123351/f3d06a131a556a3b29a78b92a898dfb6/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/28481675631/f606/2c21/7810/08f72d2b021e58bc0d9f4fefc43b0deb.mp3?vuutv=pin2vYRZi9FWxepYm0ZxIaHH8Tobq/Udsw/6eVu0COUUcNT4a92xkrZo9anCdg4x9+4CeNB4FnYBHhdZfakU54BrCowFPxCQ81rECvO7OzE=',
//   playSongList: [
//     {
//       name: '天下',
//       id: 191254,
//       pst: 0,
//       t: 0,
//       ar: [
//         {
//           id: 6472,
//           name: '张杰',
//           tns: [],
//           alias: []
//         }
//       ],
//       alia: [],
//       pop: 100,
//       st: 0,
//       rt: '',
//       fee: 8,
//       v: 281,
//       crbt: null,
//       cf: '',
//       al: {
//         id: 19318,
//         name: '明天过后',
//         picUrl:
//           'https://p2.music.126.net/ixIs5kkukgNYMmeDsc35_g==/29686813955450.jpg',
//         tns: [],
//         pic: 29686813955450
//       },
//       dt: 219093,
//       h: {
//         br: 320002,
//         fid: 0,
//         size: 8766738,
//         vd: -54249,
//         sr: 44100
//       },
//       m: {
//         br: 192002,
//         fid: 0,
//         size: 5260060,
//         vd: -51663,
//         sr: 44100
//       },
//       l: {
//         br: 128002,
//         fid: 0,
//         size: 3506721,
//         vd: -50006,
//         sr: 44100
//       },
//       sq: {
//         br: 953356,
//         fid: 0,
//         size: 26109263,
//         vd: -54137,
//         sr: 44100
//       },
//       hr: null,
//       a: null,
//       cd: '1',
//       no: 5,
//       rtUrl: null,
//       ftype: 0,
//       rtUrls: [],
//       djId: 0,
//       copyright: 2,
//       s_id: 0,
//       mark: 17179877888,
//       originCoverType: 1,
//       originSongSimpleData: null,
//       tagPicList: null,
//       resourceState: true,
//       version: 281,
//       songJumpInfo: null,
//       entertainmentTags: null,
//       awardTags: null,
//       displayTags: null,
//       single: 0,
//       noCopyrightRcmd: null,
//       mv: 5779666,
//       rtype: 0,
//       rurl: null,
//       mst: 9,
//       cp: 636011,
//       publishTime: 1219766400000
//     }
//   ],
//   playMp3List: [
//     'http://m701.music.126.net/20250226123351/f3d06a131a556a3b29a78b92a898dfb6/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/28481675631/f606/2c21/7810/08f72d2b021e58bc0d9f4fefc43b0deb.mp3?vuutv=pin2vYRZi9FWxepYm0ZxIaHH8Tobq/Udsw/6eVu0COUUcNT4a92xkrZo9anCdg4x9+4CeNB4FnYBHhdZfakU54BrCowFPxCQ81rECvO7OzE='
//   ],
//   playLyricsList: [
//     parseLyric(
//       '[00:00.000] 作词 : 周毅\n[00:01.000] 作曲 : 刘迦宁\n[00:27.520]烽烟起寻爱似浪淘沙\n[00:34.181]遇见她如春水映梨花\n[00:40.947]挥剑断天涯相思轻放下\n[00:47.686]梦中我痴痴牵挂\n[00:54.766]顾不顾将相王侯\n[00:56.176]管不管万世千秋\n[00:57.953]求只求爱化解\n[00:59.546]这万丈红尘纷乱永无休\n[01:02.002]爱更爱天长地久\n[01:03.778]要更要似水温柔\n[01:05.450]谁在乎谁主春秋\n[01:07.696]一生有爱何惧风飞沙\n[01:10.805]悲白发留不住芳华\n[01:14.645]抛去江山如画换她笑面如花\n[01:17.832]抵过这一生空牵挂\n[01:21.097]心若无怨爱恨也随她\n[01:24.101]天地大情路永无涯\n[01:27.680]只为她袖手天下\n[02:01.038]顾不顾将相王侯\n[02:02.997]管不管万世千秋\n[02:04.565]求只求爱化解\n[02:06.132]这万丈红尘纷乱永无休\n[02:08.718]爱更爱天长地久\n[02:10.677]要更要似水温柔\n[02:12.140]谁在乎谁主春秋\n[02:14.387]一生有爱何惧风飞沙\n[02:17.443]悲白发留不住芳华\n[02:21.100]抛去江山如画换她笑面如花\n[02:24.627]抵过这一生空牵挂\n[02:27.709]心若无怨爱恨也随她\n[02:30.740]天地大情路永无涯\n[02:34.371]只为她袖手天下\n[02:41.215]一生有爱何惧风飞沙\n[02:44.166]悲白发留不住芳华\n[02:47.954]抛去江山如画换她笑面如花\n[02:51.246]抵过这一生空牵挂\n[02:54.328]心若无怨爱恨也随她\n[02:57.437]天地大情路永无涯\n[03:00.937]只为她袖手天下\n[03:07.781]烽烟起寻爱似浪淘沙\n[03:14.207]遇见她如春水映梨花\n[03:20.921]挥剑断天涯相思轻放下\n[03:27.765]梦中我痴痴牵挂\n'
//     )
//   ],
//   playSongIndex: 0,
//   playMode: 1 // 0顺序，1随机，2单曲
// }

const initialState: IPlayerState = {
  currentSong: null,
  lyrics: [],
  lyricIndex: -1,
  mp3: '',
  playSongList: [
  ],
  playMp3List: [],
  playLyricsList: [],
  playSongIndex: -1,
  playMode: 1 // 0顺序，1随机，2单曲
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeCurrentSongAction(state, { payload }) {
      state.currentSong = payload
    },
    changeLyricsAction(state, { payload }) {
      state.lyrics = payload
    },
    changeLyricIndexAction(state, { payload }) {
      state.lyricIndex = payload
    },
    changePlaySongIndexAction(state, { payload }) {
      state.playSongIndex = payload
    },
    changePlayMp3Action(state, { payload }) {
      state.mp3 = payload
    },
    changePlaySongListAction(state, { payload }) {
      state.playSongList = payload
    },
    changePlayMp3ListAction(state, { payload }) {
      state.playMp3List = payload
    },
    changePlayLyricsListAction(state, { payload }) {
      state.playLyricsList = payload
    },
    changePlayModeAction(state, { payload }) {
      state.playMode = payload
    }
  }
})

export const {
  changeCurrentSongAction,
  changeLyricsAction,
  changeLyricIndexAction,
  changePlayMp3Action,
  changePlaySongIndexAction,
  changePlaySongListAction,
  changePlayMp3ListAction,
  changePlayLyricsListAction,
  changePlayModeAction
} = playerSlice.actions
export default playerSlice.reducer
