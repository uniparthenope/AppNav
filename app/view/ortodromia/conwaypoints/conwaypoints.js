const fromObject = require("tns-core-modules/data/observable").fromObject;


//___________________________________________________________
//___________________________________________________________
//DICHIARO DI SEGUITO TUTTE LE VARIABILI UTILI


//di seguito dichiaro le variabili per ricevere gli inut dell'utente
var idGradiLat, idPrimiLat, idLetteraLat;
var idGradiLon, idPrimiLon, idLetteraLon;
var idGradiLatArr, idPrimiLatArr, idLetteraLatArr;
var idGradiLonArr, idPrimiLonArr, idLetteraLonArr;
var idNumeroWaypoints;
var tipolist;

//variabile dei metodi di calcoli dei waypoints
const tipologia=["distanza","longitudine"];

/*variabile dove viene memorizzata la tipologia del prblema, ovvero
* se dai dati inseriti si rientra in uno dei casi particolari dell'ortodromia
* */
var tipoProblema;

/*variabile nella quale assegno il valore di bug che permette di non
* effettuare i calcoli*/
var bug=0;

//di seguito dichiaro tutte le variabili per i calcoli della risoluzione dell'ortodromia
var latitude, letteraLat, longitude, letteraLon;
var latitudeArr, letteraLatArr, longitudeArr, letteraLonArr;
var deltaPhi, letteraDeltaPhi, deltaLambda, letteraDeltaLambda, letteraDeltaLambdaPrima;
var cammino, rottaIniziale;
var rottaFinale;
var latitudeVertice, letteraLatVertice, letteraLatVerticeOpp;
var deltaLambdaVertice, longitudeVertice, letteraLonVertice, longitudeVerticeOpp, letteraLonVerticeOpp;
var longitudeNodoPrincipale, longitudeNodoSecondario;

//variabile per mostarre i risultati dell'ortodromia
var risultati;

//di seguito dichiaro tutte le variabili utili per il calcolo dei waypoints
var numeroWaypoints;
var latWaypoints=[], letteraLatWaypoints=[];
var lonWaypoints=[], letteraLonWaypoints=[];

//variabile del cammino per i waypoints con metodo delle distanze
var camminoWayDist;

//variabile della differenza di longitudine dei waypoints con il metodo delle differenze di longitudine
var differenzaLongitudineWay;

//variabile che regola gli output dei waypoints
var risultatiWaypoints;

//___________________________________________________________
//___________________________________________________________


//___________________________________________________________
/*funzione che carica la pagina, ricordo che la pagina è unica
* ma suddivise in schede, la differenza delle caselle di input
* la creo negli identificatori associati alle caselle
* */
exports.onLoaded = function (args){
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

    //ricevo in input il numero di waypoints
    idNumeroWaypoints=page.getViewById("idNumeroWaypoints");

    tipolist=page.getViewById("tipolist");

    const vm = fromObject({
        tipologia: tipologia
    });
    page.bindingContext=vm;

    //ricevo la variabile dove mostarare i risultati
    risultati=page.getViewById("risultati");

    //ricevo la variabile dove mostrare i risultati dei waypoints
    risultatiWaypoints=page.getViewById("risultatiWaypoints");

}//end function onLoaded()
//___________________________________________________________


//___________________________________________________________
//funzione che gestisce il selezionatore lista
function onListPickerLoaded(fargs) {
    const listPickerComponent = fargs.object;
    listPickerComponent.on("selectedIndexChange", (args) => {
        var picker = args.object;
        //QUESTO SNIPPET, SE NON COMMENTATO, SERVE PER CONTROLLARE SE FUNZIONA IL PICKER console.log(`index: ${picker.selectedIndex}; item" ${tipologia[picker.selectedIndex]}`);
        switch (picker.selectedIndex){
            case 0:
                tipolist="distanza";
                break;
            case 1:
                tipolist="longitudine";
                break;
        }
    });
}
exports.onListPickerLoaded = onListPickerLoaded;
//___________________________________________________________


