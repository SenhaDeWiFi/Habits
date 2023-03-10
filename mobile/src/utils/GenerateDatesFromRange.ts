import dayjs from "dayjs";

export function GenerateDatesFromRange(){
    const firstDayOfTheYear = dayjs().startOf('year')
    const today = new Date()

    let dates = []
    let compareDate = firstDayOfTheYear

    while (compareDate.isBefore(today)) {
        dates.push(compareDate.toDate())
        compareDate = compareDate.add(1, 'day')
    }

    return dates
}