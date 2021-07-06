import { Wheel } from "./Wheel";
import { Coordinates } from "./Coordinates";
import { dipicarConfReader, logger } from "../../utilities";
import { defaultConf } from "../../enums";

export class GPIO_control {

    private static instance: GPIO_control;
    private leftWheel?: Wheel;
    private rightWheel?: Wheel;

    private constructor() {
        this.initWheels();

        this.movement = this.movement.bind(this);
        this.speed = this.speed.bind(this);
        this.stop = this.stop.bind(this);
    }

    static getInstance() {
        if(!this.instance)
            this.instance = new GPIO_control();
        this.instance.stop();
        return this.instance;
    }

    initWheels(useDefault = false) {
        try {
            if(useDefault)
                logger.warn("Default motor pins will be used.");
            const right = (!useDefault)? dipicarConfReader().rightMotor! : defaultConf.rightMotor!;
            const left = (!useDefault)? dipicarConfReader().leftMotor! : defaultConf.leftMotor!;
            
            this.rightWheel = new Wheel(right.forwards, right.backwards, right.pwm);
            this.leftWheel = new Wheel(left.forwards, left.backwards, left.pwm);
        } catch (error) {            
            logger.error(error.message);
            if(useDefault)
                throw new Error("Default configuration may be compromised.");
            this.initWheels(true);
        }
    }

    speed(speed: number) {
        this.rightWheel!.setSpeed(speed);
        this.leftWheel!.setSpeed(speed);
    }

    movement(coord: Coordinates) {
        this.stop();

        for (const key in coord) {
            if((coord as any)[key] > 255) 
                (coord as any)[key] = 255;
            if((coord as any)[key] < -255) 
                (coord as any)[key] = -255;
            (coord as any)[key] = parseInt((coord as any)[key]);
        }
        
        let speed = coord.speed ?? Math.sqrt(coord.x**2 + coord.y**2);
        console.log({
            ...coord,
            ...{speed}
        });
        if(coord.x === 0 && coord.y === 0)
            this.stop();
        else {
            //forward
            if(coord.y >= 0) {
                this.leftWheel!.goForward();
                this.rightWheel!.goForward();
            }
            //backward
            else {
                this.leftWheel!.goBackward();
                this.rightWheel!.goBackward();
            }
            //right
            if(coord.x >= 0) { 
                this.leftWheel!.setSpeed(speed);
                this.rightWheel!.setSpeed(speed-coord.x);
            }
            //left
            else {
                this.leftWheel!.setSpeed(speed+coord.x);
                this.rightWheel!.setSpeed(speed);
            }
        }
    }

    stop() {
        this.speed(0);
        this.leftWheel!.stop();
        this.rightWheel!.stop();
    }
}
