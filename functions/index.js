const functions = require('firebase-functions')
const GeoPoint = require('geopoint')

const { reply } = require('./helpers/line')
const region = 'asia-southeast1'

exports.linewebhook = functions.region(region).https.onRequest((req, res) => {
  const EXPLOSION_LAT_LONG = { lat: 13.6727366, long: 100.7125608 }
  const event = req.body.events[0]
  const isMessage = event?.type === 'message'
  const isLocation = event?.message?.type === 'location'
  const replyToken = event?.replyToken
  let replyMessage

  if (isMessage) {
    if (isLocation) {
      const { latitude, longitude } = event.message
      const explosion = new GeoPoint(EXPLOSION_LAT_LONG.lat, EXPLOSION_LAT_LONG.long)
      const myLocation = new GeoPoint(latitude, longitude)
      const distance = explosion.distanceTo(myLocation, true)

      const isDanger = distance < 5
      const isHighRisk = distance < 7.5
      const isLowRisk = distance < 10
      let message = ''

      if (isDanger) {
        message = 'คุณอยู่ในพื้นที่อพยพ'
      } else if (isHighRisk) {
        message = 'คุณอยู่ในพื้นที่เฝ้าระวังสูง'
      } else if (isLowRisk) {
        message = 'คุณอยู่ในพื้นที่เฝ้าระวังต่ำ'
      }

      replyMessage = `คุณอยู่ห่างจากจุดเกิดเหตุ: ${distance.toFixed(2)} กิโลเมตร ${message}`
    } else {
      replyMessage = 'ถ้าหากต้องการตรวจสอบระยะห่างจากจุดเกิดเหตุกรุณาส่ง Location ของคุณที่ต้องการตรวจสอบ'
    }

    reply({ replyToken, message: replyMessage })
  }

  return res.status(200).send('OK')
})
