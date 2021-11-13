/**
 Richiamo il file FunctionMath
 */
const { CssAnimationParser } = require('@nativescript/core');
var FunctionMath = require('~/view/FunctionMath');
var Punto_AND_Differenze = require('~/view/Punto&Differenze');
const { SetOutputPrimo } = require('./OggettoOrtodromia');



/**
 * :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 Dichiaro tutte le funzioni utili alla risoluzione della lossodromia

 -CalcolaLatitudineGeocentrica()
 -CalcolaLatitudineVera()
 -CalcolaLatitudineCrescente()
 -CalcolaDeltaPsiPrimoProblema()
 -CalcolaDeltaLambdaPrimoProblema()
 -RottaVera()
 -CamminoLossodromico()
 -RiconosciSecondoProblema()
 -RiconosciPrimoProblema()
 -NavigazioneParalleloPrimoProblema()
 -NavigazioneMeridianoPrimoProblema()
 -RisolviPrimoProblema()
 -NavigazioneMeridianoSecondoProblema()
 -NavigazioneParalleloSecondoProblema()
 -RisolviSecondoProblema()
 

 :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 */



 function CalcolaLatitudineGeocentrica(vet,eccentricita){
     /**
      * Funzione che calcola la latitudine geocentrice di un punto
      * 
      * Input:
      * -vet: vettore latitudine del punto di due componenti
      *       1-valore di latitudine in gradi decimali
      *       2-lettera
      * 
      * -eccentricita: valore di eccentricità del modello usato
      * 
      * Output:
      * -ris: vettore latitudine geocentrica in gradi decimali di due componenti
      *       1-valore latitudine geocentrica
      *       2-lettera
      */

      let ris=[];
      
      ris[0] = Math.atan( (1 - Math.pow(eccentricita,2)) * Math.tan(FunctionMath.Deg2Rad(vet[0])) );
      ris[0] = FunctionMath.Rad2Deg(ris[0]);

      ris[1] = vet[1];

      return ris;

 }//end function CalcolaLatitudineGeocentrica(...)
 exports.CalcolaLatitudineGeocentrica=CalcolaLatitudineGeocentrica;



 function CalcolaLatitudineVera(vetA,eccentricita){
     /**
      * Funzione che determina la latitudine geografica (vera) a partire dalla latitudine geocentrica
      * 
      * Input:
      * -vetA: vettore di latitudine geocentrica di due componenti
      *        1-valore latitudine geocentrica
      *        2-lettera
      * 
      * -eccentricita: valore eccentricità modello terrestre
      * 
      * Output:
      * -ris: vettore latitudine di due componenti
      *       1-valore latitudine geografica
      *       2-lettera
      */

      let ris=[];

      ris[0] = Math.tan( FunctionMath.Deg2Rad( vetA[0]) ) / (1-Math.pow(eccentricita,2));
      ris[0] = FunctionMath.Rad2Deg( Math.atan(ris[0]) );
      ris[1] = vetA[1];

      return ris;
 }//end function CalcolaLatitudineVera(...)
 exports.CalcolaLatitudineVera=CalcolaLatitudineVera;



 function CalcolaLatitudineCrescente(vet){
     /**
      * Funzione che calcola la latitudine crescente di un punto. Per default si usa la relazione sferica tenendo bene in mente 
      * che si passa la latitudine geocentrica, che per sfera è uguale alla latitudine geografica
      * 
      * Input:
      * -vet: vettore di latitudine del punto di due componenti
      *       1-valore di latitudine in gradi decimali
      *       2-lettera
      * 
      * Output:
      * -ris: vettore di latitudine crescente di due componenti
      *       1-valore in primi sessadecimali della latitudine crescente
      *       2-lettera
      */

      let ris=[];

      switch (vet[0]){
          case 90:
              ris[0] = (10800/Math.PI) * Math.log( Math.tan( FunctionMath.Deg2Rad(45 + (89.99999)/2)) );
              break;

            default:
                ris[0] = (10800/Math.PI) * Math.log( Math.tan( FunctionMath.Deg2Rad(45+(vet[0]/2)) ) );
                break;
      }

      ris[1] = vet[1];

      return ris;
 }//end function CalcolaLatitudineCrescente(...)
 exports.CalcolaLatitudineCrescente=CalcolaLatitudineCrescente;



 function CalcolaDeltaPsiPrimoProblema(cammino,rotta){
     /**
      * Funziona che determina la differenza di latitudine geocentrica del primo problema di lossodormia
      * 
      * Input:
      * -cammino: valore cammino espresso in miglia nautiche
      * 
      * -rotta: valore in gradi decimali della rotta vera
      * 
      * Output:
      * -ris: vettore della differenza di latitudine geocentrica di due componenti
      *       1-valore differenza
      *       2-lettera
      */

      var ris=[];

      ris[0] = (cammino/60) * Math.cos( FunctionMath.Deg2Rad(rotta) );
      ris[0] = Math.abs(ris[0]);

      if ( (rotta>90) && (rotta<270) ){
          ris[1] = "S";
      }else if ( ((rotta>0)&&(rotta<90)) || ((rotta>270)&&(rotta<360)) ){
          ris[1] = "N";
      }else{
          alert("Errore valutazione lettera coordinata differenza di latitudine crescente primo problema di lossodromia.");
      }

      return ris;
 }//end functiion CalcolaDeltaPsiPrimoProblema(...)
 exports.CalcolaDeltaPsiPrimoProblema=CalcolaDeltaPsiPrimoProblema;



 function CalcolaDeltaLambdaPrimoProblema(vett,rotta){
     /**
      * Funzione che determina la differenza di longitudine del primo problema di lossodromia
      * 
      * Input:
      * -vett: vettore della differenza di latitudine crescente di due componenti
      *        1-valore differenza espressa in primi sessadecimali
      *        2-lettera, questa componente non viene usata nella funzione
      * 
      * -rotta: valore della rotta vera
      * 
      * Output:
      * -ris: vettore della differenza di longitudine di due componenti
      *       1-valore differenza
      *       2-lettera
      */

      var ris=[];

      let rottaQuadrantale=FunctionMath.Circolare2Quadrantale(rotta);

      ris[0] = (vett[0]/60) * Math.tan( FunctionMath.Deg2Rad(rottaQuadrantale[1]) );

      //costrutto condizionale che determina la corretta differenza di longitudine tenedo in considerazione anche la circumnavigazione del globo, anche di più volte
      if ( ris[0]>360 ) {

          let n = Math.floor(ris[0]/360);
          ris[0] = ris[0] - (n*360);

          if (ris[0]>180) {

              ris[0] = 360-ris[0];
              switch (rottaQuadrantale[2]) {
                  case "E":
                      ris[1] = "W"
                      break;

                    case "W":
                        ris[1] = "E";
                        break;
              
                  default:
                      break;
              }

          }else if ( ris[0]<180 ) {

              ris[1] = rottaQuadrantale[2];

          }else{
              alert("Errore valutazione lettera differenza longitudine, primo problema di lossodromia.");
          }

      }else if ( ris[0]>180 && ris[0]<360 ) {

          ris[0] = 360-ris[0];
          switch (rottaQuadrantale[2]) {
              case "E":
                  ris[1] = "W";                  
                  break;

                case "W":
                    ris[1] = "E";
                    break;
          
              default:
                  break;
          }

      }else if ( ris[0]<180 ) {

          ris[1] = rottaQuadrantale[2];

      }else{
          alert("Errore valutazione lettera differenza longitudine, primo problema di lossodromia imp.");
      }
      

      return ris;
 }//end function CalcolaDeltaLambdaPrimoProblema(...)
 exports.CalcolaDeltaLambdaPrimoProblema=CalcolaDeltaLambdaPrimoProblema;



 function RottaVera(vetA,vetB){
     /**
      * Funzione che calcola il valore di rotta del secondo problema di lossodromia
      * 
      * Input:
      * -vetA: vettore della differenza di longitudine di due componenti
      *        1-valore differenza in gradi decimali
      *        2-lettera
      * 
      * -vetB: vettore della differenza di latitudine crescente di due componenti
      *        1-valore differenza in primi sessadecimali
      *        2-lettera
      * 
      * Output:
      * -ris: valore rotta in circolare
      */
     
      var ris;

      if (vetA[1]==="W") {
          vetA[0] *= (-1);
      }

      if (vetB[1]==="S") {
          vetB[0] *= (-1);
      }

      let rottaQuadrantale = [];
      rottaQuadrantale[0] = vetB[1];

      rottaQuadrantale[1] = Math.atan( (vetA[0]*60)/(vetB[0]) );
      rottaQuadrantale[1] = FunctionMath.Rad2Deg( Math.abs(rottaQuadrantale[1]) );

      rottaQuadrantale[2] = vetA[1];

      ris = FunctionMath.Quadrantale2Circolare(rottaQuadrantale);

      if (vetA[0]<0){
          vetA[0] = Math.abs(vetA[0]);
      }

      if (vetB[0]<0){
          vetB[0] = Math.abs(vetB[0]);
      }

      return ris;

 }//end function RottaVera(...)
 exports.RottaVera=RottaVera;



 function Cammino(vettA,rotta){
     /**
      * Funzione che determina il cammino del secondo problema di lossodromia
      * 
      * Input:
      * -vettA: vettore della differenza di latitudine geocentrica di due componenti
      *         1-valore differenza espressa in gradi decimali
      *         2-lettera, non viene usata nella funzione 
      * 
      * -rotta: valore rotta circolare in gradi decimali
      * 
      * Output:
      * -ris: valore cammino espresso in miglia nautiche
      */

      let ris;

      let rottaQuadrantale=FunctionMath.Circolare2Quadrantale(rotta);

      ris = (vettA[0]*60) / Math.cos( FunctionMath.Deg2Rad(rottaQuadrantale[1]) );
      ris = Math.abs(ris);

      return ris;

 }//end function Cammino(...)
 exports.Cammino=Cammino;



 function RiconosciSecondoProblema(vetA,vetB, vetC,vetD){
     /**
      * Funzione in grado di riconoscere la tipologia di problema relativa al secondo problema di lossodromia
      * 
      * Input:
      * -vetA: vettore di latitudine del punto di partenza di due componenti
      *        1-valore latitudine in geadi decimali
      *        2-lettera
      * 
      * -vetB: vettore di longitudine del punto di partenza
      *        1-valore longitudine in gradi decimali
      *        2-lettera
      * 
      * -vetC: vettore latitudine punto di arrivo di due componenti
      *        1-valore latitudine in gradi decimali
      *        2-lettera
      * 
      * -vetD: vettore longitudine punto di arrivo di due componenti
      *        1-valore longitudine in gradi decimali
      *        2-lettera
      * 
      * Output:
      * -ris: stringa che assume diversi valori
      */

      var ris;

      if ( (vetA[0]!==vetC[0]) && (vetB[0]!==vetD[0]) ){

          ris = "navigazione generale";

      }else if ( (vetA[0]===vetC[0]) ){

          switch (vetA[0]){
              case 0:
                  ris = "navigazione parallelo";
                  break;

                default:
                    if ( (vetA[1]===vetC[1]) ){
                        ris = "navigazione parallelo";
                    }else if ( (vetA[1]!==vetC[1]) ){
                        if (vetB[0]===vetD[0]){
                            switch (vetB[0]){
                                case 0:
                                    ris = "navigazione meridiano";
                                    break;

                                case 180:
                                    ris = "navigazione meridiano";
                                    break;

                                default:
                                    if (vetB[1]===vetD[1]){
                                        ris = "navigazione meridiano";
                                    }else{
                                        ris = "navigazione generale";
                                    }
                                    break;
                            }
                        }
                    }
                    break;
          }//end switch

      }else if (vetA[0]!==vetC[0]){

        if (vetB[0]===vetD[0]){
            switch (vetB[0]){
                case 0:
                    ris = "navigazione meridiano";
                    break;

                case 180:
                    ris = "navigazione meridiano";
                    break;

                default:
                    if (vetB[1]===vetD[1]){
                        ris = "navigazione meridiano";
                    }else{
                        ris = "navigazione generale";
                    }
            }
        }

      }else{
          alert("Errore valutazione tipologia di problema, secondo problema di lossodromia.");
      }

      return ris;

 }//end function RiconosciSecondoProblema(...)
 exports.RiconosciSecondoProblema=RiconosciSecondoProblema;



 function RiconosciPrimoProblema(vetA,m,Rv){
     /**
      * Funzione che riconosce la tipologia di lossodromia del primo problema 
      * 
      * Input:
      * -vetA: vettore di latitudine del punto di partenza di due componenti
      *        1-valore latitudine in gradi decimali
      *        2-lettera
      * 
      * -m: valore cammino, espresso in miglia nautiche
      * 
      * -Rv: valore rotta vera espressa in gradi decimali
      * 
      * Output:
      * -ris: stringa rappresentante la tipologia di problema
      */

      var ris;

      switch (Rv){

          case 0:

              switch (vetA[1]){
                  case "N":
                      let colatitudine=Punto_AND_Differenze.Colatitudine(vetA);
                      if (m>(colatitudine*60)){
                          ris = "impossibile";
                      }else if (m<=(colatitudine*60)){
                          ris = "navigazione meridiano";
                      }
                      break;

                    case "S":
                        let maxCammino=(vetA[0]+90)*60;
                        if (m>maxCammino){
                            ris = "impossibile";
                        }else if (m<=maxCammino){
                            ris = "navigazione meridiano";
                        }
                        break;
              }//end switch(vetA[1])

              break;

            case 90:
                ris = "navigazione parallelo";
                break;

            case 180:
                switch (vetA[1]){
                    case "N":
                        let maxCammino=(vetA[0]+90)*60;
                        if (m>maxCammino){
                            ris = "impossibile";
                        }else if (m<=maxCammino){
                            ris = "navigazione meridiano";
                        }
                        break;

                    case "S":
                        let colatitudine=Punto_AND_Differenze.Colatitudine(vetA);
                        if (m>(colatitudine*60)){
                            ris = "impossibile";
                        }else if (m<=(colatitudine*60)){
                            ris = "navigazione meridiano";
                        }
                        break;
                }
                break;

            case 270:
                ris = "navigazione parallelo";
                break;

            case 360:
                switch (vetA[1]){
                    case "N":
                        let colatitudine=Punto_AND_Differenze.Colatitudine(vetA);
                        if (m>(colatitudine*60)){
                            ris = "impossibile";
                        }else if (m<=(colatitudine*60)){
                            ris = "navigazione meridiano";
                        }
                        break;
  
                      case "S":
                          let maxCammino=(vetA[0]+90)*60;
                          if (m>maxCammino){
                              ris = "impossibile";
                          }else if (m<=maxCammino){
                              ris = "navigazione meridiano";
                          }
                          break;
                }//end switch(vetA[1])
                break;

            default:
                ris = "navigazione generale";
                break;
      }//end switch(Rv)

      return ris;

 }//end function RiconosciPrimoProblema(...)
 exports.RiconosciPrimoProblema=RiconosciPrimoProblema;



 function NavigazioneParalleloPrimoProblema(vetA,vetB,m,Rv,eccentricita){
     /**
      * Funzione che calcola la navigazione per parallelo per il primo problema di lossodromia
      * 
      * Input:
      * -vetA: vettore di latitudine di due componenti:
      *        1-valore latitudine in gradi decimali
      *        2-lettera
      * 
      * -vetB: vettore di longitudine del punto di partenza di due componenti
      *        1-valore longitudine in gradi decimali
      *        2-lettera
      * 
      * -m: valore del cammino in miglia nautiche
      * 
      * -Rv: valore rotta vera circolare
      * 
      * -eccentricita: valore eccentricità del modello terrestre
      * 
      * Output:
      * -ris: vettore di longitudine di due componenti:
      *       1-valore differenza in gradi decimali
      *       2-lettera
      */

      var ris=[];
      var diff=[];
      let latGeo = CalcolaLatitudineGeocentrica(vetA,eccentricita);
      diff[0] = (m/60) / Math.cos( FunctionMath.Deg2Rad(latGeo[0]) );

      switch (Rv){
          case 90:
              diff[1] = "E";
              break;

            case 270:
                diff[1] = "W";
                break;

            default:
                alert("Errore valutazione navigazione parallelo primo problema di lossodromia.");
                break;
      }

      ris = Punto_AND_Differenze.CalcolaLongitudineArrivo(vetB,diff);

      return ris;

 }//end function NavigazioneParalleloPrimoProblema(...)
 exports.NavigazioneParalleloPrimoProblema=NavigazioneParalleloPrimoProblema;



 function NavigazioneMeridianoPrimoProblema(vetA,m,Rv,eccentricita){
     /**
      * Funzione che calcola la navigazione per meridiano del primo problema di lossodromia
      * 
      * Input:
      * -vetA: vettore di latitudine di due componenti
      *        1-valore latitudine in gradi decimali
      *        2-lettera
      * 
      * -m: valore del cammino in miglia nautiche
      * 
      * -Rv: valore della rotta circolare
      * 
      * -eccentricita: valore eccentricità del modello terrestre
      * 
      * Output:
      * -ris: vettore latitudine arrivo di due componenti
      *       1-valore latitudine in gradi decimali
      *       2-lettera
      */

      var ris=[];
      var diff=[];
      diff[0] = (m/60);
      switch (Rv){
          case 0:
              diff[1]="N";
              break;
            case 360:
                diff[1]="N";
                break;
            case 180:
                diff[1]="S";
                break;
      }
      let latGeo=CalcolaLatitudineGeocentrica(vetA,eccentricita);
      let latGeoArr=Punto_AND_Differenze.CalcolaLatitudineArrivo(latGeo,diff);

      ris=CalcolaLatitudineVera(latGeoArr,eccentricita);

      return ris;
 }//end function NavigazioneMeridianoPrimoProblema(...)
 exports.NavigazioneMeridianoPrimoProblema=NavigazioneMeridianoPrimoProblema;

 

 function RisolviPrimoProblema(vetA,vetB,m,Rv,eccentricita){
     /**
      * Funzione che risolve il primo problema di lossodromia
      * 
      * Input:
      * -vetA: vettore di latitudine di due componenti
      *        1-valore latitudine
      *        2-lettera
      * 
      * -vetB: vettore di longitudine di due componenti
      *        1-valore longitudine
      *        2-lettera
      * 
      * -m: valore cammino in miglia nautiche
      * 
      * -Rv: valore rotta circolare
      * 
      * -eccentricita: valore eccentricità del modello terrestre
      * 
      * Output:
      * -ris: vettore di varie dimensioni a seconda del problema che si presenta
      *       -ZERO DIMENSIONE: nel caso in cui il problema da risolvere è impossibile, caso navigazione meridiano con superamento del polo
      *       -DUE DIMENSIONE:  1-nel caso di navigazione per meridiano o parallelo, l'elemento sarà l'array della coordinata del punto di arrivo
      *                         2-stringa contenente la tipologia di problema
      *       -SEI DIMENSIONI: nel caso generale e sono:
      *                           1-vettore latitudine punto di arrivo
      *                           2-vettore longitudine punto di arrivo
      *                           3-vettore differenza latitudine crescente
      *                           4-vettore latitudine crescente partenza
      *                           5-vettore latitudine crescente arrivo
      *                           6-stringa contenente la tipologia di problema
      */

      var ris=[];
      let lat=vetA, lon=vetB, cammino=m, rotta=Rv, e=eccentricita;

      let tipologiaProblema=RiconosciPrimoProblema(lat,cammino,rotta);

      switch (tipologiaProblema){

          case "impossibile":
              ris=[];
              break;

            case "navigazione meridiano":
                ris[0]=NavigazioneMeridianoPrimoProblema(lat,cammino,rotta,e);
                ris[1]=tipologiaProblema;
                break;

            case "navigazione parallelo":
                ris[0]=NavigazioneParalleloPrimoProblema(lat,lon,cammino,rotta,e);
                ris[1]=tipologiaProblema;
                break;

            case "navigazione generale":
                let diffLatGeo=CalcolaDeltaPsiPrimoProblema(cammino,rotta);
                let latGeo=CalcolaLatitudineGeocentrica(lat,e);
                let latGeoArr=Punto_AND_Differenze.CalcolaLatitudineArrivo(latGeo,diffLatGeo);
                let latGeoCre=CalcolaLatitudineCrescente(latGeo);
                let latGeoArrCre=CalcolaLatitudineCrescente(latGeoArr);
                let diffLatGeoCre=Punto_AND_Differenze.DeltaPhi(latGeoCre,latGeoArrCre);
                let diffLon=CalcolaDeltaLambdaPrimoProblema(diffLatGeoCre,rotta);
                let lonArr=Punto_AND_Differenze.CalcolaLongitudineArrivo(lon,diffLon);
                let latArr=CalcolaLatitudineVera(latGeoArr,e);

                ris[0]=latArr;
                ris[1]=lonArr;
                ris[2]=diffLatGeoCre;
                ris[3]=latGeoCre;
                ris[4]=latGeoArrCre;
                ris[5]=tipologiaProblema;
                break;

            default:
                alert("Qualcosa non va.");
                break;
      }//end switch

      return ris;
 }//end function RisolviPrimoProblema
 exports.RisolviPrimoProblema=RisolviPrimoProblema;



 function NavigazioneMeridianoSecondoProblema(vetA,vetB,eccentricita){
     /**
      * Funzione che risolve la navigazione su meridiano del secondo problema di lossodromia
      * 
      * Input:
      * -vetA: vettore di latitudine del punto di partenza di due componenti
      *        1-valore latitudine
      *        2-lettera
      * 
      * -vetB: vettore di latitudine del punto di arrivo di due componenti
      *        1-valore latitudine
      *        2-lettera
      * 
      * -eccentricita: valore eccentricità del modello terrestre
      * 
      * Output:
      * -ris: vettore di due compontenti
      *       1-valore del cammino espresso in miglia nautiche
      *       2-valore della rotta in circolare
      */

      var ris=[];

      let latGeo = CalcolaLatitudineGeocentrica(vetA,eccentricita);
      let latGeoArr = CalcolaLatitudineGeocentrica(vetB,eccentricita);
      let diffLatGeo = Punto_AND_Differenze.DeltaPhi(latGeo,latGeoArr);

      ris[0] = diffLatGeo[0]*60;

      switch (diffLatGeo[1]){
          case "N":
              ris[1] = 0;
              break;

            case "S":
                ris[1] = 180;
                break;

            default:
                alert("Errore valutazione rotta, navigazione meridiano secondo problema di lossodromia.");
                break;
      }

      return ris;
 }//end function NavigazioneMeridianoSecondoProblema(...)
 exports.NavigazioneMeridianoSecondoProblema=NavigazioneMeridianoSecondoProblema;



 function NavigazioneParalleloSecondoProblema(vet,vetA,vetB,eccentricita){
     /**
      * FUnzione che risolve la navigazione per parallelo del secondo problema di lossodromia
      * 
      * Input:
      * -vet: vettore di latitudine dei due punti di due componenti
      *       1-valore latitudine
      *       2-lettera
      * 
      * -vetA: vettore di longitudine del punto di partenza di due componenti
      *        1-valore longitudine
      *        2-lettera
      * 
      * -vetB: vettore di longitudine del punto di arrivo di due componenti
      *        1-valore longitudine
      *        2-lettera
      * 
      * -eccentricita: valore eccentricita del modello terrestre
      * 
      * Output:
      * -ris: vettore di due componenti
      *       1-valore cammino espresso in miglia nautiche
      *       2-valore rotta in circolare
      */

      var ris=[];

      let latGeo = CalcolaLatitudineGeocentrica(vet,eccentricita);
      let diffLon = Punto_AND_Differenze.DeltaLambda(vetA,vetB);

      ris[0] = (diffLon[0]*60) * Math.cos( FunctionMath.Deg2Rad(latGeo[0]) );

      switch (diffLon[1]){
          case "E":
              ris[1] = 90;
              break;

            case "W":
                ris[1] = 270;
                break;

            default:
                alert("Errore valutazione rotta, navigazione parallelo secondo problema di lossodromia.");
                break;
      }

      return ris;
 }//end function NavigazioneParalleloSecondoProblema(...)
 exports.NavigazioneParalleloSecondoProblema=NavigazioneParalleloSecondoProblema;



 function RisolviSecondoProblema(vetA,vetB,vetC,vetD,eccentricita){
     /**
      * Funzione che risolve il secondo problema di lossodromia
      * 
      * Input:
      * -vetA: vettore di latitudine del punto di partenza di due componenti
      *        1-valore latitudine
      *        2-lettera
      * 
      * -vetB: vettore di longitudine del punto di partenza di due componenti
      *        1-valore longitudine
      *        2-lettera
      * 
      * -vetC: vettore di latitudine del punto di arrivo di due componenti
      *        1-valore latitudine
      *        2-lettera
      * 
      * -vetD: vettore di longitudine del punto di arrivo di due componenti
      *        1-valore longitudine
      *        2-lettera
      * 
      * -eccentricita: valore eccentricità del modello terrestre
      * 
      * Output:
      * -ris: vettore di varie dimensioni a seconda del problema che si presenta
      *       DUE DIMESIONI: caso di navigazione per meridiano o parallelo e nel dettaglio saranno:
      *                      1-cammino espresso in miglia nautiche
      *                      2-rotta in circolare
      *       CINQUE DIMENSIONI: caso di navigazione generale e ne dettaglio saranno:
      *                          1-cammino espresso in miglia nautiche
      *                          2-rotta in circolare
      *                          3-vettore differenza latitudine crescente
      *                          4-vettore latitudine crescente partenza
      *                          5-vettore latitudine crescente arrivo
      */

      var ris=[];

      let tipologia = RiconosciSecondoProblema(vetA,vetB,vetC,vetD);

      switch (tipologia) {
          case "navigazione meridiano":
              ris = NavigazioneMeridianoSecondoProblema(vetA,vetC,eccentricita);
              break;

            case "navigazione parallelo":
                ris = NavigazioneParalleloSecondoProblema(vetA,vetB,vetD,eccentricita);
                break;

            case "navigazione generale":
                let latGeo = CalcolaLatitudineGeocentrica(vetA,eccentricita);
                let latGeoArr = CalcolaLatitudineGeocentrica(vetC,eccentricita);
                let diffLatGeo = Punto_AND_Differenze.DeltaPhi(latGeo,latGeoArr);
                let latGeoCre = CalcolaLatitudineCrescente(latGeo);
                let latGeoArrCre = CalcolaLatitudineCrescente(latGeoArr);
                let diffLatGeoCre = Punto_AND_Differenze.DeltaPhi(latGeoCre,latGeoArrCre);
                let diffLon = Punto_AND_Differenze.DeltaLambda(vetB,vetD);
                
                let rotta = RottaVera(diffLon,diffLatGeoCre);

                ris[0] = Cammino(diffLatGeo,rotta);
                ris[1] = rotta;
                ris[2] = diffLatGeoCre;
                ris[3] = latGeoCre;
                ris[4] = latGeoArrCre;
                break;

            default:
                alert("Errore risoluzione secondo problema di lossodromia.");
                break;
      }

      return ris;
      
 }//end function RisolviSecondoProblema(...)
 exports.RisolviSecondoProblema=RisolviSecondoProblema;







 //_________________________________________________________________________________________________
 //_________________________________________________________________________________________________
 //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 /**
  * Di seguito  dichiaro le funzioni che gestisco gli output nel confronto con l'ortodromia. Tali
  * funzioni verranno richiamate solo dalla pagina "ortodromia/senzawaypoints"
  */
 //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

 function SetOutputConfrontoPrimo(ris){
     /**
      * Funzione che gestisce gli output del confronto del primo problema
      * 
      * Input:
      * -ris: vettore di varie dimensioni a seconda del problema che si presenta
      *       -ZERO DIMENSIONE: nel caso in cui il problema da risolvere è impossibile, caso navigazione meridiano con superamento del polo
      *       -DUE DIMENSIONE:  1-nel caso di navigazione per meridiano o parallelo, l'elemento sarà l'array della coordinata del punto di arrivo 
      *                         2-stringa contenente la tipologia di problema
      *       -SETTE DIMENSIONI: nel caso generale e sono:
      *                           1-vettore latitudine punto di arrivo
      *                           2-vettore longitudine punto di arrivo
      *                           3-vettore differenza latitudine crescente
      *                           4-vettore latitudine crescente partenza
      *                           5-vettore latitudine crescente arrivo
      *                           6-stringa contenente la tipologia di problema
      *                           7-valore rotta vera in circolare, ATTENZIONE: questo valore viene aggiunto ai risultati in "senzawaypoints.js-->function RisolviConfrontoPrimo()"
      *                             tale aggiunta è giustificata dal fatto di poter avere tra gli output anche il valore della rotta, che differisce da quello della rotta iniziale dell'ortodromia
      * 
      * Output:
      * -out: stringa contenente i risultati da mostrare all'utente
      */
     let out;

     let dimArray = ris.length;
     let latX, lonX;

     switch(dimArray){
         case 0:
             out = `Impossibile effettuare confronto, superamento dei poli geografici`;
             break;

         case 2:
             switch(ris[1]){
                 case "navigazione meridiano":
                     latX = FunctionMath.Gradi2Primi( FunctionMath.CorreggiRoundOff(ris[0][0]) );

                     out = `Punto di Arrivo
Latitudine: ${latX[0]}° ${latX[1].toFixed(2)}' ${ris[0][1]}`;
                     break;

                 case "navigazione parallelo":
                     lonX = FunctionMath.Gradi2Primi( FunctionMath.CorreggiRoundOff(ris[0][0]) );

                     out = `Punto di Arrivo
Longitudine: ${lonX[0]}° ${lonX[1].toFixed(2)}' ${ris[0][1]}`;
                     break;
             }
             break;

         case 7:
             latX = FunctionMath.Gradi2Primi( FunctionMath.CorreggiRoundOff(ris[0][0]) );
             lonX = FunctionMath.Gradi2Primi( FunctionMath.CorreggiRoundOff(ris[1][0]) );

             out = `Punto di Arrivo
Latitudine: ${latX[0]}° ${latX[1].toFixed(2)}' ${ris[0][1]}
Longitudine: ${lonX[0]}° ${lonX[1].toFixed(2)}' ${ris[1][1]}

Rotta Vera: ${FunctionMath.CorreggiRoundOffRotte(ris[6]).toFixed(2)}°`;
             break;
     }

     return out;
 }//end function SetOuputConfrontoPrimo(...)
 exports.SetOutputConfrontoPrimo=SetOutputConfrontoPrimo;



 function SetOutputConfrontoSecondo(ris){
     /**
      * Funzione che gestisce gli output del confronto del secondo problema
      * 
      * Input:
      * -ris: vettore multidimensionale dei risultati
      *       DUE DIMESIONI: caso di navigazione per meridiano o parallelo e nel dettaglio saranno:
      *                      1-cammino espresso in miglia nautiche
      *                      2-rotta in circolare
      *       CINQUE DIMENSIONI: caso di navigazione generale e ne dettaglio saranno:
      *                          1-cammino espresso in miglia nautiche
      *                          2-rotta in circolare
      *                          3-vettore differenza latitudine crescente
      *                          4-vettore latitudine crescente partenza
      *                          5-vettore latitudine crescente arrivo
      * 
      * Output:
      * -out: stringa contenente i risultati da mostrare all'utente
      */
     let out;
     let Rv = FunctionMath.CorreggiRoundOffRotte(ris[1]);

     out = `Cammino: ${ris[0].toFixed(2)}NM
     
Rotta Vera: ${Rv.toFixed(2)}°`;

     return out;
 }//end function SetOuptutConfrontoSecondo(...)
 exports.SetOutputConfrontoSecondo=SetOutputConfrontoSecondo;

 //_________________________________________________________________________________________________
 //_________________________________________________________________________________________________