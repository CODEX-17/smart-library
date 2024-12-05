
export const filterByDateRange = (data, dateStart, dateEnd) => {
    const start = new Date(dateStart)
    const end = new Date(dateEnd)

    const filteredData = data.filter((item) => {
        const itemDate = new Date(item.date_acquired);
        return itemDate >= start && itemDate <= end;
    })

    return filteredData;
}