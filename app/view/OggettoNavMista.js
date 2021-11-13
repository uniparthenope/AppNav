const { CssAnimationParser } = require('@nativescript/core');
const { alignSelfProperty } = require('@nativescript/core/ui/layouts/flexbox-layout');
var FunctionMath = require('~/view/FunctionMath');
var Punto_AND_Differenze = require('~/view/Punto&Differenze');
var OggettoLossodromia = require('~/view/OggettoLossodromia');


/**
 * :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 * :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 * Dichiaro di seguito tutte le funzioni utili alla risoluzione della navigazione mista
 * 
 * La navigazione mista viene affrontata nella pagina di ortodromia senza waypoints
 * 
 * Funzioni:
 * -CalcolaCamminiOrtodromie()
 * -CalcolaDeltaLambdaVertici()
 * -CalcolaRottaIniziale()
 * -CalcolaRottaFinale()
 * :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 * :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 */



function CalcolaCamminiOrtodromie(lat,latArr,paralleloLimite){
    /**
     * Funzione che determina i cammini delle due ortodromie della navigazione
     * 
     * Input:
     * -lat: vettore latitudine del punto di partenza di due componenti
     *       1-valore latitudine
     *       2-lettera
     * 
     * -latArr: vettore latitudine del punto di arrivo di due componenti
     *          1-valore latitudine
     *          2-lettera
     * 
     * -paralleloLimite: vettore latitudine del parallelo limite
     *                   1-valore latitudine
     *                   2-lettera
     * 
     * Output:
     * -ris: vettore di due dimensioni
     *       1-valore cammino della prima ortodromia espresso in miglia nautiche
     *       2-valore cammino della seconda ortodromia espresso in miglia nautiche
     */
    let ris=[];
    let d1, d2;

    switch(paralleloLimite[1]){
        case "N":
            switch(lat[1]){
                case "N":
                    d1 = Math.sin( FunctionMath.Deg2Rad(lat[0]) ) / Math.sin( FunctionMath.Deg2Rad(paralleloLimite[0]) );
                    break;
                case "S":
                    d1 = Math.sin( -FunctionMath.Deg2Rad(lat[0]) ) / Math.sin( FunctionMath.Deg2Rad(paralleloLimite[0]) );
                    break;
                default:
                    alert("Errore valutazione primo cammino navigazione mista.");
                    break;
            }

            switch(latArr[1]){
                case "N":
                    d2 = Math.sin( FunctionMath.Deg2Rad(latArr[0]) ) / Math.sin( FunctionMath.Deg2Rad(paralleloLimite[0]) );
                    break;
                case "S":
                    d2 = Math.sin( -FunctionMath.Deg2Rad(latArr[0]) ) / Math.sin( FunctionMath.Deg2Rad(paralleloLimite[0]) );
                    break;
                default:
                    alert("Errore valutazione secondo cammino navigazione mista.");
                    break;
            }
            break;
        case "S":
            switch(lat[1]){
                case "N":
                    d1 = Math.sin( FunctionMath.Deg2Rad(lat[0]) ) / Math.sin( -FunctionMath.Deg2Rad(paralleloLimite[0]) );
                    break;
                case "S":
                    d1 = Math.sin( -FunctionMath.Deg2Rad(lat[0]) ) / Math.sin( -FunctionMath.Deg2Rad(paralleloLimite[0]) );
                    break;
                default:
                    alert("Errore valutazione primo cammino navigazione mista.");
                    break;
            }

            switch(latArr[1]){
                case "N":
                    d2 = Math.sin( FunctionMath.Deg2Rad(latArr[0]) ) / Math.sin( -FunctionMath.Deg2Rad(paralleloLimite[0]) );
                    break;
                case "S":
                    d2 = Math.sin( -FunctionMath.Deg2Rad(latArr[0]) ) / Math.sin( -FunctionMath.Deg2Rad(paralleloLimite[0]) );
                    break;
                default:
                    alert("Errore valutazione secondo cammino navigazione mista.");
                    break;
            }
            break;
        default:
            alert("Errore valutazione cammini navigazione mista.");
            break;

    }//end switch(paralleloLomite)

    if(d1<=1 && d2<=1){
        ris[0] = FunctionMath.Rad2Deg( Math.acos(d1) ) * 60;
        ris[1] = FunctionMath.Rad2Deg( Math.acos(d2) ) * 60;
    }

    return ris;
}//end function CalcolaCamminiOrtodromie(...)
exports.CalcolaCamminiOrtodromie=CalcolaCamminiOrtodromie;



