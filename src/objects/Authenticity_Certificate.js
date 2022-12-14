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
    constructor(scene, x, y, sName, sExpirationD, sPhoto, sCreationD, sSerialNumber){
        super(scene, x, y, 'auth_cert');
        this._sName = sName;
        this._sExpirationD = sExpirationD;
        this._sPhoto = sPhoto;
        this._sCreationD = sCreationD;
        this._sSerialNumber = sSerialNumber;
		this.fontsize = 11;
		
		//centro: 73, 86
		//color texto: #896789
		//texto del nombre
		this._sNametext = this.scene.add.bitmapText(-58, -35, 'documentFont', this._sName, this.fontsize);
		this._sNametext.setOrigin(0, 0);
		this._sNametext.setFontSize(this.fontsize);
		this.interactiveGroup.add(this._sNametext);
		this.add(this._sNametext);

		//texto del día de creacion
		this.fechaCrea = new Date(scene, -58, -14, this._sCreationD.day, this._sCreationD.month, this._sCreationD.year);
		this.fechaCrea.setOrigin(0, 0);
		this.fechaCrea.setFontSize(this.fontsize);
		this.interactiveGroup.add(this.fechaCrea);
		this.add(this.fechaCrea);

		//texto numero de serie
		this._sSerialNumbertext = this.scene.add.bitmapText(-58, 9, 'documentFont', this._sSerialNumber);
		this._sSerialNumbertext.setOrigin(0, 0);
		this._sSerialNumbertext.setFontSize(this.fontsize);
		this.interactiveGroup.add(this._sSerialNumbertext);
		this.add(this._sSerialNumbertext);

		//texto dia de expiracion
		this.fechaExpi = new Date(scene, -58, 30, this._sExpirationD.day, this._sExpirationD.month, this._sExpirationD.year);
		this.fechaExpi.setOrigin(0, 0);
		this.fechaExpi.setFontSize(this.fontsize);
		this.interactiveGroup.add(this.fechaExpi);
		this.add(this.fechaExpi);

		//foto de la estatua
		this.photo = this.scene.add.sprite(36, 14.4, this._sPhoto);
		this.photo.setOrigin(0.5, 0.5)
		this.photo.setScale(0.12);
		this.interactiveGroup.add(this.photo);
		this.add(this.photo);

		this.makeChildsInteractive();

    }

}