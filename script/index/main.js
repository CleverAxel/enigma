const POSSIBILITIES = document.querySelectorAll(".possibilities > h2 > span");
const SPEED = 25;
const MAX = 20;

function affichageCorrige(number){
    if(number < 10){
        return "00" + number;
    }
    if(number < 100){
        return "0" + number;
    } else{
        return number;
    }
}

class AnimateNumber{
    constructor(indice, nbrMax){
        this.indice = indice;
        this.nbrMax = nbrMax;
    }

    initClass(){
        this.startAnimation();
    }

    startAnimation(){
        let current = 0;
        let IDinterval = setInterval(() => {
            if(current > this.nbrMax){
                POSSIBILITIES[this.indice].innerHTML = affichageCorrige(this.nbrMax);
                clearInterval(IDinterval);
            } else{
                current += Math.floor(Math.random() * MAX);
                POSSIBILITIES[this.indice].innerHTML = affichageCorrige(current);
            }
        }, SPEED);
    }
}

let animateNumber = new Array(POSSIBILITIES.length)

for(let i = 0; i < POSSIBILITIES.length-1; i++){
    let nbrMax = parseInt(POSSIBILITIES[i].getAttribute("number"));
    animateNumber[i] = new AnimateNumber(i, nbrMax);
    animateNumber[i].initClass();
}


