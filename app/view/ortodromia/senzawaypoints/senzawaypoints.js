var observableModule = require('tns-core-modules/data/observable');
const { getViewById, action, Observable, fromObject, View } = require('@nativescript/core');

var Punto_AND_Differenze = require('~/view/Punto&Differenze');
var FunctionMath = require('~/view/FunctionMath');
var OggettoOrtodromia = require('~/view/OggettoOrtodromia');
const { clear } = require('@nativescript/core/application-settings');
var OggettoLossodromia = require('~/view/OggettoLossodromia');
var OggettoNavMista = require('~/view/OggettoNavMista');



//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
/**
 * Di seguito dichiaro tutte le variabili utili, di carattere globale
 */

//variabili della pagina
var page;
var bug;
var bugMista; //variabile utile per gestire il bug nel riconoscimento della navigazione mista
var bugVuota=1, bugVuotaMista=1;

//variabili input primo problema
var gradiLat1, primiLat1, letteraLat1="N"; //ho inizializzato solo la lettera di latitudine per il default dello switch
var gradiLon1, primiLon1, letteraLon1="E"; //ho inizializzato solo la lettera di longitudine per il default dello switch

//variabili input secondo problema
var gradiLat2, primiLat2, letteraLat2="N"; //ho inizializzato solo la lettera di latitudine per il default dello switch
var gradiLon2, primiLon2, letteraLon2="E"; //ho inizializzato solo la lettera di longitudine per il default dello switch
var gradiLatArr2, primiLatArr2, letteraLatArr2="N"; //ho inizializzato solo la lettera di latitudine per il default dello switch
var gradiLonArr2, primiLonArr2, letteraLonArr2="E"; //ho inizializzato solo la lettera di longitudine per il default dello switch
var gradiParalleloLimite, primiParalleloLimite, letteraParalleloLimite="N"; //ho inizializzato solo la lettera di latitudine per il default dello switch

//variabili riutilizzabili da entrambe le schede
var lat, lon;
var latArr, lonArr;
var cammino, rottaIniziale;
var risultati, risultatiLossodromia, risultatiNavMista;
var latLim;
var problemaCalcolato; //sarà una stringa che può assumere: "primo problema" o "secondo problema"

//variabile per gli output
var output, outputConfronto, outputNavMista;

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::



//funzione caricamento pagina
exports.onLoaded=function(args){
    page=args.object;

    page.bindingContext=Modello();

}//fine funzione caricamento pagina



//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
/**
 * In questa sezione gestisco tutti gli eventi della pagina
 */


//evento che gestisce l'inserimento dei gradi di latitudine di partenza del primo problema
exports.CambioGradiLat1=()=>{
    gradiLat1 = parseInt( page.getViewById("idGradiLat1").text );
    if(gradiLat1>90){
        alert("Errore inserimento gradi latitudine.");
        bug=1;
    }else{
        bug=0;
    }
}



//evento che gestisce l'inserimento dei primi di latitudine di partensa del primo problema
exports.CambioPrimiLat1=()=>{
    primiLat1 = parseFloat( page.getViewById("idPrimiLat1").text );
    if(primiLat1>60){
        alert("Errore inserimento primi latitudine.");
        bug=1;
    }else{
        bug=0;
    }
}



//evento che gestisce lo switch della lettera di latitudine del primo problema
exports.onSwitchLat1=(args)=>{
    const switchLat1 = args.object;
    switchLat1.on("checkedChange", (fargs)=>{
        const sw = fargs.object;
        const isChecked = sw.checked;
        switch (isChecked){
            case false:
                letteraLat1="N";
                break;

            case true:
                letteraLat1="S";
                break;
        }
    });
}



//evento che gestisce l'inserimento gradi di longitudine del primo problema
exports.CambioGradiLon1=()=>{
    gradiLon1 = parseInt( page.getViewById("idGradiLon1").text );
    if(gradiLon1>180){
        alert("Errore inserimento gradi longitudine.");
        bug=1;
    }else{
        bug=0;
    }
}



//evento che gestisce l'inserimento pimi di longitudine del primo problema
exports.CambioPrimiLon1=()=>{
    primiLon1 = parseFloat( page.getViewById("idPrimiLon1").text );
    if(primiLon1>60){
        alert("Errore inserimento primi longitudine.");
        bug=1;
    }else{
        bug=0;
    }
}



