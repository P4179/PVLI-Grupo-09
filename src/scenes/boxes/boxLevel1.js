import Battery from "../../objects/box_levels/battery.js";
import BoxLevel from "./boxLevel.js";

export default class BoxLevel1 extends BoxLevel {
    constructor() {
        super(1);
    }

    create() {
        super.create();

        this.batteries.add(new Battery(this, 30, 72, 2));
        this.batteries.add(new Battery(this, 294, 105, 2));
    }
}