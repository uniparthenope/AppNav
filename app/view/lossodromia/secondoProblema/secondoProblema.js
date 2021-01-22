const fromObject = require("tns-core-modules/data/observable").fromObject;


//___________________________________________________________
//___________________________________________________________
//DICHIARO DI SEGUITO TUTTE LE VARIABILI UTILI ALL'ALGORITMO

//queste sono le vaiabili per ricevere gli input dell'utente
var idGradiLat, idPrimiLat, idLetteraLat;
var idGradiLon, idPrimiLon, idLetteraLon;
var idGradiLatArr, idPrimiLatArr, idLetteraLatArr;
var idGradiLonArr, idPrimiLonArr, idLetteraLonArr;
var tipolist;

//queste sono le variabili dove memorizzo i dati inseriti
var latitude, letteraLat, longitude, letteraLon;
var latitudeArr, letteraLatArr, longitudeArr, letteraLonArr;
var eccentricita;

//queste sono le variabili utili per i calcoli
var deltaPsi, letteraDeltaPsi;
var latitudeGeocentrica, latitudeGeocentricaArr;
var deltaPhiCre, latitudeCre, latitudeArrCre;
var deltaLambda, letteraDeltaLambda;

//queste sono le incognite da determinare
var cammino, rottaVera, rottaVeraQuadrantale;

//varibaile per avere i risultati
var risultati;

//variabile dei modelli terrestri
const tipologia=["Sfera","WGS84"];

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
//tutti gli UI(User Interface)
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

    tipolist=page.getViewById("tipolist");

    risultati=page.getViewById("risultati");

    const vm = fromObject({
        tipologia: tipologia
    });
    page.bindingContext=vm;

};
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
    var button=args.object;

    SetInput();
    RisolviSecondoProblema();


}
exports.onTapCalcolo=onTapCalcolo;
//___________________________________________________________


