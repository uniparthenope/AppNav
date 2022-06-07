var observableModule = require('tns-core-modules/data/observable');
const { getViewById, action, Observable, fromObject, View } = require('@nativescript/core');

var Punto_AND_Differenze = require('~/view/Punto&Differenze');
var FunctionMath = require('~/view/FunctionMath');
var OggettoOrtodromia = require('~/view/OggettoOrtodromia');
const { clear } = require('@nativescript/core/application-settings');
const { parse } = require('@nativescript/core/css');

const { Animation } = require("@nativescript/core");
const { AnimationCurve } = require("@nativescript/core/ui/enums");


//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
/**
 * Di seguito dichiaro tutte le variabili utili, di carattere globale
 */

//variabili della pagina
var page;
var bug;
var bugVuota=1; //bug se la pagina ha tutti i textField vuoti, può assumere 4 valori: 0(tutto ok), 1(manca input)

//variabili input punti di partenza e arrivo
var gradiLat, primiLat, letteraLat="N"; //ho inizializzato solo la lettera di latitudine per il default dello switch
var gradiLon, primiLon, letteraLon="E"; //ho inizializzato solo la lettera di longitudine per il default dello switch
var gradiLatArr, primiLatArr, letteraLatArr="N"; //ho inizializzato solo la lettera di latitudine per il default dello switch
var gradiLonArr, primiLonArr, letteraLonArr="E"; //ho inizializzato solo la lettera di longitudine per il default dello switch

//variabile per il numero dei waypoints
var numeroWay=null;

//variabile per il selezionatore lista
var lista = ["distanza","longitudine"];
var metodoWay="distanza";

//variabili dei punti e dei risultati
var lat, lon;
var latArr, lonArr;
var risultatiOrto, risultatiWay;
var outputOrto, outputWay;
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::



//funzione caricamento pagina
exports.onLoaded=function(args){
    page=args.object;

    page.bindingContext=Modello();

}//fine funzione caricamento pagina



//__________________________________________________________________________________________________
//__________________________________________________________________________________________________
/**
 * In Questa sezione dichiaro le funzione di gestione dei vari eventi della pagina
 */

//evento che gestisce l'inserimento gradi latitudine del punto di partenza
exports.CambioGradiLat=()=>{
    gradiLat = parseInt( page.getViewById("idGradiLat").text );
    if(gradiLat>90){
        alert("Errore inserimento gradi latitudine.");
        bug=1;
    }else{
        bug=0;
    }
}



//evento che gestisce l'inserimento primi latitudine del punto di partenza
exports.CambioPrimiLat=()=>{
    primiLat = parseFloat( page.getViewById("idPrimiLat").text );
    if(primiLat>60){
        alert("Errore inserimento primi latitudine.");
        bug=1;
    }else{
        bug=0;
    }
}



//evento che gestisce lo switch della lettera di latitudine del punto di partenza
exports.onSwitchLat=(args)=>{
    const switchLat = args.object;
    switchLat.on("checkedChange", (fargs)=>{
        const sw = fargs.object;
        const isChecked = sw.checked;
        switch (isChecked){
            case false:
                letteraLat="N";
                break;

            case true:
                letteraLat="S";
                break;
        }
    });
}



//evento che gestisce l'inserimento gradi longitudine del punto di partenza
exports.CambioGradiLon=()=>{
    gradiLon = parseInt( page.getViewById("idGradiLon").text );
    if(gradiLon>180){
        alert("Errore inserimento gradi longitudine.");
        bug=1;
    }else{
        bug=0;
    }
}



//evento che gestisce l'inserimento primi longitudine del punto di partenza
exports.CambioPrimiLon=()=>{
    primiLon = parseFloat( page.getViewById("idPrimiLon").text );
    if(primiLon>60){
        alert("Errore inserimento primi longitudine.");
        bug=1;
    }else{
        bug=0;
    }
}



