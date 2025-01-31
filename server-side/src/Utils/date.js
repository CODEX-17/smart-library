module.exports = {
  getDueDate: () => {
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() + 3)

    const dueDate = currentDate.toISOString().split('T')[0]
    const dueTime = currentDate.toTimeString().split(' ')[0]

    return { dueDate, dueTime }
  },

 formatDate: (dateString) => {
    const date = new Date(dateString)
  
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return date.toLocaleDateString('en-US', options)
  }

}