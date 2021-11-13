

/*
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
File contenente tutte le funzioni matematiche non presenti in javascript

-Deg2Rad(...)
-Rad2Deg(...)
-CorreggiRoundOff(...)
-CorreggiRoundOffRotte(...)
-Circolare2Quadrantale(...)
-Quadrantale2Circolare(...)
-Gradi2Primi(...)
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
*/ 

function Deg2Rad(num){
    //trasforma il parametro num da gradi in radianti

    let ris = (num * Math.PI) / 180;

    return ris;
}
exports.Deg2Rad=Deg2Rad;



function Rad2Deg(num){
    //trasforma il parametro num da radianti in gradi

    let ris = (num * 180) / Math.PI;

    return ris;
}
exports.Rad2Deg=Rad2Deg;



function CorreggiRoundOff(num){
    //funzione che corregge eventuale round-off, funzione che sarà usata prima di fornire gli output

    let ris, differenza, primi;
    let decimali=num-Math.floor(num);

    let int;
    if (decimali>0.5){
        int=Math.floor(num)+1;
    }else if(decimali===0.5){
        int=num;
    }else{
        int=Math.floor(num);
    }

    differenza=Math.abs(int-num);
    if (differenza < (1e-5) ){
        ris=int;
    }else{
        primi=(num-Math.floor(num))*60;
        if(Math.abs(60-primi)<(1e-2)){
            ris=Math.floor(num)+1;
        }else{
            ris=num;
        }
    }

    return ris;
}
exports.CorreggiRoundOff=CorreggiRoundOff;



function CorreggiRoundOffRotte(num){
    //funzone che corregge errore di round-off per le rotte, da usare prima della rappresentazione
    let ris, differenza;
    let decimali=num-Math.floor(num);

    let int;
    if (decimali>0.5){
        int=Math.floor(num)+1;
    }else {
        int=Math.floor(num);
    }

    differenza=Math.abs(int-num);
    if (differenza < 0.01){
        ris=int;
    }else {
        ris=num;
    }

    return ris;
}
exports.CorreggiRoundOffRotte=CorreggiRoundOffRotte;



function Circolare2Quadrantale(num){
    /**
     * Funzione che converte in rotta quadrantale
     * 
     * Input:
     * -num: valore di rotta circolare espressa in gradi decimali
     * 
     * Output:
     * -ris: vettore di rotta quadrantale di tre componenti
     *       1-lettera associata alla differenza di latitudine
     *       2-VALORE DELLA ROTTA QUADRANTALE
     *       3-lettera associata alla differenza di longitudine
     */

     var ris=[];

     if( (num>0) && (num<90) ){
         ris[0] = "N";
         ris[1] = num;
         ris[2] = "E";
     }else if( num===90 ){
         ris[1] = num;
     }else if ( (num>90) && (num<180) ) {
         ris[0] ="S";
         ris[1] = 180-num;
         ris[2] ="E";
     }else if ( num===180 ) {
         ris[1] = num;
     }else if ( (num>180) && (num<270) ) {
         ris[0] = "S";
         ris[1] = num-180;
         ris[2] = "W";
     }else if ( num===270 ) {
         ris[1] = num;
     }else if ( (num>270) && (num<360) ) {
         ris[0] = "N";
         ris[1] = 360-num;
         ris[2] = "W";
     }else if ( num===360 || num===0 ) {
         ris[1] = num;
     }else{
         alert("Errore determinazione rotta quadrantale.");
     }

     return ris;
}//end function RottaQuadrantale(...)
exports.Circolare2Quadrantale=Circolare2Quadrantale;



function Quadrantale2Circolare(vett){
    /**
     * Funzione che trasforma il valore della rotta in gradi circolari
     * 
     * Input:
     * -vett: vettore della rotta quadrantale di tre componenti
     *        1-lettera differenza latitudine
     *        2-VALORE ROTTA QUADRANTALE
     *        3-lettera differenza longitudine
     * 
     * Output:
     * -ris: valore rotta in circolare
     */
    let ris;

    switch (vett[0]){
        case "N":
            switch (vett[2]){
                case "E":
                    ris = vett[1];
                    break;

                case "W":
                    ris = 360-vett[1];
                    break;
            }
            break;

        case "S":
            switch (vett[2]){
                case "E":
                    ris = 180-vett[1];
                    break;

                case "W":
                    ris = vett[1]+180;
                    break;
            }
            break;
        
        default:
            alert("Errore valutazione rotta da quadrantale a circolare.");
            break;
    }//end switch(vett[0])

    return ris;
}//end function Quadrantale2Circolare(...)
exports.Quadrantale2Circolare=Quadrantale2Circolare;



function Gradi2Primi(num){
    /**
     * Funzione che trasforma il valore in input da gradi decimali in gradi e primi
     * 
     * Input:
     * -num: valore dei gradi decimali
     * 
     * Output:
     * -ris: vettore di due componenti
     *       1-gradi
     *       2-primi
     */

    var ris=[];

    num = CorreggiRoundOff(num);

    ris[0] = Math.floor(num);
    ris[1] = (num-ris[0])*60;

    return ris;
}//end function Grgadi2Primi(...)
exports.Gradi2Primi=Gradi2Primi;