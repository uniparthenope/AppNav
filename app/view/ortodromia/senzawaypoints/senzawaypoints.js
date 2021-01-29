const fromObject = require("tns-core-modules/data/observable").fromObject;

//___________________________________________________________
//___________________________________________________________
//DICHIARO DI SEGUITO TUTTE LE VARIABILI UTILI


//di seguito dichiaro le variabili per ricevere gli inut dell'utente
// SECONDO PROBLEMA DI ORTODROMIA
var idGradiLat, idPrimiLat, idLetteraLat;
var idGradiLon, idPrimiLon, idLetteraLon;
var idGradiLatArr, idPrimiLatArr, idLetteraLatArr;
var idGradiLonArr, idPrimiLonArr, idLetteraLonArr;
var risultati;

/*variabile dove viene memorizzata la tipologia del prblema, ovvero
* se dai dati inseriti si rientra in uno dei casi particolari dell'ortodromia
* */
var tipoProblema;

/*variabile nella quale assegno il valore di bug che permette di non
* effettuare i calcoli*/
var bug=0;

//di seguito dichiaro tutte le variabili per i calcoli del SECONDO PROBLEMA
//DI ORTODROMIA
var latitude, letteraLat, longitude, letteraLon;
var latitudeArr, letteraLatArr, longitudeArr, letteraLonArr;
var deltaPhi, letteraDeltaPhi, deltaLambda, letteraDeltaLambda, letteraDeltaLambdaPrima;
var cammino, rottaIniziale;
var rottaFinale;
var latitudeVertice, letteraLatVertice, letteraLatVerticeOpp;
var deltaLambdaVertice, longitudeVertice, letteraLonVertice, longitudeVerticeOpp, letteraLonVerticeOpp;
var longitudeNodoPrincipale, longitudeNodoSecondario;

//dichiaro di seguito le variabili utili alla risoluzione della lossodromia, per effettuare il confronto con il secondo
//problema di ortodromia
var latitudeCre, latitudeArrCre;
var deltaPhiCre;
var camminoLossodromico, rottaVera;
var risultatiLossodromia;
var tipoLossodromia;

//dichiaro di seguito tutte le variabili utili alla risoluzione della navigazione mista, prima le variabili per
//memorizzare l'input dell'utente e dopo le variaili utili a tutti i calcoli
var idGradiParalleloLimite, idPrimiParalleloLimite, idLetteraParalleloLimite;
var latitudeParalleloLimite, letteraLatParalleloLimite;
var d1, d2;
var deltaLambdaV1, deltaLambdaV2;
var longitudeV1, letteraLonV1;
var longitudeV2, letteraLonV2;
var rottaInizialeNavMista, rottaFinaleNavMista;
var deltaLambdaVerticiNavMista, letteraDeltaLambdaNavMista;
var camminoV1V2, rottaV1V2;
var risultatiNavigazioneMista;

//dichiaro di seguito tutte le variabili per ricevere gli input relativi al primo problema di ortodromia
var idGradiLat1, idPrimiLat1, idLetteraLat1;
var idGradiLon1, idPrimiLon1, idLetteraLon1;
var idCammino, idRotta;

//dichiaro di seguito la variabile che carica i risultati del primo problema di ortodromia
var risultatiPrimoProblema;

//dichiaro di seguito le variabili utili per il confronto del primo problema di ortodromia con la lossodromia
var latitudeX, letteraLatX;
var longitudeX, letteraLonX;
var deltaPhiX, letteraDeltaPhiX, deltaPhiCreX;
var bugMeiridiano;

//dichiaro di seguito la variabile per mostrare i risultati del primo problema di lossodromia
var risultatiLossodromia1;

//___________________________________________________________
//___________________________________________________________


//___________________________________________________________
/*funzione che carica la pagina, ricordo che la pagina è unica
* ma suddivise in schede, la differenza delle caselle di input
* la creo negli identificatori associati alle caselle
* */
exports.onLoaded = function(args){
    const page=args.object;

    idGradiLat=page.getViewById("idGradiLat");
    idPrimiLat=page.getViewById("idPrimiLat");
    idLetteraLat=page.getViewById("idLetteraLat");
    idGradiLon=page.getViewById("idGradiLon");
    idPrimiLon=page.getViewById("idPrimiLon");
    idLetteraLon=page.getViewById("idLetteraLon");

    idGradiLatArr=page.getViewById("idGradiLatArr");
    idPrimiLatArr=page.getViewById("idPrimiLatArr");
    idLetteraLatArr=page.getViewById("idLetteraLatArr");
    idGradiLonArr=page.getViewById("idGradiLonArr");
    idPrimiLonArr=page.getViewById("idPrimiLonArr");
    idLetteraLonArr=page.getViewById("idLetteraLonArr");

    //ricevo input la variabile per dare i risultati del secondo problema di ortodromia
    risultati=page.getViewById("risultati");

    //ricevo input per i risultati lossodormia del confronto con il secondo problema di ortodromia
    risultatiLossodromia=page.getViewById("risultatiLossodromia");

    //ricevo input navigazione mista
    idGradiParalleloLimite=page.getViewById("idGradiParalleloLimite");
    idPrimiParalleloLimite=page.getViewById("idPrimiParalleloLimite");
    idLetteraParalleloLimite=page.getViewById("idLetteraParalleloLimite");

    //ricevo input per i risultati della navigazione mista
    risultatiNavigazioneMista=page.getViewById("risultatiNavigazioneMista");

    //ricevo in input primo problema di ortodromia
    idGradiLat1=page.getViewById("idGradiLat1");
    idPrimiLat1=page.getViewById("idPrimiLat1");
    idLetteraLat1=page.getViewById("idLetteraLat1");
    idGradiLon1=page.getViewById("idGradiLon1");
    idPrimiLon1=page.getViewById("idPrimiLon1");
    idLetteraLon1=page.getViewById("idLetteraLon1");
    idCammino=page.getViewById("idCammino");
    idRotta=page.getViewById("idRotta");

    //ricevo in input la variabile per mostarare i risultati del primo problmea di ortodromia
    risultatiPrimoProblema=page.getViewById("risultatiPrimoProblema");

    //ricevo in input la variabile per mostrare i risultati del primo problema di lossodromia
    risultatiLossodromia1=page.getViewById("risultatiLossodromia1");


}//end function onLoaded
//___________________________________________________________


//___________________________________________________________
//funzione che gestisce l'azione del bottone
// SECONDO PROBLEMA DI ORTODROMIA
function onTap(fargs){
    const button = fargs.object;
    SetInput();
    RisolviSecondoProbOrto();

    /*console.log("rotta in circolare: "+rottaIniziale);
    console.log("cammino: "+cammino);
    console.log("rotta finale: "+rottaFinale);
    console.log("latitudine vertice: "+latitudeVertice+ letteraLatVertice);
    console.log("longitudine vertice: "+longitudeVertice+ letteraLonVertice);
    console.log("latitudine vertice opposto: "+latitudeVertice+ letteraLatVerticeOpp);
    console.log("longitudine vertice opposto: "+longitudeVerticeOpp+ letteraLonVerticeOpp);
    console.log("deltaLambdaVertice: "+deltaLambdaVertice);
    console.log("nodo secondario: "+longitudeNodoSecondario);
*/
    console.log("longitudine vertice: "+longitudeVertice+ letteraLonVertice);

}
exports.onTap=onTap;
//___________________________________________________________


//___________________________________________________________
/*funzione che memorizza gli input del SECODO PROBLEMA DI ORTODROMIA*/
function SetInput(){
    letteraLat=idLetteraLat.text;
    letteraLon=idLetteraLon.text;
    letteraLatArr=idLetteraLatArr.text;
    letteraLonArr=idLetteraLonArr.text;
    bug=0;

    //ciclo condizionale che controlla l'inserimento della latitudine di partenza
    if(parseInt(idGradiLat.text)===90){
        latitude=parseInt(idGradiLat.text);
    }else if(parseInt(idGradiLat.text)<=90){
        if(parseFloat(idPrimiLat.text)<=60){
            latitude=parseInt(idGradiLat.text)+(parseFloat(idPrimiLat.text)/60);
            if(latitude>90){//assegnazione bug se la latitudine risulta maggiore di 90 gradi
                bug=1;
            }
        }else if(parseFloat(idPrimiLat.text)>60){
            alert("Errore inserimeto primi di latitudine.");
            bug=1; //asseganzione del bug, errore utente
        }
    }else{
        alert("Errore inserimento gradi latitudine.");
        bug=1;
    }

    //ciclo condizionale che controlla l'inserimento della longitudine di partenza
    if(parseInt(idGradiLon.text)===180){
        longitude=parseInt(idGradiLon.text);
    }else if(parseInt(idGradiLon.text)<=180){
        if(parseFloat(idPrimiLon.text)<=60){
            longitude=parseInt(idGradiLon.text)+(parseFloat(idPrimiLon.text)/60);
            if (longitude>180){
                bug=1;//assegnazione bug se la longitudine risulta maggiore di 180 gradi
            }
        }else if(parseFloat(idPrimiLon.text)>60){
            alert("Errore inserimento primi di longitudine.");
            bug=1;
        }
    }else{
        alert("Errore inserimento gradi longitudine.");
        bug=1;
    }

    //ciclo consizionale che controlla l'inserimento della latitudine del punto di arrivo
    if(parseInt(idGradiLatArr.text)===90){
        latitudeArr=parseInt(idGradiLatArr.text);
    }else if(parseInt(idGradiLatArr.text)<=90){
        if(parseFloat(idPrimiLatArr.text)<=60){
            latitudeArr=parseInt(idGradiLatArr.text)+(parseFloat(idPrimiLatArr.text)/60);
            if(latitudeArr>90){//assegnazione bug se la latitudine risulta maggiore di 90 gradi
                bug=1;
            }
        }else if(parseFloat(idPrimiLatArr.text)>60){
            alert("Errore inserimeto primi di latitudine.");
            bug=1; //asseganzione del bug, errore utente
        }
    }else{
        alert("Errore inserimento gradi latitudine.");
        bug=1;
    }

    //ciclo condizionale che controlla l'inserimento della longitudine di arrivo
    if(parseInt(idGradiLonArr.text)===180){
        longitudeArr=parseInt(idGradiLonArr.text);
    }else if(parseInt(idGradiLonArr.text)<=180){
        if(parseFloat(idPrimiLonArr.text)<=60){
            longitudeArr=parseInt(idGradiLonArr.text)+(parseFloat(idPrimiLonArr.text)/60);
            if (longitudeArr>180){
                bug=1;//assegnazione bug se la longitudine risulta maggiore di 180 gradi
            }
        }else if(parseFloat(idPrimiLonArr.text)>60){
            alert("Errore inserimento primi di longitudine.");
            bug=1;
        }
    }else{
        alert("Errore inserimento gradi longitudine.");
        bug=1;
    }

    /*di seguito vado a calcolare l'antimeridiano del punto di partenza
    * in modo da poter verificare, solo dopo aver fatto tale calcolo, se
    * si rientra in un caso particolare di ortodromia*/
    let antiMeridiano, letteraAntiMeridiano;

    switch (letteraLon){
        case "E":
            antiMeridiano=longitude+180;
            if(antiMeridiano>=180){
                antiMeridiano=360-antiMeridiano;
                letteraAntiMeridiano="W";
            }else{
                letteraAntiMeridiano="E";
            }
            break;
        case "W":
            antiMeridiano=(-longitude)+180;
            if(antiMeridiano>=0){
                letteraAntiMeridiano="E";
            }else {
                letteraAntiMeridiano="W";
            }
            break;
        default:
            alert("Errore valutazione antimeridiano.");
            break;
    }

    //ciclo condizionale che riconosce i casi particolari
    if ((antiMeridiano===longitudeArr) && (letteraAntiMeridiano===letteraLonArr)){
        tipoProblema="navigazione meridiano con arrivo antimeridiano";
    }else if ((longitude===longitudeArr) && (letteraLon===letteraLonArr)){
        tipoProblema="navigazione meridiano con arrivo meridiano";
    }else if (latitude===0 && latitudeArr===0){
        tipoProblema="navigazione equatoriale";
    }else{
        tipoProblema="navigazione generale";
    }

}//end function SetInput()
//___________________________________________________________


//___________________________________________________________
//funzione che trasforma gli angoli, da gradi in radianti
//180:pi=a°:a(rad)
function Deg2Rad(angolo){
    angoloRad = (angolo*Math.PI)/180;

    return angoloRad;
}
//___________________________________________________________


//___________________________________________________________
//funzione che trasforma gli angoli, da radianti in gradi
function  Rad2Deg(angolo){
    angoloDeg = (angolo*180)/Math.PI;

    return angoloDeg;
}
//___________________________________________________________


//___________________________________________________________
//funzione che calcola la differenza di latitudine
function DeltaPhi(){

    switch (letteraLat){
        case "N":
            switch (letteraLatArr){
                case "N":
                    deltaPhi=latitudeArr-latitude;
                    if(deltaPhi<0){
                        letteraDeltaPhi="S";
                        deltaPhi=Math.abs(deltaPhi);
                    }else{
                        letteraDeltaPhi="N"
                    }
                    break;
                case "S":
                    deltaPhi=(-latitudeArr)-latitude;
                    if(deltaPhi<0){
                        letteraDeltaPhi="S";
                        deltaPhi=Math.abs(deltaPhi);
                    }else{
                        letteraDeltaPhi="N";
                    }
                    break;
                default:
                    alert("Errore valutazione differenza di latitudine.");
                    break;
            }
            break;
        case "S":
            switch (letteraLatArr){
                case "N":
                    deltaPhi=latitudeArr-(-latitude);
                    if(deltaPhi<0){
                        letteraDeltaPhi="S";
                        deltaPhi=Math.abs(deltaPhi);
                    }else{
                        letteraDeltaPhi="N";
                    }
                    break;
                case "S":
                    deltaPhi=(-latitudeArr)-(-latitude);
                    if(deltaPhi<0){
                        letteraDeltaPhi="S";
                        deltaPhi=Math.abs(deltaPhi);
                    }else{
                        letteraDeltaPhi="N";
                    }
                    break;
                default:
                    alert("Errore di valutazione differenza di latitudine.");
                    break;
            }
            break;
        default:
            alert("Erroe di valutazione differenza di latitudine.");
            break;
    }

}//end function DeltaPhi()
//___________________________________________________________


