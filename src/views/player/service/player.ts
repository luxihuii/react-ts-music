import hyRequest from '@/service'

export function getSongDetail(ids: number) {
  return hyRequest.get({
    url: '/song/detail',
    params: {
      ids
    }
  })
}

export function getSongLyric(id: number) {
  return hyRequest.get({
    url: '/lyric',
    params: {
      id
    }
  })
}

export function getSongMp3(id: number, realIP = '123.456.789.123') {
  return hyRequest.get({
    url: '/song/url',
    params: {
      id,
      realIP
    }
  })
}
