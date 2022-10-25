import Documents from './Documents.js'
import Date from "../classes/Date.js";

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
        this._sWear = sWear;
        this._sSculptor = sSculptor;
		
		//centro: 73, 86
		//color texto: #896789
		//texto del nombre
		let _sNametext = this.scene.add.text(0, -96, this._sName);
		_sNametext.setOrigin(0.5,0.5);
		_sNametext.setAlign('center');
		_sNametext.setFill('#896789');
		_sNametext.setFontSize(22);
		this.add(_sNametext);

		//texto del día de creacion
		let dateText = this._sCreationD.Getday() + "/" + this._sCreationD.Getmonth() + "/" + this._sCreationD.Getyear();
		let _sCreationDtext = this.scene.add.text(-56, -51, dateText);
		_sCreationDtext.setOrigin(0.5,0.5);
		_sCreationDtext.setAlign('center');
		_sCreationDtext.setFill('#896789');
		_sCreationDtext.setFontSize(22);
		this.add(_sCreationDtext);

		//texto numero de serie
		let _sSerialNumbertext = this.scene.add.text(-84, -6, this._sSerialNumber);
		_sSerialNumbertext.setOrigin(0.5,0.5);
		_sSerialNumbertext.setAlign('center');
		_sSerialNumbertext.setFill('#896789');
		_sSerialNumbertext.setFontSize(22);
		this.add(_sSerialNumbertext);

		//texto estado de deterioro
		let _sWeartext = this.scene.add.text(27, -6, this._sWear);
		_sWeartext.setOrigin(0.5,0.5);
		_sWeartext.setAlign('center');
		_sWeartext.setFill('#896789');
		_sWeartext.setFontSize(22);
		this.add(_sWeartext);

		//texto dia de expiracion
		let edateText = this._sExpirationD.Getday() + "/" + this._sExpirationD.Getmonth() + "/" + this._sExpirationD.Getyear();
		let _sExpirationDtext = this.scene.add.text(-52, 38, edateText);
		_sExpirationDtext.setOrigin(0.5,0.5);
		_sExpirationDtext.setAlign('center');
		_sExpirationDtext.setFill('#896789');
		_sExpirationDtext.setFontSize(22);
		this.add(_sExpirationDtext);

		//firma
		let _sSculptortext = this.scene.add.text(50, 135, this._sSculptor);
		_sSculptortext.setOrigin(0.5,0.5);
		_sSculptortext.setFont('Freestyle Script');
		_sSculptortext.setAlign('center');
		_sSculptortext.setFill('#896789');
		_sSculptortext.setFontSize(22);
		this.add(_sSculptortext);
    }

}