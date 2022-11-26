// Clase que se encarga de manejar las fechas
// Por ejemplo, cuando haya que comparar dos fechas es más fácil

export default class Date extends Phaser.GameObjects.BitmapText{
    /*
    * Constructor de Date
    * @param {Phaser.Scene} scene Escena a la que pertenece Start
    * @param {number} x Coordenada X
    * @param {number} y Coordenada Y
    * @param {number} day
    * @param {number} month
    * @param {number} year
    */
    constructor(scene, x, y, day, month, year){
        super(scene, x, y, 'documentFont', "");

        this._day = day;
        this._month = month;
        this._year = year;

        this.setFontSize('25px')
        this.setOrigin(0.5, 0.5);
        this.setText(this.Written_Date());
    }

    CheckDate() {
        return(
            (this._day > 0 && this._day < 32) && 
            (this._month > 0 && this._month < 13) && 
            (this._year < -217 && this._year > - 247))
    }

    Written_Date(){
        let written_Date = "";
        if(this._day < 10){
            written_Date += "0";
        }
        written_Date += this._day + "/";
        if(this._month < 10){
            written_Date += "0";
        }
        written_Date += this._month + "/" + this._year;
        return written_Date;
    }

    Getday(){return this._day}
    Getmonth(){return this._month}
    Getyear(){return this._year}
}