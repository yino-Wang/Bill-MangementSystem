import { useState } from 'react'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
dayjs.extend(isToday)

export const useDate = () => {
    const[date,setDate] = useState(new Date())
    const dayjsDate = dayjs(date)
    const[visible,setVisible] = useState(false)
    const dateText = dayjsDate.isToday() ? 'Today' : dayjsDate.format('YYYY/MM/DD')

    const onShowDate = () => setVisible(true)
    const onHideDate = () => setVisible(false)
    /* 当用户选择一个新日期的时候 这个函数就会被触发，把选中的日期保存下来，更新你的 date 状态*/
    const onDateChange = (val) => setDate(val)

    return {
        date: dayjsDate,
        dateText,
        visible,
        onShowDate,
        onHideDate,
        onDateChange,
      }
}