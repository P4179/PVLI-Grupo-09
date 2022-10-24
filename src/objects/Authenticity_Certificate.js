import Documents from './Documents.js'
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
		this.setDisplaySize(200, 300);
        this._sName = sName;
        this._sCreationD = sCreationD;
        this._sSerialNumber = sSerialNumber;
        this._sExpirationD = sExpirationD;
        this._sPhoto = sPhoto;
        this._sWear = sWear;
        this._sSculptor = sSculptor;
    }

}