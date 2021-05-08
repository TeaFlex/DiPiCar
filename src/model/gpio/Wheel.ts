import { initPigpio } from "../../utilities";
initPigpio();
import { Gpio } from "pigpio";

export class Wheel {

    public forward: Gpio;
    public backward: Gpio;
    public PWM: Gpio;

    constructor(
        forwardPin: number, 
        backwardPin: number, 
        PWMPin: number, 
        speed = 0
    ) {
        this.forward = new Gpio(forwardPin, {mode: Gpio.OUTPUT});
        this.backward = new Gpio(backwardPin, {mode: Gpio.OUTPUT});
        this.PWM = new Gpio(PWMPin, {mode: Gpio.OUTPUT});
        this.stop();
        this.setSpeed(speed);
    }

    /**
     * Set the speed of the wheel.
     * @param speed A value between 0 and 255.
     */
    setSpeed(speed: number) {
        if(speed > 255) speed = 255;
        if(speed < 0) speed = 0;
        this.PWM.pwmWrite(speed);
    }

    /**
     * Makes the wheel go forward.
     */
    goForward() {
        this.forward.digitalWrite(1);
    }

    /**
     * Makes the wheel go backward.
     */
    goBackward() {
        this.backward.digitalWrite(1);
    }

    /**
     * Makes the wheel stop.
     * @param which one way or both.
     */
    stop(which: "backward" | "forward" | "both" = "both") {
        if(which !== "both")
            this[which].digitalWrite(0);
        else {
            this.forward.digitalWrite(0);
            this.backward.digitalWrite(0);
        }
    }
}