function CalcolaDeltaLambdaVertici(lat,latArr,paralleloLimite,lon,lonArr){
    /**
     * Funzione che determina le differenze di longitudine tra i punti di partenza
     * e arrivo e i vertici, che giaciono nel parallelo limite
     * 
     * Input:
     * -lat: vettore latitudine punto di partenza di due componenti
     *       1-valore latitudine
     *       2-lettera
     * 
     * -latArr: vettore latitudine punto di arrivo di due componenti
     *          1-valore latitudine
     *          2-lettera
     * 
     * -paralleloLimite: vettore latitudine del parallelo limite
     *                   1-valore latitudine
     *                   2-lettera
     * 
     * -lon: vettore longitudine punto di partenza di due componenti
     *       1-valore longitudine
     *       2-lettera
     * 
     * -lonArr: vettore longitudine punto di arrivo di due componenti
     *          -valore longitudine
     *          -lettera
     * 
     * Output:
     * -ris: vettore di due dimensioni
     *       1-vettore della differenza di longitudine tra punto di partenza e primo vertice, di due componenti
     *         _valore differenza longitudine
     *         _lettera
     *       2-vettore della differenza di longitudine tra punto di arrivo e secondo vertice di due componenti
     *         _valore differenza longitudine
     *         _lettera
     */
    let ris=[[],[]];

    if(lat[1]==="S"){
        lat[0]*=(-1);
    }

    if(latArr[1]==="S"){
        latArr[0]*=(-1);
    }

    if(paralleloLimite[1]==="S"){
        paralleloLimite[0]*=(-1);
    }

    ris[0][0] = Math.tan( FunctionMath.Deg2Rad(lat[0]) ) / Math.tan( FunctionMath.Deg2Rad(paralleloLimite[0]) );
    ris[0][0] = FunctionMath.Rad2Deg( Math.acos(ris[0][0]) );
    ris[1][0] = Math.tan( FunctionMath.Deg2Rad(latArr[0]) ) / Math.tan( FunctionMath.Deg2Rad(paralleloLimite[0]) );
    ris[1][0] = FunctionMath.Rad2Deg( Math.acos(ris[1][0]) );
    
    if(ris[0][0]>=180){
        ris[0][0] = 360-ris[0][0];
    }else if(ris[0][0]<0 && Math.abs(ris[0][0])>=180 ){
        ris[0][0] = 360-Math.abs(ris[0][0]);
    }else if(ris[0][0]>=0 && ris[0][0]<180){
        ris[0][0] *= 1;
    }else if(ris[0][0]<0 && Math.abs(ris[0][0])<180){
        ris[0][0] = Math.abs(ris[0][0]);
    }

    if(ris[1][0]>=180){
        ris[1][0] = 360-ris[1][0];
    }else if(ris[1][0]<0 && Math.abs(ris[1][0])>=180){
        ris[1][0] = 360-Math.abs(ris[1][0]);
    }else if(ris[1][0]>=0 && ris[1][0]<180){
        ris[1][0] *= 1;
    }else if(ris[1][0]<0 && Math.abs(ris[1][0])<180){
        ris[1][0] = Math.abs(ris[1][0]);
    }

    let deltaLambda = Punto_AND_Differenze.DeltaLambda(lon,lonArr);

    switch(deltaLambda[1]){
        case "E":
            ris[0][1] = deltaLambda[1];
            ris[1][1] = "W";
            break;
        case "W":
            ris[0][1] = deltaLambda[1];
            ris[1][1] = "E";
            break;
        default:
            alert("Errore valutazione differenza longitudine, navigazione mista.");
            break;
    }

    if(lat[0]<0){
        lat[0]=Math.abs(lat[0]);
    }

    if(latArr[0]<0){
        latArr[0]=Math.abs(latArr[0]);
    }

    if(paralleloLimite[0]<0){
        paralleloLimite[0]=Math.abs(paralleloLimite[0]);
    }

    return ris;
}//end function CalcolaDeltaLmabdaVertici(...)
exports.CalcolaDeltaLambdaVertici=CalcolaDeltaLambdaVertici;



