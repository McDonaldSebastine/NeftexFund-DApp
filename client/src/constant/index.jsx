import moment from 'moment'
import { createGlobalState } from 'react-hooks-global-state'

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState ({
  createMethod: 'scale-0',
  reviewMethod: 'scale-0',
  supportMethod: 'scale-0',
  terminateMethod: 'scale-0',
  accountConnected: "",
  campaigns: [],
  campaign: null,
  counts: null,
  supporters: [],
  
})

const shorten = (text, begletts, endletts, maxLength) => {
  if (text.length > maxLength) {
    let start = text.substring(0, begletts)
    let end = text.substring(text.length - endletts, text.length)
    while (start.length + end.length < maxLength) {
      start = start + '.'
    }
    return start + end
  }
  return text
}

const daysRemaining = (days) => {
  const todaysdate = moment()
  days = Number((days + '000').slice(0))
  days = moment(days).format('YYYY-MM-DD')
  days = moment(days)
  days = days.diff(todaysdate, 'days')
  return days == 1 ? '1 day' : days + ' days'
}

export {
  useGlobalState,
  setGlobalState,
  getGlobalState,
  shorten,
  daysRemaining,
}
