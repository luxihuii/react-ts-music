import { ISong } from '@/store/data-type'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSongDetail, getSongLyric, getSongMp3 } from '../service/player'
import { ILyric, parseLyric } from '@/utils/parse-lyric'
import { IRootState } from '@/store'

interface IThunkState {
  state: IRootState
}

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
    // 没有找到

    // 1.获取歌曲MP3
    getSongMp3(id).then((res) => {
      // 获取song的MP3地址
      if (!res.data.data[0].url.length) return
      const mp3 = res.data.data[0].url
      console.log('mp3' + mp3)

      // 更新列表
      const newPlayMp3List = [...playMp3List]
      newPlayMp3List.push(mp3)
      dispatch(changePlayMp3Action(mp3))
      dispatch(changePlayMp3ListAction(newPlayMp3List))
    })

    // 2.获取歌曲信息
    getSongDetail(id).then((res) => {
      // 获取song
      if (!res.data.songs.length) return
      const song = res.data.songs[0]

      // 将song放到currentSong中
      // 更新列表
      const newPlaySongList = [...playSongList]
      newPlaySongList.push(song)
      dispatch(changeCurrentSongAction(song))
      dispatch(changePlaySongListAction(newPlaySongList))
      dispatch(changePlaySongIndexAction(newPlaySongList.length - 1))
      console.log('song' + song.name)
    })

    // 3.获取歌词信息
    getSongLyric(id).then((res) => {
      if (!res.data.lrc.lyric.length) return
      // 获取歌词字符串
      const lyricString = res.data.lrc.lyric

      // 对歌词进行解析（一个个对象）
      const lyrics = parseLyric(lyricString)

      // 将lyrics放到列表中，更新列表
      const newPlayLyricsList = [...playLyricsList]
      newPlayLyricsList.push(lyrics)
      // 将歌词放到state中
      dispatch(changeLyricsAction(lyrics))
      dispatch(changePlayLyricsListAction(newPlayLyricsList))
    })
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

