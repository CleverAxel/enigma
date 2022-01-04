import { DEFAULT_ROTOR } from './rotorDefault.js';
import {choixEtPositionRotor } from './choixEtPositionRotor.js';
import { inversement } from './inversementLettre.js'

class CryptageEnigma{
    constructor(){
        this.rotorLeft = DEFAULT_ROTOR.rotors[0].map(function(array){
            return array.slice();
        });
        this.rotorMiddle = DEFAULT_ROTOR.rotors[1].map(function(array){
            return array.slice();
        });
        this.rotorRight = DEFAULT_ROTOR.rotors[2].map(function(array){
            return array.slice();
        });
    }

    setPositionOfRotor(){
        this.rotorLeft = DEFAULT_ROTOR.rotors[choixEtPositionRotor.selectedList[0]].map(function(array){
            return array.slice();
        });
        this.rotorMiddle = DEFAULT_ROTOR.rotors[choixEtPositionRotor.selectedList[1]].map(function(array){
            return array.slice();
        });
        this.rotorRight = DEFAULT_ROTOR.rotors[choixEtPositionRotor.selectedList[2]].map(function(array){
            return array.slice();
        });

        for(const INDEX in choixEtPositionRotor.positionRotor){
            switch(INDEX){
                case "left":
                    this.movePositionOfRotor(choixEtPositionRotor.positionRotor[INDEX], this.rotorLeft);
                    break;
                case "middle":
                    this.movePositionOfRotor(choixEtPositionRotor.positionRotor[INDEX], this.rotorMiddle);
                    break;
                case "right":
                    this.movePositionOfRotor(choixEtPositionRotor.positionRotor[INDEX], this.rotorRight);
                    break;
            }
        }
    }

    movePositionOfRotor(decalage, rotor){
        const SIZE_ALPHABET = 26;
        let positionAlphabet = SIZE_ALPHABET-decalage;

        let savePos = [decalage];
        for(let i = 0; i < decalage; i++){
            savePos[i] = rotor[i][0];
        }

        for(let i = 0; i < SIZE_ALPHABET-decalage; i++){
            rotor[i][0] = rotor[i+decalage][0]; 
        }

        for(let i = 0; i < decalage; i++){
            rotor[i+positionAlphabet][0] = savePos[i];
        }
    }

    converssion(currentLetter){
        choixEtPositionRotor.positionRotor.right++;

        if(choixEtPositionRotor.positionRotor.right == 26){
            choixEtPositionRotor.positionRotor.middle++;

            if(choixEtPositionRotor.positionRotor.middle == 26){
                choixEtPositionRotor.positionRotor.left++;

                if(choixEtPositionRotor.positionRotor.left == 26){
                    choixEtPositionRotor.positionRotor.left = 0;
                }
                choixEtPositionRotor.positionRotor.middle = 0;
                this.movePositionOfRotor(1, this.rotorLeft);
            }
            choixEtPositionRotor.positionRotor.right = 0;
            this.movePositionOfRotor(1, this.rotorMiddle);
        }

        currentLetter = inversement.outputInversement(currentLetter);

        let i = 0;
        while(currentLetter != this.rotorRight[i][0]){
            i++;
        }

        currentLetter = this.rotorRight[i][1];
        i = 0;

        while(currentLetter != this.rotorMiddle[i][0]){
            i++;
        }

        currentLetter = this.rotorMiddle[i][1];
        i = 0;

        while(currentLetter != this.rotorLeft[i][0]){
            i++;
        }

        currentLetter = this.rotorLeft[i][1];
        i = 0;

        /*************************************/
        
        while(currentLetter != DEFAULT_ROTOR.reflector[i][0]){
            i++;
        }

        currentLetter = DEFAULT_ROTOR.reflector[i][1];
        i = 0;
        /*************************************/

        while(currentLetter != this.rotorLeft[i][1]){
            i++;
        }

        currentLetter = this.rotorLeft[i][0];
        i = 0;

        while(currentLetter != this.rotorMiddle[i][1]){
            i++;
        }

        currentLetter = this.rotorMiddle[i][0];
        i = 0;

        while(currentLetter != this.rotorRight[i][1]){
            i++;
        }

        currentLetter = this.rotorRight[i][0];

        this.movePositionOfRotor(1, this.rotorRight);
        currentLetter = inversement.outputInversement(currentLetter);
        
        return currentLetter;
    }
}

export let cryptageEnigma = new CryptageEnigma();