//evento che gestisce lo switch della lettera di longitudine del primo problema
exports.onSwitchLon1=(args)=>{
    const switchLon1 = args.object;
    switchLon1.on("checkedChange", (fargs)=>{
        const sw = fargs.object;
        const isChecked = sw.checked;
        switch (isChecked){
            case false:
                letteraLon1="E";
                break;

            case true:
                letteraLon1="W";
                break;
        }
    });
}



//evento che gestisce l'inserimento della rotta del primo problema
exports.CambioRotta1=()=>{
    rottaIniziale = parseFloat( page.getViewById("idRotta1").text );
    if(rottaIniziale>360){
        alert("Errore inserimento rotta.");
        bug=1;
    }else{
        bug=0;
    }
}



 //______________________________________________________________
 //EVENTI DEL SECONDO PROBLEMA DI LOSSODROMIA
 //______________________________________________________________



 //evento che gestisce l'inserimento dei gradi di latitudine punto di partenza secondo problema
 exports.CambioGradiLat2=()=>{
     gradiLat2 = parseInt( page.getViewById("idGradiLat2").text );
     if(gradiLat2>90){
         alert("Errore inserimento gradi latitudine.");
         bug = 1;
     }else{
         bug = 0;
     }
 }



 //evento che gestisce l'inserimento dei primi di latitudine punto di partenza secondo problema
 exports.CambioPrimiLat2=()=>{
     primiLat2 = parseFloat( page.getViewById("idPrimiLat2").text );
     if(primiLat2>60){
         alert("Errore inserimento primi latitudine.");
         bug = 1;
     }else
     bug = 0;
 }



 //evento che gestisce lo switch della lettera di latitudine del punto di partenza del secondo problema
 exports.onSwitchLat2=(args)=>{
     const switchLat2 = args.object;
     switchLat2.on("checkedChange", (fargs)=>{
        const sw = fargs.object;
        const isChecked = sw.checked;
        switch (isChecked){
            case false:
                letteraLat2="N";
                break;

            case true:
                letteraLat2="S";
                break;
        }
     });
 }



 //evento che gestisce l'inserimento dei gradi di longitudine del punto di partenza del secondo problema
 exports.CambioGradiLon2=()=>{
     gradiLon2 = parseInt( page.getViewById("idGradiLon2").text );
     if(gradiLon2>180){
         alert("Errore inserimento gradi longitudine.");
         bug = 1;
     }else{
         bug = 0;
     }
 }



 //evento che gestisce l'inserimento dei primi di longitudine del punto di partenza del secondo problema
 exports.CambioPrimiLon2=()=>{
     primiLon2 = parseFloat( page.getViewById("idPrimiLon2").text );
     if(primiLon2>60){
         alert("Errore inserimento primi longitudine.");
         bug = 1;
     }else{
         bug = 0;
     }
 }



 //evento che gestisce lo switch della lettera di longitudine del punto di partenza del secondo problema
 exports.onSwitchLon2=(args)=>{
     const switchLon2 = args.object;
     switchLon2.on("checkedChange", (fargs)=>{
        const sw = fargs.object;
        const isChecked = sw.checked;
        switch (isChecked){
            case false:
                letteraLon2="E";
                break;

            case true:
                letteraLon2="W";
                break;
        }
     });
 }



 //evento che gestisce l'inserimento dei gradi di latitudine del punto di arrivo del secondo problema
 exports.CambioGradiLatArr2=()=>{
     gradiLatArr2 = parseInt( page.getViewById("idGradiLatArr2").text );
     if(gradiLatArr2>90){
         alert("Errore inserimento gradi latitudine.");
         bug = 1;
     }else{
         bug = 0;
     }
 }



 //evento che gestisce l'inserimento dei primi di latitudine del punto di arrivo dels secondo problema
 exports.CambioPrimiLatArr2=()=>{
     primiLatArr2 = parseFloat( page.getViewById("idPrimiLatArr2").text );
     if(primiLatArr2>60){
         alert("Errore inserimento primi latitudine.");
         bug = 1;
     }else{
         bug = 0;
     }
 }



 //evento che gestisce lo switch della lettera di latitudine del punto di arrivo del secondo problema
 exports.onSwitchLatArr2=(args)=>{
     const switchLatArr2 = args.object;
     switchLatArr2.on("checkedChange", (fargs)=>{
        const sw = fargs.object;
        const isChecked = sw.checked;
        switch (isChecked){
            case false:
                letteraLatArr2="N";
                break;

            case true:
                letteraLatArr2="S";
                break;
        }
     });
 }



 //evento che gestisce l'inserimento dei gradi di longitudine del punto di arrivo del secondo problema
 exports.CambioGradiLonArr2=()=>{
     gradiLonArr2 = parseInt( page.getViewById("idGradiLonArr2").text );
     if(gradiLonArr2>180){
         alert("Errore inserimento gradi longitudine.");
         bug = 1;
     }else{
         bug = 0;
     }
 }



 //evento che gestisce l'inserimento dei primi di longitudine del punto di arrivo del secondo problema
 exports.CambioPrimiLonArr2=()=>{
     primiLonArr2 = parseFloat( page.getViewById("idPrimiLonArr2").text );
     if(primiLonArr2>60){
         alert("Errore inserimento primi longitudine.");
         bug = 1;
     }else{
         bug = 0;
     }
 }



 //evento che gestisce lo switch della lettera di longitudine del punto di arrivo del secondo problema
 exports.onSwitchLonArr2=(args)=>{
     const switchLonArr2 = args.object;
     switchLonArr2.on("checkedChange", (fargs)=>{
        const sw = fargs.object;
        const isChecked = sw.checked;
        switch (isChecked){
            case false:
                letteraLonArr2="E";
                break;

            case true:
                letteraLonArr2="W";
                break;
        }
     });
 }



 //_________________________________________________________________________________________________
 //EVENTI DELLA NAVIGAZIONE MISTA
 //_________________________________________________________________________________________________
 exports.CambioGradiParalleloLimite=()=>{
     gradiParalleloLimite = parseInt( page.getViewById("idGradiParalleloLimite").text );
     if(gradiParalleloLimite>90){
         alert("Errore inserimento gradi latitudine.");
         bug = 1;
     }else{
         bug = 0;
     }
 }



 exports.CambioPrimiParalleloLimite=()=>{
     primiParalleloLimite = parseFloat( page.getViewById("idPrimiParalleloLimite").text );
     if(primiParalleloLimite>60){
         alert("Errore inserimento primi latitudine.");
         bug = 1;
     }else{
         bug = 0;
     }
 }



 exports.onSwitchParalleloLimite=(args)=>{
    const switchParalleloLimite = args.object;
    switchParalleloLimite.on("checkedChange", (fargs)=>{
       const sw = fargs.object;
       const isChecked = sw.checked;
       switch (isChecked){
           case false:
               letteraParalleloLimite="N";
               break;

           case true:
               letteraParalleloLimite="S";
               break;
       }
    });
 }
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::