//evento che gestisce lo switch della lettera di longitudine del punto di partenza
exports.onSwitchLon=(args)=>{
    const switchLon = args.object;
    switchLon.on("checkedChange", (fargs)=>{
        const sw = fargs.object;
        const isChecked = sw.checked;
        switch (isChecked){
            case false:
                letteraLon="E";
                break;

            case true:
                letteraLon="W";
                break;
        }
    });
}



//evento che gestisce l'inserimento gradi latitudine del punto di arrivo
exports.CambioGradiLatArr=()=>{
    gradiLatArr = parseInt( page.getViewById("idGradiLatArr").text );
    if(gradiLatArr>90){
        alert("Errore inserimento gradi latitudine.");
        bug=1;
    }else{
        bug=0;
    }
}



//evento che gestisce l'inserimento primi latitudine del punto di arrivo
exports.CambioPrimiLatArr=()=>{
    primiLatArr = parseFloat( page.getViewById("idPrimiLatArr").text );
    if(primiLatArr>60){
        alert("Errore inserimento primi latitudine.");
        bug=1;
    }else{
        bug=0;
    }
}



//evento che gestisce lo switch della lettera di latitudine del punto di arrivo
exports.onSwitchLatArr=(args)=>{
    const switchLatArr = args.object;
    switchLatArr.on("checkedChange", (fargs)=>{
        const sw = fargs.object;
        const isChecked = sw.checked;
        switch (isChecked){
            case false:
                letteraLatArr="N";
                break;

            case true:
                letteraLatArr="S";
                break;
        }
    });
}



//evento cche gestisce l'inserimento gradi longitudine del punto di arrivo
exports.CambioGradiLonArr=()=>{
    gradiLonArr = parseInt( page.getViewById("idGradiLonArr").text );
    if(gradiLonArr>180){
        alert("Errore inserimento gradi longitudine.");
        bug=1;
    }else{
        bug=0;
    }
}



//evento che gestisce l'inserimento primi longituidine del punto di arrivo
exports.CambioPrimiLonArr=()=>{
    primiLonArr = parseFloat( page.getViewById("idPrimiLonArr").text );
    if(primiLonArr>60){
        alert("Errore inserimento primi longitudine.");
        bug=1;
    }else{
        bug=0;
    }
}



//evento che gestisce lo switch della lettera di longitudine del punto di arrivo
exports.onSwitchLonArr=(args)=>{
    const switchLonArr = args.object;
    switchLonArr.on("checkedChange", (fargs)=>{
        const sw = fargs.object;
        const isChecked = sw.checked;
        switch (isChecked){
            case false:
                letteraLonArr="E";
                break;

            case true:
                letteraLonArr="W";
                break;
        }
    });
}

//__________________________________________________________________________________________________
//__________________________________________________________________________________________________





//__________________________________________________________________________________________________
//__________________________________________________________________________________________________
/**
 * In questa sezione dichiaro tutte le funzioni utili per effettuare i calcoli della pagina
 */


function SetInput(){
    /**
     * Funzione che setta gli input della pagina
     */
    bugVuota=1;
    let sommaLat, sommaLon, sommaLatArr, sommaLonArr;

    if( isNaN(gradiLat) || isNaN(primiLat) || isNaN(gradiLon) || isNaN(primiLon) || isNaN(gradiLatArr) || isNaN(primiLatArr) || isNaN(gradiLonArr) || isNaN(primiLonArr) ){
        bugVuota=1;
    }else{
        bugVuota=0;
    }

    numeroWay = parseInt( page.getViewById("idNumeroWaypoints").text );



    switch(bugVuota){
        case 0:
            sommaLat = gradiLat+(primiLat/60);
            sommaLon = gradiLon+(primiLon/60);
            sommaLatArr = gradiLatArr+(primiLatArr/60);
            sommaLonArr = gradiLonArr+(primiLonArr/60);

            if(sommaLat<=90){
                lat = Punto_AND_Differenze.SetLatitudine(gradiLat,primiLat,letteraLat);
                bug=0;
            }else{
                bug=1;
            }

            if(sommaLon<=180){
                lon = Punto_AND_Differenze.SetLongitudine(gradiLon,primiLon,letteraLon);
                bug=0;
            }else{
                bug=1;
            }

            if(sommaLatArr<=90){
                latArr = Punto_AND_Differenze.SetLatitudine(gradiLatArr,primiLatArr,letteraLatArr);
                bug=0;
            }else{
                bug=1;
            }

            if(sommaLonArr<=180){
                lonArr = Punto_AND_Differenze.SetLongitudine(gradiLonArr,primiLonArr,letteraLonArr);
                bug=0;
            }else{
                bug=1;
            }

            break;

        case 1:
            alert("Input vuoti.");
            bug=1;
            break;
    }


}//end function SetInput()