export const changeMusicAction = createAsyncThunk<void, boolean, IThunkState>(
  'changemusic',
  (isNext, { dispatch, getState }) => {
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

interface IPlayerState {
  currentSong: ISong
  lyrics: ILyric[]
  lyricIndex: number
  mp3: string
  playSongList: ISong[]
  playMp3List: string[]
  playLyricsList: ILyric[][]
  playSongIndex: number
  playMode: number
}

const initialState: IPlayerState = {
  currentSong: {
    name: '这世界那么多人',
    id: 1842025914,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 8926,
        name: '莫文蔚',
        tns: [],
        alias: []
      }
    ],
    alia: ['电影《我要我们在一起》主题曲'],
    pop: 100,
    st: 0,
    rt: '',
    fee: 1,
    v: 22,
    crbt: null,
    cf: '',
    al: {
      id: 126837556,
      name: '这世界那么多人',
      picUrl:
        'https://p1.music.126.net/LOTxqRjFm03VJEOHJbUqMw==/109951165944804127.jpg',
      tns: [],
      pic_str: '109951165944804127',
      pic: 109951165944804130
    },
    dt: 285884,
    h: {
      br: 320000,
      fid: 0,
      size: 11437497,
      vd: -24076,
      sr: 44100
    },
    m: {
      br: 192000,
      fid: 0,
      size: 6862515,
      vd: -21437,
      sr: 44100
    },
    l: {
      br: 128000,
      fid: 0,
      size: 4575025,
      vd: -19655,
      sr: 44100
    },
    sq: {
      br: 1352236,
      fid: 0,
      size: 48322850,
      vd: -23795,
      sr: 44100
    },
    hr: null,
    a: null,
    cd: '01',
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 1,
    s_id: 0,
    mark: 17179877376,
    originCoverType: 1,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 22,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    displayTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mv: 0,
    rtype: 0,
    rurl: null,
    mst: 9,
    cp: 7001,
    publishTime: 1620316800000
  },
  lyrics: [],
  lyricIndex: -1,
  mp3: 'http://m702.music.126.net/20250226093534/e247d8636f18fe401e7be2b52ade62bb/jd-musicrep-ts/42ea/a371/14e1/f0476bac336043fa6dbc007874e29f05.mp3?vuutv=dD/a1KJc6d8KxX0SU6MO09/aBunx5IIn5qZIEonDTSFIqDsoZVUxQOl910QjeIUnmpmT7RabHA9QxkA0zD9Rmg11DkdsrdbNipW7qC+2jGk=',
  playSongList: [
    {
      name: '这世界那么多人',
      id: 1842025914,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 8926,
          name: '莫文蔚',
          tns: [],
          alias: []
        }
      ],
      alia: ['电影《我要我们在一起》主题曲'],
      pop: 100,
      st: 0,
      rt: '',
      fee: 1,
      v: 22,
      crbt: null,
      cf: '',
      al: {
        id: 126837556,
        name: '这世界那么多人',
        picUrl:
          'https://p1.music.126.net/LOTxqRjFm03VJEOHJbUqMw==/109951165944804127.jpg',
        tns: [],
        pic_str: '109951165944804127',
        pic: 109951165944804130
      },
      dt: 285884,
      h: {
        br: 320000,
        fid: 0,
        size: 11437497,
        vd: -24076,
        sr: 44100
      },
      m: {
        br: 192000,
        fid: 0,
        size: 6862515,
        vd: -21437,
        sr: 44100
      },
      l: {
        br: 128000,
        fid: 0,
        size: 4575025,
        vd: -19655,
        sr: 44100
      },
      sq: {
        br: 1352236,
        fid: 0,
        size: 48322850,
        vd: -23795,
        sr: 44100
      },
      hr: null,
      a: null,
      cd: '01',
      no: 1,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 1,
      s_id: 0,
      mark: 17179877376,
      originCoverType: 1,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 22,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      displayTags: null,
      single: 0,
      noCopyrightRcmd: null,
      mv: 0,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 7001,
      publishTime: 1620316800000
    }
  ],
  playMp3List: [
    'http://m702.music.126.net/20250226093534/e247d8636f18fe401e7be2b52ade62bb/jd-musicrep-ts/42ea/a371/14e1/f0476bac336043fa6dbc007874e29f05.mp3?vuutv=dD/a1KJc6d8KxX0SU6MO09/aBunx5IIn5qZIEonDTSFIqDsoZVUxQOl910QjeIUnmpmT7RabHA9QxkA0zD9Rmg11DkdsrdbNipW7qC+2jGk='
  ],
  playLyricsList: [
    parseLyric(
      '[00:00.000] 作词 : 王海涛\n[00:01.000] 作曲 : Akiyama Sayuri\n[00:02.000] 编曲 : 彭飞\n[00:03.000] 制作人 : 荒井十一/彭飞\n[00:18.754]这世界有那么多人\n[00:25.191]人群里 敞着一扇门\n[00:31.197]我迷朦的眼睛里长存\n[00:38.007]初见你  蓝色清晨\n[00:45.179]这世界有那么多人\n[00:50.980]多幸运 我有个我们\n[00:57.976]这悠长命运中的晨昏\n[01:04.591]常让我 望远方出神\n[01:12.251]灰树叶飘转在池塘\n[01:18.179]看飞机轰的一声去远乡\n[01:24.683]光阴的长廊 脚步声叫嚷\n[01:31.230]灯一亮 无人的空荡\n[01:39.027]晚风中闪过 几帧从前啊\n[01:45.061]飞驰中旋转 已不见了吗\n[01:52.099]远光中走来 你一身晴朗\n[01:59.084]身旁那么多人 可世界不声 不响\n[02:11.842]这世界有那么多人\n[02:18.705]多幸运 我有个我们\n[02:25.067]这悠长命运中的晨昏\n[02:31.287]常让我 望远方出神\n[02:38.903]灰树叶飘转在池塘\n[02:45.324]看飞机轰的一声去远乡\n[02:51.286]光阴的长廊 脚步声叫嚷\n[02:57.931]灯一亮 无人的空荡\n[03:05.408]晚风中闪过 几帧从前啊\n[03:12.195]飞驰中旋转 已不见了吗\n[03:18.442]远光中走来 你一身晴朗\n[03:25.538]身旁那么多人 可世界不声 不响\n[03:35.622]笑声中浮过 几张旧模样\n[03:41.803]留在梦田里 永远不散场\n[03:48.489]暖光中醒来 好多话要讲\n[03:55.747]世界那么多人 可是它不声 不响\n[04:07.895]这世界有那么个人\n[04:14.348]活在我 飞扬的青春\n[04:21.439]在泪水里浸湿过的长吻\n[04:27.966]常让我 想啊想出神\n[04:40.884] 弦乐 : 彭飞\n[04:41.439] 吉他 : 胡洋\n[04:41.994] 曼陀林 : 彭飞\n[04:42.549] 鼓 : 荒井十一\n[04:43.104] 录音室 : Studio 21A\n[04:43.659] 录音师 : 倪涵文\n[04:44.214] 混音室 : Studio 21A\n[04:44.769] 混音师 : 周天澈\n[04:45.324] 母带工程师 : 周天澈\n'
    )
  ],
  playSongIndex: 0,
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
