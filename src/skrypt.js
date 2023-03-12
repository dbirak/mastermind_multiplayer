var kula;
var proba;
var wylosowane = [];
var sekcja = [];
var check = [];
var checkwhite = [];
var double1;
var double2;
var minuty; 
var sekundy;
var t, s;
var start;

function init() 
{
    restart();
}

function graj()
{
    $('.mainMenu').css("transform", "translateX(-390px)");
    $('.pomoc').css("transform", "translateX(390px)");
    $('.plansza').css("transform", "translateX(0px)");

    restart();

    socket.emit("playerInGame", true);
}

function restart()
{
    kula = 1;
    proba = 1;
    check = [];
    checkwhite = [];
    double1 = 5;
    double2 = 5;
    t = "00:00";
    
    clearTimeout(s);
    $('.czas').html("00:00");
    minuty = 0;
    sekundy = 0;
    start = false;
    
    $('.conteiner').css("pointer-events", "all");
    $('.kolory').css("pointer-events", "all");
    $('.cofnij').css("pointer-events", "all");
    $('body').css("background-color", "#ffd1a0");
    
    for(let i=1; i<=4; i++)
    {
        $('.sekcjaodp'+' .kolor'+' .kolor'+i).css("transform", "scale(0)");
    }
    
    wylosowane[0] = Math.floor(Math.random() * (7 - 1) + 1);
    wylosowane[1] = Math.floor(Math.random() * (7 - 1) + 1);
    wylosowane[2] = Math.floor(Math.random() * (7 - 1) + 1);
    wylosowane[3] = Math.floor(Math.random() * (7 - 1) + 1);
    
    for(let i=1; i<=8; i++)
    {
        for(let j=1; j<=4; j++)
        {
            $('.sekcja'+i+' .kolor'+' .kolor'+j).css("transform", "scale(0)");
            $('.sprawdz'+i+' .wysrodkowanie'+' .kropka'+' .kropka'+j).css("transform", "scale(0)");
        } 
    }    
}

function klik(num)
{
    if($('.czas').html() == "00:00" && start == false)
    {
        s = setTimeout(timer, 1000);
        start = true;
    }
    
    if(num == 1)
    {
        $('.sekcja'+proba+' .kolor'+' .kolor'+kula).css("background-color", "#e22d2d");
        $('.sekcja'+proba+' .kolor'+' .kolor'+kula).css("transform", "scale(1)");
        
        sekcja[kula-1] = 1;
    }
    
    else if(num == 2)
    {
        $('.sekcja'+proba+' .kolor'+' .kolor'+kula).css("background-color", "#f58023");
        $('.sekcja'+proba+' .kolor'+' .kolor'+kula).css("transform", "scale(1)");
        
        sekcja[kula-1] = 2;
    }
    
    else if(num == 3)
    {
        $('.sekcja'+proba+' .kolor'+' .kolor'+kula).css("background-color", "#e1be29");
        $('.sekcja'+proba+' .kolor'+' .kolor'+kula).css("transform", "scale(1)");
        
        sekcja[kula-1] = 3;
    }
    
    else if(num == 4)
    {
        $('.sekcja'+proba+' .kolor'+' .kolor'+kula).css("background-color", "#9cc841");
        $('.sekcja'+proba+' .kolor'+' .kolor'+kula).css("transform", "scale(1)");
        
        sekcja[kula-1] = 4;
    }
    
    else if(num == 5)
    {
        $('.sekcja'+proba+' .kolor'+' .kolor'+kula).css("background-color", "#3d81c2");
        $('.sekcja'+proba+' .kolor'+' .kolor'+kula).css("transform", "scale(1)");
        
        sekcja[kula-1] = 5;
    }
    
    else
    {
        $('.sekcja'+proba+' .kolor'+' .kolor'+kula).css("background-color", "#644b9e");
        $('.sekcja'+proba+' .kolor'+' .kolor'+kula).css("transform", "scale(1)");
        
        sekcja[kula-1] = 6;
    }
    
    kula++;
    
    if(kula == 5) sprawdz();
}

function sprawdz()
{   
    for(let i=0; i<=3; i++)
    {
        if(wylosowane[i] == sekcja[i])
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
        if(checkwhite[i] == "yes" && checkwhite[0] == "yes" && wylosowane[i] == sekcja[0] && double1 != 1 && double2 != 1)
        {
            check.push("white");
            if(double1 == 5) double1 = 1;
            if(double1 != 5) double2 = 1;
        }
        
        else if(checkwhite[i] == "yes" && checkwhite[1] == "yes" && wylosowane[i] == sekcja[1] && double1 != 2 && double2 != 2)
        {
            check.push("white");
            if(double1 == 5) double1 = 2;
            if(double1 != 5) double2 = 2;
        }
        
        else if(checkwhite[i] == "yes" && checkwhite[2] == "yes" && wylosowane[i] == sekcja[2] && double1 != 3 && double2 != 3)
        {
            check.push("white");
            if(double1 == 5) double1 = 3;
            if(double1 != 5) double2 = 3;
        }
        
        else if(checkwhite[i] == "yes" && checkwhite[3] == "yes" && wylosowane[i] == sekcja[3] && double1 != 4 && double2 != 4)
        {
            check.push("white");
            if(double1 == 5) double1 = 4;
            if(double1 != 5) double2 = 4;
        }
    }
    
    for(let i=1; i<=check.length; i++)
    {
        $('.sprawdz'+proba+' .wysrodkowanie'+' .kropka'+' .kropka'+i).css("background-color", check[i-1]);
        $('.sprawdz'+proba+' .wysrodkowanie'+' .kropka'+' .kropka'+i).css("transform", "scale(1)");
    }
    
    if(check[3] == "black" && check.length == 4)
    {
        clearTimeout(s);
        winner();
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
            clearTimeout(s);
            lose();
        }
    }
}

