import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';

const wss = new WebSocketServer({ port: 8080 });

const gamemanager = new GameManager();
wss.on('connection', function connection(ws) {
    gamemanager.addgUser(ws)
  ws.on("disconnect",function remove(ws){
    gamemanager.removeUser(ws)
  })
});