//___________________________________________________________
//funzione che gestisce tutti gli input dell'utente
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

    //ciclo condizionale che assegna l'eccentricità
    switch (tipolist){
        case "sfera":
            eccentricita=0;
            break;
        case "WGS84":
            let a=6378137; let schiacciamento=1/298.3;
            let b=a-(a*schiacciamento);
            let num=Math.pow(a,2)-Math.pow(b,2); let den=Math.pow(a,2);
            eccentricita = Math.sqrt(num/den);
            break;
        default:
            alert("Errore determinazione modello terrestre.");
            bug=1;
            break;
    }

    if ((latitude!==latitudeArr) && (longitude!==longitudeArr)){
        tipoProblema="navigazione generale";
    }else if ((longitude===longitudeArr) && (letteraLon===letteraLonArr) ){
        if ((latitude===latitudeArr) && (letteraLat!==letteraLatArr)){
            tipoProblema="navigazione meridiano";
        }else {
            tipoProblema="navigazione meridiano";
        }

    }else if ((latitude===latitudeArr) && (letteraLat===letteraLatArr)){
        if ((longitude===longitudeArr) && (letteraLon!==letteraLonArr)){
            tipoProblema="navigazione parallelo";
        }else {
            tipoProblema="navigazione parallelo";
        }

    }else if ((latitude===latitudeArr) &&(letteraLat!==letteraLatArr)){
        tipoProblema="navigazione generale";

    }else if ((longitude===longitudeArr) && (letteraLon!==letteraLonArr)){
        if (letteraLat!==letteraLatArr){
            tipoProblema="navigazione generale";
        }
    }else{
        alert("Errore di valutazione tipologia di problema.");
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
//funzione che calcola la differenza di latitudine, per rendere snello
//il codice, si calcola direttamete con la latitudine geocentrica, nel caso
//sferico la latiudine geocentrica risulta essere uguale alla latitudine
//geografica
function DeltaPsi(){
    latitudeGeocentrica=Math.atan((1-Math.pow(eccentricita,2)) * Math.tan(Deg2Rad(latitude)));
    latitudeGeocentrica=Rad2Deg(latitudeGeocentrica);
    latitudeGeocentricaArr=Math.atan((1-Math.pow(eccentricita,2)) * Math.tan(Deg2Rad(latitudeArr)));
    latitudeGeocentricaArr=Rad2Deg(latitudeGeocentricaArr);

    switch (letteraLat){
        case "N":
            switch (letteraLatArr){
                case "N":
                    deltaPsi=latitudeGeocentricaArr-latitudeGeocentrica;
                    if(deltaPsi<0){
                        letteraDeltaPsi="S";
                        deltaPsi=Math.abs(deltaPsi);
                    }else{
                        letteraDeltaPsi="N"
                    }
                    break;
                case "S":
                    deltaPsi=(-latitudeGeocentricaArr)-latitudeGeocentrica;
                    if(deltaPsi<0){
                        letteraDeltaPsi="S";
                        deltaPsi=Math.abs(deltaPsi);
                    }else{
                        letteraDeltaPsi="N";
                    }
                    break;
                default:
                    alert("Errore valutazione differenza di latitudine geocentrica.");
                    break;
            }
            break;
        case "S":
            switch (letteraLatArr){
                case "N":
                    deltaPsi=latitudeGeocentricaArr-(-latitudeGeocentrica);
                    if(deltaPsi<0){
                        letteraDeltaPsi="S";
                        deltaPsi=Math.abs(deltaPsi);
                    }else{
                        letteraDeltaPsi="N";
                    }
                    break;
                case "S":
                    deltaPsi=(-latitudeGeocentricaArr)-(-latitudeGeocentrica);
                    if(deltaPsi<0){
                        letteraDeltaPsi="S";
                        deltaPsi=Math.abs(deltaPsi);
                    }else{
                        letteraDeltaPsi="N";
                    }
                    break;
                default:
                    alert("Errore di valutazione differenza di latitudine geocentrica.");
                    break;
            }
            break;
        default:
            alert("Erroe di valutazione differenza di latitudine geocentrica.");
            break;
    }

}//end function DeltaPsi()
//___________________________________________________________


//___________________________________________________________
/*funzione che calcola la differenza di latitudine crescente e
* le latitudini crescenti, per rendere sempre più agile l'algoritmo,
* il calcolo lo si fa usando le latitudini geocentriche.
* Ricordo che la lettera associata alla differenza di latitudine crescente
* è uguale a quella associata alla differenza di latitudine geocentrica.
* LA FUNZIONE RESTITUISCE IL VALORE DELLA DIFFERENZA IN PRIMI SESSAGESIMALI
* */
function SetLatCreDeltaPhiCre(){
    let lat45=45+(latitudeGeocentrica/2);
    let lat45Arr=45+(latitudeGeocentricaArr/2);

    latitudeCre = (10800/Math.PI) * Math.log(Math.tan(Deg2Rad(lat45)));
    latitudeArrCre = (10800/Math.PI) * Math.log(Math.tan(Deg2Rad(lat45Arr)));

    switch (letteraLat){
        case "N":
            switch (letteraLatArr){
                case "N":
                    deltaPhiCre=latitudeArrCre-latitudeCre;
                    if(deltaPhiCre<0){
                        deltaPhiCre=Math.abs(deltaPhiCre);
                    }
                    break;
                case "S":
                    deltaPhiCre=(-latitudeArrCre)-latitudeCre;
                    if(deltaPhiCre<0){
                        deltaPhiCre=Math.abs(deltaPhiCre);
                    }
                    break;
                default:
                    alert("Errore di valutazione differenza latitudine crescente.");
                    break;
            }
            break;
        case "S":
            switch (letteraLatArr){
                case "N":
                    deltaPhiCre=latitudeArrCre-(-latitudeCre);
                    if(deltaPhiCre<0){
                        deltaPhiCre=Math.abs(deltaPhiCre);
                    }
                    break;
                case "S":
                    deltaPhiCre=(-latitudeArrCre)-(-latitudeCre);
                    if(deltaPhiCre<0){
                        deltaPhiCre=Math.abs(deltaPhiCre);
                    }
                    break;
                default:
                    alert("Errore di valutazione differenza latitudine crescente.");
                    break;
            }
            break;
        default:
            alert("Errore di valutazione differenza di latitudine crescente.");
            break;
    }

}//end function SetLatCreDeltaPhiCre()
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
                        deltaLambda=Math.abs(deltaLambda);
                    }else{
                        letteraDeltaLambda="E";
                    }
                    break;
                case "W":
                    deltaLambda=(-longitudeArr)-longitude;
                    if (deltaLambda<0 && Math.abs(deltaLambda)<=180){
                        letteraDeltaLambda="W";
                        deltaLambda=Math.abs(deltaLambda);
                    }else if (deltaLambda<0 && Math.abs(deltaLambda)>180){//caso passaggio antimeridiano da E->W
                        letteraDeltaLambda="E";
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
                    }else if (deltaLambda>=0 && deltaLambda>180){//caso passaggio antimeridiano da W->E
                        letteraDeltaLambda="W";
                        deltaLambda=360-deltaLambda;
                    }else {
                        alert("Errore valutazione differenza di longitudine");
                    }
                    break;
                case "W":
                    deltaLambda=(-longitudeArr)-(-longitude);
                    if(deltaLambda<0){
                        letteraDeltaLambda="W";
                        deltaLambda=Math.abs(deltaLambda);
                    }else {
                        letteraDeltaLambda="E";
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
/*funzione che calcola la rotta vera del mobile. Ricordo che
* dai calcoli trovo la rotta vera espressa in quadrantale,
* quindi devo trasformare, dopop, in circolare
* */
function RottaVera(){
    switch (letteraDeltaLambda){
        case "E":
            switch (letteraDeltaPsi){
                case "N":
                    rottaVeraQuadrantale=Math.atan((deltaLambda*60)/deltaPhiCre);
                    rottaVeraQuadrantale=Math.abs(Rad2Deg(rottaVeraQuadrantale));
                    break;
                case "S":
                    rottaVeraQuadrantale=Math.atan((deltaLambda*60)/(-deltaPhiCre));
                    rottaVeraQuadrantale=Math.abs(Rad2Deg(rottaVeraQuadrantale));
                    break;
                default:
                    alert("Errore valutazione rotta vera quadrantale.");
                    break;
            }
            break;
        case "W":
            switch (letteraDeltaPsi){
                case "N":
                    rottaVeraQuadrantale=Math.atan((-deltaLambda*60)/deltaPhiCre);
                    rottaVeraQuadrantale=Math.abs(Rad2Deg(rottaVeraQuadrantale));
                    break;
                case "S":
                    rottaVeraQuadrantale=Math.atan((-deltaLambda*60)/(-deltaPhiCre));
                    rottaVeraQuadrantale=Math.abs(Rad2Deg(rottaVeraQuadrantale));
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

    //ciclo condizionale che permette di passare in circolare
    switch (letteraDeltaPsi){
        case "N":
            switch (letteraDeltaLambda){
                case "E":
                    rottaVera=rottaVeraQuadrantale;
                    break;
                case "W":
                    rottaVera=360-rottaVeraQuadrantale;
                    break;
                default:
                    alert("Errore valutazione rotta circolare.");
                    break;
            }
            break;
        case "S":
            switch (letteraDeltaLambda){
                case "E":
                    rottaVera=180-rottaVeraQuadrantale;
                    break;
                case "W":
                    rottaVera=180+rottaVeraQuadrantale;
                    break;
                default:
                    alert("Errore valutazione rotta circolare.");
                    break;
            }
            break;
        default:
            alert("Errore valutazione rotta circolare.");
            break;
    }
}//end function RottaVera()
//___________________________________________________________


//___________________________________________________________
//funzione che calcola il cammino tra i due punti
function Cammino(){
    cammino = (deltaPsi*60)/Math.cos(Deg2Rad(rottaVeraQuadrantale));
    cammino = Math.abs(cammino);
}//end function Cammino()
//___________________________________________________________


//___________________________________________________________
//funzione che risolve la navigazione su meridiano
function NavigazioneMeridiano(){
    DeltaPsi();
    cammino = deltaPsi*60;
    switch (letteraDeltaPsi){
        case "N":
            rottaVera=0;
            break;
        case "S":
            rottaVera=180;
            break;
        default:
            alert("Errore di valutazione rotta in navigazione meridiano.");
            break;
    }
}//end function NavigazioneMeridiano()
//___________________________________________________________


//___________________________________________________________
//funzione che risolve la navigazione su parallelo
function NavigazioneParallelo(){
    DeltaLambda();
    latitudeGeocentrica = Math.atan((1-Math.pow(eccentricita,2)) * Math.tan(Deg2Rad(latitude)));
    cammino = (deltaLambda*60) * Math.cos(latitudeGeocentrica);
    console.log(latitudeGeocentrica);
    console.log("Cammino: "+cammino);
    switch (letteraDeltaLambda){
        case "E":
            rottaVera=90;
            break;
        case "W":
            rottaVera=270;
            break;
        default:
            alert("Errore di valutazione rotta in navigazione su parallelo.");
            break;
    }
}//end function NavigazioneParallelo()
//___________________________________________________________


//___________________________________________________________
//funzione che risolve il secondo problema di lossodromia
function RisolviSecondoProblema(){
    switch (bug){
        case 0:
            switch (tipoProblema){
                case "navigazione generale":
                    DeltaPsi();
                    SetLatCreDeltaPhiCre();
                    DeltaLambda();
                    RottaVera();
                    Cammino();
                    SetOutput();
                    break;
                case "navigazione meridiano":
                    NavigazioneMeridiano();
                    SetOutputCasiParticolari();
                    break;
                case "navigazione parallelo":
                    NavigazioneParallelo();
                    SetOutputCasiParticolari();
                    break;
                default:
                    alert("Errore nella risoluzione del secondo problema di lossodromia.");
                    break;
            }
            break;
        case 1:
            alert("Errore, impossibile risolvere il problema, controllare inserimento dati.");
            break;
        default:
            alert("Errore valutazione della risoluzione tramite bug.");
            break;
    }
}//end function RisolviSecondoProblema()
//___________________________________________________________


//___________________________________________________________
//funzione che gestisce gli output del problema
function SetOutput(){
    switch (bug){
        case 0:
            if (eccentricita===0){

                risultati.text = `Cammino: ${cammino.toFixed(2)}NM

Rotta vera: ${rottaVera.toFixed(2)}°


Maggiori dettagli
Δϕ crescente: ${deltaPhiCre.toFixed(5)}' ${letteraDeltaPsi}
ϕ Crescente Partenza: ${latitudeCre.toFixed(5)}' ${letteraLat}
ϕ Crescente Arrivo: ${latitudeArrCre.toFixed(5)}' ${letteraLatArr}`;
            }else if (eccentricita!==0){
                //let gradiLatCre = Math.floor(latitudeCre), primiLatCre = (latitudeCre-gradiLatCre)*60;
                //let gradiLatCreArr = Math.floor(latitudeArrCre), primiLatArrCre = (latitudeArrCre-gradiLatCreArr)*60;
                let gradiLatGeo = Math.floor(latitudeGeocentrica), primiLatGeo = (latitudeGeocentrica-gradiLatGeo)*60;
                let gradiLatGeoArr = Math.floor(latitudeGeocentricaArr), primiLatGeoArr = (latitudeGeocentricaArr-gradiLatGeoArr)*60;

                risultati.text=`Cammino: ${cammino.toFixed(2)}NM

Rotta Vera: ${rottaVera.toFixed(2)}°


Maggiori dettagli
ΔΨ crescente: ${deltaPhiCre.toFixed(5)}' ${letteraDeltaPsi}
Ψ Partenza crescente: ${latitudeCre.toFixed(5)}' ${letteraLat}
Ψ Arrivo crescente: ${latitudeArrCre.toFixed(5)}' ${letteraLatArr}`;
            }
            break;
        case 1:
            risultati.text=` `;
            break;
        default:
            alert("Errore di valutazione restituzione risultati tramite valutazione di bug.");
            break;
    }
}//end function SetOutput()
//___________________________________________________________


//___________________________________________________________
//funzione che gestisce gli output dei casi particolari, navigazione su parallelo e navigazione meridiano
function SetOutputCasiParticolari(){
    switch (bug){
        case 0:
            switch (tipoProblema) {
                case "navigazione parallelo":
                    risultati.text=`Navigazione su parallelo!

Cammino: ${cammino.toFixed(2)} NM

Rotta vera: ${rottaVera.toFixed(2)}°`;
                    break;

                case "navigazione meridiano":
                    risultati.text=`Navigazione su meridiano!

Cammino: ${cammino.toFixed(2)} NM

Rotta vera: ${rottaVera.toFixed(2)}`;
                    break;
            }
            break;

        case 1:
            risultati.text=` `;
            break;

        default:
            alert("Errore di valutazione restituzione risultati tramite valutazione di bug.");
            break;
    }
}//end function SetOutputCasiParticolari()
//___________________________________________________________


