var observableModule = require('tns-core-modules/data/observable');
const { getViewById, action, Observable, fromObject } = require('@nativescript/core');

var Punto_AND_Differenze = require('~/view/Punto&Differenze');
var OggettoLossodromia = require('~/view/OggettoLossodromia');
var FunctionMath = require('~/view/FunctionMath');
const { clear } = require('@nativescript/core/application-settings');
var OggetoOrtodromia = require('~/view/OggettoOrtodromia');

const { Animation } = require("@nativescript/core");
const { AnimationCurve } = require("@nativescript/core/ui/enums");

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
/**
 * Di seguito dichiaro tutte le variabili utili, variabili di carattere globale
 */

 //variabili della pagina
var page;
var bug;
var bugVuota=1;

//varibili per selezionatore lista
var lista=["Sfera","WGS84"], eccentricita=0; //ho inizializzato solo l'eccentricità per il parametro di default, se l'utente non usa il selezionatore del modello terrestre

//variabili input primo problema di lossodromia
var gradiLat, primiLat, letteraLat="N"; //ho inizializzato solo la lettera di latitudine per il default dello switch
var gradiLon, primiLon, letteraLon="E"; //ho inizializzato solo la lettera di longitudine per il default dello switch

//variabili input secondo problema di lossodromia
var gradiLatSecondo, primiLatSecondo, letteraLatSecondo="N"; //ho inizializzato solo la lettera di latitudine per il default dello switch
var gradiLonSecondo, primiLonSecondo, letteraLonSecondo="E"; //ho inizializzato solo la lettera di longitudine per il default dello switch
var gradiLatArrSecondo, primiLatArrSecondo, letteraLatArrSecondo="N"; //ho inizializzato solo la lettera di latitudine per il default dello switch
var gradiLonArrSecondo, primiLonArrSecondo, letteraLonArrSecondo="E"; //ho inizializzato solo la lettera di longitudine per il default dello switch

//variabili riutilizzabili da entrambe le schede
var lat, lon;
var latArr, lonArr;
var cammino, rotta;
var tipoProblema;
var risultati;

var exp;

var output;
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


//funzione caricamento pagina
exports.loaded=function(args){
    page=args.object;


    page.bindingContext=Modello();


}
//fine funzione caricamento pagina



//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
/**
 * In questa sezione gestisco tutti gli eventi della pagina
 */

 //______________________________________________________________
 //EVENTI DEL PRIMO PROBLEMA DI LOSSODROMIA
 //______________________________________________________________



 //evento che gestisce l'inserimento dei gradi di latitudine del primo problema di lossodromia
exports.CambioGradiLat=()=>{
    gradiLat=parseInt( page.getViewById("idGradiLat").text );
    console.log("cambio gradi: "+gradiLat);
    if (gradiLat>90){
        alert("Errore inserimento gradi latitudine.");
        bug=1;
    }else{
        bug=0;
    }
}



//evento che gestisce l'inserimento dei primi di latitudine del primo problema di lossodromia
exports.CambioPrimi=()=>{
    primiLat=parseFloat( page.getViewById("idPrimiLat").text );
    if (primiLat>60) {
        alert("Errore inserimento primi di latitudine.");
        bug=1;
    }else{
        bug=0;
    }
}