//___________________________________________________________
/*funzione che calcola la differenza di longitudine*/
function DeltaLambda(){
    switch (letteraLon){
        case "E":
            switch (letteraLonArr){
                case "E":
                    deltaLambda=longitudeArr-longitude;
                    if (deltaLambda<0){
                        letteraDeltaLambda="W";
                        letteraDeltaLambdaPrima=letteraDeltaLambda;
                        deltaLambda=Math.abs(deltaLambda);
                    }else{
                        letteraDeltaLambda="E";
                        letteraDeltaLambdaPrima=letteraDeltaLambda;
                    }
                    break;
                case "W":
                    deltaLambda=(-longitudeArr)-longitude;
                    if (deltaLambda<0 && Math.abs(deltaLambda)<=180){
                        letteraDeltaLambda="W";
                        letteraDeltaLambdaPrima=letteraDeltaLambda;
                        deltaLambda=Math.abs(deltaLambda);
                    }else if (deltaLambda<0 && Math.abs(deltaLambda)>180){//caso passaggio antimeridiano da E->W
                        letteraDeltaLambda="E";
                        letteraDeltaLambdaPrima="W";
                        deltaLambda=360-Math.abs(deltaLambda);
                    }else{
                        alert("Errore valutazione differenza di longitudine");
                    }
                    break;
                default:
                    alert("Errore valutazione differenza di longitudine");
                    break;
            }
            break;
        case "W":
            switch (letteraLonArr){
                case "E":
                    deltaLambda=longitudeArr-(-longitude);
                    if (deltaLambda>=0 && deltaLambda<=180){
                        letteraDeltaLambda="E";
                        letteraDeltaLambdaPrima=letteraDeltaLambda;
                    }else if (deltaLambda>=0 && deltaLambda>180){//caso passaggio antimeridiano da W->E
                        letteraDeltaLambda="W";
                        letteraDeltaLambdaPrima="E";
                        deltaLambda=360-deltaLambda;
                    }else {
                        alert("Errore valutazione differenza di longitudine");
                    }
                    break;
                case "W":
                    deltaLambda=(-longitudeArr)-(-longitude);
                    if(deltaLambda<0){
                        letteraDeltaLambda="W";
                        letteraDeltaLambdaPrima=letteraDeltaLambda;
                        deltaLambda=Math.abs(deltaLambda);
                    }else {
                        letteraDeltaLambda="E";
                        letteraDeltaLambdaPrima=letteraDeltaLambda;
                    }
                    break;
                default:
                    alert("Errore valutazione differenza di longitudine");
                    break;
            }
            break;
        default:
            alert("Errore valutazione differenza di longitudine");
            break;
    }

}//end function DeltaLambda()
//___________________________________________________________


//___________________________________________________________
//funzione che calcola il cammino ortodromico
function Cammino(){
    if (letteraLatArr!==letteraLat){
        latitudeArr*=(-1);
    }

    cammino = Math.sin(Deg2Rad(latitude))*Math.sin(Deg2Rad(latitudeArr))+(Math.cos(Deg2Rad(latitude))*Math.cos(Deg2Rad(latitudeArr))*Math.cos(Deg2Rad(deltaLambda)));
    cammino = Rad2Deg(Math.acos(cammino)) * 60;

    if (latitudeArr<0){
        latitudeArr=Math.abs(latitudeArr);
    }
}//end function Cammino()
//___________________________________________________________


//___________________________________________________________
/*funzione che calcola la rotta iniziale ortodromica
* il calcolo della rotta iniziale, usando il teorema di eulero, mi porta
* ad un valore non espresso in quadrantale, se considero i segni delle latitudini.
* Però ho un caso particolare, se il punto di patrenza è nell'emisfero sud e
* quello di arrivo nell'emisfero nord, il valore che ottengo è contato a partire
* dal polo sud. Quindi abbiamo due casi sostanzialmente:
* 1)punto di arrivo emisfero nord, ma a più ad est di quello di partenza, allora:
*     Ri=180-valore_ottenuto_di_rotta
* 2)punto di arrivo emisfero nord, ma più ad ovest di quello di partenza, allora:
*     Ri=180+valore_ottenuto_di_rotta*/
function RottaIniziale(){
    if (letteraLatArr!==letteraLat){
        latitudeArr*=(-1);
    }

    if (letteraDeltaLambda==="W"){
        deltaLambda*=(-1);
    }

    let num=Math.sin(Deg2Rad(latitudeArr)) - Math.cos(Deg2Rad(cammino/60))*Math.sin(Deg2Rad(latitude));
    let den=Math.sin(Deg2Rad(cammino/60))*Math.cos(Deg2Rad(latitude));
    rottaIniziale=Math.acos(num/den);
    rottaIniziale=Rad2Deg(rottaIniziale);

    switch (letteraLat){
        case "N":
            switch (letteraDeltaLambda){
                case "E":
                    rottaIniziale*=1;
                    break;
                case "W":
                    rottaIniziale=360-rottaIniziale;
                    break;
            }
            break;
        case "S":
            switch (letteraDeltaLambda){
                case "E":
                    rottaIniziale=180-rottaIniziale;
                    break;
                case "W":
                    rottaIniziale=180+rottaIniziale;
                    break;
            }
    }

    if (latitudeArr<0){
        latitudeArr=Math.abs(latitudeArr);
    }

    if (deltaLambda<0){
        deltaLambda=Math.abs(deltaLambda);
    }

}//end function RottaIniziale()
//___________________________________________________________


//___________________________________________________________
/*funzione che calcola la rotta finale. Per il calcolo della rotta
* finale si adopera il teorema di Eulero usando le variabili calcolate
*    cos(90-phi)=cos(d0)*cos(90-phi')+sin(d0)*sin(90-phi')*cos(beta)
*    beta=arccos(...)
*    Rf=180-beta     se deltaLambda>0
*    Rf=180+beta     se deltaLambda<0
* */
function   RottaFinale(){
    if (letteraLat==="S"){
        latitude*=(-1);
    }

    if (letteraLatArr==="S"){
        latitudeArr*=(-1);
    }

    /*
    * Creo ciclo condizionale che permette di risolvere le ambiguità quando sin(cammino/60)=0, che coincidono quando il
    * valore del cammino è tale di aver percorso il giro completo del globo o mezzo giro,
    * quindi quando cammino=21600NM o cammino=10800NM
    * */
    switch (cammino){
        case 21600:
            rottaFinale = rottaIniziale;
            break;

        case 10800:
            rottaFinale = rottaIniziale+180;
            if (rottaFinale>360){
                rottaFinale = rottaFinale-360;
            }
            break;

        default:
            let beta, num, den;
            num= Math.cos(Deg2Rad((90-latitude)))-(Math.cos(Deg2Rad((cammino/60)))*Math.cos(Deg2Rad((90-latitudeArr))));
            den= Math.sin(Deg2Rad((cammino/60)))*Math.sin(Deg2Rad((90-latitudeArr)));

            beta = Rad2Deg(Math.acos(num/den));

            switch (letteraDeltaLambda){
                case "E":
                    rottaFinale=180-beta;
                    break;
                case "W":
                    rottaFinale=180+beta;
                    break;
                default:
                    alert("Errore determinazione rotta finale");
                    break;
            }

        break;

    }//end switch(cammino)

    if (latitude<0){
        latitude=Math.abs(latitude);
    }

    if (latitudeArr<0){
        latitudeArr=Math.abs(latitudeArr);
    }

}//end function RottaFinale()
//___________________________________________________________


//___________________________________________________________
//funzione che trasforma il valore, passato in input, in rotta quadrantale
function Circolare2Quadrantale(rotta){
    let rottaQuad;
    if (rotta<=90){
        rottaQuad=rotta;
    }else if ((rotta>90) && (rotta<=180)){
        rottaQuad=180-rotta;
    }else if ((rotta>180) && (rotta<=270)){
        rottaQuad=rotta-180;
    }else if ((rotta>270) && (rotta<=360)){
        rottaQuad=360-rotta;
    }else{
        alert("Errore trasformazione rotta da circolare in quadrantale.");
    }

    return rottaQuad;
}//end funcction Circolare2Quadrantale(...)
//___________________________________________________________


//___________________________________________________________
//funzione che trasforma i valori di rotta, inseriti, da quadrantale in circolare
function Quadrantale2Circolare(rotta,letteraDeltaPhi,letteraDeltaLambda){
    let rottaCirco;
    switch (letteraDeltaPhi){
        case "N":
            switch (letteraDeltaLambda){
                case "E":
                    rottaCirco=rotta;
                    break;
                case "W":
                    rottaCirco=360-rotta;
                    break;
                default:
                    alert("Errore trasformazione rotta da quadrantale a circolare.");
                    break;
            }
            break;
        case "S":
            switch (letteraDeltaLambda){
                case "E":
                    rottaCirco=180-rotta;
                    break;
                case "W":
                    rottaCirco=180+rotta;
                    break;
                default:
                    alert("Errore trasformazione rotta da quadrantale a circolare.");
                    break;
            }
            break;
        default:
            alert("Errore trasformazione rotta da quadrantale a circolare.");
            break;
    }
    return rottaCirco;
}//end function Quadrantale2Circolare(...)
//___________________________________________________________


//___________________________________________________________
/*funzione che calcola le coordinate dei vertici. Per calcolare
* la latitudine dei vertici applico ancora il teorema di Clairout,
* quindi:   cos(phiVertice)=cos(phiA)*sin(rottaIniziale)
* Per calcolare la longitudine dei vertici applico il teorema
* di Viete*/
function Vertici(){
    let rottaInizialeQuadrantale=Circolare2Quadrantale(rottaIniziale);
    latitudeVertice=Rad2Deg(Math.acos(Math.cos(Deg2Rad(latitude)) * Math.sin(Deg2Rad(rottaInizialeQuadrantale))));

    switch (letteraLat){
        case "N":
            if (rottaIniziale<90 || (rottaIniziale>270 && rottaIniziale<360)){
                latitudeVertice*=1;
            }else if ((rottaIniziale>90 && rottaIniziale<180) || (rottaIniziale>180 && rottaIniziale<270)){
                latitudeVertice*=(-1);
            }
            break;
        case "S":
            if ((rottaIniziale<90) || (rottaIniziale>270 && rottaIniziale<360)){
                latitudeVertice*=(-1);
            }else if ((rottaIniziale>90 && rottaIniziale<180) || (rottaIniziale>180 && rottaIniziale<270)){
                latitudeVertice*=1;
            }
            break;
        default:
            alert("Errore valutazione lettera latitudine vertice.");
            break;
    }

    /*calcolo la longitudine del vertice con il metodo alternativo, ovvero seguendo la rotta iniziale, calcolo il
    * cammino fino al vertice e dopo la differenza di longitudine e quindi la longitudine del vertice*/
    let num=Math.sin(Deg2Rad(latitude))*Math.sin(Deg2Rad(latitudeVertice));
    let den=1-Math.cos(Deg2Rad(latitude))*Math.cos(Deg2Rad(latitudeVertice))*Math.sin(Deg2Rad(Circolare2Quadrantale(rottaIniziale)));
    let camminoVertice=Math.acos(num/den);//valore in radianti

    deltaLambdaVertice=Math.sin(Deg2Rad(Circolare2Quadrantale(rottaIniziale)))*Math.cos(camminoVertice);
    deltaLambdaVertice=Rad2Deg(Math.acos(deltaLambdaVertice));

    switch (letteraLon){
        case "E":
            switch (letteraDeltaLambda){
                case "E":
                    longitudeVertice=longitude+deltaLambdaVertice;
                    if (longitudeVertice>=0 && longitudeVertice<=180){
                        letteraLonVertice="E";
                    }else if (longitudeVertice>=0 && longitudeVertice>180){
                        longitudeVertice=360-longitudeVertice;
                        letteraLonVertice="W";
                    }
                    break;
                case "W":
                    longitudeVertice=longitude-deltaLambdaVertice;
                    if (longitudeVertice>=0){
                        letteraLonVertice="E";
                    }else if (longitudeVertice<0){
                        letteraLonVertice="W";
                        longitudeVertice=Math.abs(longitudeVertice);
                    }
                    break;
            }
            break;
        case "W":
            switch (letteraDeltaLambda){
                case "E":
                    longitudeVertice=(-longitude)+deltaLambdaVertice;
                    if(longitudeVertice<0){
                        longitudeVertice=Math.abs(longitudeVertice);
                        letteraLonVertice="W";
                    }else if (longitudeVertice>=0){
                        letteraLonVertice="E";
                    }
                    break;
                case "W":
                    longitudeVertice=(-longitude)-deltaLambdaVertice;
                    if (Math.abs(longitudeVertice)<180){
                        letteraLonVertice="W";
                        longitudeVertice=Math.abs(longitudeVertice);
                    }else if (Math.abs(longitudeVertice)>=180){
                        letteraLonVertice="E";
                        longitudeVertice=360-Math.abs(longitudeVertice);
                    }
            }
            break;
        default:
            alert("Errore valutazione longitudine vertice.");
            break;
    }

  /*  if (latitudeVertice<0){
        latitudeVertice=Math.abs(latitudeVertice);
    }*/


    //ciclo condizionale che determina la longitudine del vertice opposto
    switch (letteraLonVertice){
        case "E":
            longitudeVerticeOpp=longitudeVertice+180;
            longitudeVerticeOpp=360-longitudeVerticeOpp;
            letteraLonVerticeOpp="W";
            break;
        case "W":
            longitudeVerticeOpp=(-longitudeVertice)+180;
            letteraLonVerticeOpp="E";
            break;
        default:
            alert("Errore valutazione longitudine vertice oppposto al primo.");
            break;
    }
/*
    //ciclo che assegna le latitudini ai vertici
    switch (letteraLon){
        case "E":
            if (letteraLonVertice==="E"){
                letteraLatVertice=letteraLat;
                if (letteraLatVertice==="N"){
                    letteraLatVerticeOpp="S";
                }else if (letteraLatVertice==="S"){
                    letteraLatVerticeOpp="N";
                }
            }else {
                letteraLatVertice=letteraLatArr;
                if (letteraLatVertice==="N"){
                    letteraLatVerticeOpp="S";
                }else if (letteraLatVertice==="S"){
                    letteraLatVerticeOpp="N";
                }
            }
            break;
        case "W":
            if (letteraLonVertice==="W"){
                letteraLatVertice=letteraLat;
                if (letteraLatVertice==="N"){
                    letteraLatVerticeOpp="S";
                }else if (letteraLatVertice==="S"){
                    letteraLatVerticeOpp="N";
                }
            }else {
                letteraLatVertice=letteraLatArr;
                if (letteraLatVertice==="N"){
                    letteraLatVerticeOpp="S";
                }else if (letteraLatVertice==="S"){
                    letteraLatVerticeOpp="N";
                }
            }
            break;
        default:
            alert("Errore valutazione lettere coordinate vertici.");
            break;
    }
*/

    switch (letteraLat){
        case "N":
            if (latitudeVertice<0){
                letteraLatVertice="S";
                letteraLatVerticeOpp="N";
                latitudeVertice=Math.abs(latitudeVertice);
            }else {
                letteraLatVertice="N";
                letteraLatVerticeOpp="S";
            }
            break;
        case "S":
            if (latitudeVertice<0){
                letteraLatVertice="N";
                letteraLatVerticeOpp="S";
                latitudeVertice=Math.abs(latitudeVertice);
            }else {
                letteraLatVertice="S";
                letteraLatVerticeOpp="N";
            }
            break;
        default:
            alert("Errore determinazione lettera coordinata vertici.");
            break;
    }
}//end function Vertici();
//___________________________________________________________


