const INPUT_INVERSEMENT_LETTRE = document.querySelectorAll(".inputLettre");
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
class Inversement{
    constructor(){
        this.tabInversement = [
            [null, null],
            [null, null],
            [null, null],
            [null, null],
            [null, null],
            [null, null],
            [null, null],
            [null, null],
            [null, null],
            [null, null]
        ];
    }

    inputInversement(){
        this.reset()
        for(let i = 0; i < INPUT_INVERSEMENT_LETTRE.length; i+=2){
            if(INPUT_INVERSEMENT_LETTRE[i].value != "" && INPUT_INVERSEMENT_LETTRE[i+1].value != "" && INPUT_INVERSEMENT_LETTRE[i].value != INPUT_INVERSEMENT_LETTRE[i+1].value){
                if(this.isInAlphabet(INPUT_INVERSEMENT_LETTRE[i].value) && this.isInAlphabet(INPUT_INVERSEMENT_LETTRE[i+1].value)){
                    if(this.notInTab(INPUT_INVERSEMENT_LETTRE[i].value) && this.notInTab(INPUT_INVERSEMENT_LETTRE[i+1].value)){
                        let calculLigne = parseInt(i / 2);
                        this.tabInversement[calculLigne][0] = INPUT_INVERSEMENT_LETTRE[i].value.toUpperCase();
                        this.tabInversement[calculLigne][1] = INPUT_INVERSEMENT_LETTRE[i+1].value.toUpperCase();
                    }
                }
            }
        }
    }

    reset(){
        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 2; j++){
                this.tabInversement[i][j] = null;
            }
        }
    }

    isInAlphabet(lettre){
        lettre = lettre.toUpperCase();
        let i = 0;
        while(lettre != ALPHABET[i] && i < ALPHABET.length){
            i++;
        }

        if(lettre == ALPHABET[i]){
            return true;
        }
        return false;
    }

    notInTab(lettre){
        lettre = lettre.toUpperCase();
        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 2; j++){
                if(lettre == this.tabInversement[i][j]){
                    return false;
                }
            }
        }
        return true;
    }

    outputInversement(lettre){
        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 2; j++){
                if(lettre == this.tabInversement[i][j]){
                    if(j == 0){
                        lettre = this.tabInversement[i][1];
                    } else{
                        lettre = this.tabInversement[i][0];
                    }
                    return lettre;
                }
            }
        }
        return lettre;
    }
}

export let inversement = new Inversement();