function CalcolaRottaIniziale(lat,paralleloLimite,deltaLambda){
    /**
     * Funzione che determina la rotta iniziale della prima ortodromia della navigazione mista
     * Non si usa la funzine della determinazione della rotta iniziale dell'ortodromia, perché con la seguente si effettuano meno calcoli
     * 
     * Input:
     * -lat: vettore latitudine del punto di partenza di due componenti
     *       1-valore latitudine
     *       2-lettera
     * 
     * -paralleloLimite: vettore latitudine del parallelo limite di due componenti
     *                   1-valore latitudine
     *                   2-lettera
     * 
     * -deltaLambda: vettore della differenza di longitudine tra il punto di partenza e il primo vertice della navigazione mista di due componenti
     *               1-valore differenza
     *               2-lettera
     * 
     * Output:
     * -ris: valore rotta iniziale espressa in circolare
     */
    let ris;

    let valoreRi = Math.cos( FunctionMath.Deg2Rad(paralleloLimite[0]) ) / Math.cos( FunctionMath.Deg2Rad(lat[0]) );
    valoreRi = FunctionMath.Rad2Deg( Math.asin(valoreRi) );

    let deltaPhi = Punto_AND_Differenze.DeltaPhi(lat,paralleloLimite);

    let RiQuad = [deltaPhi[1],valoreRi,deltaLambda[1]];

    ris = FunctionMath.Quadrantale2Circolare(RiQuad);

    return ris;
}//end function CalcolaRottaIniziale(...)
exports.CalcolaRottaIniziale=CalcolaRottaIniziale;



function CalcolaRottaFinale(latArr,paralleloLimite,deltaLambda,d2){
    /**
     * Funzione che determina la rotta finale della seconda ortodromia, non sfrutto la funzione della
     * rotta finale dell'ortodromia per comodità
     * 
     * Input:
     * -latArr: vettore latitudine del punto di arrivo di due componenti
     *          1-valore latitudine
     *          2-lettera
     * 
     * -paralleloLimite: vettore latitudine del parallelo limite di due componenti
     *                   1-valore latitudine
     *                   2-lettera
     * 
     * -deltaLambda: vettore differenza longitudine tra punto di partenza e primo vertice
     *               uso questa differenza solo per la lettera associata, che è uguale alla
     *               lettera associata alla differenza di longitudine tra il punto di partenza e di arrivo
     *               Questo vettore è di due componenti
     *               1-valore differenza (NON VIENE USATO)
     *               2-lettera
     * 
     * -d2: valore cammino tra il secondo vertice e il punto di arrivo espresso in miglia nautiche
     * 
     * Output:
     * -ris: valore rotta finale espresso in circolare
     */
    let ris;

    if(latArr[1]==="S"){
        latArr[0]*=(-1);
    }

    if(paralleloLimite[1]==="S"){
        paralleloLimite[0]*=(-1);
    }

    let beta, num, den;

    num = Math.cos( FunctionMath.Deg2Rad(90-paralleloLimite[0]) ) - ( Math.cos( FunctionMath.Deg2Rad(d2/60) )*Math.cos( FunctionMath.Deg2Rad(90-latArr[0]) ) );
    den = Math.sin( FunctionMath.Deg2Rad(d2/60) ) * Math.sin( FunctionMath.Deg2Rad(90-latArr[0]) );

    beta = FunctionMath.Rad2Deg( Math.acos(num/den) );

    switch(deltaLambda[1]){
        case "E":
            ris = 180-beta;
            break;
        case "W":
            ris = 180+beta;
            break;
        default:
            alert("Errore determinazione rotta finale, navigazione mista.");
            break;
    }

    if(latArr[0]<0){
        latArr[0]=Math.abs(latArr[0]);
    }

    if(paralleloLimite[0]<0){
        paralleloLimite[0]=Math.abs(paralleloLimite[0]);
    }

    return ris;
}//end function CalcolaRottaFinale(...)
exports.CalcolaRottaFinale=CalcolaRottaFinale;



function ControllaVertice(Ri,Rf){
    /**
     * Funzione che controlla se il vertice giace tra il punto di partenza e di arrivo
     * il controllo viene effettuato verificando che il valore semicircolare di rotta
     * iniiziale e finale siano discordi
     * 
     * Input:
     * -Ri: valore rotta iniziale dell'ortodromia
     * 
     * -Rf: valore di rotta finale dell'ortdromia
     * 
     * Output:
     * -bug: viene assegnato solo il valore di bug
     */
    let bug;

    let RiSemi, RfSemi;

    if( Ri>=0 && Ri<=180 ){
        RiSemi = Ri;
    }else if( Ri>180 && Ri<360 ){
        RiSemi = 360-Ri;
    }

    if( Rf>=0 && Rf<=180 ){
        RfSemi = Rf;
    }else if( Rf>180 && Rf<360 ){
        RfSemi = 360-Rf;
    }

    if( RiSemi<90 && RfSemi<90 ){
        bug = 2;
    }else if( (RiSemi>90 && RiSemi<180 ) && (RfSemi>90 && RfSemi<180) ){
        bug = 2;
    }else{
        bug = 0;
    }

    return bug;

}//end function COntrollaVertice(...)
exports.ControllaVertice=ControllaVertice;