//_____________________________________________________________
//funzione che calcola le longitudini dei due nodi dell'ortodromia
function Nodi(){
    switch (letteraLonVertice){
        case "E":
            if(longitudeVertice>=90){
                longitudeNodoPrincipale=longitudeVertice-90;
                longitudeNodoSecondario=longitudeNodoPrincipale+180;
                if (longitudeNodoSecondario>=180){
                    longitudeNodoSecondario=360-longitudeNodoSecondario;
                }
            }else if (longitudeVertice<90){
                longitudeNodoPrincipale=longitudeVertice+90;
                longitudeNodoSecondario=longitudeNodoPrincipale+180;
                if(longitudeNodoSecondario>=180){
                    longitudeNodoSecondario=360-longitudeNodoSecondario;
                }
            }else{
                alert("Errore valutazione coordinate nodi.");
            }
            break;
        case "W":
            if(longitudeVertice<=90){
                longitudeNodoPrincipale=(-longitudeVertice)+90;
                longitudeNodoSecondario=longitudeNodoPrincipale+180;
                if(longitudeNodoSecondario>=180){
                    longitudeNodoSecondario=360-longitudeNodoSecondario;
                }
            }else if (longitudeVertice>90){
                longitudeNodoPrincipale=360-(longitudeVertice+90);
                longitudeNodoSecondario=longitudeNodoPrincipale+180;
                if(longitudeNodoSecondario>=180){
                    longitudeNodoSecondario=360-longitudeNodoSecondario;
                }
            }else {
                alert("Errore valutazione coordinate nodi.");
            }
            break;
        default:
            alert("Errore valutazione coordinate nodi.");
            break;
    }

}//end function Nodi()
//___________________________________________________________


//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
/*di seguito vado ad implementare le funzioni che calcolano i casi
* particolari dell'ortodromia*/
//___________________________________________________________
//funzione che risolve il caso di navigazione equatoriale
function NavigazioneEquatoriale(){
    DeltaLambda();
    cammino = deltaLambda*60;

    switch (letteraDeltaLambda){
        case "E":
            rottaIniziale=90;
            break;
        case "W":
            rottaIniziale=270;
            break;
        default:
            alert("Errore valutazione navigazione equatoriale ortodromia");
            break;
    }
}//end function NavigazioneEquatoriale()
//___________________________________________________________


//___________________________________________________________
/*funzione che risolve il problema della navigazione su meridiano, ma
* con arrivo nel meridiano stesso*/
function NavigazioneMeridianoOrto(){
    DeltaPhi();
    cammino=deltaPhi*60;

    switch (letteraDeltaPhi){
        case "N":
            rottaIniziale=0;
            break;
        case "S":
            rottaIniziale=180;
            break;
        default:
            alert("Errore valutazione rotta iniziale in navigazione meridiano con arrivo nel meridiano.");
            break;
    }
}//end function NavigazioneMeridianoOrto()
//___________________________________________________________


//___________________________________________________________
/*funzione che risolve il caso di navigazione per meridiano, ma con
* nell'antimeridiano del punto di partenza*/
function NavigazioneMeridianoAntiMeridianoOrto(){
    let coLat=90-latitude, coLatArr=90-latitudeArr;

    if (letteraLat===letteraLatArr){
        cammino=(coLat+coLatArr)*60;
    }else if (letteraLat!==letteraLatArr){
        if(latitudeArr<=latitude){
            cammino=(coLat+90+latitudeArr)*60;
        }else if (latitudeArr>latitude){
            cammino=(latitude+90+coLatArr)*60;
        }else {
            alert("Errore valutazione cammino navigazione meridiano con arrivo antimeridiano ortodromia.");
        }
    }else {
        alert("Errore valutazione cammino navigazione meridiano con arrivo antimeridiano ortodromia.");
    }

    if (letteraLat===letteraLatArr){
        switch (letteraLat){
            case "N":
                rottaIniziale=0;
                break;
            case "S":
                rottaIniziale=180;
                break;
            default:
                alert("Errore valutazione rotta navigazione meridiano con arrivo nell'antimeridiano ortodromia.");
                break;
        }
    }else if (letteraLat!==letteraLatArr){
        if (latitudeArr<=latitude){
            switch (letteraLat){
                case "N":
                    rottaIniziale=0;
                    break;
                case "S":
                    rottaIniziale=180;
                    break;
            }
        }else if (latitudeArr>latitude){
            switch (letteraLat){
                case "N":
                    rottaIniziale=180;
                    break;
                case "S":
                    rottaIniziale=0;
                    break;
            }
        }else {
            alert("Errore valutazione rotta navigazione meridiano con arrivo nell'antimeridiano ortodromia.");
        }
    }
}//NavigazioneMeridianoAntiMeridianoOrto()
//___________________________________________________________

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


//___________________________________________________________
/*funzine che regola gli output in base alla tipologia del problema,
* relativa alla risoluzione del secondo problema di ortodromia*/
function SetoOutput(){
switch (tipoProblema){
    case "navigazione generale":
        let latitudineVertice=CorreggiRoundOff(latitudeVertice);
        let gradiLatVert=Math.floor(latitudineVertice), primiLatVert=(latitudineVertice-gradiLatVert)*60;
        let longitudineVertice=CorreggiRoundOff(longitudeVertice);
        let gradiLonVert=Math.floor(longitudineVertice), primiLonVert=(longitudineVertice-gradiLonVert)*60;
        longitudineVertice=CorreggiRoundOff(longitudeVerticeOpp);
        let gradiLonVertOpp=Math.floor(longitudineVertice), primiLonVertOpp=(longitudineVertice-gradiLonVertOpp)*60;
        let longitudeNodo=CorreggiRoundOff(longitudeNodoPrincipale);
        let gradiLonNodo=Math.floor(longitudeNodo), primiLonNodo=(longitudeNodo-gradiLonNodo)*60;
        longitudeNodo=CorreggiRoundOff(longitudeNodoSecondario);
        let gradiLonNodoSec=Math.floor(longitudeNodo), primiLonNodoSec=(longitudeNodo-gradiLonNodoSec)*60;

        risultati.text=`Cammino do: ${cammino.toFixed(2)} NM

Rotta Iniziale: ${rottaIniziale.toFixed(2)}°

Rotta Finale: ${rottaFinale.toFixed(2)}°

Coordinate Primo Vertice:
Latitudine: ${gradiLatVert}° ${primiLatVert.toFixed(2)}' ${letteraLatVertice}
Longitudine: ${gradiLonVert}° ${primiLonVert.toFixed(2)}' ${letteraLonVertice}

Coordinate Secondo Vertice:
Latitudine: ${gradiLatVert}° ${primiLatVert.toFixed(2)}' ${letteraLatVerticeOpp}
Longitudine: ${gradiLonVertOpp}° ${primiLonVertOpp.toFixed(2)}' ${letteraLonVerticeOpp}

Nodo Principale:
Longitudine: ${gradiLonNodo}° ${primiLonNodo.toFixed(2)}' E

Nodo Secondario:
Longitudine: ${gradiLonNodoSec}° ${primiLonNodoSec.toFixed(2)}' W`;
        break;
    case "navigazione equatoriale":
        risultati.text=`Cammino d0: ${cammino.toFixed(2)} NM

Rotta Iniziale: ${rottaIniziale}°`;
        break;
    case "navigazione meridiano con arrivo meridiano":
        risultati.text=`Cammino d0: ${cammino.toFixed(2)} NM

Rotta Iniziale: ${rottaIniziale}°

Vertici
Sono i poli geografici

Nodi
Sono dati dall'intersezione del piano meridiano con il piano equatoriale`;
        break;
    case "navigazione meridiano con arrivo antimeridiano":
        risultati.text=`Cammino d0: ${cammino.toFixed(2)} NM

Rotta Iniziale: ${rottaIniziale}°

Rotta Finale: ${rottaIniziale+180}°

Vertici
Sono i poli geografici

Nodi
Sono dati dall'intersezione del piano meridiano con il piano equatoriale`;
        break;
    default:
        alert("Errore regolazione output risultati.");
        break;
}

}//end function SetOutput()
//___________________________________________________________


//___________________________________________________________
/*funzione che va a risolvere il secondo problema di ortodromia
* mediante la valutazione di eventuali bug, errori fatti dall'utente
* nell'inserimento dei dati*/
function RisolviSecondoProbOrto(){
    switch (bug){
        case 0:
            switch (tipoProblema){
                case "navigazione generale":
                    DeltaPhi();
                    DeltaLambda();
                    Cammino();
                    RottaIniziale();
                    Vertici();
                    Nodi();
                    RottaFinale();
                    break;
                case "navigazione equatoriale":
                    NavigazioneEquatoriale();
                    break;
                case "navigazione meridiano con arrivo meridiano":
                    NavigazioneMeridianoOrto();
                    break;
                case "navigazione meridiano con arrivo antimeridiano":
                    NavigazioneMeridianoAntiMeridianoOrto();
                    break;
                default:
                    alert("Errore valutazione risoluzione secondo problema di ortodromia.");
                    break;
            }
            SetoOutput();
            break;
        case 1:
            risultati.text=` `;
            alert("Errore valutazione della risoluzione tramite bug.");
            break;
    }

}//end function RisolviSecondoProbOrto()
//___________________________________________________________


//___________________________________________________________
/*
* Di seguito dichiaro tutte le funzioni utili per effettuare il confronto con la lossodromia, relativo ancora al secondo
* problema di ortodromia. Per fare ciò dichiaro di seguito tutte le funzioni utili per risolvere il problema di
* lossodromia, cercando di riusare le funzioni, com DeltaLambda()..., dichiarate prima per l'ortodromia. Si cerca di
* riusare le stesse variabili dichiarate all'inizio del file.
* */
function onConfrontaTap(args){
    const button=args.object;
    RisolviLossodromia();
}
exports.onConfrontaTap=onConfrontaTap;


//___________________________________________________________
function SetLatDeltaPhiCre(latA,latB,letteraLatA,letteraLatB){
    let lat45=45+(latA/2);
    let lat45Arr;

    if (latB===90){
        lat45Arr = 45+(89.99999/2);
    }else {
        lat45Arr=45+(latB/2);
    }


    //calcolo le latitudini crescenti dei punti, valori espressi in primi sessaggesimali
    let latitudeCreA = (10800/Math.PI) * Math.log(Math.tan(Deg2Rad(lat45)));
    let latitudeCreB = (10800 / Math.PI) * Math.log(Math.tan(Deg2Rad(lat45Arr)));
    let deltaPhiCreAB;

    //ciclo condizionale che calcola la differenza di latitudine crescente
    switch (letteraLatA){
        case "N":
            switch (letteraLatB){
                case "N":
                    deltaPhiCreAB = latitudeCreB-latitudeCreA;
                    if (deltaPhiCreAB<0){
                        deltaPhiCreAB=Math.abs(deltaPhiCreAB);
                    }
                    break;
                case "S":
                    deltaPhiCreAB = (-latitudeCreB)-latitudeCreA;
                    if (deltaPhiCreAB<0){
                        deltaPhiCreAB=Math.abs(deltaPhiCreAB);
                    }
                    break;
                default:
                    alert("Errore valutazione differenza latitudine crescente per secondo problema lossodromia.");
                    break;
            }
            break;
        case "S":
            switch (letteraLatB){
                case "N":
                    deltaPhiCreAB = latitudeCreB - (-latitudeCreA);
                    break;
                case "S":
                    deltaPhiCreAB = (-latitudeCreB) - (-latitudeCreA);
                    if (deltaPhiCreAB<0){
                        deltaPhiCreAB=Math.abs(deltaPhiCreAB);
                    }
                    break;
                default:
                    alert("Errore valutazione differenza latitudine crescente per secondo problema lossodromia.");
                    break;
            }
            break;
        default:
            alert("Errore valutazione differenza latitudine crescente per secondo problema lossodromia.");
            break;
    }

    risultatiCalcoli=[latitudeCreA, latitudeCreB, deltaPhiCreAB];

    return risultatiCalcoli;

}//end function SetLatDeltaPhiCre()
//___________________________________________________________


//___________________________________________________________
//funzione che calcola la rotta vera lossodromica
function RottaVera(){
    let rottaVeraQuadrantale;

    switch (letteraDeltaLambda){
        case "E":
            switch (letteraDeltaPhi){
                case "N":
                    rottaVeraQuadrantale=Math.atan((deltaLambda*60)/deltaPhiCre);
                    rottaVeraQuadrantale=Math.abs(Rad2Deg(rottaVeraQuadrantale));
                    rottaVera = Quadrantale2Circolare(rottaVeraQuadrantale,letteraDeltaPhi,letteraDeltaLambda);
                    break;
                case "S":
                    rottaVeraQuadrantale=Math.atan((deltaLambda*60)/(-deltaPhiCre));
                    rottaVeraQuadrantale=Math.abs(Rad2Deg(rottaVeraQuadrantale));
                    rottaVera = Quadrantale2Circolare(rottaVeraQuadrantale,letteraDeltaPhi,letteraDeltaLambda);
                    break;
                default:
                    alert("Errore valutazione rotta vera quadrantale.");
                    break;
            }
            break;
        case "W":
            switch (letteraDeltaPhi){
                case "N":
                    rottaVeraQuadrantale=Math.atan((-deltaLambda*60)/deltaPhiCre);
                    rottaVeraQuadrantale=Math.abs(Rad2Deg(rottaVeraQuadrantale));
                    rottaVera = Quadrantale2Circolare(rottaVeraQuadrantale,letteraDeltaPhi,letteraDeltaLambda);
                    break;
                case "S":
                    rottaVeraQuadrantale=Math.atan((-deltaLambda*60)/(-deltaPhiCre));
                    rottaVeraQuadrantale=Math.abs(Rad2Deg(rottaVeraQuadrantale));
                    rottaVera = Quadrantale2Circolare(rottaVeraQuadrantale,letteraDeltaPhi,letteraDeltaLambda);
                    break;
                default:
                    alert("Errore valutazione rotta vera quadrantale.");
                    break;
            }
            break;
        default:
            alert("Errore valutazione rotta vera quadrantale.");
            break;
    }

}//end function RottaVera()
//___________________________________________________________


//___________________________________________________________
//funzione che calcola il cammino lossodromico per il confronto con il secondo problema di ortodromia
function CamminoLossodromia(){
    camminoLossodromico = (deltaPhi*60)/Math.cos(Deg2Rad(Circolare2Quadrantale(rottaVera)));
    camminoLossodromico = Math.abs(camminoLossodromico);
}//end function CamminoLossodromia()
//___________________________________________________________


