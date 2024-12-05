

export const filterDataByGenre = (data, selectedGenre) => {
    const filter = data.filter((data) => data.genre.includes(selectedGenre))
    console.log(filter)
}