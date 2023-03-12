var kula;
var proba;
var wylosowane = [];
var sekcjaM = [];
var check = [];
var checkwhite = [];
var double1;
var double2;
var start;
var myTurn = false;
var opponentID;
var player1 = [];
var player2 = [];


const listener = (eventName, ...args) => {
  //playerCount 3
  //console.log(eventName, args[0]);

  if(eventName == "receiveConnectPlayer") {
    if(args[0][0] == false) $(".errorConnection").html(args[0][1]);
    else if(eventName == "receiveConnectPlayer" && args[0][0] != false) {
        grajM();
        restartM();
    }
  }

  if(eventName == "game") {
    grajM();
    restartM();
    
    $(".nazwa1").html(args[0].player1[2]);
    $(".nazwa2").html(args[0].player2[2]);
    $(".wynik1").html(args[0].player1[1]);
    $(".wynik2").html(args[0].player2[1]);

    player1 = [];
    player2 = [];

    player1.push(args[0].player1[0]);
    player1.push(args[0].player1[2]);
    player2.push(args[0].player2[0]);
    player2.push(args[0].player2[2]);

    wylosowane = args[0].wylosowane;

    opponentID = socket.id == args[0].player1[0] ? args[0].player2[0] : args[0].player1[0];

    if(args[0].whoPlay == socket.id) myTurnn();
    else oponentTurn();
  }

  if(eventName == "moveReceive") {
    if(myTurn == true) return;
    if(!isNaN(args[0])) klikM(args[0]);
    if(args[0] == "BACK") backM();
  }

  if(eventName == "countDown") {
    $(".info").html(args[0]);
  }

  if(eventName == "abortGameInfo") {
    if(args[0] == true) {
        $('.pomoc').css("transform", "translateX(780px)");
        $('.mainMenu').css("transform", "translateX(0px)");
        $('.plansza').css("transform", "translateX(390px)");
        $('.planszaMultiplayer').css("transform", "translateX(-390px)");
        $('.main-menu').css("pointer-event", "all");
        
        $(".errorConnection").html("Przeciwnik opóścił rozgrywkę");

        $('.yes').css("pointer-events", "none");
        $('.no').css("pointer-events", "none");

        
        $('.alertM').css("display", "none");
        
        restartM();

        closeAlert();

        socket.emit("playerInGame", false);
    }
  }
};

const playmultiplayer = () => {

    socket.emit("connectPlayers", $(".userIdInput").val());
    
};

const myTurnn = () => {
    $(".info").css("color", "#9cc841");
    $(".info").html("Twoja kolej...");

    myTurn = true;
}

const oponentTurn = () => {
    $(".info").css("color", "#e22d2d");
    $(".info").html("Kolej przeciwnika...");

    $('.kolory').css("pointer-events", "none");
    $('.cofnij').css("pointer-events", "none");

    pokazM();

    myTurn = false;
}

function grajM()
{
    $('.pomoc').css("transform", "translateX(1170px)");
    $('.mainMenu').css("transform", "translateX(390px)");
    $('.plansza').css("transform", "translateX(780px)");
    $('.planszaMultiplayer').css("transform", "translateX(0px)");
    $('.main-menu').css("pointer-events", "all");
    $('.kolory').css("pointer-events", "all");
    $('.cofnij').css("pointer-events", "all");
}

function restartM()
{
    kula = 1;
    proba = 1;
    check = [];
    checkwhite = [];
    double1 = 5;
    double2 = 5;
    minuty = 0;
    sekundy = 0;
    start = false;
    
    $('.conteiner').css("pointer-events", "all");
    $(".userIdInput").css("pointer-events","all");
    $('body').css("background-color", "#ffd1a0");
    
    for(let i=1; i<=4; i++)
    {
        $('.sekcjaodpM'+' .kolor'+' .kolor'+i).css("transform", "scale(0)");
    }
    
    wylosowane[0] = Math.floor(Math.random() * (7 - 1) + 1);
    wylosowane[1] = Math.floor(Math.random() * (7 - 1) + 1);
    wylosowane[2] = Math.floor(Math.random() * (7 - 1) + 1);
    wylosowane[3] = Math.floor(Math.random() * (7 - 1) + 1);
    
    for(let i=1; i<=8; i++)
    {
        for(let j=1; j<=4; j++)
        {
            $('.sekcjaM'+i+' .kolor'+' .kolor'+j).css("transform", "scale(0)");
            $('.sprawdzM'+i+' .wysrodkowanie'+' .kropka'+' .kropka'+j).css("transform", "scale(0)");
        } 
    }    
}

