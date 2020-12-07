inputs = new Inputs();

function Inputs(){
    this.currentInput="default";

    window.addEventListener("gamepadconnected", function(e) {
        if (typeof gamepad != 'object'){
            this.gamepad=new GamepadMode (e.gamepad.index,e.gamepad.id);
            this.currentInput="gamepad";
            client.updateInput(this.currentInput);
        }        
      });
    window.addEventListener("gamepaddisconnected", function() {
        delete this.gamepad;
        this.currentInput="default"
        client.updateInput(this.currentInput);
      });
}

function GamepadMode(index,id){
    this.index=index;
    this.id=id;
}

function gameLoop() {
    let isConnected = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
    if (!isConnected)
      return;
  
    var gp = gamepads[0];
    if (buttonPressed(gp.buttons[0])) {
      //Down
    } else if (buttonPressed(gp.buttons[2])) {
      //UP
    }
    if(buttonPressed(gp.buttons[1])) {
     //RIGHT
    } else if(buttonPressed(gp.buttons[3])) {
     //Left
    }
}