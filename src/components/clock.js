/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { useState, useEffect } from "react"

export const Clock = () => {
  const [time, setTime] = useState("")

  const formatTime = i => {
    return i < 10 ? "0" + i : i
  }

  useEffect(() => {
    const tickOnce = () => {
      const today = new Date()
      const h = today.getHours()
      const m = formatTime(today.getMinutes())
      const s = formatTime(today.getSeconds())
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
