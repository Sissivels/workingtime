
function daysInMonth(month, year){
    return new Date(year, month,0).getDate()
}
function schreibeKopf(persnr, jahr, monat){
    console.log("Mitarbeiter ", persnr, "Monat: ",monat, "Jahr: ", jahr)

}
function schreibeFuss(anwMonat){
    console.log("Summe Anwesenheit: "+ anwMonat)
}

function schreibeZeile(tag, hour1, min1, hour2, min2, anwTag, bemerkung){
     console.log( tag," ",hour1,":", min1,"-- ",hour2,":", min2," ",anwTag," ",bemerkung);
}

function makeRegisteredDays(zeiten){
    /* extracts the days registered in the array zeiten. parm: array zeiten returns: array of days */
    let days = [];
    for (let eintrag in zeiten) {
        days.push(zeiten[eintrag][0])
    }return days
}

class entry {
    constructor(day,hour,minute){
        this.day = day;
        this.hour = hour;
        this.minute = minute;
    }
}

function makeObject(zeiten,objectArray){
    for(let item in zeiten){
        // console.log(zeiten[item][0], zeiten[item][1],zeiten[item][2]);
        let variable = "" + item[0];
        variable = new entry(zeiten[item][0], zeiten[item][1],zeiten[item][2]);
        objectArray.push(variable)
    }
}

function timedifference(hour1, minute1 ,hour2 ,minute2){
    let day1_ = new Date(2021,10,10, hour1, minute1);
    let day2_= new Date(2021,10,10, hour2, minute2);
    let resultworked = Math.abs(day2_ - day1_);
    let total_in_minutes = (Math.floor((resultworked/1000)/60));
    let total_in_hours = (Math.floor(resultworked/1000/60/60));
    let worked_minutes = total_in_minutes - (total_in_hours*60);
    return (total_in_hours) + " : " + worked_minutes ;

}

//================================ variable declaration ================================//



function erzeugeListe(zeiten,monat,jahr,persnr) {

    let days = makeRegisteredDays(zeiten); // all the days that are in record
    let days_unique = Array.from(new Set(days));   // days in record without repetition
    let obj = [];  // to collect all objects
    let perDay;
    let totalDays = daysInMonth(monat, jahr);  // 31

    makeObject(zeiten, obj)  //calling function make obj

//================================       testing        ================================//
//console.log(obj);
//console.log(days);
//console.log(days_unique)

//console.log (obj.filter(entry => entry.day === 2))


//================================     function main       ================================//
    schreibeKopf(persnr,jahr,monat);

    for (let i = 1; i < totalDays+1; i++) {
        if (days_unique.includes(i)) {


            for (let i of days_unique) {                                // gives ----> 2,3,6,7

                perDay = obj.filter(entry => entry.day === i);   //if i = 2 then it will filter all objects that have a 2 as a day
                                                                 // attribute.

                //console.log("entries per day: ", perDay)    // test/check

                counter = perDay.length;   // gives the length of the new array that comes from the filter.

                if (counter === 2) {
                    //console.log("--------- Zwei Buchungen  ------------ ");

                    let day1 = perDay[0];
                    //console.log("day1: ", day1)
                    let day2 = perDay[1];
                    //console.log("day2: ", day2)

                    let anwtag = timedifference(day1.hour, day1.minute, day2.hour, day2.minute);
                    //console.log("Anwesenheit =  ", anwtag);


                    schreibeZeile(day1.day, day1.hour, day1.minute, day2.hour, day2.minute, anwtag, "");

                } else if (counter === 1) {
                    //console.log("--------- Buchung fehlt -------------");
                    let day1 = perDay[0];
                    //console.log("day1: ", day1);

                    let anwtag = timedifference(0, 0, 0, 0)  //0;
                    //console.log("Anwesenheit =  ", anwtag);
                    schreibeZeile(day1.day, day1.hour, day1.minute, "", "", anwtag, "Buchung fehlt")

                }
            }


        } else {
            // console.log("no record")

            console.log(i, ": --Keine Buchung --" );
        }

    }
}



//================================ driver code ================================//
let zeiten  = [
    [2,8,10 ] ,
    [2,17,20] ,
    [3,7,50 ] ,
    [6,8,0],
    [6,16,0],
    [7,16,30]
];
console.log(erzeugeListe(zeiten,10,2021,123456))
