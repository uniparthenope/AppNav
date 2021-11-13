
/**
 * :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 Dichiaro tutte le funzioni utili alla costruzioni del punto e differenze, quali:

 -SetLatitudine()
 -SetLongitudine()
 -DeltaPhi()
 -DeltaLambda()
 -CalcolaLatitudineArrivo()
 -CalcolaLongitudineArrivo()
 -Colatitudine()
 -Colongitudine()
 -CalcolaAntimeridiano()

 :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 */

function SetLatitudine(a,b,lettera){
    /**
     * Funzione che determina la latitudine di un punto.
     * 
     * Input:
     * -a: gradi
     * -b: primi
     * -lettera: lettera coordinata alla latitudine
     * 
     * Output:
     * -ris: vettore formato da due componenti:
     *       1: latitudine espressa in gradi decimali
     *       2: lettera coordinata
     */

    let ris=[];

    if (a===90){
        ris[0]=a;
        ris[1]=lettera;

    }else if(a<90){
        if (b===60){
            ris[0]=a+1;
            ris[1]=lettera;
        }else if(b<60){
            ris[0]=a+(b/60);
            ris[1]=lettera;
        }else if(b>0){
            alert("Valore primi maggiore di 60.");
        }

    }else if(a>90){
        alert("Valore gradi latitudine maggiore di 90.");
    }else{
        alert("Errore valutazione latitudine.");
    }

    return ris;

}//end function SetLatitudine(...)
exports.SetLatitudine=SetLatitudine;



function SetLongitudine(a,b,lettera){
    /**
     * Funzione che determina la longitudine di un punto
     * 
     * Input:
     * -a: gradi
     * -b: primi
     * -lettera: lettera coordinata alla longitudine
     * 
     * Output:
     * -ris: vettore formato da due componenti:
     *       1: longitudine espressa in gradi decimali
     *       2: lettera coordinata
     */
    
    let ris=[];

    if(a===180){
        ris[0]=a;
        ris[1]=lettera;

    }else if(a<180){
        if(b===60){
            ris[0]=a+1;
            ris[1]=lettera;
        }else if(b<60){
            ris[0]=a+(b/60);
            ris[1]=lettera;
        }else if(b>60){
            alert("Valore primi maggiore di 60.");
        }

    }else if(a>180){
        alert("Valore gradi longitudine maggiore di 180.");
    }else{
        alert("Errore valutazione longitudine.");
    }

    return ris;

}//end function SetLongitudine(...)
exports.SetLongitudine=SetLongitudine;



function DeltaPhi(vettA,vettB){
    /**
     * Funzione che determina la differenza di latitudine tra due punti
     * 
     * IMPORTANTE: l'unità di misura dell'output dipende dall'ingresso, nel caso si inseriscono le latitudini crescenti l'output è in primi sessadecimali
     * 
     * Input:
     * -vettA: vettore del punto di partenza di due componenti:
     *         1-latitudine
     *         2-lettera
     * 
     * -vettB: vettore del punto di arrivo di due componenti:
     *         1-latitudine
     *         2-lettera
     * 
     * Output:
     * -ris: vettore di due componenti:
     *       1-valore differenza 
     *       2-lettera associata
     */

     var ris=[];

     switch (vettA[1]){

         case "N":
             switch (vettB[1]){
                 case "N":
                     ris[0] = vettB[0] - vettA[0];
                     if (ris[0]<0){
                         ris[1] = "S";
                         ris[0] = Math.abs(ris[0]);
                     }else{
                         ris[1] = "N";
                     }
                     break;

                    case "S":
                        ris[0] = (-vettB[0]) - vettA[0];
                        if (ris[0]<0){
                            ris[1] = "S";
                            ris[0] = Math.abs(ris[0]);
                        }else{
                            ris[1] = "N";
                        }
                     break;
             }//end switch(vettB)
             break;

            case "S":
                switch (vettB[1]){
                    case "N":
                        ris[0] = vettB[0] - (-vettA[0]);
                        if (ris[0]<0){
                            ris[1] = "S";
                            ris[0] = Math.abs(ris[0]);
                        }else{
                            ris[1] = "N";
                        }
                        break;

                    case "S":
                        ris[0] = (-vettB[0]) - (-vettA[0]);
                        if (ris[0]<0){
                            ris[1] = "S";
                            ris[0] = Math.abs(ris[0]);
                        }else{
                            ris[1] = "N";
                        }
                        break;
                }//end switch(vettB)
                break;

            default:
                alert("Errore determinazione differenza latitudine.");
                break;

     }//end switch(vettA)

     return ris;
}//end function DeltaPhi(...)
exports.DeltaPhi=DeltaPhi;



