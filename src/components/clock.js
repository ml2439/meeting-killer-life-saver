/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { useState, useEffect } from "react"
import { twoDigitTime } from "../utils/massager"

export const Clock = () => {
  const [time, setTime] = useState("")

  useEffect(() => {
    const tickOnce = () => {
      const today = new Date()
      const h = today.getHours()
      const m = twoDigitTime(today.getMinutes())
      const s = twoDigitTime(today.getSeconds())
      setTime(h + ":" + m + ":" + s)
    }
    const interval = setInterval(tickOnce, 500)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div
      css={css`
        font-size: 2em;
      `}
    >
      {time}
    </div>
  )
}
