const fromObject = require("tns-core-modules/data/observable").fromObject;
//var observable=require("tns-core-modues/data/observable");

//___________________________________________________________
//___________________________________________________________
//DICHIARO DI SEGUITO TUTTE LE VARIABILI UTILI ALL'ALGORITMO

//queste sono le variabili per ricevere gli input dell'utente
var idGradiLat, idPrimiLat, idLetteraLat;
var idGradiLon, idPrimiLon, idLetteraLon;
var idCammino, idRottaVera;
var tipolist;

//queste sono le variabili dove memorizzo i dati inseriti dall'utente
var latitude, letteraLat, longitude, letteraLon;  //variabili del punto di partenza
var cammino, rottaVera, eccentricita;

//variabili per i calcoli
var deltaPhi, letteraDeltaPhi, deltaLambda, letteraDeltaLambda;
var deltaPhiCre, latitudeCre, latitudeArrCre;
var deltaPsi, latitudeGeocentrica, latitudeGeocentricaArr;

//variabili del punto di arrivo
var latitudeArr, letteraLatArr, longitudeArr, letteraLonArr;

//variabile per avere i risultati
var risultati;

//variabile che definisce i modelli terrestri
const tipologia = ["Sfera", "WGS84"];

//variabile che definisce la tipologia di problema
var tipoProblema;

/*variabile che permette di gestire i bug, quando l'utente sbaglia ad inserire i dati
* in modo che quando vado a risolvere il problema, se tale variabile è diversa
* da 0 allora non effettuo nessun calcolo
* */
var bug=0;
//___________________________________________________________
//___________________________________________________________


//___________________________________________________________
//Funzione che serve a caricare la pagina e mettere in ascolto
// tutti gli UI di inserimento dati
exports.onLoaded = function(args){
    const page= args.object;

    idGradiLat = page.getViewById("idGradiLat");
    idPrimiLat = page.getViewById("idPrimiLat");
    idLetteraLat = page.getViewById("idLetteraLat");
    idGradiLon = page.getViewById("idGradiLon");
    idPrimiLon = page.getViewById("idPrimiLon");
    idLetteraLon = page.getViewById("idLetteraLon");
    idCammino = page.getViewById("idCammino");
    idRottaVera = page.getViewById("idRottaVera");
    tipolist = page.getViewById("tipolist");
    risultati = page.getViewById("risultati");

    const vm = fromObject({
        tipologia: tipologia
    });
    page.bindingContext = vm;

};
//___________________________________________________________

//___________________________________________________________
//funzione che gestisce il selezionatore di lista
function onListPickerLoaded(fargs) {
    const listPickerComponent = fargs.object;
    listPickerComponent.on("selectedIndexChange", (args) => {
        var picker = args.object;
        //QUESTO SNIPPET, SE NON COMMENTATO, SERVE PER CONTROLLARE SE FUNZIONA IL PICKER console.log(`index: ${picker.selectedIndex}; item" ${tipologia[picker.selectedIndex]}`);
        switch (picker.selectedIndex){
            case 0:
                tipolist="sfera";
                break;
            case 1:
                tipolist="WGS84";
                break;
        }
    });
}
exports.onListPickerLoaded = onListPickerLoaded;
//___________________________________________________________


//___________________________________________________________
//funzione che gestisce l'azione del bottone
function onTapCalcolo(args){
    var button = args.object;
    SetInput();
    RisolviPrimoProblema();


    console.log(tipolist);
    console.log(eccentricita);
    console.log(latitude+" "+letteraLat);
    console.log("rotta: "+rottaVera);
    console.log("cammino: "+cammino);
    console.log("deltaPsi/deltaPhi: "+deltaPsi);
    console.log("deltaPhiCre: "+deltaPhiCre);
    console.log(latitudeArr);
    console.log("deltaLambda: "+deltaLambda+letteraLonArr);
}
exports.onTapCalcolo = onTapCalcolo;
//___________________________________________________________


