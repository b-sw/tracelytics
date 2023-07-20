import dayjs, { Dayjs } from 'dayjs';

export const getMonthDays = (date: Dayjs): Dayjs[] => {
    // in dayjs week starts from sunday and is 0 indexed
    const firstDayOffsets: { [key: number]: number } = { 0: 6, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5 };
    const pageDaysCount = 42;
    const monthStart = dayjs(date).startOf('month');
    const monthStartDay = monthStart.day();

    let pageDay = monthStart.subtract(firstDayOffsets[monthStartDay], 'day');

    const days = new Array(pageDaysCount);
    for (let i = 0; i < pageDaysCount; i++) {
        days[i] = pageDay;
        pageDay = pageDay.add(1, 'day');
    }

    return days;
};
