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
        this.stopBoth();
        this.setSpeed(speed);
    }

    setSpeed(speed: number) {
        if(speed > 255) speed = 255;
        if(speed < 0) speed = 0;
        this.PWM.pwmWrite(speed);
    }

    goForward() {
        this.forward.digitalWrite(1);
    }

    goBackward() {
        this.backward.digitalWrite(1);
    }

    stop(which: "backward" | "forward") {
        this[which].digitalWrite(0);
    }

    stopBoth() {
        this.stop("backward");
        this.stop("forward");
    }
}