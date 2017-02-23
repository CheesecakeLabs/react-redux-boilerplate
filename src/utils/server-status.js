import os from 'os'

const EVERY_MINUTE = 60 * 1000
const mb = (b) => Math.round(b / 1024 / 1024)
const appStatus = () => {
  const { rss, heapTotal, heapUsed } = process.memoryUsage()
  console.info(`MEMORY STATUS: rss: ${mb(rss)}mb, heapTotal: ${mb(heapTotal)}mb, heapUsed: ${mb(heapUsed)}mb / OS FREE: ${mb(os.freemem())}mb TOTAL: ${mb(os.totalmem())}mb`)
}
setInterval(appStatus, EVERY_MINUTE)