//___________________________________________________________
//funzione che verifica il problema di lossodromia
function VerificaLossodromia(){
    if ( (latitude!==latitudeArr) && (longitude!==longitudeArr) ){
        tipoLossodromia="generale";
    }else if ((latitude===latitudeArr)){
        switch (latitude){
            case 0:
                tipoLossodromia="navigazione parallelo";
                break;

            default:
                if (letteraLat===letteraLatArr){
                    tipoLossodromia="navigazione parallelo";
                }else if (letteraLat!==letteraLatArr){
                    if (longitude===longitudeArr){
                        switch (longitude){
                            case 0:
                                tipoLossodromia="navigazione meridiano";
                                break;
                            case 180:
                                tipoLossodromia="navigazione meridiano";
                                break;
                            default:
                                if (letteraLon===letteraLonArr){
                                    tipoLossodromia="navigazione meridiano";
                                }else{
                                    tipoLossodromia="generale";
                                }
                        }//end switch(longitude)
                    }
                }
                break;

        }//end switch(latitude)

    }else if(latitude!==latitudeArr){
        if (longitude===longitudeArr){
            switch (longitude){
                case 0:
                    tipoLossodromia="navigazione meridiano";
                    break;
                case 180:
                    tipoLossodromia="navigazione meridiano";
                    break;
                default:
                    if (letteraLon===letteraLonArr){
                        tipoLossodromia="navigazione meridiano";
                    }else {
                        tipoLossodromia="generale";
                    }

            }
        }
    }
}
//___________________________________________________________


//___________________________________________________________
//funzione che risolve la navigazione per meridiano per lossodromia
function NavigazioneMeridianoSecondoProbLosso(){
    //ricordo che la differenza di latitudine sarà già determinata
    camminoLossodromico = (deltaPhi*60);
    switch (letteraDeltaPhi){
        case "N":
            rottaVera=0;
            break;
        case "S":
            rottaVera=180;
            break;
        default:
            alert("Errore risoluzione navigazione meridiano, confronta con lossodromia.");
            break;
    }
}
//___________________________________________________________


//___________________________________________________________
//funzione che risolve la navigazione su parallelo per la lossodromia
function NavigazioneParalleloSecondoProbLosso(){
    //si presuppone che la differenza di longitudine sia già determinata
    camminoLossodromico = (deltaLambda*60)*Math.cos(Deg2Rad(latitude));
    switch (letteraDeltaLambda){
        case "E":
            rottaVera=90;
            break;
        case "W":
            rottaVera=270;
            break;
        default:
            alert("Errore di valutazione rotta in navigazione su parallelo secondo problema di lossodromia.");
            break;
    }
}
//___________________________________________________________


//___________________________________________________________
//funzione che gestisce gli output dei risolutati di lossodromia per il confronto con il secodo problema di ortodromia
function SetOutputLossodromia(){
    risultatiLossodromia.text=`Rotta Vera: ${rottaVera.toFixed(2)}°

Cammino: ${camminoLossodromico.toFixed(2)} NM  `;
}//end function SetOutputLossodromia()
//___________________________________________________________


//___________________________________________________________
//funzione che gestisce gli output delle navigazioni su parallelo e meridiano
function SetOutputCasiParticolari(){
    switch (tipoLossodromia){
        case "navigazione meridiano":
            risultatiLossodromia.text=`Navigazione su meridiano!

Cammino: ${camminoLossodromico.toFixed(2)}NM

Rotta vera: ${rottaVera.toFixed(2)}°`;
            break;

        case "navigazione parallelo":
            risultatiLossodromia.text=`Navigazione su parallelo!

Cammino: ${camminoLossodromico.toFixed(2)}NM

Rotta vera: ${rottaVera.toFixed(2)}°`;
            break;
    }
}
//___________________________________________________________


//___________________________________________________________
//funzionce che risolve il problema di lossodromia per il confronto con il secodo problema di ortodromia
function RisolviLossodromia(){
    switch (bug){
        case 0:
            switch (tipoProblema){

                case "navigazione generale":
                    
                    VerificaLossodromia();

                    switch (tipoLossodromia){
                        case "navigazione meridiano":
                            NavigazioneMeridianoSecondoProbLosso();
                            SetOutputCasiParticolari();
                            break;

                        case "navigazione parallelo":
                            NavigazioneParalleloSecondoProbLosso();
                            SetOutputCasiParticolari();
                            break;

                        case "generale":
                            let risultatiCalcoli=SetLatDeltaPhiCre(latitude,latitudeArr,letteraLat,letteraLatArr);
                            latitudeCre=risultatiCalcoli[0];
                            latitudeArrCre=risultatiCalcoli[1];
                            deltaPhiCre=risultatiCalcoli[2];
                            RottaVera();
                            CamminoLossodromia();
                            SetOutputLossodromia();
                            break;
                    }
                    break;

                case "navigazione meridiano con arrivo meridiano":
                    rottaVera=rottaIniziale;
                    camminoLossodromico=cammino;
                    VerificaLossodromia();
                    SetOutputCasiParticolari();
                    break;

                case "navigazione meridiano con arrivo antimeridiano":
                    VerificaLossodromia();
                    switch (tipoLossodromia){
                        case "navigazione meridiano":
                            NavigazioneMeridianoSecondoProbLosso();
                            SetOutputCasiParticolari();
                            break;

                        case "navigazione parallelo":
                            NavigazioneParalleloSecondoProbLosso();
                            SetOutputCasiParticolari();
                            break;

                        case "generale":
                            let risultatiCalcoli=SetLatDeltaPhiCre(latitude,latitudeArr,letteraLat,letteraLatArr);
                            latitudeCre=risultatiCalcoli[0];
                            latitudeArrCre=risultatiCalcoli[1];
                            deltaPhiCre=risultatiCalcoli[2];
                            DeltaPhi();
                            DeltaLambda()
                            RottaVera();
                            CamminoLossodromia();
                            SetOutputLossodromia();
                            break;
                    }
                    break;

                case "navigazione equatoriale":
                    VerificaLossodromia();
                    NavigazioneParalleloSecondoProbLosso();
                    SetOutputCasiParticolari();
                    break;

            }//end switch(tipoProblema)

            break;

        case 1:
            alert("Errore, impossibile effetuare il confronto con la lossodromia.");
            break;

    }//end switch bug
}//end function RisolviLossodromia()
//___________________________________________________________


//___________________________________________________________
//___________________________________________________________
/*
* Di seguito vado ad impementare il codice risolutivo per risolvere la navigazione mista, la quale si trova nella secona scheda della medesima pagina.
Si cerca di riusare le funzioni e variabili precedentemente dichiarate. La navigazione mista prevede che tra due punti dell'ortodromia (caratterizzati
dal fatto che un dei due vertici è tra i due punti) si prefissa un parallelo limite. Fatto ciò si vengono a creare due nuovi vertici che cadono in tale
parallelo, allora si calcola la prima ortodromia tra A e V1, la seconda ortodromia sarà tra V2 e B, mentre tra V1 e V2 avremo navigazione su parallelo.
L'input della latitudine del parallelo limite lo vado a dichiarare nella funzione che prende in input tutti gli altri valori della pagina "onLoaded()"
* */

function onNavigazioneMistaTap(pargs){
    const button=pargs.object;

    RisolviNavMista();
}
exports.onNavigazioneMistaTap=onNavigazioneMistaTap;


//___________________________________________________________
function SetParalleloLimite(){
    letteraLatParalleloLimite=idLetteraParalleloLimite.text;
    bug=0;

    if (parseInt(idGradiParalleloLimite.text)===90){
        latitudeParalleloLimite=parseInt(idGradiParalleloLimite.text);
    }else if (parseInt(idGradiParalleloLimite.text)<90){
        if (parseFloat(idPrimiParalleloLimite.text)<=60){
            latitudeParalleloLimite = parseInt(idGradiParalleloLimite.text)+(parseFloat(idPrimiParalleloLimite.text)/60);
            if (latitudeParalleloLimite>90){//assegnazione bug, per errore inserimento latitudine
                bug=1;
                alert("Valore di latitudine non contemplato.");
            }
        }else if (parseFloat(idPrimiParalleloLimite.text)>60){
            bug=1;
            alert("Errore inserimento primi di latitudine in navigazione mista.");
        }
    }else {
        bug=1;
        alert("Errore inserimento gradi latitudine in navigazione mista.");
    }

    if (latitudeParalleloLimite<latitude || latitudeParalleloLimite<latitudeArr){
        alert("Il parallelo limite è a latitudine inferiore del punto di partenza o di arrivo.");
        bug=1;
    }

}//end function SetParalleloLimite()
//___________________________________________________________


//___________________________________________________________
//funzione che calcola i cammini delle due ortodromie
function CamminiOrtodromieNavMista(){
    //calcolo i cammini con il ciclo condizionale
    switch (letteraLatParalleloLimite){
        case "N":
        switch (letteraLat){//ciclo condizionale per calcolare il primo cammino
            case "N":
                d1 = Math.sin(Deg2Rad(latitude))/Math.sin(Deg2Rad(latitudeParalleloLimite));
                break;
            case "S":
                d1 = Math.sin(-Deg2Rad(latitude))/Math.sin(Deg2Rad(latitudeParalleloLimite));
                break;
            default:
                alert("Errore valutazione primo cammino navigazione mista.");
                break;
        }
        switch (letteraLatArr){//ciclo condizionale per calcolare il secondo cammino
            case "N":
                d2 = Math.sin(Deg2Rad(latitudeArr))/Math.sin(Deg2Rad(latitudeParalleloLimite));
                break;
            case "S":
                d2 = Math.sin(-Deg2Rad(latitudeArr))/Math.sin(Deg2Rad(latitudeParalleloLimite));
                break;
            default:
                alert("Errore valutazione secondo cammino navigazione mista.");
                break;
        }
        break;
        case "S":
            switch (letteraLat){
                case "N":
                    d1 = Math.sin(Deg2Rad(latitude))/Math.sin(-Deg2Rad(latitudeParalleloLimite));
                    break;
                case "S":
                    d1 = Math.sin(-Deg2Rad(latitude))/Math.sin(-Deg2Rad(latitudeParalleloLimite));
                    break;
                default:
                    alert("Errore valutazione primo cammino navigazione mista.");
                    break;
            }
            switch (letteraLatArr){
                case "N":
                    d2 = Math.sin(Deg2Rad(latitudeArr))/Math.sin(-Deg2Rad(latitudeParalleloLimite));
                    break;
                case "S":
                    d2 = Math.sin(-Deg2Rad(latitudeArr))/Math.sin(-Deg2Rad(latitudeParalleloLimite));
                    break;
                default:
                    alert("Errore valutazione secondo cammino navigazione mista.");
                    break;
            }
            break;
        default:
            alert("Errore valutazione cammini navigazione miista.");
            break;
    }//end primo switch, lettera parallelo limite

    if (d1<=1 && d2<=1){
        d1 = Rad2Deg(Math.acos(d1)) * 60;
        d2 = Rad2Deg(Math.acos(d2)) * 60;
    }
}//end function CamminiOrtodromieNavMista()
//___________________________________________________________

//___________________________________________________________
//funzione che calcola le differenze di longitudine dei vertici
function DeltaLambdaVerticiNavMista(){
    if (letteraLat==="S"){
        latitude*=(-1);
    }
    if (letteraLatArr==="S"){
        latitudeArr*=(-1);
    }
    if (letteraLatParalleloLimite==="S"){
        latitudeParalleloLimite*=(-1);
    }

    deltaLambdaV1 = Math.tan(Deg2Rad(latitude))/Math.tan(Deg2Rad(latitudeParalleloLimite));
    deltaLambdaV1 = Rad2Deg(Math.acos(deltaLambdaV1));
    deltaLambdaV2 = Math.tan(Deg2Rad(latitudeArr))/Math.tan(Deg2Rad(latitudeParalleloLimite));
    deltaLambdaV2 = Rad2Deg(Math.acos(deltaLambdaV2));

    if (deltaLambdaV1>=180){
        deltaLambdaV1 = 360-deltaLambdaV1;
    }else if (deltaLambdaV1<0 && Math.abs(deltaLambdaV1)>=180){
        deltaLambdaV1 = 360-Math.abs(deltaLambdaV1);
    }else if (deltaLambdaV1>=0 && deltaLambdaV1<180){
        deltaLambdaV1 *= 1;
    }else if (deltaLambdaV1<0 && Math.abs(deltaLambdaV1)<180){
        deltaLambdaV1 = Math.abs(deltaLambdaV1);
    }else {
        alert("Errore valutazione differenza di longitudine primo vertice navigazione mista.");
    }

    if (deltaLambdaV2>=180){
        deltaLambdaV2 = 360-deltaLambdaV2;
    }else if (deltaLambdaV2<0 && Math.abs(deltaLambdaV2)>180){
        deltaLambdaV2 = 360-Math.abs(deltaLambdaV2);
    }else if (deltaLambdaV2>=0 && deltaLambdaV2<180){
        deltaLambdaV2 *= 1;
    }else if (deltaLambdaV2<0 && Math.abs(deltaLambdaV2)<180){
        deltaLambdaV2 = Math.abs(deltaLambdaV2);
    }else {
        alert("Errore valutazione differenza longitudine secondo vertice navigazione mista.");
    }

    //ciclo condizionale che calcola le longitudini dei due vertici, ricordo che il segno alle differenze di longitudini
    //dei vertici di prima vengono assegnate in base alla lettera della differenza di longitudine, segno concorde per la
    //prima differenza, segno discorde per la seconda differenza
    switch (letteraDeltaLambda){
        case "E":
            switch (letteraLon){//calcola il primo vertice a partire dal punto di partenza
                case "E":
                    longitudeV1 = longitude+deltaLambdaV1;
                    if (longitudeV1>=180){
                        longitudeV1=360-longitudeV1;
                        letteraLonV1="W";
                    }else if (longitudeV1>=0 && longitudeV1<180){
                        letteraLonV1="E";
                    }else {
                        alert("Errore valutazione primo vertice navigazione mista.");
                    }
                    break;
                case "W":
                    longitudeV1 = (-longitude)+deltaLambdaV1;
                    if (longitudeV1>=0){
                        letteraLonV1="E";
                    }else if (longitudeV1<0){
                        letteraLonV1="W";
                        longitudeV1=Math.abs(longitudeV1);
                    }else {
                        alert("Errore valutazione primo vertice navigazione mista.");
                    }
                    break;
            }
            switch (letteraLonArr){//calcola il secondo vertice a partire dal punto di arrivo
                case "E":
                    longitudeV2 = longitudeArr-deltaLambdaV2;
                    if (longitudeV2>=0){
                        letteraLonV2="E";
                    }else if (longitudeV2<0){
                        letteraLonV2="W";
                        longitudeV2=Math.abs(longitudeV2);
                    }else {
                        alert("Errore valutazione secondo vertice navigazione mista.");
                    }
                    break;
                case "W":
                    longitudeV2 = (-longitudeArr)-deltaLambdaV2;
                    if (longitudeV2<0 && Math.abs(longitudeV2)>=180){
                        letteraLonV2="E";
                        longitudeV2=360-Math.abs(longitudeV2);
                    }else if (longitudeV2<0 && Math.abs(longitudeV2)<180){
                        letteraLonV2="W";
                        longitudeV2=Math.abs(longitudeV2);
                    }else {
                        alert("Errore valutazione secondo vertice navigazione mista.");
                    }
                    break;
            }
            break;
        case "W":
            switch (letteraLon){
                case "E":
                    longitudeV1 = longitude-deltaLambdaV1;
                    if (longitudeV1>=0){
                        letteraLonV1="E";
                    }else if (longitudeV1<0){
                        letteraLonV1="W";
                        longitudeV1=Math.abs(longitudeV1);
                    }else {
                        alert("Errore valutazione primo vertice navigazione mista.");
                    }
                    break;
                case "W":
                    longitudeV1 = (-longitude)-deltaLambdaV1;
                    if (longitudeV1<0 && Math.abs(longitudeV1)>=180){
                        letteraLonV1="E";
                        longitudeV1=360-Math.abs(longitudeV1);
                    }else if (longitudeV1<=0){
                        letteraLonV1="W";
                        longitudeV1=Math.abs(longitudeV1);
                    }else {
                        alert("Errore valutazione primo vertice navigazione mista.");
                    }
                    break;
            }
            switch (letteraLonArr){
                case "E":
                    longitudeV2 = longitudeArr + deltaLambdaV2;
                    if (longitudeV2>=180){
                        letteraLonV2="W";
                        longitudeV2=360-longitudeV2;
                    }else if (longitudeV2<180){
                        letteraLonV2="E";
                    }else {
                        alert("Errore valutazione secondo vertice navigazione mista.");
                    }
                    break;
                case "W":
                    longitudeV2 = (-longitudeArr) + deltaLambdaV2;
                    if (longitudeV2>=0){
                        letteraLonV2="E";
                    }else if (longitudeV2<0){
                        letteraLonV2="W";
                        longitudeV2=Math.abs(longitudeV2);
                    }else {
                        alert("Errore valutazione secondo vertice navigazione mista.");
                    }
                    break;
            }
            break;
        default:
            alert("Errorre valutazione coordinate vertici navigazione mista.");
            break;
    }//end switch letteraDeltaLambda

    if (latitude<0){
        latitude=Math.abs(latitude);
    }
    if (latitudeArr<0){
        latitudeArr=Math.abs(latitudeArr);
    }
    if (latitudeParalleloLimite<0){
        latitudeParalleloLimite=Math.abs(latitudeParalleloLimite);
    }

}//end function DeltaLambdaVerticiNavMista()
//___________________________________________________________


