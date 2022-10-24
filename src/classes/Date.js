export default class Date{
    constructor(day, month, year){
        this._day = day;
        this._month = month;
        this._year = year;
    }

    CorrectCreationDate(date) {
        return((date._day > 0 && date._day < 32) && (date._month > 0 && date._month < 13) && (date._year < -217 && date._year > - 247))
    }
}