export function formatCount(count: number) {
  if (count > 100000) {
    return Math.floor(count / 10000) + '万'
  } else {
    return count
  }
}

export function getImageSize(
  imageUrl: string | null | undefined,
  width: number,
  height: number = width
) {
    if(typeof imageUrl !== 'string') return 'https://s4.music.126.net/style/web2/img/default/default_album.jpg'
  return imageUrl + `?param=${width}y${height}`
}