function back()
{
    if(kula >= 2 && kula <= 4)
    {
        kula--;
        $('.sekcja'+proba+' .kolor'+' .kolor'+kula).css("transform", "scale(0)");
    }
}

function timer()
{
    sekundy++;
    
    if(sekundy >= 60)
    {
        sekundy = 0;
        minuty++;
    }
    
    if(minuty <= 9) t = "0"+minuty+":";
    else t = minuty+":";
    
    if(sekundy <= 9) t += "0"+sekundy;
    else t += sekundy;
    
    $('.czas').html(t);
    
    s = setTimeout(timer, 1000);
}

function ok()
{
    $('.alertS').css("filter", "opacity(0)");
    $('.alertS').css("pointer-events", "all");
    
    $('.conteiner').css("filter", "blur(0px)");
    $('.restart').css("pointer-events", "all");
    $('.butmenu').css("pointer-events", "all");
    $('input').css("pointer-events", "all");
    $('.alertS').css("pointer-events", "none");
    $('.ok').css("pointer-events", "none");
}

function winner()
{
    $('.alertS').css("display", "block");
    $('.alertS').css("filter", "opacity(1)");
    $('.alertS').css("pointer-events", "all");
    
    $('.conteiner').css("filter", "blur(5px)");
    $('.conteiner').css("pointer-events", "none");
    $('.butmenu').css("pointer-events", "none");
    $('.restart').css("pointer-events", "none");
    $('.ok').css("pointer-events", "all");

    $('.kolory').css("pointer-events", "none");
    $('.cofnij').css("pointer-events", "none");
    
    $('body').css("background-color", "#9cc841");
    $('.ok').css("background-color", "#9cc841");
    
    $('.c').html(t);
    $('.p').html(proba);
    $('.statusS').html("Zwyciestwo!");
    
    pokaz();
}

function lose()
{
    $('.alertS').css("display", "block");
    $('.alertS').css("filter", "opacity(1)");
    $('.alertS').css("pointer-events", "all");
    
    $('.conteiner').css("filter", "blur(5px)");
    $('.conteiner').css("pointer-events", "none");
    $('.butmenu').css("pointer-events", "none");
    $('.restart').css("pointer-events", "none");
    $('.ok').css("pointer-events", "all");

    $('.kolory').css("pointer-events", "none");
    $('.cofnij').css("pointer-events", "none");
    
    $('body').css("background-color", "#e22d2d");
    $('.ok').css("background-color", "#e22d2d");
    
    $('.c').html(t);
    $('.p').html(proba);
    $('.statusS').html("Porazka!");
    
    pokaz();
}

function pokaz()
{   
    for(let i=1; i<=4; i++)
    {
            if(wylosowane[i-1] == 1)
            {
                $('.sekcjaodp'+' .kolor'+' .kolor'+i).css("background-color", "#e22d2d");
                $('.sekcjaodp'+' .kolor'+' .kolor'+i).css("transform", "scale(1)");
            }
            
            else if(wylosowane[i-1] == 2)
            {
                $('.sekcjaodp'+' .kolor'+' .kolor'+i).css("background-color", "#f58023");
                $('.sekcjaodp'+' .kolor'+' .kolor'+i).css("transform", "scale(1)");
            }
            
            else if(wylosowane[i-1] == 3)
            {
                $('.sekcjaodp'+' .kolor'+' .kolor'+i).css("background-color", "#e1be29");
                $('.sekcjaodp'+' .kolor'+' .kolor'+i).css("transform", "scale(1)");
            }
            
            else if(wylosowane[i-1] == 4)
            {
                $('.sekcjaodp'+' .kolor'+' .kolor'+i).css("background-color", "#9cc841");
                $('.sekcjaodp'+' .kolor'+' .kolor'+i).css("transform", "scale(1)");
            }
            
            else if(wylosowane[i-1] == 5)
            {
                $('.sekcjaodp'+' .kolor'+' .kolor'+i).css("background-color", "#3d81c2");
                $('.sekcjaodp'+' .kolor'+' .kolor'+i).css("transform", "scale(1)");
            }
            
            else if(wylosowane[i-1] == 6)
            {
                $('.sekcjaodp'+' .kolor'+' .kolor'+i).css("background-color", "#644b9e");
                $('.sekcjaodp'+' .kolor'+' .kolor'+i).css("transform", "scale(1)");
            } 
    }
}

function pomocc()
{
    $('.plansza').css("transform", "translateX(-390px)");
    $('.pomoc').css("transform", "translateX(0px)");
    
    restart();
}

function powrot()
{
    $('.pomoc').css("transform", "translateX(390px)");
    $('.mainMenu').css("transform", "translateX(-390px)");
    $('.plansza').css("transform", "translateX(0px)");
    
    restart();
}

function menu()
{
    $('.pomoc').css("transform", "translateX(780px)");
    $('.mainMenu').css("transform", "translateX(0px)");
    $('.plansza').css("transform", "translateX(390px)");
    $('.main-menu').css("pointer-event", "all");

    $(".errorConnection").html("");
    $('.alertS').css("display", "none");

    restart();

    socket.emit("playerInGame", false);
}

init();