//___________________________________________________________
//funzione che calcola la rotta inizale della navigazione mista
function RottaInizialeNavMista(){
    let rottaQuadrantale=Math.cos(Deg2Rad(latitudeParalleloLimite))/Math.cos(Deg2Rad(latitude));
    rottaQuadrantale=Rad2Deg(Math.asin(rottaQuadrantale));

    //prima di passarla in circolare devo determinare la lettera associata alla differenza di latitudine tra il punto di
    //partenza e il vertice V1
    let dPhiV, letteradPhiV;
    switch (letteraLatParalleloLimite){
        case "N":
            switch (letteraLat){
                case "N":
                    dPhiV=latitudeParalleloLimite-latitude;
                    if (dPhiV>=0){
                        letteradPhiV="N";
                    }else {
                        letteradPhiV="S";
                        dPhiV=Math.abs(dPhiV);
                    }
                    break;
                case "S":
                    dPhiV=latitudeParalleloLimite-(-latitude);
                    if (dPhiV>=0){
                        letteradPhiV="N";
                    }else {
                        letteradPhiV="S";
                        dPhiV=Math.abs(dPhiV);
                    }
                    break;
            }
            break;
        case "S":
            switch (letteraLat){
                case "N":
                    dPhiV=(-latitudeParalleloLimite)-latitude;
                    if (dPhiV>=0){
                        letteradPhiV="N";
                    }else {
                        letteradPhiV="S";
                        dPhiV=Math.abs(dPhiV);
                    }
                    break;
                case "S":
                    dPhiV=(-latitudeParalleloLimite)-(-latitude);
                    if (dPhiV>=0){
                        letteradPhiV="N";
                    }else {
                        letteradPhiV="S";
                        dPhiV=Math.abs(dPhiV);
                    }
                    break;
            }
            break;
        default:
            alert("Errore valutazione rotta iniziale navigazione mista.");
            break;
    }

    //trasformo la rotta da quadrantale in circolare
    rottaInizialeNavMista=Quadrantale2Circolare(rottaQuadrantale,letteradPhiV,letteraDeltaLambda);
}//end function RottaInizialeNavMista()
//___________________________________________________________


//___________________________________________________________
//funzione che calcola la rotta finale della navigazione mista
function RottaFinaleNavMista(){
   /* let rottaFinaleNavMistaQuad=Math.cos(Deg2Rad(latitudeParalleloLimite))/Math.cos(Deg2Rad(latitudeArr));
    rottaFinaleNavMistaQuad=Rad2Deg(Math.asin(rottaFinaleNavMistaQuad));

    rottaFinaleNavMista=Quadrantale2Circolare(rottaFinaleNavMistaQuad,letteraDeltaPhi,letteraDeltaLambda);

    if (letteraLatVertice===letteraLatArr){
        if (letteraDeltaLambdaPrima==="E"){
            if (longitudeVertice<longitudeArr){
                rottaFinaleNavMista=180-rottaFinaleNavMista;
            }
        }
    }else if (letteraLatVerticeOpp===letteraLatArr){
        if (letteraDeltaLambdaPrima==="E"){
            if (longitudeVerticeOpp<longitudeArr){
                rottaFinaleNavMista=180-rottaFinaleNavMista;
            }
        }
    }*/

    if (letteraLatArr==="S"){
        latitude*=(-1);
    }

    if (letteraLatParalleloLimite==="S"){
        latitudeArr*=(-1);
    }

    let beta, num, den;
    num= Math.cos(Deg2Rad((90-latitudeParalleloLimite)))-(Math.cos(Deg2Rad((d2/60)))*Math.cos(Deg2Rad((90-latitudeArr))));
    den= Math.sin(Deg2Rad((d2/60)))*Math.sin(Deg2Rad((90-latitudeArr)));

    beta = Rad2Deg(Math.acos(num/den));

    switch (letteraDeltaLambda){
        case "E":
            rottaFinaleNavMista=180-beta;
            break;
        case "W":
            rottaFinaleNavMista=180+beta;
            break;
        default:
            alert("Errore determinazione rotta finale");
            break;
    }

    if (latitudeArr<0){
        latitudeArr=Math.abs(latitudeArr);
    }

    if (latitudeParalleloLimite<0){
        latitudeParalleloLimite=Math.abs(latitudeParalleloLimite);
    }

}//end function RottaFinaleNavMista()
//___________________________________________________________


//___________________________________________________________
//funzione che calcola la differenza di longitudine tra i due vertici
function DeltaLambdaV1V2(){
    switch (letteraLonV1){
        case "E":
            switch (letteraLonV2){
                case "E":
                    deltaLambdaVerticiNavMista=longitudeV2-longitudeV1;
                    if (deltaLambdaVerticiNavMista>=180){
                        letteraDeltaLambdaNavMista="W";
                        deltaLambdaVerticiNavMista=360-deltaLambdaVerticiNavMista;
                    }else if (deltaLambdaVerticiNavMista>=0 && deltaLambdaVerticiNavMista<180){
                        letteraDeltaLambdaNavMista="E";
                    }else if (deltaLambdaVerticiNavMista<0){
                        letteraDeltaLambdaNavMista="W";
                        deltaLambdaVerticiNavMista=Math.abs(deltaLambdaVerticiNavMista);
                    }
                    break;
                case "W":
                    deltaLambdaVerticiNavMista=(-longitudeV2)-longitudeV1;
                    if (deltaLambdaVerticiNavMista<0 && Math.abs(deltaLambdaVerticiNavMista)>=180){
                        letteraDeltaLambdaNavMista="E";
                        deltaLambdaVerticiNavMista=360-Math.abs(deltaLambdaVerticiNavMista);
                    }else if (deltaLambdaVerticiNavMista<0 && Math.abs(deltaLambdaVerticiNavMista)<180){
                        letteraDeltaLambdaNavMista="W";
                        deltaLambdaVerticiNavMista=Math.abs(deltaLambdaVerticiNavMista);
                    }
                    break;
                default:
                    alert("Errore valutazione differenza longitudine tra i vertici in navigazione mista.");
                    break;
            }
            break;
        case "W":
            switch (letteraLonV2){
                case "E":
                    deltaLambdaVerticiNavMista=longitudeV2-(-longitudeV1);
                    if (deltaLambdaVerticiNavMista>=0 && deltaLambdaVerticiNavMista<180){
                        letteraDeltaLambdaNavMista="E";
                    }else if (deltaLambdaVerticiNavMista>=180){
                        letteraDeltaLambdaNavMista="W";
                        deltaLambdaVerticiNavMista=360-deltaLambdaVerticiNavMista;
                    }
                    break;
                case "W":
                    deltaLambdaVerticiNavMista=(-longitudeV2)-(-longitudeV1);
                    if (deltaLambdaVerticiNavMista<0 && Math.abs(deltaLambdaVerticiNavMista)<180){
                        letteraDeltaLambdaNavMista="W";
                        deltaLambdaVerticiNavMista=Math.abs(deltaLambdaVerticiNavMista);
                    }else if (deltaLambdaVerticiNavMista>=0){
                        letteraDeltaLambdaNavMista="E";
                    }
                    break;
                default:
                    alert("Errore valutazione differenza longitudine tra i vertici in navigazione mista.");
                    break;
            }
            break;
        default:
            alert("Errore valutazione differenza longitudine tra i vertici in navigazione mista.");
            break;
    }
}//end function DeltaLambdaV1V2()
//___________________________________________________________


//___________________________________________________________
//funzione che calcola il cammino effettuato sul parallelo limite
function NavigazioneParallelo(){
    camminoV1V2 = (deltaLambdaVerticiNavMista*60) * Math.cos(Deg2Rad(latitudeParalleloLimite));
}//end function NavigazioneParallelo()
//___________________________________________________________


//___________________________________________________________
//funzione che calcola la rotta tra i due vertici
function RottaParallelo(){
    switch (letteraDeltaLambdaNavMista){
        case "E":
            rottaV1V2=90;
            break;
        case "W":
            rottaV1V2=270;
            break;
        default:
            alert("Errore valutazione valore rotta tra i due vertici navigazione mista.");
            break;
    }
}//end function RottaParallelo()
//___________________________________________________________


//___________________________________________________________
/*funzione che controlla la longitudine del vertice, per poter effettuare la navigazione mista
Per il controllo trasformo le rotte iniziale e finale in semicircolare e poi faccio il confronto, ricordando che la
rotta nel vertice è pari 90°
*/

function ControllaVerticeNavMista(){

    let rottaInizialeSemiCircolare, letteraRottainiziale, rottaFinaleSemiCircolare, letteraRottaFinale;

    if((rottaIniziale>0 && rottaIniziale<180)){
        rottaInizialeSemiCircolare=rottaIniziale;
        letteraRottainiziale="E";
    }else if((rottaIniziale>180 && rottaIniziale<360)){
        rottaInizialeSemiCircolare = 360-rottaIniziale;
        letteraRottainiziale="W";
    }

    if((rottaFinale>0 && rottaFinale<180)){
        rottaFinaleSemiCircolare=rottaFinale;
        letteraRottaFinale="E";
    }else if((rottaFinale>180 && rottaFinale<360)){
        rottaFinaleSemiCircolare=360-rottaFinale;
        letteraRottaFinale="W";
    }

    if ( (rottaInizialeSemiCircolare<90) && (rottaFinaleSemiCircolare<90) ){
        bug=2; //non è possibile la navigazione mista
    }else if ( ((rottaInizialeSemiCircolare>90)&&(rottaInizialeSemiCircolare<180)) && ((rottaFinaleSemiCircolare>90)&&(rottaFinaleSemiCircolare<180)) ){
        bug=2; //non è possibile effettuare la navigazione mista
    }else {
        bug=0;
    }


    //costrutto condizionale che verifica la latitudine del parallelo limite con quella del vertice
    if (Math.abs(latitudeParalleloLimite)>Math.abs(latitudeVertice)){
        bug=2;
    }






}//end function ControllaVerticeNavMista()
//___________________________________________________________


//___________________________________________________________
//funzione che risolve la navigazione mista
function RisolviNavMista(){
    SetParalleloLimite();
    ControllaVerticeNavMista();
    if (bug===2){
        alert("Non si può risolvere la navigazione mista! \n Il vertice non è tra il punto di partenza e arrivo!");
    }else {
        //SetParalleloLimite();
        switch (bug){
            case 0:
                CamminiOrtodromieNavMista();
                RottaInizialeNavMista();
                DeltaLambdaVerticiNavMista();
                DeltaLambdaV1V2();
                NavigazioneParallelo();
                RottaParallelo();
                RottaFinaleNavMista();
                SetOutputNavMista();
                break;
            case 1:
                alert("Errore risoluzione navigazione mista per controllo di bug.");
                break;
            default:
                alert("Errore valutazione risoluzione navigazione mista.");
                break;
        }
    }

}//end function RisolviNavMista()
//___________________________________________________________


//___________________________________________________________
//funzione che gestisce gli output della navigazione mista
function SetOutputNavMista(){
    let longitudineV1=CorreggiRoundOff(longitudeV1);
    let gradiV1=Math.floor(longitudineV1), primiV1=(longitudineV1-gradiV1)*60;
    let longitudineV2=CorreggiRoundOff(longitudeV2);
    let gradiV2=Math.floor(longitudineV2), primiV2=(longitudineV2-gradiV2)*60;

    risultatiNavigazioneMista.text=`Prima Ortodromia
Cammino: ${d1.toFixed(2)} NM

Rotta iniziale: ${rottaInizialeNavMista.toFixed(2)}°


Arco Lossodromico
Cammino: ${camminoV1V2.toFixed(2)} NM

Rotta: ${rottaV1V2}°

Longitudine 1° Vertice: ${gradiV1}° ${primiV1.toFixed(2)}' ${letteraLonV1}

Longitudine 2° Vertice: ${gradiV2}° ${primiV2.toFixed(2)}' ${letteraLonV2}


Seconda Ortodromia
Cammino: ${d2.toFixed(2)} NM

Rotta finale: ${rottaFinaleNavMista.toFixed(2)}°`;

}//end function SetOutputNavMista()
//___________________________________________________________


//___________________________________________________________
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
/*
* Di seguito vado a dichiarare le funzioni che mi permettono di risolvere il primo problema di ortodromia. Cerco di riusare le variabili dichiarate
all'inizio dello script, ma onde evitare bug per quando riguarda l'inserimento da parte dell'utente degli input, specialmente per latitudine,
lettera latitudine, longitudine, lettera longitudine(le variabili id...), andrò a dichiarare le nuove variabili, cambiando il nome per differenziarle
dalle precedenti. Per il cammino, punto di partenza, punto di arrivo userò le stesse variabili dichiarate prima.
Il primo problema consiste nel calcolare le coordinate del punto di arrivo conoscendo le coordinate del punto di partenza e il cammino e rotta iniziale.
* */
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
function onCalcolaPrimoProblemaTap(gargs){
    const button=gargs.object;

    RisolviPrimoProblema();

   /* console.log("Lat "+latitude+letteraLat);
    console.log("Lon: "+longitude+letteraLon);
    console.log("Cammino: "+cammino);
    console.log("Rotta: "+rottaIniziale);
    console.log("Rotta finale: "+rottaFinale);*/
}
exports.onCalcolaPrimoProblemaTap=onCalcolaPrimoProblemaTap;
//___________________________________________________________


