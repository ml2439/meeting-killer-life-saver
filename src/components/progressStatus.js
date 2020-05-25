/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useState, useEffect } from "react"
import moment from "moment"
import { Progress } from "antd"
import "antd/dist/antd.css"
import { Clock } from "./clock"
import { ContainerVertical } from "./containerVertical"

const DURATION = moment.duration(15, "minutes").asSeconds()
const START = moment().set({
  hour: 20,
  minute: 55,
  second: 0,
})
const GREEN = "#48a9a6"
const ORANGE = "#FC9E4F"
const RED = "#FF4D4F"

export const ProgressStatus = () => {
  const [percent, setPercent] = useState(0)
  const [color, setColor] = useState(GREEN)

  useEffect(() => {
    const increment = () => {
      const now = moment()
      const diff = moment.duration(now.diff(START)).asSeconds()
      const percentage = Math.floor((diff / DURATION) * 100)

      if (percentage > 90) {
        setColor(RED)
      } else if (percentage > 70) {
        setColor(ORANGE)
      } else {
        setColor(GREEN)
      }

      setPercent(percentage)
    }

    const interval = setInterval(increment, 500)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <ContainerVertical>
      <Progress
        type="circle"
        width={180}
        percent={percent}
        strokeColor={color}
        format={percent => (percent === 100 ? `Time's up` : `${percent}%`)}
      />
      <Clock />
    </ContainerVertical>
  )
}
