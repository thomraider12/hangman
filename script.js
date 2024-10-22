// Word selection
// New word = ["Word name", "Hint"]
var word = [
    ["Forca", "O jogo que estás a jogar agora"],
    ["Tomás Afonso", "Nome do criador deste site."],
    ["HTML", "Linguagem de marcação para criar páginas Web."],
    ["CSS", "Estilos para páginas Web"],
    ["PHP", "Uma linguagem de script de servidor muito popular."],
    ["Java", "Executa 15 mil milhões de dispositivos.\nUm programa pode ser executado no Windows, Linux e Mac"],
    ["SoloLearn", "Uma empresa onde toda a gente pode programar por diversão e partilhar."],
    ["Amor", "O que é?\nBaby don't hurt me\nDon't hurt me\nNo more"],
    ["Documento", "Muito texto num ficheiro."],
    ["Parque Infantil", "Onde as crianças da escola vão brincar."],
    ["Correr", "Usain Bolt."],
    ["Código", "var hw = 'Hello World';"],
    ["Samsung", "Uma empresa que cria telemóveis, TV, monitores, SSDs, chips de memória..."],
    ["Super Mario", "Um jogo muito popular na Nintendo 64 com um chapéu vermelho."],
    ["Estrela", "Super Mario gosta de apanhar."],
    ["Relógio", "14:12 ou 14h"],
    ["Relógio Binário", "Um relógio que só usa 0 ou 1."],
    ["Espada", "Link do Zelda tem na mão."],
    ["Rapaz", "Não é rapariga, mas?"],
    ["Rapariga", "Não é rapaz, mas?"],
    ["Feminino", "Outro nome para rapariga."],
    ["Masculino", "Outro nome para rapaz."],
    ["Smartphone", "Algo que tens sempre contigo."],
    ["Gato", "Um animal que gosta de dormir o dia todo."],
    ["Computador", "Aparelho em que programas e jogas."],
    ["Chocolate", "Doce que todos adoram."]
];

// Game keyboard
var tastatur = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

// Game memory
var select = 0
var wordLeft = []
var fail = 0

// Web-page onload
window.onload = function() {
    gId("moveKeybord").addEventListener('touchmove', function(e) {
        wH = window.innerHeight
        tY = e.touches[0].clientY
        eL = gId("tastatur")
        resY = wH - tY - eL.offsetHeight
        if(resY < 0) {
            resY = 0
        } else if(resY > wH / 2) {
            resY = wH / 2
        }
        eL.style.bottom = resY + "px"
    }, false)
    createTastur()
}

// Start game
function startGame() {
    gId("home").className = "h"
    gId("result").className = "h"
    newGame()
}

// New game
function newGame() {
    clearTastatur()
    clearPlayer()
    createWord()
}

// Clear keyboard
function clearTastatur() {
    var e = document.getElementsByClassName("b")
    for(a = 0; a < e.length; a++) {
        e[a].setAttribute("data", "")
    }
}

// Clear player
function clearPlayer() {
    fail = 0
    wordLeft = []
    gId("g0").setAttribute("data", "false")
    gId("g1").setAttribute("data", "false")
    gId("g2").setAttribute("data", "false")
    gId("g3").setAttribute("data", "false")
    gId("g4").setAttribute("data", "false")
    gId("g5").setAttribute("data", "false")
    gId("g5").setAttribute("r", "false")
    gId("g5").setAttribute("l", "false")
    gId("g6").setAttribute("data", "false")
    gId("g6").setAttribute("l", "false")
    gId("g6").setAttribute("r", "false")
    gId("hintButton").setAttribute("data", "false")
    gId("hint").style.display = "none"
}

// Get new word
function createWord() {
    var d = gId("letter")
    d.innerHTML = ""
    select = Math.floor(Math.random() * word.length)
    for(a = 0; a < word[select][0].length; a++) {
        var x = word[select][0][a].toUpperCase()
        var b = document.createElement("span")
        b.className = "l" + (x == " " ? " ls" : "")
        b.innerHTML = "&nbsp"
        b.id = "l" + a;
        d.appendChild(b)
        
        if(x != " ") {
            if(wordLeft.indexOf(x) == -1) {
                wordLeft.push(x)
            }
        }
    }
}

// Create keyboard
function createTastur() {
    var tas = gId("keybord")
    tas.innerHTML = ""
    for(a = 0; a < tastatur.length; a++) {
        var b = document.createElement("span")
        b.className = "b"
        b.innerText = tastatur[a]
        b.setAttribute("data", "")
        b.onclick = function() {
            bTas(this)
        }
        tas.appendChild(b)
    }
}

// Game check, If show next error / game end
function bTas(a) {
    if(a.getAttribute("data") == "") {
        var x = isExist(a.innerText)
        a.setAttribute("data", x)
        if(x) {
            if(wordLeft.length == 0) {
                gameEnd(true)
            }
        } else {
            showNextFail()
        }
    }
}

// If letter "X" exist
function isExist(e) {
    e = e.toUpperCase()
    var x = wordLeft.indexOf(e)
    if(x != -1) {
        wordLeft.splice(x, 1)
        typeWord(e)
        return true
    }
    return false
}

// Show next fail drawing
function showNextFail() {
    fail++
    switch(fail) {
        case 1:
            gId("g0").setAttribute("data", "true")
            break;
        
        case 2:
            gId("g1").setAttribute("data", "true")
            break;
        
        case 3:
            gId("g2").setAttribute("data", "true")
            break;
        
        case 4:
            gId("g3").setAttribute("data", "true")
            gId("hintButton").setAttribute("data", "true")
            break;
        
        case 5:
            gId("g4").setAttribute("data", "true")
            break;
        
        case 6:
            gId("g5").setAttribute("data", "true")
            break;
        
        case 7:
            gId("g5").setAttribute("l", "true")
            break;
        
        case 8:
            gId("g5").setAttribute("r", "true")
            break;
        
        case 9:
            gId("g6").setAttribute("data", "true")
            gId("g6").setAttribute("l", "true")
            break;
        
        case 10:
            gId("g6").setAttribute("r", "true")
            gameEnd(false)
            break;
    }
}

function typeWord(e) {
    for(a = 0; a < word[select][0].length; a++) {
        if(word[select][0][a].toUpperCase() == e) {
            gId("l" + a).innerText = e
        }
    }
}

// Game result
function gameEnd(e) {
    var d = gId("result")
    d.setAttribute("data", e)
    if(e) {
        gId("rT").innerText = "Ganhaste!"
        gId("rM").innerHTML = "Parabéns, encontraste a palavra!<br/><br/>Bom Trabalho!"
    } else {
        gId("rT").innerText = "Perdeste!"
        gId("rM").innerHTML = "A palavra era <br/><br/>\"" + word[select][0].toUpperCase() + "\"<br/><br/>Boa sorte da próx. vez."
    }
    d.className = ""
}

// Show hint
function hint() {
    gId("hintText").innerText = word[select][1]
    gId("hint").style.display = "block"
}

// Exit hint
function hintExit() {
    gId("hint").style.display = "none"
}

// Get HTML ID element by name
function gId(a) {
    return document.getElementById(a)
}
