import { inversement } from './inversementLettre.js'
import { cryptageEnigma } from './cryptage.js'
import {inputOutputEnigma} from './inputOutputTexte.js';
const SETTINGS = document.getElementById("settings");
const MENU_CONFIG = document.querySelector(".menuConfig");

const CHOIX_ROTOR = document.querySelectorAll(".choixRotor");
const OUTPUT_CHOIX_ROTOR = document.querySelectorAll(".numeroRotorChoisi > div");

const SAVE = document.getElementById("save");
const CANCEL = document.getElementById("cancel");

const RANDOM_LETTER = document.getElementById("randomLetter");

const INPUT_TEXTE = document.querySelector('textarea[name="inputText"]');
const OUTPUT_TEXTE = document.querySelector(".output");

class ChoixEtPositionRotor{
    constructor(){
        this.selectedOutput = 0;
        this.selectedList = [0,1,2];
        this.positionRotor = {
            left : 0,
            middle : 0,
            right : 0
        };
    }

    initClass(){
        this.saveSettings();
        this.choixRotor();
        this.choixOutput();
        this.openSettings();
        this.closeSettings();
        this.randomLetter();
    }

    setActiveOutput(DomElement){
        for(let i = 0; i < OUTPUT_CHOIX_ROTOR.length; i++){
            OUTPUT_CHOIX_ROTOR[i].classList.remove("numeroRotorChoisiActive");
        }
        DomElement.classList.add("numeroRotorChoisiActive");
    }

    whichElementPressed(DomElement, arrayDomElement){
        let i = 0;
        while(arrayDomElement[i] != DomElement){
            i++;
        }
        return i;
    }

    isSelectedFree(numeroChoisi){
        let i = 0;
        let found = false;
        while(!found && i < this.selectedList.length){
            if(numeroChoisi == this.selectedList[i]){
                found = true;
            }else{
                i++;
            }
        }
        if(found){
            return i;
        } else{
            return -1;
        }
    }

    choixRotor(){
        for(let i = 0; i < CHOIX_ROTOR.length; i++){
            CHOIX_ROTOR[i].addEventListener("click", () =>{
                let numeroChoisi = this.whichElementPressed(CHOIX_ROTOR[i], CHOIX_ROTOR);
                let answer = this.isSelectedFree(numeroChoisi);
                if(answer == -1){
                    this.selectedList[this.selectedOutput] = numeroChoisi;
                    OUTPUT_CHOIX_ROTOR[this.selectedOutput].innerHTML = CHOIX_ROTOR[numeroChoisi].innerHTML;
                } else{
                    OUTPUT_CHOIX_ROTOR[answer].style.backgroundColor = "red";
                    setTimeout(() => {
                        OUTPUT_CHOIX_ROTOR[answer].style.backgroundColor = "white";
                    }, 500);
                }
            });
        }
    }

    choixOutput(){
        for(let i = 0; i < OUTPUT_CHOIX_ROTOR.length; i++){
            OUTPUT_CHOIX_ROTOR[i].addEventListener("click", () =>{
                this.setActiveOutput(OUTPUT_CHOIX_ROTOR[i]);
                this.selectedOutput = this.whichElementPressed(OUTPUT_CHOIX_ROTOR[i], OUTPUT_CHOIX_ROTOR);
            });
        }
    }

    setGetValues(){
        this.savePositionRotor();
        inversement.inputInversement();
        cryptageEnigma.setPositionOfRotor();
    }

    savePositionRotor(){
        const POSITION_ROTOR = document.querySelectorAll(".positionRotorChoisi > input");
        for(let i = 0; i < POSITION_ROTOR.length; i++){
            let value = parseInt(POSITION_ROTOR[i].value);
            if(value < 0 || value > 25 || isNaN(value)){
                value = 0;
            }
            switch(i){
                case 0:
                    this.positionRotor.left = value;
                    break;
                case 1:
                    this.positionRotor.middle = value;
                    break;
                case 2:
                    this.positionRotor.right = value;
                    break;
            }
        }
    }
    /**************PARTIE POUR EVENT LISTENER*************** */
    openSettings(){
        SETTINGS.addEventListener("click", () =>{
            MENU_CONFIG.classList.remove("hideElement");
        });
    }

    closeSettings(){
        window.addEventListener("click", (e) =>{
            if(e.target == MENU_CONFIG){
                MENU_CONFIG.classList.add("hideElement");
            }
        });
        CANCEL.addEventListener("click", (e) =>{
            MENU_CONFIG.classList.add("hideElement");
        });
    }

    saveSettings(){
        SAVE.addEventListener("click", () =>{
            this.setGetValues();
            inputOutputEnigma.savePositionRotor();
            /*INPUT_TEXTE.value = "";
            OUTPUT_TEXTE.innerHTML = "";*/
            MENU_CONFIG.classList.add("hideElement");
        });
    }

    randomLetter(){
        RANDOM_LETTER.addEventListener("click", () =>{
            const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const INPUT_INVERSEMENT_LETTRE = document.querySelectorAll(".inputLettre");
            let arrayLetter = ALPHABET.split("");
            
            for(let i = 0; i < INPUT_INVERSEMENT_LETTRE.length; i++){
                let indice = Math.floor(Math.random() * arrayLetter.length);
                let letter = arrayLetter[indice];
                arrayLetter.splice(indice, 1);
                INPUT_INVERSEMENT_LETTRE[i].value = letter;
            }
        });
    }
}

export let choixEtPositionRotor = new ChoixEtPositionRotor();