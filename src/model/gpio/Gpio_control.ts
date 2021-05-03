import { Wheel } from "./Wheel";
import { Coordinates } from "./Coordinates";

export class GPIO_control {

    private static instance: GPIO_control;
    private leftWheel: Wheel;
    private rightWheel: Wheel;

    private constructor() {
        this.rightWheel = new Wheel(19, 26, 13);
        this.leftWheel = new Wheel(22, 27, 17);

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

    speed(speed: number) {
        this.rightWheel.setSpeed(speed);
        this.leftWheel.setSpeed(speed);
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
                this.leftWheel.goForward();
                this.rightWheel.goForward();
            }
            //backward
            else {
                this.leftWheel.goBackward();
                this.rightWheel.goBackward();
            }
            //right
            if(coord.x >= 0) { 
                this.leftWheel.setSpeed(speed);
                this.rightWheel.setSpeed(speed-coord.x);
            }
            //left
            else {
                this.leftWheel.setSpeed(speed+coord.x);
                this.rightWheel.setSpeed(speed);
            }
        }
    }

    stop() {
        this.speed(0);
        this.leftWheel.stop();
        this.rightWheel.stop();
    }
}
