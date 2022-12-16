export default class Pool {
	constructor (scene, entities) {
		this.scene = scene;

		this.group = this.scene.add.group();
		// se añaden las entidades a un grupo
		this.group.addMultiple(entities);
		// incialmente se desactiva todo
		// estatuas
		this.group.children.iterate((item) => {
			this.group.killAndHide(item);
			// no se comprueban las colisiones de este objeto
			item.body.checkCollision.none = true;
			// documentos
			item.getDocuments().children.iterate((document) => {
				item.getDocuments().killAndHide(document);
				document.body.checkCollision.none = true;
			});
        });

        this.index = 0;	// controla que estatua de la pool se activa
	}

	// activa una estatua
	spawn () {
		// se activa la estatua que viene siguiente
		let entity = this.group.getLastNth(this.index);
		// si se ha encontrado la entidad, se activa
		if (entity) {
			// estatua
			entity.setActive(true);
			entity.setVisible(true);
			entity.arriving();	// tween con la llegada de la estatua
			// documentos
			// cuando la estatua llega se captura el evento y se activan sus documentos
			entity.on('statueHasArrived', () => {
				// cuando la estatua ha llegado se comprueban sus colisiones
				entity.body.checkCollision.none = false;
				for (var i = 0; i < entity.getDocuments().getLength(); ++i) {
					let document = entity.getDocuments().children.entries[i];
					document.setActive(true);
					document.setVisible(true);
					document.body.checkCollision.none = false;
					this.returnDocToOriginalPos(document, i);
				};
			});
		}
		return entity;
	}

	// gestiona el índice que determina que estatua se activa
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
	
	// desactiva una estatua
	release (entity) {
		// estatua
		this.group.killAndHide(entity);
		entity.body.checkCollision.none =  true;
		// documentos
		entity.getDocuments().children.iterate((document) => {
			entity.getDocuments().killAndHide(document);
			document.body.checkCollision.none = true;
		});
		// avanza el index, que indica que estatua debe activarse
		this.pass();
	}

	// devolver el documento a su posición original
	// ya que cuando se reutiliza una estatua sus documentos se quedan donde se habían dejado
	returnDocToOriginalPos(document, index) {
		let h = 300;
		document.x = this.scene.game.config.width / 2 - 160 - 50 + index;
		document.y = this.scene.game.config.height / 2 - 50;
		document.setTam(300);
	}
}