function klikM(num)
{
    
    if(num == 1)
    {
        $('.sekcjaM'+proba+' .kolor'+' .kolor'+kula).css("background-color", "#e22d2d");
        $('.sekcjaM'+proba+' .kolor'+' .kolor'+kula).css("transform", "scale(1)");
        
        sekcjaM[kula-1] = 1;
    }
    
    else if(num == 2)
    {
        $('.sekcjaM'+proba+' .kolor'+' .kolor'+kula).css("background-color", "#f58023");
        $('.sekcjaM'+proba+' .kolor'+' .kolor'+kula).css("transform", "scale(1)");
        
        sekcjaM[kula-1] = 2;
    }
    
    else if(num == 3)
    {
        $('.sekcjaM'+proba+' .kolor'+' .kolor'+kula).css("background-color", "#e1be29");
        $('.sekcjaM'+proba+' .kolor'+' .kolor'+kula).css("transform", "scale(1)");
        
        sekcjaM[kula-1] = 3;
    }
    
    else if(num == 4)
    {
        $('.sekcjaM'+proba+' .kolor'+' .kolor'+kula).css("background-color", "#9cc841");
        $('.sekcjaM'+proba+' .kolor'+' .kolor'+kula).css("transform", "scale(1)");
        
        sekcjaM[kula-1] = 4;
    }
    
    else if(num == 5)
    {
        $('.sekcjaM'+proba+' .kolor'+' .kolor'+kula).css("background-color", "#3d81c2");
        $('.sekcjaM'+proba+' .kolor'+' .kolor'+kula).css("transform", "scale(1)");
        
        sekcjaM[kula-1] = 5;
    }
    
    else
    {
        $('.sekcjaM'+proba+' .kolor'+' .kolor'+kula).css("background-color", "#644b9e");
        $('.sekcjaM'+proba+' .kolor'+' .kolor'+kula).css("transform", "scale(1)");
        
        sekcjaM[kula-1] = 6;
    }
    
    kula++;
    
    if(kula == 5) sprawdzM();

    if(myTurn == true) socket.emit("move", num);
}

function sprawdzM()
{   
    for(let i=0; i<=3; i++)
    {
        if(wylosowane[i] == sekcjaM[i])
        {
            check.push("black");
            checkwhite[i] = "no";
        }
        
        else
        {
           checkwhite[i] = "yes";
        }
    }
    
    for(let i=0; i<=3; i++)
    {        
        if(checkwhite[i] == "yes" && checkwhite[0] == "yes" && wylosowane[i] == sekcjaM[0] && double1 != 1 && double2 != 1)
        {
            check.push("white");
            if(double1 == 5) double1 = 1;
            if(double1 != 5) double2 = 1;
        }
        
        else if(checkwhite[i] == "yes" && checkwhite[1] == "yes" && wylosowane[i] == sekcjaM[1] && double1 != 2 && double2 != 2)
        {
            check.push("white");
            if(double1 == 5) double1 = 2;
            if(double1 != 5) double2 = 2;
        }
        
        else if(checkwhite[i] == "yes" && checkwhite[2] == "yes" && wylosowane[i] == sekcjaM[2] && double1 != 3 && double2 != 3)
        {
            check.push("white");
            if(double1 == 5) double1 = 3;
            if(double1 != 5) double2 = 3;
        }
        
        else if(checkwhite[i] == "yes" && checkwhite[3] == "yes" && wylosowane[i] == sekcjaM[3] && double1 != 4 && double2 != 4)
        {
            check.push("white");
            if(double1 == 5) double1 = 4;
            if(double1 != 5) double2 = 4;
        }
    }
    
    for(let i=1; i<=check.length; i++)
    {
        $('.sprawdzM'+proba+' .wysrodkowanie'+' .kropka'+' .kropka'+i).css("background-color", check[i-1]);
        $('.sprawdzM'+proba+' .wysrodkowanie'+' .kropka'+' .kropka'+i).css("transform", "scale(1)");
    }
    
    if(check[3] == "black" && check.length == 4)
    {
        winnerM();
    }
    
    else
    {
        check = [];
        checkwhite = [];
        double1 = 5;
        double2 = 5;

        kula = 1;

        if(proba <= 7) proba++;

        else 
        {
            loseM();
        }
    }
}

function backM()
{
    if(kula >= 2 && kula <= 4)
    {
        kula--;
        $('.sekcjaM'+proba+' .kolor'+' .kolor'+kula).css("transform", "scale(0)");
    }

    if(myTurn == true) socket.emit("move", "BACK");
}

function pokazM()
{   
    for(let i=1; i<=4; i++)
    {
            if(wylosowane[i-1] == 1)
            {
                $('.sekcjaodpM'+' .kolor'+' .kolor'+i).css("background-color", "#e22d2d");
                $('.sekcjaodpM'+' .kolor'+' .kolor'+i).css("transform", "scale(1)");
            }
            
            else if(wylosowane[i-1] == 2)
            {
                $('.sekcjaodpM'+' .kolor'+' .kolor'+i).css("background-color", "#f58023");
                $('.sekcjaodpM'+' .kolor'+' .kolor'+i).css("transform", "scale(1)");
            }
            
            else if(wylosowane[i-1] == 3)
            {
                $('.sekcjaodpM'+' .kolor'+' .kolor'+i).css("background-color", "#e1be29");
                $('.sekcjaodpM'+' .kolor'+' .kolor'+i).css("transform", "scale(1)");
            }
            
            else if(wylosowane[i-1] == 4)
            {
                $('.sekcjaodpM'+' .kolor'+' .kolor'+i).css("background-color", "#9cc841");
                $('.sekcjaodpM'+' .kolor'+' .kolor'+i).css("transform", "scale(1)");
            }
            
            else if(wylosowane[i-1] == 5)
            {
                $('.sekcjaodpM'+' .kolor'+' .kolor'+i).css("background-color", "#3d81c2");
                $('.sekcjaodpM'+' .kolor'+' .kolor'+i).css("transform", "scale(1)");
            }
            
            else if(wylosowane[i-1] == 6)
            {
                $('.sekcjaodpM'+' .kolor'+' .kolor'+i).css("background-color", "#644b9e");
                $('.sekcjaodpM'+' .kolor'+' .kolor'+i).css("transform", "scale(1)");
            } 
    }
}