//___________________________________________________________
//funzione che gestisce gli input del primo problema di ortodromia
function SetInputPrimoProblema(){
    letteraLat=idLetteraLat1.text;
    letteraLon=idLetteraLon1.text;
    cammino=parseFloat(idCammino.text);
    rottaIniziale=parseFloat(idRotta.text);
    bug=0;

    //ciclo condizionale che memorizza la latitudine inserita e assegna eventuali bug, riuso come variabile di memoria
    //la variabile latitude dichiarata per il secondo problema di ortodromia
    if(parseInt(idGradiLat1.text)===90){
        latitude=parseInt(idGradiLat1.text);
    }else if(parseInt(idGradiLat1.text)<=90){
        if(parseFloat(idPrimiLat1.text)<=60){
            latitude=parseInt(idGradiLat1.text)+(parseFloat(idPrimiLat1.text)/60);
            if(latitude>90){//assegnazione bug se la latitudine risulta maggiore di 90 gradi
                bug=1;
            }
        }else if(parseFloat(idPrimiLat1.text)>60){
            alert("Errore inserimeto primi di latitudine, primo problema di ortodromia.");
            bug=1; //asseganzione del bug, errore utente
        }
    }else{
        alert("Errore inserimento gradi latitudine, primo problema di ortodromia.");
        bug=1;
    }

    //ciclo condizionale che memorizza gli input della longitudine e assegna eventuali bug, uso come variabile di
    //memoria la variabile longitude dichiarata nel secondo problema di ortodromia
    if(parseInt(idGradiLon1.text)===180){
        longitude=parseInt(idGradiLon1.text);
    }else if(parseInt(idGradiLon1.text)<=180){
        if(parseFloat(idPrimiLon1.text)<=60){
            longitude=parseInt(idGradiLon1.text)+(parseFloat(idPrimiLon1.text)/60);
            if (longitude>180){
                bug=1;//assegnazione bug se la longitudine risulta maggiore di 180 gradi
            }
        }else if(parseFloat(idPrimiLon1.text)>60){
            alert("Errore inserimento primi di longitudine.");
            bug=1;
        }
    }else{
        alert("Errore inserimento gradi longitudine.");
        bug=1;
    }

    switch (rottaIniziale){
        case 0:
            tipoProblema="navigazione meridiano";
            break;
        case 360:
            tipoProblema="navigazione meridiano";
            break;
        case 180:
            tipoProblema="navigazione meridiano";
            break;
        case 90:
            if (latitude===0){
                tipoProblema="navigazione equatore";
            }else {
                tipoProblema="navigazione generale";
            }
            break;
        case 270:
            if (latitude===0){
                tipoProblema="navigazione equatore";
            }else {
                tipoProblema="navigazione generale";
            }
            break;
        default:
            tipoProblema="navigazione generale";
            break;
    }

}//end function SetInputPrimoProblema()
//___________________________________________________________


//___________________________________________________________
//funzione che calcola la latitudine del punto di arrivo e assegna la lettera coordinata
function LatitudineArrivo(){
    if (letteraLat==="S"){
        latitude*=(-1);
    }





    latitudeArr = Math.sin(Deg2Rad(latitude))*Math.cos(Deg2Rad(cammino/60))+Math.cos(Deg2Rad(latitude))*Math.sin(Deg2Rad(cammino/60))*Math.cos(Deg2Rad(rottaIniziale));
    latitudeArr=Rad2Deg(Math.asin(latitudeArr));

    //ciclo condizionale che assigna la lettera coordinata alla latitudine del punto di arrivo
    if (latitudeArr>=0){
        letteraLatArr="N";
    }else if (latitudeArr<0){
        letteraLatArr="S";
        latitudeArr=Math.abs(latitudeArr);
    }else {
        alert("Errorre valutazione lettera latitudine arrivo, primo problema di ortodromia.");
    }




    if (latitude<0){
        latitude=Math.abs(latitude);
    }

}//end function LatitudinePartenza()
//___________________________________________________________


//___________________________________________________________
//funzione che calcola la differenza di longitudine per il primo problema di ortodromia
function DeltaLambdaPrimoProblema(){
    if (letteraLatArr==="S"){
        latitudeArr=Math.abs(latitudeArr);
        latitudeArr*=(-1);
    }
    if (letteraLat==="S"){
        latitude=Math.abs(latitude);
        latitude*=(-1);
    }

    switch (cammino){ //costrutto condizionale che risolve l'ambiguità che si verifica nel calcolare arccos(1), dall'instabilità numerica esce NaN
        case 21600:
            deltaLambda=0;
            break;
        case 10800:
            deltaLambda=180;
            break;
        default:
            let num = Math.cos(Deg2Rad(cammino/60))-Math.sin(Deg2Rad(latitude))*Math.sin((Deg2Rad(latitudeArr)));
            let den = Math.cos(Deg2Rad(latitude))*Math.cos(Deg2Rad(latitudeArr));

            deltaLambda = Rad2Deg(Math.acos(num/den));
            break;
    }
/*
    let num = Math.cos(Deg2Rad(cammino/60))-Math.sin(Deg2Rad(latitude))*Math.sin((Deg2Rad(latitudeArr)));
    let den = Math.cos(Deg2Rad(latitude))*Math.cos(Deg2Rad(latitudeArr));

    deltaLambda = Rad2Deg(Math.acos(num/den));
*/

    //ciclo condizionale innestato che assegna la lettera coordinata alla differenza di longitudine
    let semipiano;
    if ((rottaIniziale>0 && rottaIniziale<=90) || (rottaIniziale>90 && rottaIniziale<180)){//semipiano est
        semipiano="est";
        if (deltaLambda>=0 && deltaLambda<180){
            letteraDeltaLambda="E";
            letteraDeltaLambdaPrima=letteraDeltaLambda;
        }else if (deltaLambda>=180){
            letteraDeltaLambda="W";
            letteraDeltaLambdaPrima="E";
            deltaLambda=360-deltaLambda;
        }
    }else if ((rottaIniziale>180 && rottaIniziale<=270) || (rottaIniziale>270 && rottaIniziale<360)){
        semipiano="ovest";
        if (deltaLambda<=0 && Math.abs(deltaLambda)<180){
            letteraDeltaLambda="W";
            letteraDeltaLambdaPrima=letteraDeltaLambda;
            deltaLambda=Math.abs(deltaLambda);
        }else if (deltaLambda<0 && Math.abs(deltaLambda)>180){
            letteraDeltaLambda="E";
            letteraDeltaLambdaPrima="W";
            deltaLambda=360-Math.abs(deltaLambda);
        }
    }

    //ciclo condizionale che calcola la longitudine del punto di arrivo
    switch (letteraLon){
        case "E":
            switch (semipiano){
                case "est":  //punto di partenza emisfero est e rotta iniziale tra 1° e 2° quadrante nautico
                    longitudeArr=longitude+deltaLambda;
                    if (longitudeArr<180){
                        letteraLonArr="E";
                    }else if (longitudeArr>=180){
                        letteraLonArr="W";
                        longitudeArr=360-longitudeArr;
                    }
                    break;
                case "ovest": //punto di partenza emisfero est e rotta iniziale tra 3° e 4° quadrante
                    longitudeArr=longitude-deltaLambda;
                    if (longitudeArr>=0){
                        letteraLonArr="E";
                    }else if (longitudeArr<0){
                        letteraLonArr="W";
                        longitudeArr=Math.abs(longitudeArr);
                    }
                    break;
                default:
                    alert("Errore valutazione longitudine arrivo, primo problema di ortodromia.");
                    break;
            }
            break;
        case "W":
            switch (semipiano){
                case "est":
                    longitudeArr=(-longitude)+deltaLambda;
                    if (longitudeArr>=0){
                        letteraLonArr="E";
                    }else if (longitudeArr<0){
                        letteraLonArr="W";
                        longitudeArr=Math.abs(longitudeArr);
                    }
                    break;
                case "ovest":
                    longitudeArr=(-longitude)-deltaLambda;
                    if (longitudeArr<0 && Math.abs(longitudeArr)<180){
                        letteraLonArr="W";
                        longitudeArr=Math.abs(longitudeArr);
                    }else if (longitudeArr<0 && Math.abs(longitudeArr)>=180){
                        letteraLonArr="E";
                        longitudeArr=360-Math.abs(longitudeArr);
                    }
                    break;
                default:
                    alert("Errore valutazione longitudine arrivo, primo problema di ortodromia.");
                    break;
            }
            break;
        default:
            alert("Errore valutazione longitudine arrivo, primo problema di ortodromia.");
            break;
    }

    if (latitudeArr<0){
        latitudeArr=Math.abs(latitudeArr);
    }
    if (latitude<0){
        latitude=Math.abs(latitude);
    }

}//end function DeltaLambdaPrimoProblema()
//___________________________________________________________


//___________________________________________________________
//funzione che risolve il primo problema di ortodromia
function RisolviPrimoProblema(){
    SetInputPrimoProblema();
    switch (bug){
        case 0:
            switch (tipoProblema){
                case "navigazione generale":
                    LatitudineArrivo();
                    DeltaPhi();
                    DeltaLambdaPrimoProblema();
                    Vertici();
                    Nodi();
                    RottaFinale();
                    break;
                case "navigazione meridiano":
                    NavigazioneMeridianoPrimoProbOrto();
                    break;
                case "navigazione equatore":
                    NavigazioneEquatorePrimoProbOrto();
                    break;
                default:
                    alert("Errore risoluzione con controllo tipo problema, primo problema di ortdoromia.");
                    break;
            }
            SetOutputPrimoProblema();
            break;
        case 1:
            alert("Errore risoluzione primo problema di ortodromia per controlli di bug.");
            break;
    }

}//end function risolviPrimoProblema()
//___________________________________________________________


//___________________________________________________________
//funzione che gestisce gli output del primo problema di ortodromia
function SetOutputPrimoProblema(){
   switch (tipoProblema){
       case "navigazione generale":
           switch (cammino){
               case 21600:
                   latitudeArr=Math.abs(latitude);
                   longitudeArr=Math.abs(longitude);
                   letteraLonArr=letteraLon;
                   break;
               case 10800:
                   latitudeArr=Math.abs(latitude);
                   break;
           }

           let latitudineArrivo=CorreggiRoundOff(latitudeArr);
           let gradiLat=Math.floor(latitudineArrivo), primiLat=(latitudineArrivo-gradiLat)*60;
           let longitudineArrivo=CorreggiRoundOff(longitudeArr);
           let gradiLon=Math.floor(longitudineArrivo), primiLon=(longitudineArrivo-gradiLon)*60;
           let latitudineVertice=CorreggiRoundOff(latitudeVertice);
           let gradiLatVert=Math.floor(latitudineVertice), primiLatVert=(latitudineVertice-gradiLatVert)*60;
           let longitudineVertice=CorreggiRoundOff(longitudeVertice);
           let gradiLonVert=Math.floor(longitudineVertice), primiLonVert=(longitudineVertice-gradiLonVert)*60;
           longitudineVertice=CorreggiRoundOff(longitudeVerticeOpp);
           let gradiLonVertOpp=Math.floor(longitudineVertice), primiLonVertOpp=(longitudineVertice-gradiLonVertOpp)*60;
           let longitudineNodo=CorreggiRoundOff(longitudeNodoPrincipale);
           let gradiNodo=Math.floor(longitudineNodo), primiNodo=(longitudineNodo-gradiNodo)*60;
           longitudineNodo=CorreggiRoundOff(longitudeNodoSecondario);
           let gradiNodoSec=Math.floor(longitudineNodo), primiNodoSec=(longitudineNodo-gradiNodoSec)*60;

           risultatiPrimoProblema.text=`Punto di arrivo
Latitudine: ${gradiLat}° ${primiLat.toFixed(2)}' ${letteraLatArr}
Longitudine: ${gradiLon}° ${primiLon.toFixed(2)}' ${letteraLonArr}

Rotta Finale: ${rottaFinale.toFixed(2)}°

Coordinate Primo Vertice
Latitudine: ${gradiLatVert}° ${primiLatVert.toFixed(2)}' ${letteraLatVertice}
Longitudine: ${gradiLonVert}° ${primiLonVert.toFixed(2)}' ${letteraLonVertice}

Coordinate Secondo Vertice
Latitudine: ${gradiLatVert}° ${primiLatVert.toFixed(2)}' ${letteraLatVerticeOpp}
Longitudine: ${gradiLonVertOpp}° ${primiLonVertOpp.toFixed(2)}' ${letteraLonVerticeOpp}

Coordinate Nodo Principale:
Longitudine: ${gradiNodo}° ${primiNodo.toFixed(2)}' E

Coordinate Nodo Secondario:
Longitudine: ${gradiNodoSec}° ${primiNodoSec.toFixed(2)}' W`;
           break;

       case "navigazione meridiano":
           let gradiLatArr=Math.floor(latitudeArr), primiLatArr=(latitudeArr-gradiLatArr)*60;
           let gradiLonArr=Math.floor(longitudeArr), primiLonArr=(longitudeArr-gradiLonArr)*60;

           risultatiPrimoProblema.text=`Punto di Arrivo
Latitudine: ${gradiLatArr}° ${primiLatArr.toFixed(2)}' ${letteraLatArr}
Longitudine: ${gradiLonArr}° ${primiLonArr.toFixed(2)}' ${letteraLonArr}

Vertici
Sono i poli geografici

Nodi
Sono dati dall'intersezione del meridiano con l'equatore`;
           break;

       case "navigazione equatore":
           let gradiLonArr1=Math.floor(longitudeArr), primiLonArr1=(longitudeArr-gradiLonArr1);

           risultatiPrimoProblema.text=`Punto di Arrivo
Latitudine: ${latitude}° ${letteraLat}
Longitude: ${gradiLonArr1}° ${primiLonArr1.toFixed(2)}' ${letteraLonArr}`;
           break;

       default:
           alert("Errore gestione output, primo problema di ortodromia.");
   }

}//end function SetOuputPrimoProblema()
//___________________________________________________________


//___________________________________________________________
/*
* Implemento di seguito i casi particolari relativi al primo problema di ortodromia
* */
//___________________________________________________________


