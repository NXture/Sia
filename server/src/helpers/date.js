import moment from 'moment-timezone'

const date = { }

date.dateTime = () => moment().tz(date.timeZone()).format()

date.timeZone = () => {
  let timeZone = moment.tz.guess()

  if (process.env.SIA_TIME_ZONE && !!moment.tz.zone(process.env.SIA_TIME_ZONE)) {
    timeZone = process.env.SIA_TIME_ZONE
  }

  return timeZone
}

export default date