function DeltaLambda(vettA,vettB){
    /**
     * Funzione che determina la differenza di longitudine tra due punti
     * 
     * Input:
     * -vettA: vettore del punto di partenza di due componenti:
     *         1-longitudine
     *         2-lettera
     * 
     * -vettB: vettore del punto di arrivo di due componenti:
     *         1-longitudine
     *         2-lettera
     * 
     * Output:
     * -ris: vettore di tre componenti:
     *       1-valore differenza in gradi decimali
     *       2-lettera associata a valle di correzioni (lettera finale se la differenza è maggiore di 180)
     *       3-lettera associata a monte di correzioni (lettera quando la differenza non viene corretta, è l'ultimo elemento del vettore perché non viene usata spesso)
     */

     let ris=[];

     switch (vettA[1]){
         case "E":
             switch (vettB[1]){
                 case "E":
                     ris[0] = vettB[0] - vettA[0];
                     if (ris[0] <= 180){
                         ris[1] = "E";
                         ris[2] = ris[1];
                     }else if((ris[0]<0) && (Math.abs(ris[0])<=180) ){
                         ris[1] = "W";
                         ris[0] = Math.abs(ris[0]);
                         ris[2] = ris[1];
                     }
                     break;

                    case "W":
                        ris[0] = (-vettB[0]) - vettA[0];
                        if ((ris[0]<0) && (Math.abs(ris[0])<=180)){
                            ris[1] = "W";
                            ris[0] = Math.abs(ris[0]);
                            ris[2] = ris[1];
                        }else if((ris[0]<0) && (Math.abs(ris[0])>180)){
                            ris[2] = "W";
                            ris[0] = 360-Math.abs(ris[0]);
                            ris[1] = "E";
                        }
                        break;
             }//end switch(vettB)
             break;

            case "W":
                switch (vettB[1]){
                    case "E":
                        ris[0] = vettB[0] - (-vettA[0]);
                        if (ris[0]<=180){
                            ris[1] = "E";
                            ris[2] = ris[1];
                        }else if (ris[0]>180){
                            ris[2] = "E";
                            ris[0] = 360-ris[0];
                            ris[1] = "W";
                        }
                        break;

                    case "W":
                        ris[0] = (-vettB[0]) - (-vettA[0]);
                        if ((ris[0]<0) && (Math.abs(ris[0])<=180)){
                            ris[1] = "W";
                            ris[0] = Math.abs(ris[0]);
                            ris[2] = ris[1];
                        }else if ((ris[0]>0) && (ris[0]<=180)){
                            ris[1] = "E";
                            ris[2] = ris[1];
                        }
                        break;
                }//end switch(vettB)
                break;

            default:
                alert("Errore determinazione differenza di longitudine.");
                break;
     }//end switch(vettA)

     return ris;

}//end function DeltaLambda(...)
exports.DeltaLambda=DeltaLambda;



function CalcolaLatitudineArrivo(vettA,vettB){
    /**
     * Funzione che determina la latitudine di arrivo, una volta nota la latitudine di partenza e la differenza
     * 
     * Input:
     * -vettA: vettore del punto di partenza di due componenti
     *         1-valore latitudine in gradi decimali
     *         2-lettera
     * 
     * -vettB: vettore della differenza di latitudine di due componenti
     *         1-valore differenza in gradi decimali
     *         2-lettera
     * 
     * Ouput:
     * -ris: vettore di latitudine del punto di arrivo di due componenti:
     *       1-valore latitudine in gradi decimali
     *       2-lettera
     */

     let ris=[];

     switch (vettA[1]){
         case "N":
             switch (vettB[1]){
                 case "N":
                     ris[0] = vettA[0] + vettB[0];
                     ris[1] = "N";
                     break;

                    case "S":
                        ris[0] = vettA[0] - vettB[0];
                        if (ris[0]<0){
                            ris[1] = "S";
                            ris[0] = Math.abs(ris[0]);
                        }else{
                            ris[1] = "N";
                        }
                        break;
             }//end switch(vettB)
             break;

            case "S":
                switch (vettB[1]) {
                    case "N":
                        ris[0] = (-vettA[0]) + vettB[0];
                        if (ris[0]<0){
                            ris[1] = "S";
                            ris[0] = Math.abs(ris[0]);
                        }else{
                            ris[1] = "N";
                        }
                        break;

                    case "S":
                        ris[0] = (-vettA[0]) - vettB[0];
                        if (ris[0]<0){
                            ris[1] = "S";
                            ris[0] = Math.abs(ris[0]);
                        }else{
                            ris[1] = "N";
                        }
                        break;
                }//end switch(vettB)
                break;

            default:
                alert("Errore determinazione latitudine arrivo.");
                break;
     }//end switch(vettA)

     return ris;

}//end function CalcolaLatitudineArrivo(...)
exports.CalcolaLatitudineArrivo=CalcolaLatitudineArrivo;