//___________________________________________________________
//funzione che calcola la navigazione su meridiano per il primo problema di ortodromia
function NavigazioneMeridianoPrimoProbOrto(){

    /*per la risoluzione di tale problema devo creare un ciclo condizionale innestato che permette di controllare
    * i valori che può assumere a rotta iniziale, dopodichè effettuo i controlli, in base alla lettera coordinata
    * associata alla latitudine di partenza, se il valore del cammino supera le colatitudini o 90+latitudinePartenza;
    * solo dopo tali controlli posso determinare la latitudine di arrivo e la rotta finale*/
    if (rottaIniziale===0 || rottaIniziale===360){
        switch (letteraLat){
            case "N":
                let colatitudine=90-latitude;
                let differenza;
                if (cammino>(colatitudine*60)){//caso partenza emisfero nord e passo il polo nord
                    differenza=cammino-(colatitudine*60);
                    differenza/=60;
                    latitudeArr=90-differenza;

                    if (latitudeArr>=0){
                        letteraLatArr="N";
                    }else if (latitudeArr<0){
                        letteraLatArr="S";
                    }else{
                        alert("Errore valutazione lettera coordinata latitudine arrivo, navigazione meridiano primo problema di ortodromia.");
                    }

                    switch (letteraLon){
                        case "E":
                            longitudeArr=longitude+180;
                            longitudeArr=360-longitudeArr;
                            letteraLonArr="W";
                            break;
                        case "W":
                            longitudeArr=-longitude+180;
                            letteraLonArr="E";
                            break;
                        default:
                            alert("Errore valutazione longitudine e lettera longitudine arrivo, navigazione meridiano primo problema ortodromia.");
                            break;
                    }

                    rottaFinale=180;

                }else if (cammino<=(colatitudine*60)){//caso emisfero nord e non passo il polo nord
                    longitudeArr=longitude; letteraLonArr=letteraLon;

                    latitudeArr=latitude+(cammino/60);
                    letteraLatArr="N";

                    rottaFinale=rottaIniziale;
                }else {
                    alert("Errore risoluzione primo caso navigazione meridiano primo problema ortodromia.");
                }
                break;

            case "S":
                if (cammino>((90+latitude)*60)){//caso che dall'emisfero sud passo il polo nord
                    let differenza = cammino-((90+latitude)*60);
                    latitudeArr=90-(differenza/60);
                    if (latitudeArr>=0){
                        letteraLatArr="N";
                    }else if(latitudeArr<0){
                        letteraLatArr="S";
                    }else {
                        alert("Errore valutazione lettera coordinata latitudine arrivo, navigazione meridiano primo problema ortodromia.");
                    }

                    switch (letteraLon){
                        case "E":
                            longitudeArr=360-(longitude+180);
                            letteraLonArr="W";
                            break;
                        case "W":
                            longitudeArr=-longitude+180;
                            letteraLonArr="E";
                            break;
                        default:
                            alert("Errore valutazione longitudine e lettera longitudine, navigazione meridiano primo problema ortodromia.");
                            break;
                    }

                    rottaFinale=180;

                }else if (cammino<=((90+latitude)*60)){//caso emisfero sud, rotta nord ma non supero il polo nord

                    latitudeArr=(-latitude)+(cammino/60);
                    if (latitudeArr>=0){
                        letteraLatArr="N";
                    }else if (latitudeArr<0){
                        letteraLatArr="S";
                    }else {
                        alert("Errore valutazione lettera coordinata latitudine, navigaizione meridiano primo problema ortodromia.");
                    }

                    longitudeArr=longitude; letteraLonArr=letteraLon;

                    rottaFinale=rottaIniziale;

                }else {
                    alert("Errore risoluzione secondo caso navigazione meridiano primo problema ortodromia.");
                }
                break;
            default:
                alert("Errore risoluzione navigazione meridiano primo problema di ortodromia.");
                break;
        }//end switch(letteraLat)

    }else if (rottaIniziale===180){
        switch (letteraLat){
            case "N":
                if (cammino>((90+latitude)*60)){//caso emisfero nord rotta sud e passaggio polo sud
                    let differenza=cammino-((90+latitude)*60);
                    latitudeArr=(-90)+differenza;
                    if (latitudeArr<0){
                        letteraLatArr="S";
                    }else if (latitudeArr>=0){
                        letteraLatArr="N";
                    }else {
                        alert("Errore valutazione lettera coordinata latitudine, navigazione meridiano primo problema ortodromia.");
                    }

                    switch (letteraLon){
                        case "E":
                            longitudeArr=360-(longitude+180);
                            letteraLonArr="W";
                            break;
                        case "W":
                            longitudeArr=-longitude+180;
                            letteraLonArr="E";
                            break;
                        default:
                            alert("Errore valutazione longitudine e lettera coordinata, navigazione meridiano primo problema ortodromia.");
                            break;
                    }

                    rottaFinale=0;

                }else if (cammino<=((90+latitude)*60)){
                    longitudeArr=longitude; letteraLonArr=letteraLon;

                    latitudeArr=latitude-(cammino/60);
                    if (latitudeArr>=0){
                        letteraLonArr="N";
                    }else if (latitudeArr<0){
                        letteraLonArr="S";
                    }else {
                        alert("Errore valutazione lettera coordinata latitudine, navigazione meridiano prio problema ortodromia.");
                    }

                    rottaFinale=rottaIniziale;

                }else {
                    alert("Errore risoluzione terzo caso navigazione meridiano primo problema ortodromia.");
                }
                break;

            case "S":
                let colatitudine=90-latitude;
                let differenza;

                if (cammino>(colatitudine*60)){
                    differenza=cammino-(colatitudine*60);

                    latitudeArr=-90+(differenza/60);
                    if (latitudeArr>=0){
                        letteraLatArr="N";
                    }else if (latitudeArr<0){
                        letteraLatArr="S";
                    }else {
                        alert("Errore vlautazione lettera coordinata latitudine, navigazione meridiano primo problema ortodromia.");
                    }

                    switch (letteraLon){
                        case "E":
                            longitudeArr=360-(longitude+180);
                            letteraLonArr="W";
                            break;
                        case "W":
                            longitudeArr=(-longitude)+180;
                            letteraLonArr="E";
                            break;
                        default:
                            alert("Errore valutazione lettera coordinata longitudine, navigazione meridiano primo problema ortodromia.");
                            break;
                    }

                    rottaFinale=0;

                }else if (cammino<=(colatitudine*60)){
                    longitudeArr=longitude; letteraLonArr=letteraLon;

                    latitudeArr=latitude+(cammino/60);
                    letteraLatArr="S";

                    rottaFinale=rottaIniziale;

                }else {
                    alert("Errore risoluzione quarto caso navigazione meridiano primo problema ortodromia.");
                }
                break;

            default:
                alert("Errore risoluzione navigazione meridiano primo problema di ortodromia.");
                break;

        }//end switch(letteraLat)

    }else {
        alert("Errore valutazione rotta nella risoluzione navigazione meridiano primo problema ortodromia.");
    }

}//end function NavigazioneMeridianoPrimoProbOrto()
//___________________________________________________________


//___________________________________________________________
//funzione che calcola la navigazione su equatore per primo problema di ortodromia
function NavigazioneEquatorePrimoProbOrto(){
    latitudeArr=latitude; letteraLatArr=letteraLat;

    deltaLambda=(cammino/60);
    switch (letteraLon){
        case "E":
            switch (rottaIniziale){
                case 90:
                    longitudeArr=longitude+deltaLambda;
                    if (longitudeArr>=180){
                        letteraLonArr="W";
                        longitudeArr=360-longitudeArr;
                    }else if (longitudeArr<180){
                        letteraLonArr="E";
                    }else {
                        alert("Errore valutazione lettera coordinata longitudine, navigazione equatore primo problema ortodromia.");
                    }
                    break;
                case 270:
                    longitudeArr=longitude-deltaLambda;
                    if (longitudeArr>=0){
                        letteraLonArr="E";
                    }else if (longitudeArr<0){
                        letteraLonArr="W";
                        longitudeArr=Math.abs(longitudeArr);
                    }else{
                        alert("Erorre valutazione lettera coorinata longitudine, navigazione equatore primo problema ortodromia.");
                    }
                    break;
                default:
                    alert("Errore risoluzione primo caso navigazine equatore primo problema ortodromia.");
                    break;
            }
            break;

        case "W":
            switch (rottaIniziale){
                case 90:
                    longitudeArr=(-longitude)+deltaLambda;
                    if (longitudeArr>=0){
                        letteraLonArr="E";
                    }else if (longitudeArr<0){
                        letteraLonArr="W";
                        longitudeArr=Math.abs(longitudeArr);
                    }else {
                        alert("Erorre valutazione lettera coorinata longitudine, navigazione equatore primo problema ortodromia.");
                    }
                    break;
                case 270:
                    longitudeArr=(-longitude)-deltaLambda;
                    if (Math.abs(longitudeArr)>=180){
                        letteraLonArr="E";
                        longitudeArr=360-Math.abs(longitudeArr);
                    }else if (Math.abs(longitudeArr)<180){
                        letteraLonArr="W";
                        longitudeArr=Math.abs(longitudeArr);
                    }else {
                        alert("Erorre valutazione lettera coorinata longitudine, navigazione equatore primo problema ortodromia.");
                    }
                    break;
                default:
                    alert("Erroe risoluzione secondo caso navigazione equatore primo problema ortodromia.");
                    break;
            }
            break;

        default:
            alert("Errore risoluzione navigazione equatore primo proiblrma di ortodromia.");
            break;
    }//end switch(letteraLon)

}//end function NavigazioneEquatorePrimoProbOrto()
//___________________________________________________________


//___________________________________________________________
/*
* Di seguito dichiaro la funzioni che permettono di risolvere il confronto tra il primo problema di ortodromia e la
* lossodromia. I calcoli di lossodromia saranno:
*     -calcolo della rotta vera
*     -con il valore di cammino inserito, se non supera i poli nel caso di navigazione meridiano, si calcolano le
*      coordinate geografiche del punto di arrivo, coordinate che non saranno uguali a quelle ottenute con la
*      risoluzione dell'ortodromia, mi aspetto che siano più vicine a quelle del punto di partenza. Quindi i calcoli
*      di questa lossodromia sono fatti a parità di cammino e con rotta vera tale che la lossodromia congiunga il
*      punto di partenza con quello di arrivo
*
*
* Per la realizzazione di tale algoritmo, per non appesantire, si sfruttano le funzioni dichiarate prima. Nello specifico
* della risoluzione l'iter sarà:
*     -inizializzo la funzione SetLatDeltaPhiCre(), per calcolare le latitudini crescenti e la differenza, per effettuare
*      il calcolo della rotta (ricordo serve deltaPhiCre per calcolo rotta tra due punti)
*     -inizializzo la funzione RottaVera() per calcolare la rotta vera lossodromica tra A e B
*     -riuso la funzione SetLatDeltaPhiCre() già dichiarata prima
*     -riporto la funzione DeltaLambda() del primo problema di losssodromia per calcolare la longitudine del punto x
*      con il valore di cammino inserito, ma con condotta lossodromica
* */
//___________________________________________________________


//___________________________________________________________
//funzione che esegue il bottone calcola lossodromia del primo problema di ortodromia
function onConfrontaTap1(gargs){
    const button=gargs.object;

    RisolviPrimoProblemaLossodromia();
    console.log("Rv: "+rottaVera);

}
exports.onConfrontaTap1=onConfrontaTap1;
//___________________________________________________________


//___________________________________________________________
//funzione che calcola la differenza di latitudine crescente tra A e il putno x e la latitudine del punto x
function SetLatxDeltaPhiCrex(){
     deltaPhiX = cammino*Math.cos(Deg2Rad(rottaVera));   //valore in primi sessadecimali

     if (deltaPhiX<0){
         letteraDeltaPhiX="S";
     }else if (deltaPhiX>=0){
         letteraDeltaPhiX="N";
     }else{
         console.log("Errore valutazione lettera associata alla differenza di latitudine, primo problema di lossodromia.");
     }

     switch (letteraLat){
         case "N":
             latitudeX=latitude+(deltaPhiX/60);
             if (latitudeX>=0){
                 letteraLatX="N";
                 if (latitudeX>90){
                     latitudeX=90;
                 }
             }else{
                 letteraLatX="S";
                 if (Math.abs(latitudeX)>90){
                     latitudeX=90;
                 }else {
                     latitudeX=Math.abs(latitudeX);
                 }
             }
             break;
         case "S":
             latitudeX=(-latitude)+(deltaPhiX/60);
             if (latitudeX>=0){
                 letteraLatX="N";
                 if (latitudeX>90){
                     latitudeX=90;
                 }
             }else {
                 letteraLatX="S";
                 if (Math.abs(latitudeX)>90){
                     latitudeX=90;
                 }else {
                     latitudeX=Math.abs(latitudeX);
                 }
             }
             break;
         default:
             alert("Errore valutazione latitudine arrivo, primo problema di lossodromia.");
             break;
     }

     if (deltaPhiX<0){
         deltaPhiX=Math.abs(deltaPhiX);
     }

}//end function SetLatxDeltaPhiCrex()
//___________________________________________________________


//___________________________________________________________
//funzione che calcola la differenza di longitudine del primo problema di lossodromia
function DeltaLambdaPrimoProblemaLosso(deltaPhiCreAB, letteraDeltaPhiAB, lonA, letteraLonA,rotta){
    let deltaLambdaX, letteraDeltaLambdaX;

    if (lonA<0){
        lonA=Math.abs(lonA)
    }

    if (rotta===90 || rotta===270){
        deltaLambdaX = (cammino/Math.cos(Deg2Rad(latitude)))/60;
    }else{
        deltaLambdaX=deltaPhiCreAB*Math.tan(Deg2Rad(Circolare2Quadrantale(rotta)));
        deltaLambdaX=deltaLambdaX/60;
    }



    if (deltaLambdaX/360 > 1){ //cioè se il deltaLambda appena calcolato fa sì di percorrere più giri della superficie terrestre
        let n = Math.floor(deltaLambdaX/360); //numero delle rotazioni attorno al globo
        deltaLambdaX = deltaLambdaX - (n*360);
    }

    if (deltaLambdaX>180){
        if ((rotta>0&&rotta<=90) ||(rotta>90&&rotta<180)){//caso il mobile supera antimeridiano da E->W
            deltaLambdaX=360-deltaLambdaX;
            letteraDeltaLambdaX="W";
        }else if ((rotta>180&&rotta<=270) || (rotta>270&&rotta<360)){//caso il mobile supera antimeridiano da W->E
            deltaLambdaX=360-deltaLambdaX;
            letteraDeltaLambdaX="E";
        }
    }else if (deltaLambdaX<=180){
        if((rotta>0&&rotta<=90) || (rotta>90&&rotta<180)){
            letteraDeltaLambdaX="E";
        }else if ((rotta>180&&rotta<=270) || (rotta>270&&rotta<360)){
            letteraDeltaLambdaX="W";
        }
    }else {
        alert("Errore valutazione delta lambda primo problema di lossodromia.");
    }


    //calcolo longitudine di arrivo
    let lonB, letteraLonB;
    switch (letteraLonA){
        case "E":
            switch (letteraDeltaLambdaX){
                case "E":
                    lonB=lonA+deltaLambdaX;
                    if (lonB<=180){
                        letteraLonB="E";
                    }else if (lonB>180){
                        letteraLonB="W";
                        lonB=360-lonB;
                    }
                    break;
                case "W":
                    lonB=lonA-deltaLambdaX;
                    if (lonB>=0){
                        letteraLonB="E";
                    }else{
                        letteraLonB="W";
                        lonB=Math.abs(lonB);
                    }
                    break;
                default:
                    alert("Errore valutazione longitudine arrivo primo problema di lossodromia.");
                    break;
            }
            break;
        case "W":
            switch (letteraDeltaLambdaX){
                case "E":
                    lonB = (-lonA)+deltaLambdaX;
                    if (lonB>=0){
                        letteraLonB="E";
                    }else {
                        letteraLonB="W";
                        lonB=Math.abs(lonB);
                    }
                    break;
                case "W":
                    lonB=(-lonA)-deltaLambdaX;
                    if (Math.abs(lonB)<180){
                        letteraLonB="W";
                        lonB=Math.abs(lonB);
                    }else{
                        letteraLonB="E";
                        lonB=360-Math.abs(lonB);
                    }
                    break;
                default:
                    alert("Errore valutazione longitudine arrivo primo problema di lossodromia.");
                    break;
            }
            break;
        default:
            alert("Errore valutazione longitudine arrivo primo problema di lossodromia.");
            break;
    }

    risultatiCalcoli=[lonB, letteraLonB];
    return risultatiCalcoli;
}//end function DletaLambdaPrimoProblemaLosso()
//___________________________________________________________


