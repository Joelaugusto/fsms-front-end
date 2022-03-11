

const timeAgo: Function = (date: Date): string => {
  const now: number = new Date().getTime()
  const dateTime: number = new Date(date).getTime()

  const diference: number = now - dateTime

  if (diference < 1000 * 60) {
    return 'há ' + Math.floor((now - dateTime) / 1000) + ' segundos atrás'
  } else if (diference < 1000 * 60 * 60) {
    return 'há ' + Math.floor((now - dateTime) / (1000 * 60)) + ' minutos atrás'
  } else if (diference < 1000 * 60 * 60 * 24) {
    return ('há ' + Math.floor((now - dateTime) / (1000 * 60 * 60)) + ' horas atrás')
  } else if (diference < 1000 * 60 * 60 * 24 * 30) {
    return ('há ' + Math.floor((now - dateTime) / (1000 * 60 * 60 * 24)) + ' dias atrás')
  } else if (diference < 1000 * 60 * 60 * 24 * 30 * 12) {
    return ('há ' + Math.floor((now - dateTime) / (1000 * 60 * 60 * 24 * 30)) + ' meses atrás')
  } else {
    return ('há ' + Math.floor((now - dateTime) / (1000 * 60 * 60 * 24 * 30 * 12)) + ' anos atrás')
  }
} 



const dateUtil = {
  timeAgo
}


export default dateUtil;