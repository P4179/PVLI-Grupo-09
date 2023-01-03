export default class Clock extends Phaser.GameObjects.Container {
	constructor(scene, x, y, startWork) {
		super(scene, x, y);

		this.scene.add.existing(this);

		this.elapsed_Time = 0;
		// cada cuánto tiempo parpadea
		this.flash = 700;


		this.startWork = startWork;
		let hourDivided = this.dividTwoDigits(this.startWork);
		this.hour = this.scene.timer / 12;
		this.elapsed_Time2 = 0;

		let clock = this.scene.add.sprite(0, 0, 'reloj');
		this.add(clock);

		this.digits = []
		let firstDigit = this.scene.add.sprite(-60, 0, 'nums_reloj', hourDivided[0]);
		firstDigit.setScale(0.55);
		this.digits.push(firstDigit);
		this.add(firstDigit);

		let secondDigit = this.scene.add.sprite(-25, 0, 'nums_reloj', hourDivided[1]);
		secondDigit.setScale(0.55);
		this.digits.push(secondDigit);
		this.add(secondDigit);

		let points = this.scene.add.sprite(5, 0, 'puntos', 0);
		firstDigit.setScale(0.55);
		this.digits.push(points);
		this.add(points);

		let thirdDigit = this.scene.add.sprite(35, 0, 'nums_reloj', 0);
		thirdDigit.setScale(0.55);
		this.digits.push(thirdDigit);
		this.add(thirdDigit);

		let fourthDigit = this.scene.add.sprite(70, 0, 'nums_reloj', 0);
		fourthDigit.setScale(0.55);
		this.digits.push(fourthDigit);
		this.add(fourthDigit);

		this.setScale(0.5);

		this.startClock = false;
		// cuando comienza el día el reloj comienza a parpadear
		this.scene.events.on('startDay', () => {
			this.startClock = true;
		});

		this.scene.events.on('endDay', () => {
			this.startClock = false;
			// se ponen todos los dígitos en visible por si al parar el parpadeo se habían quedado invisibles
			this.digits.forEach((digit) => {
				digit.visible = true;
			});
		});
	}

	preUpdate(t, dt) {
		// los minutos siempre se mantienen, solo cambian las horas
		this.elapsed_Time2 += dt;
		if(this.elapsed_Time2 > this.hour) {
			this.elapsed_Time2 = 0;
			++this.startWork;
			this.changeHour(this.startWork);
		}

		// hacer que los dígitos del reloj parpadeen
		if(this.startClock) {
			this.elapsed_Time += dt;
			if(this.elapsed_Time > this.flash){
				this.elapsed_Time = 0;
				this.digits.forEach((digit) => {
					digit.visible = !digit.visible;
				});
			}	
		}
	}

	dividTwoDigits(digits) {
		let divided = []
		if(digits < 10) {
			divided[0] = 0;
			divided[1] = digits;
		}
		else {
			let aux = this.startWork;
			let index = 1;
			while(index >= 0) {
				let digit = aux % 10;
				digit = parseInt(digit);
				aux = aux / 10;
				divided[index] = digit;
				--index;
			}
		}
		return divided;
	}

	// solo se cambian las horas
	changeHour(hour) {
		let hourDivided = this.dividTwoDigits(hour);
		for(var i = 0; i < hourDivided.length; ++i) {
			// el frame del spritesheet imagen corresponde con las horas
			// es decir, el frame 0 es el 0, el frame 1 es el 1,...
			this.digits[i].setFrame(hourDivided[i])
		}
	}
}