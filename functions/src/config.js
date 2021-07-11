const ACCESS_TOKEN = 'CHANNEL_ACCESS_TOKEN'
const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message'
const LINE_HEADER = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${ACCESS_TOKEN}`
}

module.exports = {
  LINE_HEADER,
  LINE_MESSAGING_API
}
