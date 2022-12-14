export default class Pool {
	constructor (scene, entities) {
		this.group = scene.add.group();
		this.group.addMultiple(entities);
		this.group.children.iterate((item) => {
			this.group.killAndHide(item);
			item.getDocuments().children.iterate((document) => {
				item.getDocuments().killAndHide(document);
				document.body.checkCollision.none = false;
			});
        });

        this.index = 0;
	}

	spawn () {
		let entity = this.group.getLastNth(this.index);
		// si se ha encontrado la entidad, se activa
		if (entity) {
			entity.setActive(true);
			entity.setVisible(true);
			entity.tween.play();
			entity.getDocuments().children.iterate((document) => {
				document.setActive(true);
				document.setVisible(true);
				document.body.checkCollision.none = false;
			});
		}
		return entity;
	}

	pass(){
  		// si se ha llegado a la última estatua, se vuelve a la primera
    	if(this.end()){
      		this.index = 0;
    	}
    	// como ya hay una estatua instanciada, se instancia la siguiente
    	else {
      		++this.index;
    	}
  	}

  	// comprueba si se ha llegado al final de la pool
  	end(){
  		return this.index >= this.group.getLength() - 1;
  	}
	
	release (entity) {
		this.group.killAndHide(entity);
		entity.getDocuments().children.iterate((document) => {
			entity.getDocuments().killAndHide(document);
			document.body.checkCollision.none = false;
		});
		// avanza el index, que indica que estatua debe activarse
		this.pass();
	}
}