const parseExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

export interface ILyric {
  time: number
  content: string
}

export function parseLyric(lyricString: string) {
    // 歌词分行获取
  const lineStrings: string[] = lyricString.split('\n')

  // 歌词分行解析
  const lyrics: ILyric[] = []
  for (const line of lineStrings) {
    if (line) {
      const result = parseExp.exec(line)
      if (!result) continue
      // 获取每一句歌词时间
      const time1 = Number(result[1]) * 60 * 1000
      const time2 = Number(result[2]) * 1000
      const time3 =
        result[3].length === 3 ? Number(result[3]) : Number(result[3]) * 10
      const time = time1 + time2 + time3
      // 获取每句歌词文本
      const content = line.replace(parseExp, '').trim()
      
      const lineObj = { time, content }
      lyrics.push(lineObj)
    }
  }
  return lyrics
}
