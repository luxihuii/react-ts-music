export interface ISongItem {
  id: number
  type: number
  name: string
  copywriter: string
  picUrl: string
  canDislike: boolean
  trackNumberUpdateTime: number
  playCount: number
  trackCount: number
  highQuality: boolean
  alg: string
}

export interface IAlbum {
  name: string
  id: number
  type: string
  size: number
  picId: number
  blurPicUrl: string
  companyId: number
  pic: number
  picUrl: string
  publishTime: number
  description: string
  tags: string
  company: string
  briefDesc: string
  artist: Artist
}
interface Artist {
  name: string
  id: number
  picId: number
  img1v1Id: number
  briefDesc: string
  picUrl: string
  img1v1Url: string
  albumSize: number
  alias: string[]
  trans: string
  musicSize: number
  topicPerson: number
  picId_str: string
  img1v1Id_str: string
}

export interface ISong {
  name?: string
  id?: number
  pst?: number
  t?: number
  ar?: Ar[]
  alia?: any[]
  pop?: number
  st?: number
  rt?: string
  fee?: number
  v?: number
  crbt?: any
  cf?: string
  al?: Al
  dt?: number
  h?: H
  m?: H
  l?: H
  sq?: H
  hr?: any
  a?: any
  cd?: string
  no?: number
  rtUrl?: any
  ftype?: number
  rtUrls?: any[]
  djId?: number
  copyright?: number
  s_id?: number
  mark?: number
  originCoverType?: number
  originSongSimpleData?: any
  tagPicList?: any
  resourceState: boolean
  version: number
  songJumpInfo?: any
  entertainmentTags?: any
  awardTags?: any
  displayTags?: any
  single?: number
  noCopyrightRcmd?: any
  mv?: number
  rtype?: number
  rurl?: any
  mst?: number
  cp?: number
  publishTime?: number
  tns?: string[]
}
interface H {
  br: number
  fid: number
  size: number
  vd: number
  sr: number
}
interface Al {
  id: number
  name: string
  picUrl: string
  tns?: any[]
  pic_str?: string
  pic: number
}
interface Ar {
  id: number
  name: string
  tns: any[]
  alias: any[]
}

export interface IPlayList {
  subscribers: any[]
  subscribed?: any
  creator?: any
  artists?: any
  tracks?: any
  updateFrequency: string
  backgroundCoverId: number
  backgroundCoverUrl?: any
  titleImage: number
  coverText?: any
  titleImageUrl?: any
  coverImageUrl?: any
  iconImageUrl?: any
  englishTitle?: any
  opRecommend: boolean
  recommendInfo?: any
  socialPlaylistCover?: any
  tsSongCount: number
  algType?: any
  highQuality: boolean
  specialType: number
  coverImgId: number
  updateTime: number
  newImported: boolean
  anonimous: boolean
  coverImgUrl: string
  trackCount: number
  commentThreadId: string
  trackUpdateTime: number
  totalDuration: number
  playCount: number
  trackNumberUpdateTime: number
  privacy: number
  adType: number
  subscribedCount: number
  cloudTrackCount: number
  createTime: number
  ordered: boolean
  description: string
  status: number
  tags: any[]
  userId: number
  name: string
  id: number
  coverImgId_str: string
  ToplistType: string
}

export interface IArtist {
  name: string
  id: number
  picId: number
  img1v1Id: number
  briefDesc: string
  picUrl: string
  img1v1Url: string
  albumSize: number
  alias: string[]
  trans: string
  musicSize: number
  topicPerson: number
  showPrivateMsg?: any
  isSubed?: any
  accountId?: any
  picId_str: string
  img1v1Id_str: string
  transNames?: any
  followed: boolean
  mvSize?: any
  publishTime?: any
  identifyTag?: any
  alg?: any
  fansCount: number
}

export interface IRadio {
  id: number
  rank: number
  lastRank: number
  score: number
  nickName: string
  avatarUrl: string
  userType: number
  userFollowedCount: number
  mainAuthDesc: string
  liveStatus: number
  liveType: number
  liveId: number
  avatarDetail: AvatarDetail
  roomNo: number
}
interface AvatarDetail {
  userType: number
  identityLevel: number
  identityIconUrl: string
}