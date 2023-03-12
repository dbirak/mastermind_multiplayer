const express = require("express");
const app = express();
const path = require("path");

const http = require("http").Server(app); 
const port = process.env.PORT||8080;

//attached http server to the socket.io
const io = require('socket.io')(http);

var countPlayer = 0;
var playersList = [];
var playersNameList = [];
var playersListInGame = [];
var rooms = [];

//route
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "src/index.html"));
})

app.use(express.static(__dirname + "/src"));

//create a new connection
io.on("connection", socket => {
    console.log("User connected: "+socket.id);
    playersList.push(socket);
    playersNameList.push("");
    countPlayer = playersList.length;

    for(let player of playersList) {
        player.emit("playerCount", countPlayer);
    }

    socket.on("disconnect", () => {
        console.log("User disconnected: "+socket.id);

        var index = playersList.findIndex((obj) => obj.id === socket.id)

        playersList.splice(index, 1);
        playersNameList.splice(index, 1);
        playersListInGame.splice(playersListInGame.findIndex((obj) => obj === socket.id), 1);

        countPlayer = playersList.length;

        var indexRoom = rooms.findIndex((obj) => (socket.id == obj.player1[0] || socket.id == obj.player2[0]));

        if(indexRoom == -1) return;

        if(rooms[indexRoom].player1[0] == socket.id) (playersList[playersList.findIndex((obj) => obj.id == rooms[indexRoom].player2[0])]).emit("abortGameInfo", true);
        else if(rooms[indexRoom].player2[0] == socket.id) (playersList[playersList.findIndex((obj) => obj.id == rooms[indexRoom].player1[0])]).emit("abortGameInfo", true);

        rooms.splice(indexRoom, 1);
    })

    //zapisanie zaakutalizowanej nazwy gracza
    socket.on("sendName", (msg) => {
        playersNameList[playersList.findIndex((obj) => obj.id == socket.id)] = msg;
    })

    //połączenie playerów i utworzenie pokoju
    socket.on("connectPlayers", (msg) => {
        if(msg == socket.id) {
            socket.emit("receiveConnectPlayer", [false, "Niepoprawny ID"]);
            return
        }

        for(let player of playersListInGame) {
            if(msg == player) {
                socket.emit("receiveConnectPlayer",  [false, "Gracz jest w trakcie rozgrywki"]);
                return;
            }
        }

        for(let player of playersList) {
            if(msg == player.id) {
                player.emit("receiveConnectPlayer",  [true, socket.id]);
                socket.emit("receiveConnectPlayer", [true, player.id]);
                playersListInGame.push(player.id);
                playersListInGame.push(socket.id);

                let name1 = playersNameList[playersList.findIndex((obj) => obj.id == player.id)];
                let name2 = playersNameList[playersList.findIndex((obj) => obj.id == socket.id)];

                var room =  createRoom(player.id, socket.id, name1, name2);

                player.emit("game", room);
                socket.emit("game", room);

                return;
            }
        }

        socket.emit("receiveConnectPlayer",  [false, "Niepoprawny ID"]);
    });

    //player gra lub nie gra (dodanie lub usuniecie statusu gracza)
    socket.on("playerInGame", (msg) => {
        if(msg == true) {
            playersListInGame.push(socket.id);
        }
        else {
            playersListInGame.splice(playersListInGame.findIndex((obj) => obj === socket.id), 1);
        }

    });

    //wysłanie ruchu jednego gracza do drugiego
    socket.on("move", (msg) => {
        let index1 = rooms.findIndex((obj) => obj.whoPlay === obj.player1[0] && socket.id === obj.whoPlay);
        let index2 = rooms.findIndex((obj) => obj.whoPlay === obj.player2[0] && socket.id === obj.whoPlay)

        if(index1 != -1) (playersList[playersList.findIndex((obj) => obj.id === rooms[index1].player2[0])]).emit("moveReceive",  msg);
        else if(index2 != -1) (playersList[playersList.findIndex((obj) => obj.id === rooms[index2].player1[0])]).emit("moveReceive",  msg);
    });

    //odebranie wyniku tury i utworzenie nowej tury
    socket.on("gameResult", (msg) => {
        var indexRoom = rooms.findIndex((obj) => (msg.player1[0] == obj.player1[0] || msg.player1[0] == obj.player2[0]));
        var room = rooms[indexRoom];

        const player1Socket = playersList[playersList.findIndex((obj) => obj.id === room.player1[0])];
        const player2Socket = playersList[playersList.findIndex((obj) => obj.id === room.player2[0])];

        let s = 9;

        const countDown = async (player1Socket, player2Socket, room, s, msg, indexRoom) => {
            for (let i = s; i > 0; i--) {
                if(msg.whoWin == room.player1[0]) {
                    player1Socket.emit("countDown", "Wygrałeś! Nowa tura za "+i);
                    player2Socket.emit("countDown", "Przegrałeś! Nowa tura za "+i);
                }
                else if(msg.whoWin != room.player1[0]) {
                    player1Socket.emit("countDown", "Przegrałeś! Nowa tura za "+i);
                    player2Socket.emit("countDown", "Wygrałeś! Nowa tura za "+i);
                }

                if(rooms.findIndex((obj) => (msg.player1[0] == obj.player1[0] || msg.player1[0] == obj.player2[0])) == -1) return;

                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            if(rooms.findIndex((obj) => (msg.player1[0] == obj.player1[0] || msg.player1[0] == obj.player2[0])) == -1) return;

            var wylosowane = [];
            wylosowane[0] = Math.floor(Math.random() * (7 - 1) + 1);
            wylosowane[1] = Math.floor(Math.random() * (7 - 1) + 1);
            wylosowane[2] = Math.floor(Math.random() * (7 - 1) + 1);
            wylosowane[3] = Math.floor(Math.random() * (7 - 1) + 1);

            var updateRoom = {
                player1: [msg.player1[0], msg.player1[1], msg.player1[2]],
                player2: [msg.player2[0], msg.player2[1], msg.player2[2]],
                whoPlay: msg.whoPlay == msg.player1[0] ? msg.player2[0] : msg.player1[0],
                wylosowane: wylosowane
            };

            rooms[indexRoom] =  updateRoom;

            player1Socket.emit("game", updateRoom);
            player2Socket.emit("game", updateRoom);
            
        }

        countDown(player1Socket, player2Socket, room, s, msg, indexRoom);

    });

    //opuszczenie pokoju
    socket.on("abortGame", (msg) => {
        var indexRoom = rooms.findIndex((obj) => (msg.player1 == obj.player1[0] || msg.player2 == obj.player1[0]));

        if(rooms[indexRoom].player1[0] == socket.id) (playersList[playersList.findIndex((obj) => obj.id == rooms[indexRoom].player2[0])]).emit("abortGameInfo", true);
        else if(rooms[indexRoom].player2[0] == socket.id) (playersList[playersList.findIndex((obj) => obj.id == rooms[indexRoom].player1[0])]).emit("abortGameInfo", true);

        rooms.splice(indexRoom, 1);
        
    });

})

http.listen(port, () => {
    console.log("app listening on port "+port);
})

const createRoom = (player, socket, name1, name2) => {

    const random = Math.floor(Math.random() * (3 - 1) + 1);

    var wylosowane = [];
    wylosowane[0] = Math.floor(Math.random() * (7 - 1) + 1);
    wylosowane[1] = Math.floor(Math.random() * (7 - 1) + 1);
    wylosowane[2] = Math.floor(Math.random() * (7 - 1) + 1);
    wylosowane[3] = Math.floor(Math.random() * (7 - 1) + 1);

    
    var room = {
        player1: [player, 0, name1],
        player2: [socket, 0, name2],
        whoPlay: random == 1 ? player : socket,
        wylosowane: wylosowane
    };

    rooms.push(room);

    return room;
}