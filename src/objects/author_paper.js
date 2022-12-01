import Documents from './documents.js'
import Date from "../auxs/date.js";

	/**
	 * Documents constructor
	 * @param {Scene} scene - the GO's scene
	 * @param {number} x - coordinate x
	 * @param {number} y - coordinate y
	 * @param {string} sName - statues' name 
	 * @param {string} sCreationD - creation date
	 * @param {string} sSerialNumber - serial number
	 */
export default class Author_Paper extends Documents{
    //Authenticity certificate's creator
    constructor(scene, x, y, sName, sSerialNumber, sExpirationD, sseal){
        super(scene, x, y, 'auth_paper');
        this._sName = sName;
        this._sSerialNumber = sSerialNumber;
        this._sExpirationD = sExpirationD;
		this.fontsize = 9;
		
		//centro: 73, 86
		//color texto: #896789
		//texto del nombre
		this._sNametext = this.scene.add.bitmapText(-36, -17, 'documentFont', this._sName, this.fontsize);
		this._sNametext.setOrigin(0, 0);
		this._sNametext.setFontSize(this.fontsize);
		this.add(this._sNametext);

		//texto numero de serie
		this._sSerialNumbertext = this.scene.add.bitmapText(-36, 1, 'documentFont', this._sSerialNumber);
		this._sSerialNumbertext.setOrigin(0, 0);
		this._sSerialNumbertext.setFontSize(this.fontsize);
		this.add(this._sSerialNumbertext);

		//texto dia de expiracion
		this.fechaExpi = new Date(scene, -36, 19, this._sExpirationD.d, this._sExpirationD.m, this._sExpirationD.y);
		this.fechaExpi.setOrigin(0, 0);
		this.fechaExpi.setFontSize(this.fontsize);
		this.add(this.fechaExpi);

    }

}