//___________________________________________________________
//funzione che gestisce tutti gli input dell'utente
function SetInput(){

    rottaVera=parseFloat(idRottaVera.text);//memorizzo la rotta vera
    cammino=parseFloat(idCammino.text);//memorizzo il cammino
    letteraLat=idLetteraLat.text;//memorizzo lettera coordinata latitudine
    letteraLon=idLetteraLon.text;//memorizzo lettera coordinata longitudine
    bug=0;

    //ciclo condizionale che controlla l'inserimento della latitudine
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

    //ciclo condizionale che controlla l'inserimento della longitudine
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

    //ciclo condizionale che assegna l'eccentricità
    switch (tipolist){
        case "sfera":
            eccentricita=0;
            break;
        case "WGS84":
            let a=6378137; let schiacciamento=1/298.26;
            let b=a-(a*schiacciamento);
            let num=Math.pow(a,2)-Math.pow(b,2); let den=Math.pow(a,2);
            eccentricita = Math.sqrt(num/den);
            break;
        default:
            alert("Errore determinazione modello terrestre.");
            bug=1;
            break;
    }

    //ciclo condizionale che definisce la tipologia di problema
    switch (rottaVera){
        case 90:
            tipoProblema="navigazione parallelo";
            break;
        case 270:
            tipoProblema="navigazione parallelo";
            break;
        case 0:
            tipoProblema="navigazione meridiano";
            break;
        case 360:
            tipoProblema="navigazione meridiano";
            break;
        case 180:
            tipoProblema="navigazione meridiano";
            break;
        default:
            tipoProblema="navigazione generale";
            break;
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
//funzione che calcola la differenza di latitudine e determina
//la latitudine del punto di arrivo
function DeltaPhiLatArr(){
    let rottaVeraRad = Deg2Rad(rottaVera);

    deltaPsi = cammino * Math.cos(rottaVeraRad);
    latitudeGeocentrica = Math.atan((1-Math.pow(eccentricita,2))*Math.tan(Deg2Rad(latitude)));
    latitudeGeocentrica = Rad2Deg(latitudeGeocentrica);

    if(deltaPsi<0){
        letteraDeltaPhi="S";
    }else if(deltaPsi>=0){
        letteraDeltaPhi="N";
    }else{
        alert("Errore valutazione lettera associata alla differenza di latitudine.");
    }

    switch (letteraLat){
        case "N":
            latitudeGeocentricaArr=latitudeGeocentrica+(deltaPsi/60);
            break;
        case "S":
            latitudeGeocentricaArr=(-latitudeGeocentrica)+(deltaPsi/60);
            break;
        default:
            alert("Errore di valutazione latitudine arrivo.");
            break;
    }

    if(deltaPsi<0){
        deltaPsi=Math.abs(deltaPsi);
    }

    if (latitudeGeocentricaArr>=0){
        letteraLatArr = "N";
        if (latitudeGeocentricaArr>90){
            latitudeGeocentricaArr=90;
        }
    }else if (latitudeGeocentricaArr<0){
        letteraLatArr = "S";
        if (Math.abs(latitudeGeocentricaArr)>90){
            latitudeGeocentricaArr=90;
        }else {
            latitudeGeocentricaArr=Math.abs(latitudeGeocentricaArr);
        }
    }else{
        alert("Errore valutazione lettera latitudine arrivo.");
    }

    let num=Math.tan(Deg2Rad(latitudeGeocentricaArr));
    let den=1-Math.pow(eccentricita,2);
    latitudeArr=Math.atan(num/den);
    latitudeArr=Rad2Deg(latitudeArr);
}//end function DeltaPhiLatArr()
//___________________________________________________________


//___________________________________________________________
//funzione che calcola la differena di latitudine crescente
function DeltaPhiCrescente(){

    //calcolo le latitudini crescenti
    let lat45 = 45 + (latitudeGeocentrica/2);
    lat45 = Deg2Rad(lat45);
    latitudeCre = (10800/Math.PI) * Math.log(Math.tan(lat45));

    if (latitudeGeocentricaArr===90){
        latitudeArrCre=(10800/Math.PI)*Math.log(Math.tan(Deg2Rad((45+(89.99999/2)))));
    }else {
        let lat45Arr = 45 + (latitudeGeocentricaArr/2);
        lat45Arr = Deg2Rad(lat45Arr);
        latitudeArrCre = (10800/Math.PI) * Math.log(Math.tan(lat45Arr));
    }


    if (letteraLatArr==="N" && letteraLat==="N"){
        deltaPhiCre = latitudeArrCre - latitudeCre;
    }else if (letteraLatArr==="N" && letteraLat==="S"){
        deltaPhiCre = latitudeArrCre + latitudeCre;
    }else if (letteraLatArr==="S" && letteraLat==="N"){
        deltaPhiCre = (-latitudeArrCre) - latitudeCre;
    }else if (letteraLatArr==="S" && letteraLat==="S"){
        deltaPhiCre = (-latitudeArrCre) + latitudeCre;
    }else{
        alert("Errore valutazione differenza latitudine crescente.");
    }

    deltaPhiCre = Math.abs(deltaPhiCre);
}//end function DeltaPhiCre()
//___________________________________________________________


//___________________________________________________________
//funzione che trasforma la rotta, da circolare in quadrantale
function RottaQuadrantale(rotta){
    if(rotta>0 && rotta<90){
        rottaQuadrantale = rotta;
    }else if (rotta>90 && rotta<180){
        rottaQuadrantale = 180-rotta;
    }else if (rotta>180 && rotta<270){
        rottaQuadrantale = rotta-180;
    }else if (rotta>270 && rotta<360){
        rottaQuadrantale = 360-rotta;
    }else{
        alert("Errore valutazione rotta quadrantale.");
    }
    return rottaQuadrantale;
}
//___________________________________________________________


//___________________________________________________________
//funzione che calcola la differenza di longitudine e determina
//la longitudine di arrivo
function DeltaLambdaLonArr(){
    let rottaRad = Deg2Rad(RottaQuadrantale(rottaVera));

    deltaLambda = Math.abs((deltaPhiCre/60) * Math.tan(rottaRad));

    if (deltaLambda/360 > 1){ //cioè se il deltaLambda appena calcolato fa sì di percorrere più giri della superficie terrestre
        let n = Math.floor(deltaLambda/360); //numero delle rotazioni attorno al globo
        deltaLambda = deltaLambda - (n*360);
    }

    //creo ciclo condizonale per controllare se il deltaLambda è maggiore di 360°
    if (deltaLambda>180){
        if ((rottaVera>0&&rottaVera<90)||(rottaVera>90&&rottaVera<180)){//caso il mobile supera antimeridiano da E->W
            deltaLambda=360-deltaLambda;
            letteraDeltaLambda="W";
        }else if ((rottaVera>180&&rottaVera<270)||(rottaVera>270&&rottaVera<360)){//caso il mobile supera antimeridiano da W->E
            deltaLambda=360-deltaLambda;
            letteraDeltaLambda="E";
        }
    }else if (deltaLambda<180){
        if ((rottaVera>0&&rottaVera<90)||(rottaVera>90&&rottaVera<180)){
            letteraDeltaLambda="E";
        }else if ((rottaVera>180&&rottaVera<270)||(rottaVera>270&&rottaVera<360)){
            letteraDeltaLambda="W";
        }
    }else{
        alert("Errore valutazione lettera delta lambda.");
    }
    //calcolo longitudine punto di arrivo
    switch (letteraLon){
        case "E":
            switch (letteraDeltaLambda){
                case "E":
                    longitudeArr = longitude+deltaLambda;
                    if (longitudeArr<=180){
                        letteraLonArr="E";
                    }else if (longitudeArr>180){
                        longitudeArr=360-longitudeArr;
                        letteraLonArr="W";
                    }
                    break;
                case "W":
                    longitudeArr = longitude-deltaLambda;
                    if(longitudeArr>=0){
                        letteraLonArr="E";
                    }else{
                        letteraLonArr="W";
                        longitudeArr=Math.abs(longitudeArr);
                    }
                    break;
                default:
                    alert("Errore valutazione longitudine punto di arrivo.");
                    break;
            }
            break;
        case "W":
            switch (letteraDeltaLambda){
                case "E":
                    longitudeArr = (-longitude)+deltaLambda;
                    if(longitudeArr<0){
                        letteraLonArr="W";
                        longitudeArr = Math.abs(longitudeArr);
                    }else{
                        letteraLonArr="E";
                    }
                    break;
                case "W":
                    longitudeArr = (-longitude)-deltaLambda;
                    if(Math.abs(longitudeArr)<180){
                        letteraLonArr="W";
                    }else{
                        longitudeArr=360-Math.abs(longitudeArr);
                        letteraLonArr="E";
                    }
                    break;
                default:
                    alert("Errore valutazione longitudine punto di arrivo.");
                    break;
            }
            break;
        default:
            alert("Errore valutazione longitudine punto di arrivo.");
            break;
    }

}//end function DeltaLambdaLonArr()
//___________________________________________________________


//___________________________________________________________
//funzione che implementa la navigazione su meridiano
function NavigazioneMeridiano(){
    deltaPsi = cammino/60;
    latitudeGeocentrica = Math.atan((1-Math.pow(eccentricita,2))*Math.tan(Deg2Rad(latitude)));
    latitudeGeocentrica = Rad2Deg(latitudeGeocentrica);

    let colatitudine = 90-latitudeGeocentrica;
    switch (letteraLat){
        case "N":
            if((rottaVera===0||rottaVera===360)&&(cammino>(colatitudine*60))){
                alert("ATTENZIONE, non puoi superare il polo!");
            }else if (((rottaVera===180)&&(cammino>(90+latitudeGeocentrica)*60))){
                alert("ATTENSIONE, non puoi superare il polo!");
            }else if ((rottaVera===0||rottaVera===360)&&(cammino<=(colatitudine*60))){
                latitudeGeocentricaArr=latitudeGeocentrica+deltaPsi;
                let num=Math.tan(Deg2Rad(latitudeGeocentricaArr));
                let den=1-Math.pow(eccentricita,2);
                latitudeArr=Math.atan(num/den);
                latitudeArr=Rad2Deg(latitudeArr);
                letteraLatArr="N";
                longitudeArr=longitude;
                letteraLonArr=letteraLon;

            }else if ((rottaVera===180)&&(cammino<=(90+latitudeGeocentrica)*60)){
                latitudeGeocentricaArr=latitudeGeocentrica-deltaPsi;
                if (latitudeGeocentricaArr>=0){
                    letteraLatArr="N";
                }else{
                    letteraLatArr="S";
                    latitudeGeocentricaArr=Math.abs(latitudeGeocentricaArr);
                }
                let num=Math.tan(Deg2Rad(latitudeGeocentricaArr));
                let den=1-Math.pow(eccentricita,2);
                latitudeArr=Math.atan(num/den);
                latitudeArr=Rad2Deg(latitudeArr);
                longitudeArr=longitude;
                letteraLonArr=letteraLon;
            }
            break;
        case "S":
            if ((rottaVera===0||rottaVera===360)&&(cammino>(90+latitudeGeocentrica)*60)){
                alert("ATTENZIONE, non puoi superare il polo!");
            }else if ((rottaVera===180)&&(cammino>colatitudine*60)){
                alert("ATTENZIONE, non puoi superare il polo!");
            }else if ((rottaVera===0||rottaVera===360)&&(cammino<=(90+latitudeGeocentrica)*60)){
                latitudeGeocentricaArr=(-latitudeGeocentrica)+deltaPsi;
                if (latitudeGeocentricaArr>=0){
                    letteraLatArr="N";
                }else{
                    letteraLatArr="S";
                    latitudeGeocentricaArr=Math.abs(latitudeGeocentricaArr);
                }
                let num=Math.tan(Deg2Rad(latitudeGeocentricaArr));
                let den=1-Math.pow(eccentricita,2);
                latitudeArr=Math.atan(num/den);
                latitudeArr=Rad2Deg(latitudeArr);
                longitudeArr=longitude;
                letteraLonArr=letteraLon;

            }else if ((rottaVera===180)&&(cammino<=colatitudine*60)){
                latitudeGeocentricaArr=(-latitudeGeocentrica)-deltaPsi;
                latitudeGeocentricaArr=Math.abs(latitudeGeocentricaArr);
                letteraLatArr="S";
                let num=Math.tan(Deg2Rad(latitudeGeocentricaArr));
                let den=1-Math.pow(eccentricita,2);
                latitudeArr=Math.atan(num/den);
                latitudeArr=Rad2Deg(latitudeArr);
                longitudeArr=longitude;
                letteraLonArr=letteraLon;

            }
            break;
        default:
            alert("Errore calcolo navigazione su meridiano.");
            break;
    }


}//end function NavigazioneMeridiano()
//___________________________________________________________


//___________________________________________________________
//funzione che risolve il problema della navigazione su parallelo
function NavigazioneParallelo(){
    latitudeArr=latitude; letteraLatArr=letteraLat;

    latitudeGeocentrica = Math.atan((1-Math.pow(eccentricita,2))*Math.tan(Deg2Rad(latitude)));

    deltaLambda = (cammino/Math.cos(latitudeGeocentrica))/60;

    if (deltaLambda/360 > 1){ //cioè se il deltaLambda appena calcolato fa sì di percorrere più giri della superficie terrestre
        let n = Math.floor(deltaLambda/360); //numero delle rotazioni attorno al globo
        deltaLambda = deltaLambda - (n*360);
    }

    if ((deltaLambda>180) && (rottaVera===90)){//caso passaggio antimeridiano da E->W
        deltaLambda=360-deltaLambda;
        letteraDeltaLambda="W";
    }else if ((deltaLambda>180) && (rottaVera===270)){//caso passaggio antimeridiano da W->E
        deltaLambda=360-deltaLambda;
        letteraDeltaLambda="E";
    }else if ((deltaLambda<180) && (rottaVera===270)){
        letteraDeltaLambda="W";
    }else if ((deltaLambda<180) && (rottaVera===90)){
        letteraDeltaLambda="E";
    }else{
        alert("Errore di valutazione differenza longitudine navigazione su parallelo.");
    }

    switch (letteraLon){
        case "E":
            switch (letteraDeltaLambda){
                case "E":
                    longitudeArr=longitude+deltaLambda;
                    if(longitudeArr>=180){
                        longitudeArr=360-longitudeArr;
                        letteraLonArr="W";
                    }else{
                        letteraLonArr="E";
                    }
                    break;
                case "W":
                    longitudeArr=longitude-deltaLambda;
                    if(longitudeArr<0){
                        letteraLonArr="W";
                        longitudeArr=Math.abs(longitudeArr);
                    }else{
                        letteraLonArr="E";
                    }
                    break;
                default:
                    alert("Errore valutazione lettera coordinata longitudine arrivo navigazione su parallelo.");
                    break;
            }
            break;
        case "W":
            switch (letteraDeltaLambda){
                case "E":
                    longitudeArr=(-longitude)+deltaLambda;
                    if(longitudeArr>=0){
                        letteraLonArr="E";
                    }else{
                        letteraLonArr="W";
                        longitudeArr=Math.abs(longitudeArr);
                    }
                    break;
                case "W":
                    longitudeArr=(-longitude)-deltaLambda;
                    if(Math.abs(longitudeArr)>180){
                        longitudeArr=360-Math.abs(longitudeArr);
                        letteraLonArr="E";
                    }else{
                        longitudeArr=Math.abs(longitudeArr);
                        letteraLonArr="W";
                    }
                    break;
                default:
                    alert("Errore valutazione lettera coordinata longitudine arrivo navigazione su parallelo.");
                    break;
            }
            break;
        default:
            alert("Errore valutazione lettera coordinata longitudine arrivo navigazione su parallelo.");
            break;
    }
}//end function NavigazioneParallelo()
//___________________________________________________________


//___________________________________________________________
//implemeto funzione che risolve il primo problema di lossodromia
function RisolviPrimoProblema(){

    //creo un ciclo condizionale switch innestato in modo da risolvere
    //il problema solo se la variabile bug è nulla, variabile che assume
    //solo due valori 0 oppure 1
    switch (bug){
        case 0:
            switch (tipoProblema){
                case "navigazione generale":
                    DeltaPhiLatArr();
                    DeltaPhiCrescente();
                    DeltaLambdaLonArr();
                    SetOutput();
                    break;
                case "navigazione meridiano":
                    NavigazioneMeridiano();
                    SetOutputParticolari();
                    break;
                case "navigazione parallelo":
                    NavigazioneParallelo();
                    SetOutputParticolari();
                    break;
                default:
                    alert("Errore nella risoluzione del primo problema di lossodromia.");
                    break;
            }
            break;
        case 1:
            alert("Errore, impossibile risolvere il problema, controllare inserimento dati.");
            break;
        default:
            alert("Errore valutazione della risoluzione tramite bug.");
    }
}//end function RisolviPrimoProblema()
//___________________________________________________________


//___________________________________________________________
//funzione che gestisce gli output del primo problema di lossodromia
function SetOutput(){
    let latitudineArrivo=CorreggiRoundOff(latitudeArr);
    let gradiLatArr=Math.floor(latitudineArrivo), primiLatArr=60*(latitudineArrivo-gradiLatArr);
    let longitudineArrivo=CorreggiRoundOff(longitudeArr);
    let gradiLonArr=Math.floor(longitudineArrivo), primiLonArr=60*(longitudineArrivo-gradiLonArr);
    let gradiLatGeo=Math.floor(latitudeGeocentrica), primiLatGeo=60*(latitudeGeocentrica-gradiLatGeo);
    let gradiLatGeoArr=Math.floor(latitudeGeocentricaArr), primiLatGeoArr=60*(latitudeGeocentricaArr-gradiLatGeoArr);
    deltaLambda=Math.abs(deltaLambda);

    switch (bug){
        case 0:
            if(eccentricita===0){
                risultati.text=`Latitudine Arrivo: ${gradiLatArr}° ${primiLatArr.toFixed(2)}' ${letteraLatArr}
Longitudine Arrivo: ${gradiLonArr}° ${primiLonArr.toFixed(2)}' ${letteraLonArr}


Maggiori dettagli
Δϕ Crescente: ${Math.abs( deltaPhiCre.toFixed(2) )}' ${letteraDeltaPhi}
ϕ Crescente Arrivo: ${Math.abs( latitudeArrCre.toFixed(2) )}' ${letteraLatArr}
ϕ Crescente Partenza: ${Math.abs( latitudeCre.toFixed(2) )}' ${letteraLat}`;
                //come output per sfera c'era anche   Δλ: ${deltaLambda.toFixed(9)}° ${letteraDeltaLambda}
            }else{
                risultati.text=`Latitudine Arrivo: ${gradiLatArr}° ${primiLatArr.toFixed(2)}' ${letteraLatArr}
Longitudine Arrivo: ${gradiLonArr}° ${primiLonArr.toFixed(2)}' ${letteraLonArr}


Maggiori dettagli
ΔΨ crescente: ${Math.abs( deltaPhiCre.toFixed(2) )}' ${letteraDeltaPhi}
Ψ Partenza crescente: ${Math.abs( latitudeCre.toFixed(2) )}' ${letteraLat}
Ψ Arrivo crescente: ${Math.abs( latitudeArrCre.toFixed(2) )}' ${letteraLatArr}`;
            }
            break;
        case 1:
            risultati.text=` `;
            break;
    }
}//end function SetOutput()
//___________________________________________________________


//___________________________________________________________
//funzione che gestisce gli output dei casi particolari, navigazione parallelo e meridiano
function SetOutputParticolari(){
    switch (bug){
        case 0:
            switch (tipoProblema){
                case "navigazione meridiano":
                    let latitudineArrivo=CorreggiRoundOff(latitudeArr);
                    let gradiLatArr=Math.floor(latitudineArrivo), primiLatArr=(latitudineArrivo-gradiLatArr)*60;

                    risultati.text=`Navigazione su meridiano
Latitudine Arrivo: ${gradiLatArr}° ${primiLatArr.toFixed(2)}' ${letteraLatArr}`;
                    break;

                case "navigazione parallelo":
                    let longitudineArrivo=CorreggiRoundOff(longitudeArr);
                    let gradiLonArr=Math.floor(longitudineArrivo), primiLonArr=(longitudineArrivo-gradiLonArr)*60;

                    risultati.text=`Navigazione su parallelo
Longitudine Arrivo: ${gradiLonArr}° ${primiLonArr.toFixed(2)}' ${letteraLonArr}`;
                    break;
            }
            break;

        case 1:
            risultati.text=` `;
            break;
    }//end switch bug

}//end function SetOutputParticolari()
//___________________________________________________________




/*
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 */
//funzione che implementa la correzione di round-off negli output
function CorreggiRoundOff(num){
    let ris, differenza, primi;
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
        //ris=num;
        primi = (num-Math.floor(num))*60;
        if (Math.abs(60-primi)<(1e-2)){
            ris=Math.floor(num)+1;
        }else {
            ris=num;
        }
    }

    return ris;

}//end function CorreggiRoundOff(num)
/*
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 */