//___________________________________________________________
//funzione che gestisce l'azione del bottone per la risoluzione del problema di ortodromia
function onTap(fargs){
    const button = fargs.object;

    RisolviOrtodromia();
    RisolviWayPoints();

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
    numeroWaypoints=parseInt(idNumeroWaypoints.text);

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
                    if (deltaLambda<0 && Math.abs(deltaLambda)<180){
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
                    if (deltaLambda>=0 && deltaLambda<180){
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
* finale si adopera il teorema di Clairout, teorema valido solo per
* le geodetiche, che recita: "il prodotto tra il raggio del parallelo
* per il punto e il seno dell'angolo che la geodetica forma con il
* meridiano rimane costante". Detto ciò si ha
*      cos(phiA)*sin(Ri)=cos(phiB)*sin(Rf)
* quindi:
*      Rf=arcsin(cos(phiA)/cos(phiB) * sin(Ri))
*
* dopo aver ottenuto il valore trasformare in circolare
* */
function RottaFinale(){
    if(letteraLatArr!==letteraLat){
        latitudeArr*=(-1);
    }
    let rottaInizialeQuadrantale=Circolare2Quadrantale(rottaIniziale);

    let num=Math.cos(Deg2Rad(latitude)) * Math.sin(Deg2Rad(rottaInizialeQuadrantale));
    let den=Math.cos(Deg2Rad(latitudeArr));
    let rottaFinaleQuad=Rad2Deg(Math.asin(num/den));
    rottaFinale=Quadrantale2Circolare(rottaFinaleQuad,letteraDeltaPhi,letteraDeltaLambda);

    if (letteraLatVertice===letteraLatArr){
        if (letteraDeltaLambdaPrima==="E"){
            if (longitudeVertice<longitudeArr){
                rottaFinale=180-rottaFinale;
            }
        }
    }else if (letteraLatVerticeOpp===letteraLatArr){
        if (letteraDeltaLambdaPrima==="E"){
            if (longitudeVerticeOpp<longitudeArr){
                rottaFinale=180-rottaFinale;
            }
        }
    }

    if(latitudeArr<0){
        latitudeArr=Math.abs(latitudeArr);
    }
}//end function RottaFinale
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

    if (latitudeVertice<0){
        latitudeVertice=Math.abs(latitudeVertice);
    }


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
            rottaIniziale=0;
        }else if (latitudeArr>latitude){
            rottaIniziale=180;
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
            let gradiLatVert=Math.floor(latitudeVertice), primiLatVert=(latitudeVertice-gradiLatVert)*60;
            let gradiLonVert=Math.floor(longitudeVertice), primiLonVert=(longitudeVertice-gradiLonVert)*60;
            let gradiLonVertOpp=Math.floor(longitudeVerticeOpp), primiLonVertOpp=(longitudeVerticeOpp-gradiLonVertOpp)*60;
            let gradiLonNodo=Math.floor(longitudeNodoPrincipale), primiLonNodo=(longitudeNodoPrincipale-gradiLonNodo)*60;
            let gradiLonNodoSec=Math.floor(longitudeNodoSecondario), primiLonNodoSec=(longitudeNodoSecondario-gradiLonNodoSec)*60;

            risultati.text=`Cammino do: ${cammino.toFixed(5)} NM

Rotta Iniziale: ${rottaIniziale.toFixed(2)}°

Rotta Finale: ${rottaFinale.toFixed(2)}°

Coordinate Primo Vertice:
Latitudine: ${gradiLatVert}° ${primiLatVert.toFixed(5)}' ${letteraLatVertice}
Longtiudine: ${gradiLonVert}° ${primiLonVert.toFixed(5)}' ${letteraLonVertice}

Coordinate Secondo Vertice:
Latitudine: ${gradiLatVert}° ${primiLatVert.toFixed(5)}' ${letteraLatVerticeOpp}
Longitudine: ${gradiLonVertOpp}° ${primiLonVertOpp.toFixed(5)}' ${letteraLonVerticeOpp}

Nodo Principale:
Longitudine: ${gradiLonNodo}° ${primiLonNodo.toFixed(5)}' E

Nodo Secondario:
Longitudine: ${gradiLonNodoSec}° ${primiLonNodoSec.toFixed(5)}' W`;
            break;
        case "navigazione equatoriale":
            risultati.text=`Cammino d0: ${cammino.toFixed(5)} NM

Rotta Iniziale: ${rottaIniziale}°`;
            break;
        case "navigazione meridiano con arrivo meridiano":
            risultati.text=`Cammino d0: ${cammino.toFixed(5)} NM

Rotta Iniziale: ${rottaIniziale}°

Vertici
Sono i poli geografici

Nodi
Sono dati dall'intersezione del piano meridiano con il piano equatoriale`;
            break;
        case "navigazione meridiano con arrivo antimeridiano":
            risultati.text=`Cammino d0: ${cammino.toFixed(5)} NM

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
function RisolviOrtodromia(){
    SetInput();
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

}//end function RisolviOrtodromia()
//___________________________________________________________


//___________________________________________________________
//___________________________________________________________
/*
* Di seguit vado a dichiarare le funzioni utili al calcolo dei waypoints con le due metodologie proposte
* */


//___________________________________________________________
//funzione che calcola i waypoints con il metodo delle differenze di distanza
function WaypointsCammino(){

    camminoWayDist = cammino/(numeroWaypoints+1);

    //memorizzo nei vettori, come primo termine il punto di partenza
    latWaypoints[0]=latitude;
    letteraLatWaypoints[0]=letteraLat;
    lonWaypoints[0]=longitude;
    letteraLonWaypoints[0]=letteraLon;



    //dichiaro variabile locale per la differenza di longitudine dei waypoints

    for (i=1; i<=numeroWaypoints; i++){

        if (letteraLat==="S"){
            latitude*=-1;
        }

        //creo variabili d'appoggio
        let alfa = Math.sin(Deg2Rad(latitude))*Math.cos(Deg2Rad(i*(camminoWayDist/60)));
        let beta = Math.cos(Deg2Rad(latitude))*Math.sin(Deg2Rad(i*(camminoWayDist/60)))*Math.cos(Deg2Rad(rottaIniziale));

        //calcolo latitudine del waypoint e assegno lettera coordinata
        latWaypoints[i]=Rad2Deg(Math.asin(alfa+beta));
        alfa=0; beta=0;
        if (latWaypoints[i]<0){
            letteraLatWaypoints[i]="S";
            latWaypoints[i]=Math.abs(latWaypoints[i]);
        }else {
            letteraLatWaypoints[i]="N";
        }

        //calcolo la differenza di longitudine del waypoint
        if (letteraLatWaypoints[i]!==letteraLat){//ciclo che mi permette di effettuare il corretto calcolo della differenza di longitudine
            latWaypoints[i]*=-1;
        }

        latitude=Math.abs(latitude);


        let deltaLambdaX;

        let num = Math.cos(Deg2Rad(i*(camminoWayDist/60))) - Math.sin(Deg2Rad(latitude))*Math.sin(Deg2Rad(latWaypoints[i]));
        let den = Math.cos(Deg2Rad(latitude))*Math.cos(Deg2Rad(latWaypoints[i]));
        deltaLambdaX = Rad2Deg(Math.acos(num/den));

        if (latWaypoints[i]<0){//ciclo che mi riassegna il giusto segno alla latitudine
            latWaypoints[i]=Math.abs(latWaypoints[i]);
        }

        switch (letteraLon){
            case "E":
                switch (letteraDeltaLambda){
                    case "E":
                        lonWaypoints[i]=longitude+deltaLambdaX;
                        if (lonWaypoints[i]>=180){
                            lonWaypoints[i]=360-lonWaypoints[i];
                            letteraLonWaypoints[i]="W";
                        }else if (lonWaypoints[i]>=0 && lonWaypoints[i]<180){
                            letteraLonWaypoints[i]="E";
                        }
                        break;
                    case "W":
                        lonWaypoints[i]=longitude-deltaLambdaX;
                        if (lonWaypoints[i]>=0){
                            letteraLonWaypoints[i]="E";
                        }else if (lonWaypoints[i]<0){
                            letteraLonWaypoints[i]="W";
                            lonWaypoints[i]=Math.abs(lonWaypoints[i]);
                        }
                        break;
                    default:
                        alert("Errore valutazione longitudine del singolo waypoints.");
                        break;
                }
                break;
            case "W":
                switch (letteraDeltaLambda){
                    case "E":
                        lonWaypoints[i]=(-longitude)+deltaLambdaX;
                        if (lonWaypoints[i]<0){
                            letteraLonWaypoints[i]="W";
                            lonWaypoints[i]=Math.abs(lonWaypoints[i]);
                        }else if (lonWaypoints[i]>=0){
                            letteraLonWaypoints[i]="E";
                        }
                        break;
                    case "W":
                        lonWaypoints[i]=(-longitude)-deltaLambdaX;
                        if (lonWaypoints[i]<0 && Math.abs(lonWaypoints[i])>=180){
                            letteraLonWaypoints[i]="E";
                            lonWaypoints[i]=360-Math.abs(lonWaypoints[i]);
                        }else if (lonWaypoints[i]<0 && Math.abs(lonWaypoints[i])<180){
                            letteraLonWaypoints[i]="W";
                            lonWaypoints[i]=Math.abs(lonWaypoints[i]);
                        }
                        break;
                    default:
                        alert("Errore valutazione longitudine del singolo waypoints.");
                        break;
                }
                break;
            default:
                alert("Errore valutazione longitudine del singolo waypoints.");
                break;
        }//end switch (letteraLon)

        deltaLambdaX=0; num=0; den=0;


    }//end for

    if (latitude<0){
        latitude=Math.abs(latitude);
    }

    //memorizzo come ultima componente dei vettori il punto di arrivo
    latWaypoints[numeroWaypoints+1]=latitudeArr;
    letteraLatWaypoints[numeroWaypoints+1]=letteraLatArr;
    lonWaypoints[numeroWaypoints+1]=longitudeArr;
    letteraLonWaypoints[numeroWaypoints+1]=letteraLonArr;

}//end function WaypointsCammino()
//___________________________________________________________


//___________________________________________________________
//funzione che calcola i waypoints con il metodo delle differenze di longitudine
function WaypointsLongitudine(){
    differenzaLongitudineWay = deltaLambda/(numeroWaypoints+1);

    //memorizzo nei vettori il punto di partenza
    latWaypoints[0]=latitude;
    letteraLatWaypoints[0]=letteraLat;
    lonWaypoints[0]=longitude;
    letteraLonWaypoints[0]=letteraLon;

    //dichiaro i due cicli che assegnano i segni alle variabili per effettuare il giusto calcolo
    if (letteraLat==="S"){
        latitude*=(-1);
    }

    if (letteraDeltaLambda==="W"){
        differenzaLongitudineWay*=(-1);
    }

    //calcolo la latitudine dei waypoints
    for (i=1; i<=numeroWaypoints; i++){

        let primoTermine=Math.tan(Deg2Rad(latitude))*Math.cos(Deg2Rad((i*differenzaLongitudineWay)));
        let secondoTermine=Math.sin(Deg2Rad((i*differenzaLongitudineWay)))/(Math.cos(Deg2Rad(latitude)) * Math.tan(Deg2Rad(rottaIniziale)));
        latWaypoints[i]=Rad2Deg(Math.atan((primoTermine+secondoTermine)));
        console.log(latWaypoints[i]);
        primoTermine=0; secondoTermine=0;

        if (latWaypoints[i]>=0){
            letteraLatWaypoints[i]="N";
        }else if (latWaypoints[i]<0){
            letteraLatWaypoints[i]="S";
            latWaypoints[i]=Math.abs(latWaypoints[i]);
        }else {
            alert("Errore valutazione lettera coordinata latitudine del singolo waypoints.");
        }

        //ciclo condizionale innsestato che calcola la longitudine del waypoints
        switch (letteraLon){
            case "E":
                switch (letteraDeltaLambda){
                    case "E":
                        lonWaypoints[i]=longitude+Math.abs(i*differenzaLongitudineWay);
                        if (lonWaypoints[i]>=180){
                            letteraLonWaypoints[i]="W";
                            lonWaypoints[i]=360-lonWaypoints[i];
                        }else if (lonWaypoints[i]>=0 && lonWaypoints[i]<180){
                            letteraLonWaypoints[i]="E";
                        }
                        break;
                    case "W":
                        lonWaypoints[i]=longitude-Math.abs(i*differenzaLongitudineWay);
                        if (lonWaypoints[i]>=0){
                            letteraLonWaypoints[i]="E";
                        }else if (lonWaypoints[i]<0){
                            letteraLonWaypoints[i]="W";
                            lonWaypoints[i]=Math.abs(lonWaypoints[i]);
                        }
                        break;
                    default:
                        alert("Errore valutazione longitudine del singolo waypoints.");
                        break;
                }
                break;
            case "W":
                switch (letteraDeltaLambda){
                    case "E":
                        lonWaypoints[i]=(-longitude)+Math.abs(i*differenzaLongitudineWay);
                        if (lonWaypoints[i]>=0){
                            letteraLonWaypoints[i]="E";
                        }else if (lonWaypoints[i]<0){
                            letteraLonWaypoints[i]="W";
                            lonWaypoints[i]=Math.abs(lonWaypoints[i]);
                        }
                        break;
                    case "W":
                        lonWaypoints[i]=(-longitude)-Math.abs(i*differenzaLongitudineWay);
                        if (lonWaypoints[i]<0 && Math.abs(lonWaypoints[i])>=180){
                            letteraLonWaypoints[i]="E";
                            lonWaypoints[i]=360-Math.abs(lonWaypoints[i]);
                        }else if (lonWaypoints[i]<0 && Math.abs(lonWaypoints[i])<180){
                            letteraLonWaypoints[i]="W";
                            lonWaypoints[i]=Math.abs(lonWaypoints[i]);
                        }
                        break;
                    default:
                        alert("Errore valutazione longitudine del singolo waypoints.");
                        break;
                }
                break;
            default:
                alert("Errore valutazione longitudine del singolo waypoints.");
                break;
        }//end switch(letteraLon)

        //memorizzo nei vettori, come ultmo elemento, il punto di arrivo
        latWaypoints[numeroWaypoints+1]=latitudeArr;
        letteraLatWaypoints[numeroWaypoints+1]=letteraLatArr;
        lonWaypoints[numeroWaypoints+1]=longitudeArr;
        letteraLonWaypoints[numeroWaypoints+1]=letteraLonArr;


    }//end for

    //ciclo condizionale che riassegna il segno positivo alla latitudine di partenza
    if (latitude<0){
        latitude=Math.abs(latitude);
    }

}//end function WaypointsLongitudine()
//___________________________________________________________


//___________________________________________________________
//funzione che regola gli output dei waypoints
function SetOutputWay(){

    let gradiLatWay=[], primiLatWay=[];
    let gradiLonWay=[], primiLonWay=[];

    gradiLatWay[0]=Math.floor(latWaypoints[0]); primiLatWay[0]=((latWaypoints[0]-gradiLatWay[0])*60).toFixed(5);
    gradiLonWay[0]=Math.floor(lonWaypoints[0]); primiLonWay[0]=((lonWaypoints[0]-gradiLonWay[0])*60).toFixed(5);

    let out = "Punto di Partenza"+"\n"+gradiLatWay[0]+"°"+" "+primiLatWay[0]+"'"+letteraLatWaypoints[0]+" "+gradiLonWay[0]+"°"+" "+primiLonWay+"'"+letteraLonWaypoints[0]+"\n";


    for (i=1; i<(latWaypoints.length -1); i++){
        gradiLatWay[i]=Math.floor(latWaypoints[i]);
        primiLatWay[i]=((latWaypoints[i]-gradiLatWay[i])*60).toFixed(5);
        gradiLonWay[i]=Math.floor(lonWaypoints[i]);
        primiLonWay[i]=((lonWaypoints[i]-gradiLonWay[i])*60).toFixed(5);

        out = out + i+"°"+" Waypoint\n"+gradiLatWay[i]+"°"+" "+primiLatWay[i]+"'"+letteraLatWaypoints[i]+" "+gradiLonWay[i]+"°"+" "+primiLonWay[i]+"'"+letteraLonWaypoints[i]+"\n";

    }

    let j=latWaypoints.length-1;

    gradiLatWay[j]=Math.floor(latWaypoints[j]); primiLatWay[j]=((latWaypoints[j]-gradiLatWay[j])*60).toFixed(5);
    gradiLonWay[j]=Math.floor(lonWaypoints[j]); primiLonWay[j]=((lonWaypoints[j]-gradiLonWay[j])*60).toFixed(5);
    out=out+"Punto di Arrivo\n"+gradiLatWay[j]+"°"+" "+primiLatWay[j]+"'"+letteraLatWaypoints[j]+" "+gradiLonWay[j]+"°"+" "+primiLonWay[j]+"'"+letteraLonWaypoints[j];

    risultatiWaypoints.text=`\n COORDINATE WAYPOINTS

${out}`;

}//end function SetOutputWay()
//___________________________________________________________


//___________________________________________________________
//funzione che risolve il calcolo dei waypoints
function RisolviWayPoints(){
    switch (tipolist){
        case "distanza":
            WaypointsCammino();
            SetOutputWay();
            break;
        case "longitudine":
            WaypointsLongitudine();
            SetOutputWay();
            break;
        default:
            alert("Errore risoluzione dei waypoints.");
    }
}//end function RisolviwayPoints()
//___________________________________________________________
