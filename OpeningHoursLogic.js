function calculateOpeningHours(opening_hours, currentTime) {
    let weekdayNumber = currentTime.weekday()+1;
    let closingTime = undefined
    let openingTime = undefined
    let placeIsOpen = false
    const openingHoursYesterday = opening_hours[weekdayNumber - 1]
    // Closed yesterday?
    if (openingHoursYesterday !== undefined) {
        // Yesterday time still valid?
        openingHoursYesterday.forEach(period => {
            closingTime = period.close
            openingTime = period.open
            placeIsOpen = currentTime.isBetween(openingTime, closingTime)
            if (placeIsOpen) {
                return [openingTime, closingTime, placeIsOpen]
            }
        })        
    }

    // Closed today?
    if (opening_hours[weekdayNumber] === undefined) {
        const nextOpenDay = getNextOpenDay(opening_hours, weekdayNumber)
        closingTime = nextOpenDay.close
        openingTime = nextOpenDay.open
        placeIsOpen = currentTime.isBetween(openingTime, closingTime)
        return [openingTime, closingTime, placeIsOpen]
    }

    const openingHoursToday = opening_hours[weekdayNumber]
    openingHoursToday.forEach(period => {
        closingTime = period.close
        openingTime = period.open
        placeIsOpen = currentTime.isBetween(openingTime, closingTime)
        if (placeIsOpen) {
            return [openingTime, closingTime, placeIsOpen];
        }
    }) 
    return [openingTime, closingTime, placeIsOpen];
}

var isServerSide = true
try{
    var dummy = window !== undefined
    isServerSide = false
}catch (e) {
    // Do nothing...
}

if (isServerSide){
  module.exports = { calculateOpeningHours };
}