function CalcolaLongitudineArrivo(vettA,vettB){
    /**
     * Funzioneche determina la longitudine del punto di arrivo una volta nota la longitudine del punto di partenza e la differnza
     * 
     * Input:
     * -vetA: vettore del punto di partenza di due componenti
     *         1-valore longitudine in gradi decimali
     *         2-lettera
     * 
     * -vettB: vettore della differenza di longitudine di tre componenti
     *         1-valore differenza in gradi decimali
     *         2-lettera
     *         3-lettera (NON USARE QUESTO ELEMENTO QUI)
     * 
     * Ouput:
     * -ris: vettore di longitudine del punto di arrivo di due componenti:
     *       1-valore longitudine in gradi decimali
     *       2-lettera
     */

     var ris=[];

     switch (vettA[1]){
         case "E":
             switch (vettB[1]){
                 case "E":
                     ris[0] = vettA[0] + vettB[0];
                     if (ris[0]>180){
                         ris[1] = "W";
                         ris[0] = 360-ris[0];
                     }else{
                         ris[1] = "E";
                     }
                     break;

                    case "W":
                        ris[0] = vettA[0] - vettB[0];
                        if (ris[0]<0){
                            ris[1] = "W";
                            ris[0] = Math.abs(ris[0]);
                        }else{
                            ris[1] = "E";
                        }
                        break;
             }//end switch(vettB)
             break;

            case "W":
                switch (vettB[1]){
                    case "E":
                        ris[0] = (-vettA[0]) + vettB[0];
                        if (ris[0]<0){
                            ris[1] = "W";
                            ris[0] = Math.abs(ris[0]);
                        }else{
                            ris[1] = "E";
                        }
                        break;

                    case "W":
                        ris[0] = (-vettA[0]) - vettB[0];
                        if ((ris[0]<0) && (Math.abs(ris[0])<=180)){
                            ris[1] = "W";
                            ris[0] = Math.abs(ris[0]);
                        }else if ((ris[0]<0) && (Math.abs(ris[0])>180)){
                            ris[1] = "E";
                            ris[0] = 360-Math.abs(ris[0]);
                        }
                        break;
                }//end switch(vettB)
                break;

            default:
                alert("Errore determinazione longitudine arrivo.");
                break;

     }//end switch(vettA)

     return ris;

}//end function CalcolaLongitudineArrivo(...)
exports.CalcolaLongitudineArrivo=CalcolaLongitudineArrivo;



function Colatitudine(vetA){
    /**
     * Funzione che calcola la colatitudine di un punto
     * 
     * Input:
     * -vetA: vettore di latitudine del punto di due componenti
     *        1-valore latitudineespressa in gradi decimali
     *        2-lettera, non viene usata
     * 
     * Output:
     * -ris: valore colatitudine in gradi decimali
     */

     let ris;

     ris = 90-vetA[0];

     return ris;
}//end function Colatitudine(...)
exports.Colatitudine=Colatitudine;



function Colongitudine(vetA){
    /**
     * Funzione che calcola la colongitudine di un punto
     * 
     * Input:
     * -vetA: vettore di longitudine di due componenti
     *        1-valore longitudine
     *        2-lettera
     * 
     * Output:
     * -ris: valore colongitudine
     */
    let ris;

    ris = 180-vetA[0];

    return ris;
}//end function Colongitudine(...)
exports.Colongitudine=Colongitudine;



function CalcolaAntimeridiano(vetA){
    /**
     * Funzione che determina l'antimeridiano da quello passato in input
     * 
     * Input:
     * -vetA: vettore di longitudine del meridiano di due componenti
     *        1-valore longitudine in gradi decimali
     *        2-lettera
     * 
     * Output:
     * -ris: vettore di longitudine dell'antimeridiano di ude componenti
     *       1-valore longitudine
     *       2-lettera
     */

    let ris=[];

    switch(vetA[1]){
        case "E":
            ris[0] = vetA[0]+180;
            if(ris[0]>=180){
                ris[0] = 360-ris[0];
                ris[1] = "W";
            }else{
                ris[1] = "E";
            }
            break;
        case "W":
            ris[0] = (-vetA[0])+180;
            if(ris[0]>=0){
                ris[1] = "E";
            }else{
                ris[1] = "W";
                ris[0] = Math.abs(ris[0]);
            }
            break;
        default:
            alert("Errore valutazione antimeridiano.");
            break;
    }

    return ris;
}//end function CalcolaAntimeridiano(...)
exports.CalcolaAntimeridiano=CalcolaAntimeridiano;