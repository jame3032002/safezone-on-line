const axios = require('axios')

const { LINE_MESSAGING_API, LINE_HEADER } = require('../src/config')

async function reply ({ replyToken, message, type, altText = '' }) {
  let messages = [{ type: 'text', text: message }]
  if (type === 'flex') {
    messages = [{ type: 'flex', altText, contents: message }]
  }

  const response = await axios({
    method: 'post',
    url: `${LINE_MESSAGING_API}/reply`,
    data: {
      replyToken,
      messages
    },
    headers: LINE_HEADER
  })

  return response
}

module.exports = {
  reply
}
