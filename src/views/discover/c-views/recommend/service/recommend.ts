import hyRequest from '@/service'

export function getBanner() {
  return hyRequest.get({
    url: '/banner'
  })
}

export function getHotRecommend(limit = 8) {
  return hyRequest.get({
    url: '/personalized',
    params: {
      limit
    }
  })
}

export function getNewAlbum() {
  return hyRequest.get({
    url: '/album/newest'
  })
}

export function getPlayListDetail(id: number, limit = 10) {
  return hyRequest.get({
    url: '/playlist/track/all',
    params: {
      id,
      limit
    }
  })
}

export function getPlayList() {
  return hyRequest.get({
    url: '/toplist'
  })
}

export function getArtistList(limit = 30) {
    return hyRequest.get({
      url: '/top/artists',
      params: {
        limit
      }
    })
}

export function getRadioList(limit = 30) {
    return hyRequest.get({
      url: '/dj/toplist/popular',
      params: {
        limit
      }
    })
}