//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
/**
 * In questa sezione dichiaro tutte le funzioni utili alla risoluzione dei problemi relativi l'ortodromia
 *
 * IMPPORTANTE, verrà dichiarata la funzione ""Modello()"" che rappresenta il modello della pagina, che controlla i vari eventi
 * le funzioni dei pulsanti e la gestione degli output
 *
 * IMPORTANTE: ""Modello()"" è l'ultima funzione ad essere dichiarata
 */



 //______________________________________________________________
 //Funzioni relative al primo problema di ortodromia
 //______________________________________________________________



 function SetInput1(){
     /**
      * Funzione che setta gli input del primo problema di ortodromia, nel caso in cui siano sbagliati setta il bug=1
      * per non risolvere il problema
      */
     bugVuota=1;
     let sommaLat1, sommaLon1;

     if( isNaN(gradiLat1) || isNaN(primiLat1) || isNaN(gradiLon1) || isNaN(primiLon1) ){
         bugVuota=1;
     }else{
         bugVuota=0;
     }

     switch(bugVuota){
         case 0:
             sommaLat1 = gradiLat1+(primiLat1/60);
             sommaLon1 = gradiLon1+(primiLon1/60);
             cammino = parseFloat( page.getViewById("idCammino1").text );

             if(sommaLat1<=90){
                 lat = Punto_AND_Differenze.SetLatitudine(gradiLat1,primiLat1,letteraLat1);
                 bug=0;
             }else{
                 bug=1;
             }

             if(sommaLon1<=180){
                 lon = Punto_AND_Differenze.SetLongitudine(gradiLon1,primiLon1,letteraLon1);
                 bug=0;
             }else{
                 bug=1;
             }

             if(rottaIniziale>360){
                 bug=1;
             }else{
                 bug=0;
             }

             break;

         case 1:
             bug=1;
             alert("Input vuoti.");
             break;
     }

 }//end function SetInput1()



 function RisolviPrimoProb(){
     /**
      * Funzione che in base al valore del bug avvia la risoluzione del primo problema di ortodromia
      */

     switch( bug ){
         case 0:
             risultati = OggettoOrtodromia.RisolviPrimoProblema(lat,lon,cammino,rottaIniziale);
             output = OggettoOrtodromia.SetOutputPrimo(risultati);

             break;

         case 1:
             alert("Errore risoluzione primo problema di ortodromia.");
             output=``;
             break;
     }

 }//end function RisolviPrimoProb




  //______________________________________________________________
 //Funzioni relative al secondo problema di ortodromia
 //_______________________________________________________________



 function SetInput2(){
     /**
      * Funzione che setta gli input del secondo problema di ortodromia, nel caso in cui siano sbagliati setta il bug=1
      * per non risolvere il problema
      */
     bugVuota=1;
     let sommaLat2, sommaLon2, sommaLatArr2, sommaLonArr2;

     if( isNaN(gradiLat2) || isNaN(primiLat2) || isNaN(gradiLon2) || isNaN(primiLon2) || isNaN(gradiLatArr2) || isNaN(primiLatArr2) || isNaN(gradiLonArr2) || isNaN(primiLonArr2) ){
         bugVuota=1;
     }else{
         bugVuota=0;
     }


     switch(bugVuota){
         case 0:
             sommaLat2 = gradiLat2+(primiLat2/60);
             sommaLon2 = gradiLon2+(primiLon2/60);
             sommaLatArr2 = gradiLatArr2+(primiLatArr2/60);
             sommaLonArr2 = gradiLonArr2+(primiLonArr2/60);

             if(sommaLat2<=90){
                 lat = Punto_AND_Differenze.SetLatitudine(gradiLat2,primiLat2,letteraLat2);
                 bug=0;
             }else{
                 bug=1;
             }

             if(sommaLon2<=180){
                 lon = Punto_AND_Differenze.SetLongitudine(gradiLon2,primiLon2,letteraLon2);
                 bug=0;
             }else{
                 bug=1;
             }

             if(sommaLatArr2<=90){
                 latArr = Punto_AND_Differenze.SetLatitudine(gradiLatArr2,primiLatArr2,letteraLatArr2);
                 bug=0;
             }else{
                 bug=1;
             }

             if(sommaLonArr2<=180){
                 lonArr = Punto_AND_Differenze.SetLongitudine(gradiLonArr2,primiLonArr2,letteraLonArr2);
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


 }//end function SetInput2()



 function RisolviSecondoProb(){
     /**
      * Funzione che manda in risoluzione il secodo problema se non il valore del bug è "0"
      */

     switch(bug){
         case 0:
             risultati = OggettoOrtodromia.RisolviSecondoProblema(lat,lon,latArr,lonArr);
             output = OggettoOrtodromia.SetOutputSecondo(risultati);
             break;

         case 1:
             alert("Errore risoluzione secondo problema di ortodromia.");
             output=``;
             break;
     }

 }//end function RisolviSecondoProb()



 //_________________________________________________________________________________________________
 /**
  * Di seguito dichiaro le funzioi per effettuare il confronto con la lossodromia
  */
 //_________________________________________________________________________________________________

 function RisolviConfrontoPrimo(){
     /**
      * Funzione che risolve il confronto tra il primo problema di ortodromia e quello di lossodromia
      */

     switch(bug){
         case 0:
             latArr = risultati[1], lonArr = risultati[2];
             let risultatiParziali = OggettoLossodromia.RisolviSecondoProblema(lat,lon,latArr,lonArr,0);
             let Rv = risultatiParziali[1];
             risultatiLossodromia = OggettoLossodromia.RisolviPrimoProblema(lat,lon,cammino,Rv,0);
             risultatiLossodromia[risultatiLossodromia.length] = Rv;
             outputConfronto = OggettoLossodromia.SetOutputConfrontoPrimo(risultatiLossodromia);
             break;

         case 1:
             alert("Errore confronto con lossodromia.");
             outputConfronto=``;
             break;
     }

 }//end function RisolviConfrontoPrimo()



 function RisolviConfrontoSecondo(){
     /**
      * FUnzione che risolve il confronto tra il secondo problema di ortodromia e quello di lossodromia
      */

     switch(bug){
         case 0:
             //let tipoLossodromia = OggettoLossodromia.RiconosciSecondoProblema(lat,lon,latArr,lonArr);
             risultatiLossodromia = OggettoLossodromia.RisolviSecondoProblema(lat,lon,latArr,lonArr,0);
             outputConfronto = OggettoLossodromia.SetOutputConfrontoSecondo(risultatiLossodromia);
             break;

         case 1:
             alert("Errore confronto con lossodromia.");
             outputConfronto=``;
             break;
     }
 }//end function RisolviConfrontoSecondo()



 //_________________________________________________________________________________________________
 //_________________________________________________________________________________________________
 /**
  * In questa sezione dichiaro le funzioni utili alla risoluzione della navigazione mista
  */

 function SetInputParalleloLimite(){
     bugVuotaMista=1;
     let sommaLat;

     if( isNaN(gradiParalleloLimite) || isNaN(primiParalleloLimite) ){
         bugVuotaMista=1;
     }else{
         bugVuotaMista=0;
     }

     switch(bugVuotaMista){
         case 0:
             sommaLat = gradiParalleloLimite+(primiParalleloLimite/60);
             if(sommaLat<=90){
                 latLim = Punto_AND_Differenze.SetLatitudine(gradiParalleloLimite,primiParalleloLimite,letteraParalleloLimite);
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

 }//end function SetParalleloLimite()



 function VerificaNavMista(risultati){
     /**
      * Funzione che controlla se la navigazione mista è possibile calcolarla, in base alla tipologia dei problemi di ortodromia risolti
      *
      * bugMista assumerà valore 3 se: 1-si è risolta una navigazione equatoriale
      *                                2-si è risolta una navigazione per meridiano, qui attento con il "primo problema", la funzione nel file ortodromia non fa il
      *                                  riconoscimento se si va nell'antimeridiano, pertanto metto un controllo sulle rotte, se sono uguali si innesca il bug
      *                                3-se la latitudine del vertice è inferiore alla latitudine del parallelo limite
      */
     let dim = risultati.length;

     switch(dim){
         case 3://corrisponde ai casi di navigazione equatoriale o navigazione per meridiano del secodo problema di ortodromia
             bugMista = 3;
             break;

         case 4:
             if(problemaCalcolato==="primo problema"){
                 let bug1 = OggettoNavMista.ControllaVertice(rottaIniziale,risultati[3]);
                 if(bug1===2){
                     bugMista = 3;
                 }else{
                     problemaCalcolato="primo problema ok";
                 }
             }

             break;

         default:
             if(risultati[4][0]<=latLim[0]){
                 bugMista = 3;
             }else{
                 if(risultati[4][1]!=latLim[1]){
                     bugMista = 3;
                 }else {
                     bugMista = 0;
                 }
             }
             break;
     }//end switch(dim)

 }//end function VerificaNavMista()



 function RisolviNavMista(problemaCalcolato){
     /**
      * Funzione che manda in risoluzione la navigazione mista
      *
      * Input:
      * -problemaCalcolato: stringa assegnata una volta fatto click nei relativi pulsanti di calcolo dei problemi di ortodromia, può assumere due valori
      *                     "primo problema"/"primo problema ok" oppure "secondo problema"
      */

     switch(bugVuotaMista){
         case 0:
             switch(bugVuota){
                 case 0:
                     VerificaNavMista(risultati);
                     break;
                 case 1:
                     alert("Input ortodromia vuoti.");
                     outputNavMista=``;
                     break;
             }
             break;
         case 1:
             outputNavMista=``;
             break;
     }

     if(bugMista===3){
         alert("Non si può risolvere la navigazione mista.");
         outputNavMista=``;
     }else{
         switch(problemaCalcolato){
             case "primo problema ok":
                 bug = OggettoNavMista.ControllaVertice(rottaIniziale,risultati[3]);
                 break;
             case "secondo problema":
                 switch(bugVuotaMista){
                     case 0:
                        bug = OggettoNavMista.ControllaVertice(risultati[2],risultati[3]);
                         break;
                     case 1:
                         bug=1;
                         break;
                 }
                 break;
         }

         switch(bug){
             case 0:
                 switch(problemaCalcolato){
                     case "primo problema ok":
                         let deltaLambda = Punto_AND_Differenze.DeltaLambda(lon,risultati[2]);
                         risultatiNavMista = OggettoNavMista.RisolviNavMista(lat,lon,risultati[1],risultati[2],rottaIniziale,risultati[3],[90,lat[1]],lon,latLim,deltaLambda);
                         outputNavMista = OggettoNavMista.SetOutput(risultatiNavMista);
                         break;
                     case "primo problema":
                         risultatiNavMista = OggettoNavMista.RisolviNavMista(lat,lon,risultati[1],risultati[2],rottaIniziale,risultati[3],risultati[4],risultati[5],latLim,risultati[11]);
                         outputNavMista = OggettoNavMista.SetOutput(risultatiNavMista);
                         break;
                     case "secondo problema":
                         risultatiNavMista = OggettoNavMista.RisolviNavMista(lat,lon,latArr,lonArr,risultati[2],risultati[3],risultati[4],risultati[5],latLim,risultati[11]);
                         outputNavMista = OggettoNavMista.SetOutput(risultatiNavMista);
                         break;
                 }
                 break;
             case 1:
                 alert("Errore risoluzione navigazione mista.");
                 outputNavMista=``;
                 break;
             case 2:
                 alert("Non si può risolvere la navigazione mista! \n Il vertice non è tra il punto di partenza e di arrivo!");
                 outputNavMista=``;
                 break;
             case 3:
                 break;
             default:
                 alert("Errore risoluzione navigazione mista.");
                 outputNavMista=``;
                 break;
         }
     }//end if

 }//end function RisolviNavMista(...)


 //_________________________________________________________________________________________________
 //_________________________________________________________________________________________________





//__________________________________________________________________________________________________
//__________________________________________________________________________________________________
 /**
  * Definisco di seguito la funzione MODELLO che gestisce l'intera pagina
  */
//__________________________________________________________________________________________________
//__________________________________________________________________________________________________
 function Modello(){
    const modello = new Observable();

    //______________________________________________________________________________________________
    //Di seguito dichiaro le funzioni dei pulsanti per la risoluzione dell'ortodromia
    modello.calcolaPrimo = () =>{
        SetInput1();
        RisolviPrimoProb();
        modello.set("Risultati Primo Problema","Risultati del Primo Problema");
        modello.set("RisultatiPrimo",output);
        problemaCalcolato = "primo problema";
    }

    modello.calcolaSecondo = () =>{
        SetInput2();
        RisolviSecondoProb();
        modello.set("Risultati Secondo Problema","Risultati del Secondo Problema");
        modello.set("RisultatiSecondo",output);
        problemaCalcolato = "secondo problema";
    }

    //___________________________________________________________
    /**
     * In questa sezione metto le funzioni per il confronto con la lossodromia
     */

    modello.confrontaPrimo = () =>{
        RisolviConfrontoPrimo();
        modello.set("Risultati Confronto Primo","Risultati Confronto Lossodromia");
        modello.set("RisultatiConfrontoPrimo",outputConfronto);
    }

    modello.confrontaSecondo = () =>{
        RisolviConfrontoSecondo();
        modello.set("Risultati Confronto Secondo","Risultati Confronto Lossodromia");
        modello.set("RisultatiConfrontoSecondo",outputConfronto);
    }
    //___________________________________________________________

    //______________________________________________________________________________________________
    //Di seguito dichiaro la funzione del modello per la navigazione mista
    modello.calcolaNaMista = () =>{
        SetInputParalleloLimite();
        RisolviNavMista(problemaCalcolato);
        modello.set("Risultati Navigazione Mista","Risultati della Navigazione Mista");
        modello.set("RisultatiNavMista",outputNavMista);
    }

    return modello;
 }//end function Modello
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
