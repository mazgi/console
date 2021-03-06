import { createContainer } from 'unstated-next'
import { useState } from 'react'
import util from 'util'

const useNotificationState = (): {
  message: () => string | null
  send: (string) => void
  reset: () => void
} => {
  const [message, setMessage] = useState(null)
  const reset = (): void => {
    setMessage(null)
  }
  const send = (msgObj?: string | Error | object): void => {
    if (!msgObj) {
      return
    }

    let msg
    if (msgObj instanceof String) {
      msg = msgObj
    } else if (msgObj instanceof Error) {
      msg = msgObj.message
    } else {
      msg = util.inspect(msgObj)
    }
    setMessage(msg)
  }
  return { message, send, reset }
}

export const notificationState = createContainer(useNotificationState)