function RisolviNavMista(lat,lon,latArr,lonArr,Ri,Rf,latVertice,lonVertice,paralleloLimite,deltaLambda){
    /**
     * Funzione che risolve la navigazione mista
     * 
     * Input:
     * -lat: vettore latitudine del punto di partenza di due componenti
     *       1-valore latitudine
     *       2-lettera
     * 
     * -lon: vettore longitudine del punto di partenza di due componenti
     *       1-valore longitudine
     *       2-lettera
     * 
     * -latArr: vettore latitudine del punto di arrivo di due componenti 
     *          1-valore latitudine
     *          2-lettera
     * 
     * -lonArr: vettore longitudine del punto di arrivo di due componenti
     *          1-valore longitudine
     *          2-lettera
     * 
     * -Ri: valore rotta iniziale ortodromica espressa in circolare
     * 
     * -Rf: valore rotta finale ortodromica espressa in circolare
     * 
     * -latVertice: vettore latitudine vertice di due componenti
     *              1-valore latitudine
     *              2-lettera
     * 
     * -lonVertice: vettore longitudine vertice di due componenti
     *              1-valore longitudine
     *              2-lettera
     * 
     * -paralleloLimite: vettore latitudine del parallelo limite di due componenti
     *                   1-valore latitudine
     *                   2-lettera
     * 
     * -deltaLambda: vettore differenza longitudine tra punto partenza e arrivo di tre componenti
     *               1-valore differenza
     *               2-lettera
     *               3-lettera a monte di correzioni (NON VIENE USATA)
     * 
     * Output:
     * -ris: vettore multidimensionale
     */
    let ris=[];

    let cammini = CalcolaCamminiOrtodromie(lat,latArr,paralleloLimite);
    let RiMista = CalcolaRottaIniziale(lat,paralleloLimite,deltaLambda);
    let deltaLambdaVertici = CalcolaDeltaLambdaVertici(lat,latArr,paralleloLimite,lon,lonArr);
    let lonV1 = Punto_AND_Differenze.CalcolaLongitudineArrivo(lon,deltaLambdaVertici[0]);
    let lonV2 = Punto_AND_Differenze.CalcolaLongitudineArrivo(lonArr,deltaLambdaVertici[1]);
    //let deltaLambdaV1V2 = Punto_AND_Differenze.DeltaLambda(lonV1,lonV2);
    let risParallelo = OggettoLossodromia.NavigazioneParalleloSecondoProblema(paralleloLimite,lonV1,lonV2,0);
    let RfMista = CalcolaRottaFinale(latArr,paralleloLimite,deltaLambdaVertici[0],cammini[1]);

    ris[0] = cammini[0]; //cammino prima ortodromia
    ris[1] = cammini[1]; //cammino seconda ortodromia
    ris[2] = RiMista;
    ris[3] = lonV1;
    ris[4] = lonV2;
    ris[5] = risParallelo[0]; //cammino arco di parallelo
    ris[6] = risParallelo[1]; //rotta arco di parallelo
    ris[7] = RfMista;

    return ris;
}//end function RisolviNavMista(...)
exports.RisolviNavMista=RisolviNavMista;



function SetOutput(ris){
    /**
     * Funzione che setta gli output da mostrare all'utente per la navigazione mista
     * 
     * Input:
     * -ris: multiarray fornito dalla function precedente
     * 
     * Output:
     * -out: stringa da mostrare all'utente
     */
    let out;

    let Ri = FunctionMath.CorreggiRoundOffRotte(ris[2]);
    let longitudeV1 = FunctionMath.Gradi2Primi( FunctionMath.CorreggiRoundOff(ris[3][0]) ); //vettore contenente gradi e primi di longitudine del primo vertice
    let longitudeV2 = FunctionMath.Gradi2Primi( FunctionMath.CorreggiRoundOff(ris[4][0]) ); //vettore contenente gradi e primi di longitudine del secondo vertice
    let Rf = FunctionMath.CorreggiRoundOffRotte(ris[7]);

    out = `Prima Ortodromia
Cammino: ${ris[0].toFixed(2)}NM

Rotta Iniziale: ${Ri.toFixed(2)}°


Arco Lossodromico
Cammino: ${ris[5].toFixed(2)}NM

Rotta: ${ris[6].toFixed(2)}°

Longitudine 1° Vertice: ${longitudeV1[0]}° ${longitudeV1[1].toFixed(2)}' ${ris[3][1]}

Longitudine 2° Vertice: ${longitudeV2[0]}° ${longitudeV2[1].toFixed(2)}' ${ris[4][1]}


Seconda Ortodromia
Cammino: ${ris[1].toFixed(2)}NM

Rotta Finale: ${Rf.toFixed(2)}°`;

    return out;
}//end function SetOutput(...)
exports.SetOutput=SetOutput;