import Documents from './documents.js'
import Date from "../auxs/Date.js";

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
    constructor(scene, x, y, sName, sCreationD, sSerialNumber, sExpirationD, sPhoto, sWear, sSculptor){
        super(scene, x, y, 'auth_cert');
        this._sName = sName;
        this._sCreationD = sCreationD;
        this._sSerialNumber = sSerialNumber;
        this._sExpirationD = sExpirationD;
        this._sPhoto = sPhoto;
		
		//centro: 73, 86
		//color texto: #896789
		//texto del nombre
		let _sNametext = this.scene.add.text(-58, -37, this._sName);
		_sNametext.setOrigin(0, 0);
		_sNametext.setAlign('center');
		_sNametext.setFill('#896789');
		_sNametext.setFontSize(11);
		this.add(_sNametext);

		//texto del día de creacion
		let fechaCrea = new Date(scene, -58, -16, this._sCreationD.d, this._sCreationD.m, this._sCreationD.y);
		fechaCrea.setOrigin(0, 0);
		fechaCrea.setFill('#896789');
		fechaCrea.setFontSize(11);
		this.add(fechaCrea);

		//texto numero de serie
		let _sSerialNumbertext = this.scene.add.text(-58, 7, this._sSerialNumber);
		_sSerialNumbertext.setOrigin(0, 0);
		_sSerialNumbertext.setAlign('center');
		_sSerialNumbertext.setFill('#896789');
		_sSerialNumbertext.setFontSize(11);
		this.add(_sSerialNumbertext);

		//texto dia de expiracion
		let fechaExpi = new Date(scene, -58, 28, this._sExpirationD.d, this._sExpirationD.m, this._sExpirationD.y);
		fechaExpi.setOrigin(0, 0);
		fechaExpi.setFill('#896789');
		fechaExpi.setFontSize(11);
		this.add(fechaExpi);

		//foto de la estatua
		let photo = this.scene.add.sprite(36, 14.4, this._sPhoto);
		photo.setOrigin(0.5, 0.5)
		photo.setScale(0.12);
		this.add(photo);

    }

	getInitialScale(){
		return this.initialScale;
	}

}