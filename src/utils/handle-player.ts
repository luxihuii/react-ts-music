export function formatTime(time: number | undefined) {
    if(time === undefined) return
  // 将毫秒转成秒
  const timeSeconds = time / 1000

  // 获取时间
  const minute = Math.floor(timeSeconds / 60)
  const second = Math.floor(timeSeconds) % 60

  // 格式化时间
  const formatMinute = String(minute).padStart(2, '0')
  const formatSecond = String(second).padStart(2, '0')

  return `${formatMinute}:${formatSecond}`
}
