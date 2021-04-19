import { Gpio } from "pigpio";
import { Wheel } from "./Wheel";

export class GPIO_control {

    private static instance: GPIO_control;
    private leftWheel: Wheel;
    private rightWheel: Wheel;

    private constructor() {
        const s = 250;
        this.leftWheel = new Wheel(22, 27, 17, s);
        this.rightWheel = new Wheel(19, 26, 13, s);
    }

    static getInstance() {
        if(!this.instance)
            this.instance = new GPIO_control();
        return this.instance;
    }

    speed(speed: number) {
        this.rightWheel.setSpeed(speed);
        this.leftWheel.setSpeed(speed);
    }

    up() {
        this.rightWheel.goForward();
        this.leftWheel.goForward();
    }

    down() {
        this.rightWheel.goBackward();
        this.leftWheel.goBackward();
    }

    left() {
        this.leftWheel.goForward();
        this.rightWheel.goBackward();
    }

    right() {
        this.rightWheel.goForward();
        this.leftWheel.goBackward();
    }

    stop() {
        this.leftWheel.stopBoth();
        this.rightWheel.stopBoth();
    }
}