//___________________________________________________________
//funzione che risolve il caso di navigazione per meridiano della lossodromia primo problema
function RisolviMeridianoPrimoProblema(){
    switch (letteraLat){
        case "N":
            switch (rottaIniziale){
                case 0:
                    if ((cammino/60)<=(90-latitude)){
                        deltaPhi=cammino/60;
                        latitudeArr=latitude+deltaPhi;
                        letteraLatArr="N";
                    }else if ((cammino/60)>(90-latitude)){
                        bugMeiridiano=1; //non posso superare il polo geografico
                    }
                    break;
                case 360:
                    if ((cammino/60)<=(90-latitude)){
                        deltaPhi=cammino/60;
                        latitudeArr=latitude+deltaPhi;
                        letteraLatArr="N";
                    }else if ((cammino/60)>(90-latitude)){
                        bugMeiridiano=1; //non posso superare il polo geografico
                    }
                    break;
                case 180:
                    if ((cammino/60)>(latitude+90)){
                        bugMeiridiano=1;
                    }else if ((cammino/60)<=(latitude+90)){
                        deltaPhi=cammino/60;
                        latitudeArr=latitude-deltaPhi;
                        if (latitudeArr>=0){
                            letteraLatArr="N";
                        }else {
                            letteraLatArr="S";
                            latitudeArr=Math.abs(latitudeArr);
                        }
                    }
                    break;
                default:
                    alert("Errore risoluzione navigazione meridiano primo problema di lossodromia.");
                    break;
            }
            break;
        case "S":
            switch (rottaIniziale){
                case 0:
                    if ((cammino/60)>=(latitude+90)){
                        bugMeiridiano=1;
                    }else if ((cammino/60)<(latitude+90)){
                        deltaPhi=cammino/60;
                        latitudeArr=(-latitude)+deltaPhi;
                        if (latitudeArr>=0){
                            letteraLatArr="N";
                        }else {
                            letteraLatArr="S";
                            latitudeArr=Math.abs(latitudeArr);
                        }
                    }
                    break;
                case 360:
                    if ((cammino/60)>=(latitude+90)){
                        bugMeiridiano=1;
                    }else if ((cammino/60)<(latitude+90)){
                        deltaPhi=cammino/60;
                        latitudeArr=(-latitude)+deltaPhi;
                        if (latitudeArr>=0){
                            letteraLatArr="N";
                        }else {
                            letteraLatArr="S";
                            latitudeArr=Math.abs(latitudeArr);
                        }
                    }
                    break;
                case 180:
                    if ((cammino/60)>(90-latitude)){
                        bugMeiridiano=1;
                    }else if ((cammino/60)<=(90-latitude)){
                        deltaPhi=cammino/60;
                        latitudeArr=latitude+deltaPhi;
                        letteraLatArr="S";
                    }
                    break;
                default:
                    alert("Errore risoluzione navigazione meridiano primo problema di lossodromia.");
                    break;
            }
            break;
        default:
            alert("Errore risoluzione navigazione meridiano primo problema di lossodromia.");
            break;
    }//end switch(letteraLat)

}//end function RisolviMeridianoPrimoProblema()
//___________________________________________________________


//___________________________________________________________
//funzione che risolve la navigazione su equatore
function RisolviEquatorePrimoProblema(){
    deltaLambda=cammino/60;

    switch (letteraLon){
        case "E":
            switch (rottaIniziale){
                case 90:
                    longitudeArr=longitude+deltaLambda;
                    if (longitudeArr>=180){
                        letteraLonArr="W";
                        longitudeArr=360-longitudeArr;
                    }else if (longitudeArr>0 && longitudeArr<180){
                        letteraLonArr="E";
                    }
                    break;
                case 270:
                    longitudeArr=longitude-deltaLambda;
                    if (longitudeArr>=0){
                        letteraLonArr="E";
                    }else {
                        letteraLonArr="W";
                    }
                    break;
                default:
                    alert("Errore valutazione longitudine arrivo primo problema lossodromia.");
                    break;
            }
            break;
        case "W":
            switch (rottaIniziale){
                case 90:
                    longitudeArr=(-longitude)+deltaLambda;
                    if (longitudeArr>=0){
                        letteraLonArr="E";
                    }else {
                        letteraLonArr="W";
                        longitudeArr=Math.abs(longitudeArr);
                    }
                    break;
                case 270:
                    longitudeArr=(-longitude)-deltaLambda;
                    if (Math.abs(longitudeArr)>=180){
                        letteraLonArr="E";
                        longitudeArr=360-Math.abs(longitudeArr);
                    }else if (Math.abs(longitudeArr)<180){
                        letteraLonArr="W";
                        longitudeArr=Math.abs(longitudeArr);
                    }
                    break;
                default:
                    alert("Errore valutazione longitudine arrivo primo problema lossodromia.");
                    break;
            }
            break;
        default:
            alert("Errore valutazione longitudine arrivo primo problema lossodromia.");
            break;
    }
}//end function RisolviEquatorePrimoProblema()
//___________________________________________________________


//___________________________________________________________
//funzione che risolve navigazione parallelo primo problema di losodromia
function RisolviParalleloPrimaLossodromia(){
    let deltaLambdaX = (cammino/60)/Math.cos(Deg2Rad(latitude));
    let letteraDeltaLambdaX;
    switch (rottaVera){
        case 90:
            letteraDeltaLambdaX="E";
            break;
        case 270:
            letteraDeltaLambdaX="W";
            break;
    }

    switch (letteraLon){
        case "E":
            switch (letteraDeltaLambdaX){
                case "E":
                    longitudeX=longitude+deltaLambdaX;
                    if (longitudeX>180){
                        longitudeX = 360-longitudeX;
                        letteraLonX="W";
                    }
                    break;
                case "W":
                    longitudeX=longitude-deltaLambdaX;
                    if (longitudeX<0){
                        letteraLonX="W";
                        longitudeX=Math.abs(longitudeX);
                    }else {
                        letteraLonX="E";
                    }
                    break;
            }
            break;

        case "W":
            switch (letteraDeltaLambdaX){
                case "E":
                    longitudeX=(-longitude)+deltaLambdaX;
                    if (longitudeX<0){
                        letteraLonX="W";
                        longitudeX=Math.abs(longitudeX);
                    }else {
                        letteraLonX="E";
                    }
                    break;
                case "W":
                    longitudeX=(-longitude)-deltaLambdaX;
                    if (longitudeX<0 && Math.abs(longitudeX)>180){
                        letteraLonX="E";
                        longitudeX=360-Math.abs(longitudeX);
                    }else if (longitudeX<0 && Math.abs(longitudeX)<180){
                        letteraLonX="W";
                        longitudeX=Math.abs(longitudeX);
                    }else {
                        letteraLonX="E";  //caso impossibile
                    }
            }
    }

}//end function RisolviParalleloPrimaLossodromia()

//___________________________________________________________


//___________________________________________________________
//funzione che riconosce la tipologia di problema del primo problema di lossodromia
function VerificaProblemaPrimaLossodromia(num){
    let ris;
    switch (num){
        case 90:
            ris = "navigazione parallelo";
            break;
        case 270:
            ris = "navigazione parallelo";
            break;
        default:
            ris = "generale";
            break;
    }
    return ris;
}
//___________________________________________________________


//___________________________________________________________
//funzione che risolve il primo problema di lossodromia
function RisolviPrimoProblemaLossodromia(){
    switch (bug){
        case 0:
            switch (tipoProblema){
                case "navigazione generale":
                    if (cammino===21600){
                        rottaVera = rottaIniziale;
                    }else {
                        let risultatiCalcoli=SetLatDeltaPhiCre(latitude,latitudeArr,letteraLat,letteraLatArr);
                        latitudeCre=risultatiCalcoli[0];
                        latitudeArrCre=risultatiCalcoli[1];
                        deltaPhiCre=risultatiCalcoli[2];
                        RottaVera();
                    }
                    rottaVera=CorreggiRoundOffRotte(rottaVera);
                    let verificaLossodromia=VerificaProblemaPrimaLossodromia(rottaVera);
                    switch (verificaLossodromia){
                        case "navigazione parallelo":
                            RisolviParalleloPrimaLossodromia();
                            console.log("Ci sono quasi");
                            SetOutputNavParalleloPrimoProbLosso();
                            console.log("Fatto");
                            break;

                        case "generale":
                            SetLatxDeltaPhiCrex();
                            let risultatiCalcoli1=SetLatDeltaPhiCre(latitude,latitudeX,letteraLat,letteraLatX);
                            latitudeCre=risultatiCalcoli1[0];
                            latitudeArrCre=risultatiCalcoli1[1];
                            let deltaPhiCreAX=risultatiCalcoli1[2];

                            let letteraDeltaPhiX, diff;
                            switch (letteraLat){
                                case "N":
                                    switch (letteraLatX){
                                        case "N":
                                            diff=latitudeX-latitude;
                                            if (diff>=0){
                                                letteraDeltaPhiX="N";
                                            }else {
                                                letteraDeltaPhiX="S";
                                            }
                                            break;
                                        case "S":
                                            letteraDeltaPhiX="S";
                                            break
                                    }
                                    break;
                                case "S":
                                    switch (letteraLatX){
                                        case "N":
                                            letteraDeltaPhiX="N";
                                            break;
                                        case "S":
                                            diff=(-latitudeX)-(-latitude);
                                            if (diff>=0){
                                                letteraDeltaPhiX="N";
                                            }else {
                                                letteraDeltaPhiX="S";
                                            }
                                    }
                            }

                            let risultatiCalcoliLon=DeltaLambdaPrimoProblemaLosso(deltaPhiCreAX,letteraDeltaPhiX,longitude,letteraLon,rottaVera);
                            longitudeX=risultatiCalcoliLon[0];
                            letteraLonX=risultatiCalcoliLon[1];
                            SetOutputPrimoProblemaLossodromia();
                            break
                    }

                    break;

                case "navigazione meridiano":
                    RisolviMeridianoPrimoProblema();
                    SetOutputPrimoProblemaLossodromia();
                    break;

                case "navigazione equatore":
                    RisolviEquatorePrimoProblema();
                    SetOutputPrimoProblemaLossodromia();
                    break;
            }
            break;

        case 1:
            alert("Errore, impossibileeffettuare il confronto con lossodromia.");
            break;


    }
}//end function RisolviPrimoProblemaLossodromia()
//___________________________________________________________


//___________________________________________________________
//funzione che gestisce gli output del primo problema di lossodromia
function SetOutputPrimoProblemaLossodromia(){
    switch (tipoProblema){
        case "navigazione generale":
            let gradiLat=Math.floor(latitudeX), primiLat=(latitudeX-gradiLat)*60;
            let gradiLon=Math.floor(longitudeX), primiLon=(longitudeX-gradiLon)*60;

            risultatiLossodromia1.text=`A parità di cammino, le coordinate con il percorso lossodromico saranno differenti da quelle ottenute dal percorso ortodromico

Coordinate Punto di arrivo:
Latitudine: ${gradiLat}° ${primiLat.toFixed(2)}' ${letteraLatX}
Longitudine: ${gradiLon}° ${primiLon.toFixed(2)}' ${letteraLonX}

Rotta Vera: ${rottaVera.toFixed(2)}°`;

            break;

        case "navigazione equatore":
            let gradiLonX=Math.floor(longitudeArr), primiLonX=(longitudeArr-gradiLonX)*60;

            risultatiLossodromia1.text=`Punto di Arrivo
Longitudine: ${gradiLonX}° ${primiLonX.toFixed(2)}' ${letteraLonArr}`;
            break;

        case "navigazione meridiano":
            switch (bugMeiridiano){
                case 0:
                    let gradiLatX=Math.floor(latitudeArr), primiLatX=(latitudeArr-gradiLatX)*60;

                    risultatiLossodromia1.text=`Punto di Arrivo
Latitudine: ${gradiLatX}° ${primiLatX.toFixed(2)}' ${letteraLatArr}`;
                    break;
                case 1:
                    risultatiLossodromia1.text=`ATTENZIONE! Con la lossodromia non si può superare il polo geografico.`;
                    break;
                default:
                    alert("Errore risoluzione output con valutazione bug meridiano.");
            }
    }
}//end function SetOutputPrimoProblemaLossodromia()
//___________________________________________________________


//___________________________________________________________
//funzione che gestisce output navigazione equatore primo problema di lossodromia
function SetOutputNavParalleloPrimoProbLosso(){
    let longitudineX=CorreggiRoundOff(longitudeX);
    let gradiLonX=Math.floor(longitudineX), primiLonX=(longitudineX-gradiLonX)*60;
    risultatiLossodromia1.text=`A parità di cammino, le coordinate con il percorso lossodromico saranno differenti da quelle ottenute dal percorso ortodromico

Navigazione su parallelo!

Longitudine arrivo: ${gradiLonX}° ${primiLonX.toFixed(2)}' ${letteraLonX}
Rotta vera: ${rottaVera.toFixed(2)}°`;
}




/*
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 */
//funzione che implementa la correzione di round-off negli output
function CorreggiRoundOff(num){
    let ris, differenza;
    let decimali=num-Math.floor(num);

    let int;
    if (decimali>0.5){
        int=Math.floor(num)+1;
    }else {
        int=Math.floor(num);
    }

    differenza=Math.abs(int-num);
    if (differenza < (1e-5) ){
        ris=int;
    }else {
        ris=num;
    }

    return ris;

}//end function CorreggiRoundOff(num)
/*
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 */


//___________________________________________________________
//funzione che correge l'errore di round-off per il calcolo delle rotte
function CorreggiRoundOffRotte(num){
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
}//end function CorreggiRoundOffRotte(num)
//___________________________________________________________
