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