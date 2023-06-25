import dayjs from 'dayjs'
import * as _ from 'lodash'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

export const formatDate = (date?: number | undefined) => {
    if (date) {
        return dayjs(date).format('YYYY-MM-DD')
    }
}

export const formatDateTime = (date?: number | undefined) => {
    if (date) {
        return dayjs(date).format('YYYY-MM-DD HH:mm')
    }
}

export const format = (date: number, format: string) => {
    if (date) {
        return dayjs(date).format(format)
    }
}

export const fromNow = (date: number) => {
    if (!date) {
        return ''
    }
    return dayjs(date).fromNow()
}

export const chatsLine = (date: number) => {
    if (date) {
        let diffMinute = dayjs().diff(date, 'minute')
        if (diffMinute < 5) {
            return '刚刚'
        }
        if (dayjs().isSame(date, 'date')) {
            return dayjs(date).format('HH:mm')
        }
        return dayjs(date).format('YYYY-MM-DD HH:mm')
    }
}

export const dateParse = (date: any) => {
    if (!date) {
        return null
    }
    let res = dayjs()
    if (_.isArray(date)) {
        _.forEach(date, (v, i) => {
            switch (i) {
                case 0:
                    res = res.year(v)
                    break
                case 1:
                    res = res.month(v - 1)
                    break
                case 2:
                    res = res.date(v)
                    break
                default:
                    break
            }
        })
    }
    return res
}
