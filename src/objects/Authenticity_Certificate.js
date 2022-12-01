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
	 * @param {string} sExpirationD - expiration date
	 * @param {string} sPhoto - statues' photo
	 * @param {string} sWear - statues' deterioration state
	 * @param {string} sSculptor - statues' sculptor/creator
	 */
export default class Authenticity_Certificate extends Documents{
    //Authenticity certificate's creator
    constructor(scene, x, y, sName, sCreationD, sSerialNumber, sExpirationD, sPhoto){
        super(scene, x, y, 'auth_cert');
        this._sName = sName;
        this._sCreationD = sCreationD;
        this._sSerialNumber = sSerialNumber;
        this._sExpirationD = sExpirationD;
        this._sPhoto = sPhoto;
		this.fontsize = 11;
		
		//centro: 73, 86
		//color texto: #896789
		//texto del nombre
		this._sNametext = this.scene.add.bitmapText(-58, -35, 'documentFont', this._sName, this.fontsize);
		this._sNametext.setOrigin(0, 0);
		this._sNametext.setFontSize(this.fontsize);
		this.add(this._sNametext);

		//texto del día de creacion
		this.fechaCrea = new Date(scene, -58, -14, this._sCreationD.d, this._sCreationD.m, this._sCreationD.y);
		this.fechaCrea.setOrigin(0, 0);
		this.fechaCrea.setFontSize(this.fontsize);
		this.add(this.fechaCrea);

		//texto numero de serie
		this._sSerialNumbertext = this.scene.add.bitmapText(-58, 9, 'documentFont', this._sSerialNumber);
		this._sSerialNumbertext.setOrigin(0, 0);
		this._sSerialNumbertext.setFontSize(this.fontsize);
		this.add(this._sSerialNumbertext);

		//texto dia de expiracion
		this.fechaExpi = new Date(scene, -58, 30, this._sExpirationD.d, this._sExpirationD.m, this._sExpirationD.y);
		this.fechaExpi.setOrigin(0, 0);
		this.fechaExpi.setFontSize(this.fontsize);
		this.add(this.fechaExpi);

		//foto de la estatua
		let photo = this.scene.add.sprite(36, 14.4, this._sPhoto);
		photo.setOrigin(0.5, 0.5)
		photo.setScale(0.12);
		this.add(photo);

    }

}