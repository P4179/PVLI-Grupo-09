import Battery from "../../objects/box_levels/battery.js";
import BoxLevel from "./boxLevel.js";

export default class BoxLevel2 extends BoxLevel {
    constructor() {
        super(2);
    }

    create() {
        super.create();

        this.batteries.add(new Battery(this, 30, 72, 1));
    }
}