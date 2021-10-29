const fs = require("fs");
const moment = require("moment")
const content = fs.readFileSync(process.cwd() + "/data/input5.txt");
const schedules = content.toString().split("\r\n")

function freeSchedule(schedules){
	schedules.sort()
	return findSchedule(schedules)
}

function findSchedule(schedules) {
  const schedulesObject = {}
		
    for (const schedule of schedules) {
        const key = schedule.charAt(0)
        const value = schedule.substring(2)

			if (key in schedulesObject) {
            schedulesObject[key].push(value)
            
			}else{
        schedulesObject[key] = [value]
			}
    }

    for (const key in schedulesObject) {
			let [hourBegining,hourEnding] = parseHourInADay(schedulesObject[key])

			if (hourBegining) {
				return	`${key} ${hourBegining.format("HH:mm")}-${hourEnding.format("HH:mm")}` 		
			}
    }
}

function parseHourInADay(schedules) {
    let hourBegining= moment("08:00","HH:mm")
		let hourEnding=moment("08:59","HH:mm") 

    for (const schedule of schedules) {
        let [scheduleStart, scheduleEnd] = schedule.split("-")
				scheduleStart = moment(scheduleStart,"HH:mm") 
				scheduleEnd = moment(scheduleEnd,"HH:mm")

			if(isTaken(hourBegining, scheduleStart,scheduleEnd) || isTaken(hourEnding ,scheduleStart, scheduleEnd))  {
				hourBegining = scheduleEnd.add(1,'minute')
				hourEnding =  moment(hourBegining).add(59,'minutes')	
			}
    }

    if (hourEnding.isBefore(moment ("17:59","HH:mm"))){
			return [hourBegining,hourEnding]
		}

    return [null,null]
}

function isTaken(hour, scheduleStart,scheduleEnd) {
    return (hour.isSameOrBefore(scheduleEnd) && scheduleStart.isBefore(hour)  )
}


// console.log(freeSchedule(schedules));

module.exports = freeSchedule ;