function winnerM()
{
    if(myTurn == true) {
        $('body').css("background-color", "#9cc841");
        
        pokazM();

        if(player1[0] == socket.id && player1[1] == $(".nazwa1").html()) $(".wynik1").html(parseInt($(".wynik1").html()) + 1);
        else $(".wynik2").html(parseInt($(".wynik2").html()) + 1);

        $('.kolory').css("pointer-events", "none");
        $('.cofnij').css("pointer-events", "none");

        $(".info").css("color", "#9cc841");
        $(".info").html("Wygrałeś! Nowa tura za 9");

        socket.emit("gameResult", {
            player1: [player1[1] == $(".nazwa1").html() ? player1[0] : player2[0], parseInt($(".wynik1").html()), $(".nazwa1").html()],
            player2: [player2[1] == $(".nazwa2").html() ? player2[0] : player1[0], parseInt($(".wynik2").html()), $(".nazwa2").html()],
            whoPlay: socket.id,
            whoWin: socket.id
        });

    }
    else {
        $('body').css("background-color", "#e22d2d");

        if(player1[0] == socket.id && player1[1] == $(".nazwa1").html()) $(".wynik2").html(parseInt($(".wynik2").html()) + 1);
        else $(".wynik1").html(parseInt($(".wynik1").html()) + 1);

        $(".info").css("color", "#e22d2d");
        $(".info").html("Przegrałeś! Nowa tura za 9");
        
    }
}

function loseM() 
{
    if(myTurn == true) {
        $('body').css("background-color", "#e22d2d");
        
        pokazM();

        if(player1[0] == socket.id && player1[1] == $(".nazwa1").html()) $(".wynik2").html(parseInt($(".wynik2").html()) + 1);
        else $(".wynik1").html(parseInt($(".wynik1").html()) + 1);

        $('.kolory').css("pointer-events", "none");
        $('.cofnij').css("pointer-events", "none");

        $(".info").css("color", "#e22d2d");
        $(".info").html("Przegrałeś! Nowa tura za 9");

        socket.emit("gameResult", {
            player1: [player1[1] == $(".nazwa1").html() ? player1[0] : player2[0], parseInt($(".wynik1").html()), $(".nazwa1").html()],
            player2: [player2[1] == $(".nazwa2").html() ? player2[0] : player1[0], parseInt($(".wynik2").html()), $(".nazwa2").html()],
            whoPlay: socket.id,
            whoWin: opponentID
        });

    }
    else {
        $('body').css("background-color", "#9cc841");

        if(player1[0] == socket.id && player1[1] == $(".nazwa1").html()) $(".wynik1").html(parseInt($(".wynik1").html()) + 1);
        else $(".wynik2").html(parseInt($(".wynik2").html()) + 1);

        $(".info").css("color", "#9cc841");
        $(".info").html("Wygrałeś! Nowa tura za 9");
        
    }
}

function menuM()
{
    $('.pomoc').css("transform", "translateX(780px)");
    $('.mainMenu').css("transform", "translateX(0px)");
    $('.plansza').css("transform", "translateX(390px)");
    $('.planszaMultiplayer').css("transform", "translateX(-390px)");
    $('.main-menu').css("pointer-event", "all");
    
    $(".errorConnection").html("");

    $('.yes').css("pointer-events", "none");
    $('.no').css("pointer-events", "none");
    
    $('.alertM').css("display", "none");
    
    restartM();

    closeAlert();

    socket.emit("playerInGame", false);
    socket.emit("abortGame", {
        player1: socket.id,
        player2: opponentID
    })
}

function closeAlert()
{
    $('.alertM').css("filter", "opacity(0)");
    $('.alertM').css("pointer-events", "all");
    
    $('.conteiner').css("filter", "blur(0px)");

    $('.restart').css("pointer-events", "all");
    $('.yes').css("pointer-events", "none");
    $('.no').css("pointer-events", "none");

    if(myTurn == true) {
        $('.kolory').css("pointer-events", "all");
        $('.cofnij').css("pointer-events", "all");
    }
}

function showAlert()
{
    $('.alertM').css("display", "block");
    $('.alertM').css("filter", "opacity(1)");
    $('.alertM').css("pointer-events", "all");

    $('.conteiner').css("filter", "blur(5px)");
    
    $('.kolory').css("pointer-events", "none");
    $('.cofnij').css("pointer-events", "none");
    $('.restart').css("pointer-events", "none");
    $('.yes').css("pointer-events", "all");
    $('.no').css("pointer-events", "all");
}