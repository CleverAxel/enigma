const INPUT_TEXTE = document.querySelector('textarea[name="inputText"]');
const OUTPUT_TEXTE = document.querySelector(".output");
const SUBMIT = document.getElementById("submit");
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const CLAVIER_VIRTUEL = document.querySelectorAll(".alphabet > div");
const INPUT_TIMER = document.querySelector(".timerContainer > input");

import { choixEtPositionRotor } from './choixEtPositionRotor.js';
import { cryptageEnigma } from './cryptage.js';

class InputOutputEnigma {
    constructor() {
        this.copyPositionRotor = {
            left: 0,
            middle: 0,
            right: 0
        }

        this.timer = 300;
    }

    initClass() {
        this.inputTexte();
        this.inputTimer();
    }

    inputTimer() {
        INPUT_TIMER.addEventListener("change", () => {
            let value = parseInt(INPUT_TIMER.value);
            if (isNaN(value)) {
                INPUT_TIMER.value = this.timer / 100;
            }
            else if (value < 0) {
                INPUT_TIMER.value = 0;
                this.timer = 0;
            }
            else if (value > 10) {
                INPUT_TIMER.value = 10;
                this.timer = 1000;
            } else {
                this.timer = value * 100;
            }
        })
    }

    inputTexte() {
        SUBMIT.addEventListener("click", () => {

            let i = 0;
            OUTPUT_TEXTE.innerHTML = "";
            let texteToConvert = INPUT_TEXTE.value.toUpperCase();
            let newtexte = "";
            if (this.timer == 0) {
                for (let i = 0; i < texteToConvert.length; i++) {
                    if (this.isInAlphabet(texteToConvert[i])) {
                        newtexte += cryptageEnigma.converssion(texteToConvert[i])
                    }
                }
                OUTPUT_TEXTE.innerHTML = newtexte;
            } else {
                let idInterval = setInterval(() => {
                    if (i < texteToConvert.length) {
                        if (this.isInAlphabet(texteToConvert[i])) {
                            let lettreCryptee = cryptageEnigma.converssion(texteToConvert[i]);
                            let numeroLettre = this.positionInAlphabet(lettreCryptee);

                            CLAVIER_VIRTUEL[numeroLettre].classList.add("highlightKey");
                            setTimeout(() => {
                                CLAVIER_VIRTUEL[numeroLettre].classList.remove("highlightKey");
                            }, this.timer - 10);

                            newtexte += lettreCryptee;
                            OUTPUT_TEXTE.innerHTML = newtexte;
                        }
                        i++;
                    } else {
                        clearInterval(idInterval);
                    }
                }, this.timer);
            }
            choixEtPositionRotor.positionRotor = { ... this.copyPositionRotor };
            console.log(choixEtPositionRotor.positionRotor);
            cryptageEnigma.setPositionOfRotor();
        });
    }

    isInAlphabet(letter) {
        let i = 0;
        while (ALPHABET[i] != letter && i < ALPHABET.length) {
            i++;
        }
        if (ALPHABET[i] == letter) {
            return true;
        } else {
            return false;
        }
    }

    positionInAlphabet(letter) {
        let i = 0;
        while (ALPHABET[i] != letter) {
            i++;
        }
        return i;
    }

    savePositionRotor() {
        this.copyPositionRotor = { ...choixEtPositionRotor.positionRotor };
    }
}

export let inputOutputEnigma = new InputOutputEnigma();