export default class Clock extends Phaser.GameObjects.Container {
	constructor(scene, x, y) {
		super(scene, x, y);

		this.scene.add.existing(this);

		this.elapsed_Time = 0;
		// cada cuánto tiempo parpadea
		this.flash = 700;
		this.time = 9;
		this.hour = this.timer / 12; 
		this.elapsed_Time2 = 0;

		let clock = this.scene.add.sprite(0, 0, 'reloj');
		this.add(clock);

		this.digits = []

		let firstDigit = this.scene.add.sprite(-60, 0, 'nums_reloj', 0);
		firstDigit.setScale(0.55);
		this.digits.push(firstDigit);
		this.add(firstDigit);

		let secondDigit = this.scene.add.sprite(-25, 0, 'nums_reloj', 9);
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
	}

	preUpdate(t, dt) {
		this.elapsed_Time2 += dt;
		if(this.elapsed_Time2 > this.hour) {
			console.log("cambio_hora");
			++this.time;
		}
		this.elapsed_Time += dt;
		if(this.elapsed_Time > this.flash){
			this.elapsed_Time = 0;
			this.digits.forEach((digit) => {
				digit.visible = !digit.visible;
			});
		}
	}
}