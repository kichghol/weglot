const fs = require("fs");
const moment = require("moment")

const content = fs.readFileSync(process.cwd() + "/data/input1.txt");

const schedules = content.toString().split("\r\n")

function freeSchedule(schedules){
	
	schedules.sort()
	// console.log(schedules)
	return findSchedule(schedules)
}


function findSchedule(schedules) {
    const schedulesObject = {}
		// boucle pour trier par jour 
    for (const schedule of schedules) {
        const key = schedule.charAt(0)
        const value = schedule.substring(2)
        if (key in schedulesObject) {
            schedulesObject[key].push(value)
            
        }else{
        schedulesObject[key] = [value]
				}
    }
		// 
    for (const key in schedulesObject) {
        let [hourBegining,hourEnding] = parseHourInADay(schedulesObject[key])
        if (hourBegining) {
						// console.log(momentDate.format("YYYY-MM-DD hh:mm:ss A Z"));
					// console.log(key,hourBegining.format("HH:mm"),"-",hourEnding.format("HH:mm") );
					return	`${key} ${hourBegining.format("HH:mm")} - ${hourEnding.format("HH:mm")}` 		
        }
    }
}


function parseHourInADay(schedules) {
    let hourBegining= moment("08:00","HH:mm")
		let hourEnding=moment("08:59","HH:mm") 
	// pour chaque creneau on sépare le debut et la fin en fonction du '-'
    for (const schedule of schedules) {
        let [scheduleStart, scheduleEnd] = schedule.split("-")
				// mmoment 'module pour convertir '
				scheduleStart = moment(scheduleStart,"HH:mm") 
				scheduleEnd = moment(scheduleEnd,"HH:mm")
				// on verifie notre heure de debut et de fin est en dehors du creneau actuel 
        if(isTaken(hourBegining, scheduleStart,scheduleEnd) || isTaken(hourEnding ,scheduleStart, scheduleEnd))  {
					hourBegining = scheduleEnd.add(1,'minutes')
					hourEnding =  moment(hourBegining).add(59,'minutes')
        }
    }

    if (hourEnding.isBefore(moment ("17:59","HH:mm"))){
			return [hourBegining,hourEnding]
		}
    return [null,null]
}

function isTaken(hour, scheduleStart,scheduleEnd) {
	// isBefore fonction du module moment qui sert à verifier 
    return (hour.isBefore(scheduleEnd) && scheduleStart.isBefore(hour)  )
}


// freeSchedule(schedules);

module.exports = freeSchedule ;