//evento che gestisce l'inserimento della lettera di latitudine, tramite il pulsante switch, il parametro di default è dichiarato nelle variabili
exports.onSwitchLat=(args) =>{
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



//evento che gestisce l'iserimento dei gradi di longitudine
exports.CambioGradiLon=()=>{
    gradiLon=parseInt( page.getViewById("idGradiLon").text );
    if (gradiLon>180) {
        alert("Errore inserimento gradi longitudine.");
        bug=1;
    }else{
        bug=0;
    }
}



//evento che gestisce l'inserimento dei primi di longitudine del primo problema di lossodromia
exports.CambioPrimiLon=()=>{
    primiLon=parseFloat( page.getViewById("idPrimiLon").text );
    if (primiLon>60) {
        alert("Errore inserimento primi longitudine.");
        bug=1;
    }else{
        bug=0;
    }
}



//evento che gestisce l'inserimento della lettera di longitudine, tramite il pulsante switch, il valore di default è dichiarato nelle variabili
exports.onSwitchLon=(args) =>{
    const switchLon=args.object;
    switchLon.on("checkedChange", (args)=>{
        const sw=args.object;
        const isChecked=sw.checked;
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



//evento che gestisce l'inserimento del valore di rotta
exports.CambioRotta=()=>{
    rotta = parseFloat( page.getViewById("idRotta").text );
    if (rotta>360){
        bug=1;
        alert("Errore inserimento rotta.");
    }else{
        bug=0;
    }
}



 //______________________________________________________________
 //EVENTI DEL SECONDO PROBLEMA DI LOSSODROMIA
 //______________________________________________________________



 //evento che gestisce l'inserimento dei gradi di latitudine del punto di partenza
 exports.CambioGradiLatSecondo=()=>{
     gradiLatSecondo=parseInt( page.getViewById("idGradiLatSecondo").text );
     if (gradiLatSecondo>90){
         alert("Errore inserimento gradi latitudine.");
         bug=1;
     }else{
         bug=0;
     }
 }



 //evento che gestisce l'inserimento dei primi di latitudine del punto di partenza
 exports.CambioPrimiLatSecondo=()=>{
     primiLatSecondo=parseFloat( page.getViewById("idPrimiLatSecondo").text );
     if (primiLatSecondo>60){
         alert("Errore inserimento primi latitudine.");
         bug=1;
     }else{
         bug=0;
     }
 }



 //evento che gestisce l'inserimento della lettera di latitudine del punto di partenza
 exports.onSwitchLatSecondo=(args) =>{
    const switchLat = args.object;
    switchLat.on("checkedChange", (fargs)=>{
        const sw = fargs.object;
        const isChecked = sw.checked;
        switch (isChecked){
            case false:
                letteraLatSecondo="N";
                break;

            case true:
                letteraLatSecondo="S";
                break;
        }
    });
}



//evento che gestisce l'inserimento dei gradi di longitudine del punto di partenza
exports.CambioGradiLonSecondo=()=>{
    gradiLonSecondo=parseInt( page.getViewById("idGradiLonSecondo").text );
    if (gradiLonSecondo>180){
        alert("Errore inserimento gradi longitudine.");
        bug=1;
    }else{
        bug=0;
    }
}



//evento che gestisce l'inserimento dei primi di longitudine del punto di partenza
exports.CambioPrimiLonSecondo=()=>{
    primiLonSecondo=parseFloat( page.getViewById("idPrimiLonSecondo").text );
    if (primiLonSecondo>60){
        alert("Errore inserimento primi longitudine.");
        bug=1;
    }else{
        bug=0;
    }
}



 //evento che gestisce l'inserimento della lettera di longitudine del punto di partenza
 exports.onSwitchLonSecondo=(args) =>{
    const switchLon = args.object;
    switchLon.on("checkedChange", (fargs)=>{
        const sw = fargs.object;
        const isChecked = sw.checked;
        switch (isChecked){
            case false:
                letteraLonSecondo="E";
                break;

            case true:
                letteraLonSecondo="W";
                break;
        }
    });
}



//evento che gestisce l'inserimento dei gradi di latitudine del punto di arrivo
exports.CambioGradiLatArrSecondo=()=>{
    gradiLatArrSecondo=parseInt( page.getViewById("idGradiLatArrSecondo").text );
    if (gradiLatArrSecondo>90){
        alert("Errore inserimento gradi latitudine.");
        bug=1;
    }else{
        bug=0;
    }
}



//evento che gestisce l'inserimento dei primi di latitudine del punto di arrivo
exports.CambioPrimiLatArrSecondo=()=>{
    primiLatArrSecondo=parseFloat( page.getViewById("idPrimiLatArrSecondo").text );
    if (primiLatArrSecondo>60){
        alert("Errore inserimento primi latitudine.");
        bug=1;
    }else{
        bug=0;
    }
}



 //evento che gestisce l'inserimento della lettera di latitudine del punto di arrivo
 exports.onSwitchLatArrSecondo=(args) =>{
    const switchLat = args.object;
    switchLat.on("checkedChange", (fargs)=>{
        const sw = fargs.object;
        const isChecked = sw.checked;
        switch (isChecked){
            case false:
                letteraLatArrSecondo="N";
                break;

            case true:
                letteraLatArrSecondo="S";
                break;
        }
    });
}



//evento che gestisce l'inserimento dei gradi di longitudine del punto di arrivo
exports.CambioGradiLonArrSecondo=()=>{
    gradiLonArrSecondo=parseInt( page.getViewById("idGradiLonArrSecondo").text );
    if (gradiLonArrSecondo>180){
        alert("Errore inserimento gradi longitudine.");
        bug=1;
    }else{
        bug=0;
    }
}



//evento che gestisce l'inserimento dei primi di longitudinedel punto di arrivo
exports.CambioPrimiLonArrSecondo=()=>{
    primiLonArrSecondo=parseFloat( page.getViewById("idPrimiLonArrSecondo").text );
    if (primiLonArrSecondo>60){
        alert("Errore inserimento primi longitudine.");
        bug=1;
    }else{
        bug=0;
    }
}



 //evento che gestisce l'inserimento della lettera di longitudine del punto di arrivo
 exports.onSwitchLonArrSecondo=(args) =>{
    const switchLon = args.object;
    switchLon.on("checkedChange", (fargs)=>{
        const sw = fargs.object;
        const isChecked = sw.checked;
        switch (isChecked){
            case false:
                letteraLonArrSecondo="E";
                break;

            case true:
                letteraLonArrSecondo="W";
                break;
        }
    });
}



//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::







//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
/**
 * In questa sezione dichiaro tutte le funzioni utili alla risoluzione del primo problema di lossodromia
 * IMPORTANTE, verrà dichiarata la funzione ""Modello()"" che rappresenta il modello della pagina, che controlla il selezionatore di lista
 * le funzioni dei pulsanti e la gestione degli output.
 *
 * IMPORTANTE: ""Modello()"" è l'ultima funzione ad essere dichiarata
 */



 //______________________________________________________________
 //Funzioni relative al primo problema di lossosdromia
 //______________________________________________________________



 function SetInput(){
     /**
      * Funzione che setta gli input del primo problema di lossodromia, nel caso in cui siano sbagliati setta il bug=1
      * per non risolvere il problema
      */
     //ResetInput();
     bugVuota=1;

     let sommaLat, sommaLon;

     if(isNaN(gradiLat) || isNaN(primiLat)|| isNaN(gradiLon) || isNaN(primiLon)){
         bugVuota=1;
     }else{
         bugVuota=0;
     }

     switch(bugVuota){
         case 0:
             sommaLat = gradiLat+(primiLat/60);
             sommaLon = gradiLon+(primiLon/60);
             cammino = parseFloat( page.getViewById("idCammino").text );

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

             if(rotta>360){
                 bug=1;
             }else{
                 bug=0;
             }

             tipoProblema=OggettoLossodromia.RiconosciPrimoProblema(lat,cammino,rotta);
             if(tipoProblema==="impossibile"){
                 alert("Impossibile calcolare");
                 bug=1;
             }

             break;

         case 1:
             alert("Input vuoti.");
             bug=1;
             break;
     }

 }//end function SetInput()



 function RisolviPrimoProb(){
     /**
      * Funzione che in base al valore del bug avvia la risoluzione del primo problema di lossodromia
      */
     switch (bug){
         case 0:
             risultati=OggettoLossodromia.RisolviPrimoProblema(lat,lon,cammino,rotta,eccentricita);
             output = SetOutput(risultati,tipoProblema);
             break;

            case 1:
                alert("Errore risoluzione primo problema di lossodromia.");
                output=``;
                break;
     }
 }//end function RisolviPrimoProb()



 function SetOutput(ris,tipo){
     /**
      * Funzione che setta gli ouput del primo problema di lossodromia
      */
     switch (tipo){
         case "navigazione generale":
             let latArr = FunctionMath.CorreggiRoundOff( ris[0][0] );
             let gradiLatArr=Math.floor(latArr), primiLatArr=(latArr-gradiLatArr)*60;
             let lonArr = FunctionMath.CorreggiRoundOff( ris[1][0] );
             let gradiLonArr=Math.floor(lonArr), primiLonArr=(lonArr-gradiLonArr)*60;

             if (eccentricita!==0){
                 out=`Punto di arrivo

Latitudine: ${gradiLatArr}° ${primiLatArr.toFixed(2)}' ${ris[0][1]}
Longitudine: ${gradiLonArr}° ${primiLonArr.toFixed(2)}' ${ris[1][1]}


Maggiori dettagli
ΔΨ crescente: ${(ris[2][0]).toFixed(2)}' ${ris[2][1]}
Ψ Partenza crescente: ${Math.abs( ris[3][0] ).toFixed(2)}' ${ris[3][1]}
Ψ Arrivo crescente: ${Math.abs( ris[4][0] ).toFixed(2)}' ${ris[4][1]}`;

             }else{
                 out=`Punto di arrivo

Latitudine: ${gradiLatArr}° ${primiLatArr.toFixed(2)}' ${ris[0][1]}
Longitudine: ${gradiLonArr}° ${primiLonArr.toFixed(2)}' ${ris[1][1]}


Maggiori dettagli
Δϕ crescente: ${(ris[2][0]).toFixed(2)}' ${ris[2][1]}
ϕ Partenza crescente: ${Math.abs( ris[3][0] ).toFixed(2)}' ${ris[3][1]}
ϕ Arrivo crescente: ${Math.abs( ris[4][0] ).toFixed(2)}' ${ris[4][1]}`;
             }
                break;

            case "navigazione meridiano":
                let latitudeArr = FunctionMath.CorreggiRoundOff( ris[0][0] );
                let gradiLatitudeArr=Math.floor(latitudeArr), primiLatitudeArr=(latitudeArr-gradiLatitudeArr)*60;

                out=`Navigazione su meridiano

Latitudine: ${gradiLatitudeArr}° ${primiLatitudeArr.toFixed(2)}' ${ris[0][1]}`;
                break;

            case "navigazione parallelo":
                let longitudeArr = FunctionMath.CorreggiRoundOff( ris[0][0] );
                let gradiLongitudeArr=Math.floor(longitudeArr), primiLongitudeArr=(longitudeArr-gradiLongitudeArr)*60;

                out=`Navigazione su parallelo

Longitudine: ${gradiLongitudeArr}° ${primiLongitudeArr.toFixed(2)}' ${ris[0][1]}`;
                break;
     }

     return out;
 }//end function SetOutput(...)





  //______________________________________________________________
 //Funzioni relative al secondo problema di lossosdromia
 //______________________________________________________________



 function SetInputSecondo(){
     /**
      * Funzione che setta gli input del secondo problema di lossodromia e setta il valore del bug per poter avviare la risoluzione del problema
      */
     bugVuota=1;
     let sommaLat, sommaLon, sommaLatArr, sommaLonArr;

     if( isNaN(gradiLatSecondo) || isNaN(primiLatSecondo) || isNaN(gradiLonSecondo) || isNaN(primiLonSecondo) || isNaN(gradiLatArrSecondo) || isNaN(primiLatArrSecondo) || isNaN(gradiLonArrSecondo) || isNaN(primiLonArrSecondo) ){
         bugVuota=1;
     }else{
         bugVuota=0;
     }

     switch(bugVuota){
         case 0:
             sommaLat = gradiLatSecondo+(primiLatSecondo/60);
             sommaLon = gradiLonSecondo+(primiLonSecondo/60);
             sommaLatArr = gradiLatArrSecondo+(primiLatArrSecondo/60);
             sommaLonArr = gradiLonArrSecondo+(primiLonArrSecondo/60);

             if(sommaLat<=90){
                 lat = Punto_AND_Differenze.SetLatitudine(gradiLatSecondo,primiLatSecondo,letteraLatSecondo);
                 bug=0;
             }else{
                 bug=1;
             }

             if(sommaLon<=180){
                 lon = Punto_AND_Differenze.SetLongitudine(gradiLonSecondo,primiLonSecondo,letteraLonSecondo);
                 bug=0;
             }else{
                 bug=1;
             }

             if(sommaLatArr<=90){
                 latArr = Punto_AND_Differenze.SetLatitudine(gradiLatArrSecondo,primiLatArrSecondo,letteraLatArrSecondo);
                 bug=0;
             }else{
                 bug=1;
             }

             if(sommaLonArr<=180){
                 lonArr= Punto_AND_Differenze.SetLongitudine(gradiLonArrSecondo,primiLonArrSecondo,letteraLonArrSecondo);
                 bug=0;
             }else{
                 bug=1;
             }

             break;

         case 1:
             bug=1;
             alert("Input vuoti.");
             break;
     }

 }//end function SetInputSecondo()



 function RisolviSecondoProb(){
     switch (bug){
         case 0:
             risultati = OggettoLossodromia.RisolviSecondoProblema(lat,lon,latArr,lonArr,eccentricita);
             output = SetOutputSecondo(risultati);
             break;

            case 1:
                alert("Errore risoluzione secondo problema di lossodromia.");
                output=``;
                break;
     }
 }//end function RisolviSecondoPRob()



 function SetOutputSecondo(ris){
     var out;

     let tipologia = OggettoLossodromia.RiconosciSecondoProblema(lat,lon,latArr,lonArr);

     switch (tipologia){
          case "navigazione meridiano":
             out = `Navigazione su meridiano

Cammino: ${ris[0].toFixed(2)} NM

Rotta: ${ris[1]}°`;
             break;

            case "navigazione parallelo":
                out = `Navigazione su parallelo

Cammino: ${ris[0].toFixed(2)} NM

Rotta: ${ris[1]}°`;
                break;

            case "navigazione generale":
                ris[1] = FunctionMath.CorreggiRoundOffRotte(ris[1]);

                if (eccentricita===0){
                    out = `Cammino: ${ris[0].toFixed(2)} NM

Rotta: ${ris[1].toFixed(2)}°


Maggiori dettagli
Δϕ crescente: ${(ris[2][0]).toFixed(2)}' ${ris[2][1]}
ϕ Partenza crescente: ${Math.abs( ris[3][0] ).toFixed(2)}' ${ris[3][1]}
ϕ Arrivo crescente: ${Math.abs( ris[4][0] ).toFixed(2)}' ${ris[4][1]}`;

                }else{
                    out = `Cammino: ${ris[0].toFixed(2)} NM

Rotta: ${ris[1].toFixed(2)}°


Maggiori dettagli
ΔΨ crescente: ${(ris[2][0]).toFixed(2)}' ${ris[2][1]}
Ψ Partenza crescente: ${Math.abs( ris[3][0] ).toFixed(2)}' ${ris[3][1]}
Ψ Arrivo crescente: ${Math.abs( ris[4][0] ).toFixed(2)}' ${ris[4][1]}`;
                }//end if
                break;

     }//end switch

     return out;

 }//end function SetOutputSecondo()







function Modello(){
    const modello = new Observable();

    modello.lista = lista;
    //esempio.lista = lista; //serve per mostrare gli elementi nel selezionatore di lista
    modello.onListPickerLoaded=(fargs)=>{
        const listPickerComponent = fargs.object;
        listPickerComponent.on("selectedIndexChange", (args)=>{
            const picker = args.object;
            console.log("picker index: "+picker.index);
            switch (picker.selectedIndex){
                case 0:
                    eccentricita=0;
                    break;
                case 1:
                    let a=6378137; let schiacciamento=1/298.26;
                    let b=a-(a*schiacciamento);
                    let num=Math.pow(a,2)-Math.pow(b,2); let den=Math.pow(a,2);
                    eccentricita = Math.sqrt(num/den);
                    break;
                default:
                    eccentricita=0;
                    break;
            }
        });
    }

    modello.calcola = ()=>{

        //creo l'animazione dell'activityIndicator e a fine animazione faccio mostrare i risultati
        let indicator = page.getViewById("ind");
        indicator.visibility = "visible";
        modello.set("bsy",true);

        const defAnima = {
            target: indicator,
            curve: AnimationCurve.easeInOut,
            duration: 2000,
            scale: {
                x: 1,
                y: 1
            }
        };

        let anima = new Animation([defAnima],false);
        anima.play().then(()=>{
            modello.set("bsy",false);
            indicator.visibility = "collapse";

            //mostro i calcoli
            SetInput();
            RisolviPrimoProb();
            modello.set("Risultati Primo problema", "Risultati del Primo Problema");
            modello.set("RisultatiPrimo" , output);
            //ResetInput();
        });


    }

    modello.calcolaSecondo = ()=>{

        //creo l'animazione dell'activityIndicator e a fine animazione faccio mostrare i risultati
        let indicator = page.getViewById("ind2");
        indicator.visibility = "visible";
        modello.set("bsy2",true);

        const defnAnim = {
            target: indicator,
            curve: AnimationCurve.easeInOut,
            duration: 2000,
            scale: {
                x: 1,
                y: 1
            }
        };

        let anima = new Animation([defnAnim],false);
        anima.play().then(()=>{
            modello.set("bsy2",false);
            indicator.visibility = "collapse";

            //effettuo e mostro il risultato
            SetInputSecondo();
            RisolviSecondoProb();
            modello.set("Risultati Secondo problema", "Risultati del Secondo Problema");
            modello.set("RisultatiSecondo", output);
        });

    }

    return modello;

}
exports.Modello=Modello;




