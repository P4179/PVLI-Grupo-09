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
	 * @param {image} sStamp - museums' stamp
	 */
export default class Material_Record extends Documents{
    //Authenticity certificate's creator
    constructor(scene, x, y, sName, sCreationD, sColour){
        super(scene, x, y, 'mat_reg');
        this._sName = sName;
        this._sCreationD = sCreationD;
		this.fontsize = 9;
		
		//color texto: #837485
		//texto del nombre
		this._sNametext = this.scene.add.bitmapText(-41, -2, 'documentFont', this._sName, this.fontsize);
		this._sNametext.setOrigin(0, 0);
		this._sNametext.setFontSize(this.fontsize);
		this.add(this._sNametext);
		
		//texto dia de expiracion
		this.fechaCrea = new Date(scene, -33, 8, this._sCreationD.d, this._sCreationD.m, this._sCreationD.y);
		this.fechaCrea.setOrigin(0, 0);
		this.fechaCrea.setFontSize(this.fontsize);
		this.add(this.fechaCrea);
    }

}