function RisolviOrtodromia(){
    /**
     * Funzione che avvia la risoluzione dell'ortodromia
     */

    switch(bug){
        case 0:
            risultatiOrto = OggettoOrtodromia.RisolviSecondoProblema(lat,lon,latArr,lonArr);
            outputOrto = OggettoOrtodromia.SetOutputSecondo(risultatiOrto);
            break;

        case 1:
            alert("Errore risoluzione ortodromia.");
            outputOrto=``;
            break;
    }

}//end function RisolviOrtodromia()



function RisolviWaypoints(){
    /**
     * Funzione che avvia la risoluzione dei waypoints
     */

    switch(bug){
        case 0:
            switch(metodoWay){
                case "distanza":
                    risultatiWay = OggettoOrtodromia.WaypointsCammino(numeroWay,lat,lon,latArr,lonArr,risultatiOrto);
                    outputWay = OggettoOrtodromia.SetOutputWaypoints(risultatiWay);
                    break;

                case "longitudine":
                    risultatiWay = OggettoOrtodromia.WaypointsLongitudine(numeroWay,lat,lon,latArr,lonArr,risultatiOrto);
                    outputWay = OggettoOrtodromia.SetOutputWaypoints(risultatiWay);
                    break;
            }

            break;
        case 1:
            alert("Errore risoluzione waypoints.");
            outputWay=``;
            break;
    }

}//end function RisolviWaypoints()

//__________________________________________________________________________________________________
//__________________________________________________________________________________________________






//__________________________________________________________________________________________________
//__________________________________________________________________________________________________
/**
 * In questa sezione dichiaro la funzione modello che esporta la pagina
 */

function Modello(){
    const modello = new Observable();

    modello.lista = lista;
    modello.onListPickerLoaded=(fargs)=>{
        const listPickerComponent = fargs.object;
        listPickerComponent.on("selectedIndexChange", (args)=>{
            const picker = args.object;
            switch(picker.selectedIndex){
                case 0:
                    metodoWay = "distanza";
                    break;
                case 1:
                    metodoWay = "longitudine";
                    break;
                default:
                    metodoWay = "distanza"
                    break;
            }
        });
    }

    //creo funzione per il bottone di effettua calcoli
    modello.calcola = () =>{

        let indicator = page.getViewById("ind");
        indicator.visibility = "visible";
        modello.set("bsy",true);

        //definisco l'animazione da associare all'activityIndicator
        const defAnima = {
            target: indicator,
            curve: AnimationCurve.easeInOut,
            duration: 2000,
            scale: {
                x: 1,
                y: 1
            }
        };

        let animazione = new Animation([defAnima],false);
        animazione.play().then(()=>{
            modello.set("bsy",false);
            indicator.visibility="collapse";

            SetInput();
            RisolviOrtodromia();
            RisolviWaypoints();
            modello.set("Risultati Ortodromia Waypoints","Risultati Ortodromia con Waypoints");
            modello.set("RisultatiOrto",outputOrto);
            modello.set("RisultatiWay",outputWay);
        });


    }

    return modello;
}//end function Modello()
exports.Modello=Modello;

//__________________________________________________________________________________________________
//__________________________________________________________________________________________________
