import { Chess } from "chess.js";
import { WebSocket } from "ws";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";

export class Game{
    public player1:WebSocket
    public player2:WebSocket
    private board:Chess
    private startTime:Date


    constructor(player1:WebSocket,player2:WebSocket){
        this.player1=player1;
        this.player2=player2
       this.board=new Chess()
        this.startTime=new Date()   
        this.player1.send(JSON.stringify({type:INIT_GAME,payload:{color:"white"}}))
        this.player2.send(JSON.stringify({type:INIT_GAME,payload:{color:"black"}}))
    }

    makeMove(socket:WebSocket,move:{from:string,to:string}){ 
    // validation here using zod
    // Is its the user move
    // is the move valid
        if(this.board.moves().length%2===0&&socket!==this.player1){
            return 
        }

        if(this.board.moves().length%2===1&&socket!==this.player2){
            return 
        }


        try {
            this.board.move(move)
        } catch (error) {
            return 
        }
               

    // update the board chess library will do
    // check the game is over 

    if(this.board.isGameOver()){
        this.player1.emit
        (JSON.stringify
            (
                {type:GAME_OVER,
                    payload:{winner:this.board.turn()==="w"?"black":"white"}}
            ))        
        this.player2.emit
        (JSON.stringify
            (
                {type:GAME_OVER,
                    payload:{winner:this.board.turn()==="w"?"black":"white"}}
            ))        
    }
    // send the update board to both player
    if(this.board.moves().length%2===0){
        this.player2.send(JSON.stringify({type:MOVE,payload:move}))
    }
    else{
        this.player1.send(JSON.stringify({type:MOVE,payload:move}))
    }
    }
}