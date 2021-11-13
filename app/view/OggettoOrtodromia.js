/**
 Richiamo dei file utili
 */
const { CssAnimationParser } = require('@nativescript/core');
var FunctionMath = require('~/view/FunctionMath');
var Punto_AND_Differenze = require('~/view/Punto&Differenze');



/**
 * :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 * :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 * 
 * Dichiaro tutte le funzioni utili alla risoluzione dell'ortodromia
 * 
 * Per il primo problema di ortodromia
 * -CalcolaLatitudineArrivo()
 * -DeltaLambdaPrimoProblema()
 * -CalcolaLongitudineArrivo()
 * -NavigazioneMeridianoPrimoProblema()
 * -NavigazioneEquatorePrimoProblema()
 * -RiconosciPrimoProblema()
 * -RisolviPrimoProblema()
 * :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 */



 function CalcolaLatitudineArrivo(lat,m,R){
     /**
      * Funzione che calcola la latitudine di arrivo del primo problema di ortodromia
      * 
      * Input:
      * -lat: vettore di latitudine del punto di partenza di due componenti
      *       1-valore latitudine
      *       2-lettera
      * 
      * -m: valore del cammino espresso in miglia nautiche
      * 
      * -R: valore rotta iniziale in circolare
      * 
      * Output:
      * -ris: vettore di latitudine del punto di arrivo di due componenti
      *       1-valore latitudine
      *       2-lettera
      */

      var ris=[];

      if (lat[1]==="S"){
          lat[0] *=(-1);
      }

      ris[0] = Math.sin( FunctionMath.Deg2Rad(lat[0]) )*Math.cos( FunctionMath.Deg2Rad(m/60) ) + Math.cos( FunctionMath.Deg2Rad(lat[0]) )*Math.sin( FunctionMath.Deg2Rad(m/60) )*Math.cos( FunctionMath.Deg2Rad(R) );
      ris[0] = FunctionMath.Rad2Deg( Math.asin(ris[0]) );

      if (ris[0]>=0){
          ris[1] = "N";
      }else if (ris[0]<0){
          ris[1] = "S";
          ris[0] = Math.abs(ris[0]);
      }else{
          alert("Errore valutazione lettera latitudine arrivo, primo problema di ortodromia.");
      }

      if (lat[0]<0){
          lat[0] = Math.abs(lat[0]);
      }

      return ris;

 }//end function CalcolaLatitudineArrivo(...)
 exports.CalcolaLatitudineArrivo=CalcolaLatitudineArrivo;



 function DeltaLambdaPrimoProblema(lat,latArr,m,R){
     /**
      * Funzione che determina la differenza di longitudine del primo problema di ortodromia
      * 
      * Input:
      * -lat: vettore di latitudine del punto di partenza di due componenti
      *       1-valore latitudine
      *       2-lettera
      * 
      * -latArr: vettore di latitudine del punto di arrivo di due componenti
      *          1-valore latitudine
      *          2-lettera
      * 
      * -m: valore cammino espresso in miglia nautiche
      * 
      * -R: valore rotta iniziale in circolare
      * 
      * Output:
      * -ris: vettore della differenza di longitudine espressa in gradi decimali di DUE componenti
      *       1-valore differenza
      *       2-semipiano, può assumere due valori: "est" oppure "ovest"
      */

      var ris=[];

      if (lat[1]==="S"){
          lat[0]*=(-1);
      }

      if (latArr[1]==="S"){
          latArr[0]*=(-1);
      }

      switch (m){
          case 21600:
              ris[0] = 0;
              break;

            case 10800:
                ris[0] = 180;
                break;

            default:
                let num = Math.cos( FunctionMath.Deg2Rad(m/60) )-Math.sin( FunctionMath.Deg2Rad(lat[0]) )*Math.sin( FunctionMath.Deg2Rad(latArr[0]) );
                let den = Math.cos( FunctionMath.Deg2Rad(lat[0]) )*Math.cos( FunctionMath.Deg2Rad(latArr[0]) );

                ris[0] = FunctionMath.Rad2Deg( Math.acos(num/den) );
                break;
      }

      if ( (R>0 && R<=180) ){
          ris[1]="est"
      }else if ( R>180 && R<=360 ){
          ris[1]="ovest";
      }

      return ris;
 }//end function DeltaLambdaPrimoProb(...)
 exports.DeltaLambdaPrimoProblema=DeltaLambdaPrimoProblema;



 function CalcolaLongitudineArrivo(lon,deltaLambda){
     /**
      * Funzione che determina la longitudine del punto di arrivo del primo problema di ortodromia
      * 
      * Input:
      * -lon: vettore di longitudine del punto di partenza di due componenti
      *       1-valore logitudine
      *       2-lettera
      * 
      * -deltalambda: vettore della differenza di longitudine di due componenti
      *               1-valore differenza longitudine
      *               2-lettera relativa al semipiano di navigazione, può essere "ovest/est", attenzione non è la lettera della differnza di longitudine
      * 
      * Output:
      * -ris: vettore della longitudine di arrivo di due componenti:
      *       1-valore longitudine
      *       2-lettera
      */

      var ris=[];

      switch (lon[1]){
          case "E":
              switch(deltaLambda[1]){
                  case "est": //punto di partenza emisfero est e rotta iniziale tra 1° e 2° quadrante nautico
                      ris[0] = lon[0]+deltaLambda[0];
                      if(ris[0]<180){
                          ris[1]="E";
                      }else if(ris[0]>=180){
                          ris[1]="W";
                          ris[0]=360-ris[0];
                      }
                      break;
                    case "ovest": //punto di partenza emisfero est e rotta iniziale tra 3° e 4° quadrante nautico
                       ris[0] = lon[0] -deltaLambda[0];
                       if(ris[0]>=0){
                           ris[1]="E";
                       }else if(ris[0]<0){
                           ris[1]="W";
                           ris[0]=Math.abs(ris[0]);
                       }
                       break;
                    default:
                        alert("Errore valutazione longitudine arrivo, primo problema di ortodromia.");
                        break;
                }
                break;
            case "W":
                switch(deltaLambda[1]){
                    case "est":
                        ris[0] = (-lon[0])+deltaLambda[0];
                        if(ris[0]>=0){
                            ris[1]="E";
                        }else if(ris<0){
                            ris[1]="W";
                            ris[0]=Math.abs(ris[0]);
                        }
                        break;
                    case "ovest":
                        ris[0] = (-lon[0])-deltaLambda[0];
                        if(ris[0]<0 && Math.abs(ris[0])<180){
                            ris[1]="W";
                            ris[0]=Math.abs(ris[0]);
                        }else if(ris[0]<0 && Math.abs(ris[0])>=180){
                            ris[1]="E";
                            ris[0]=360-Math.abs(ris[0]);
                        }
                        break;
                    default:
                        alert("Errore di valutazione longitudine di arrivo, primo problema di ortodromia.");
                        break;
                }
                break;
            default:
                alert("Errore di valutazione longitudine di arrivo, primo problema di ortodromia.");
                break;

      }//end swith

      return ris;
 }//end function CalcolaLongitudineArrivo(...)
 exports.CalcolaLongitudineArrivo=CalcolaLongitudineArrivo;



 function NavigazioneMeridianoPrimoProblema(lat,lon,m,R){
     /**
      * Funzione che risolve la navigazione per meridiano nel primo problema di ortodromia
      * 
      * Input:
      * -lat: vettore di latitudine del punto di partenza di due componenti
      *       1-valore latitudine
      *       2-lettera
      * 
      * -lon: vettore di longitudine del punto di partenza di due componenti
      *       1-valore longitudine
      *       2-lettera
      * 
      * -m: valore cammino espresso in miglia nautiche
      * 
      * -R: valore rotta iniziale in circolare
      * 
      * Output:
      * -ris: vettore di tre componenti
      *       1-vettore di latitudine del punto di arrivo di due componenti
      *         _valore latitudine
      *         _lettera
      *       2-vettore longitudine del punto di arrivo
      *         _valore longitudine
      *         _lettera
      *       3-valore rotta finale in circolare
      */

      var ris=[[],[]];
      let colat = Punto_AND_Differenze.Colatitudine(lat);
      let differenza;

      if ( R===0 || R===360){

          switch (lat[1]){
              case "N":
                  if ( m>(colat*60) ){//CASO PARTENZA EMISFERO NORD E SUPERAMENTO DEL POLO

                      differenza = m-(colat*60);
                      ris[0][0] = 90 - (differenza/60);
                      if (ris[0][0]>=0){//casi latitudine, arrivo antimeridiano emisfero nord

                          ris[0][1] = "N";
                          switch (lon[1]){
                              case "E":
                                  ris[1][0] = 360 - (lon[0]+180);
                                  ris[1][1] = "W";
                                  break;
                                case "W":
                                    ris[1][0] = (lon[0])+180;
                                    ris[1][1] = "E";
                                    break;
                          }//end switch(lon[1])
                          ris[2] = 180;

                      }else if ( ris[0][0]<0 && Math.abs(ris[0][0])<90 ){//arrivo antimeridiano emisfero sud
                        ris[0][1] = "S";
                        ris[0][0] = Math.abs(ris[0][0]);
                        switch (lon[1]){
                            case "E":
                                ris[1][0] = 360 - (lon[0]+180);
                                ris[1][1] = "W";
                                break;
                              case "W":
                                  ris[1][0] = (lon[0])+180;
                                  ris[1][1] = "E";
                                  break;
                        }//end switch(lon[1])
                        ris[2] = 180;

                      }else if ( ris[0][0]<0 && Math.abs(ris[0][0])>90 && Math.abs(ris[0][0])<180){//caso arrivo meridiano punto di partenza ma emisfero sud
                        ris[0][0] = (90+90) - Math.abs( ris[0][0] );
                        ris[0][1] = "S";
                        ris[1] = lon;
                        ris[2] = 0;

                      }else if ( ris[0][0]<0 && Math.abs(ris[0][0])>=180 ){//caso arrivo meridiano punto di partenza emisfero nord
                        ris[0][0] = ( Math.abs(ris[0][0])-90 ) - 90;
                        ris[0][1] = "N";
                        ris[1] = lon;
                        ris[2] = 0;
                      }

                  }else if ( m<(colat*60) ){//CASO PARTENZA EMISFERO NORD E NON SUPERAMENTO DEL POLO
                      ris[0][0] = lat[0] + (m/60);
                      ris[0][1] = lat[1];
                      ris[1] = lon;
                      ris[2] = R;

                  }//end if caso
                  break;

                case "S":
                    if ( m>((90+lat[0])*60) ){//CASO PARTENZA EMISFERO SUD E SUPERAMENTO DEL POLO NORD

                        differenza = m-((90+lat[0])*60);
                        ris[0][0] = 90-(differenza/60);
                        if (ris[0][0]>=0){//casi latitudine, arrivo antimeridiano emisfero nord

                            ris[0][1] = "N";
                            switch (lon[1]){
                                case "E":
                                    ris[1][0] = 360 - (lon[0]+180);
                                    ris[1][1] = "W";
                                    break;
                                  case "W":
                                      ris[1][0] = (lon[0])+180;
                                      ris[1][1] = "E";
                                      break;
                            }//end switch(lon[1])
                            ris[2] = 180;
  
                        }else if ( ris[0][0]<0 && Math.abs(ris[0][0])<90 ){//arrivo antimeridiano emisfero sud

                          ris[0][1] = "S";
                          ris[0][0] = Math.abs(ris[0][0]);
                          switch (lon[1]){
                              case "E":
                                  ris[1][0] = 360 - (lon[0]+180);
                                  ris[1][1] = "W";
                                  break;
                                case "W":
                                    ris[1][0] = (lon[0])+180;
                                    ris[1][1] = "E";
                                    break;
                          }//end switch(lon[1])
                          ris[2] = 180;
  
                        }else if ( ris[0][0]<0 && Math.abs(ris[0][0])>90 && Math.abs(ris[0][0])<180){//caso arrivo meridiano punto di partenza ma emisfero sud
                            
                            ris[0][0] = 90 - Math.abs( ris[0][0]+90 );
                            ris[0][1] = "S";
                            ris[1] = lon;
                            ris[2] = 0;
  
                        }else if ( ris[0][0]<0 && Math.abs(ris[0][0])>=180 ){//caso arrivo meridiano punto di partenza emisfero nord

                            ris[0][0] = Math.abs(ris[0][0]-90) - 90;
                            ris[0][1] = "N";
                            ris[1] = lon;
                            ris[2] = 0;

                        }

                    }else if ( m<=((90+lat[0])*60) ){//CASO PARTENZA EMISFERO SUD MA NON SUPERO IL POLO NORD

                        ris[0][0] = lat[0] + (m/60);
                        if (ris[0][0]>=0){
                            ris[0][1] = "N";
                        }else{
                            ris[0][1] = "S";
                            ris[0][0] = Math.abs(ris[0][0]);
                        }

                        ris[1] = lon;
                        ris[2] = R;
                    }
                    break;
          }//end switch (lat[1])

      }else if ( R===180 ){//Casistica in cui la rotta iniziale è pari a 180 gradi

          switch (lat[1]){
              case "N":

                  if ( m>(90+lat[0])*60 ){//CASO PARTENZA EMISFERO NORD E SUPERAMENTO POLO SUD

                      differenza = (m - (90+lat[0])*60)/60;
                      if ( differenza<90 ){//arrivo emisfero sud nell'antimeridiano

                          ris[0][0] = 90-differenza;
                          ris[0][1] = "S";
                          switch (lon[1]){
                            case "E":
                                ris[1][0] = 360 - (lon[0]+180);
                                ris[1][1] = "W";
                                break;
                              case "W":
                                  ris[1][0] = (lon[0])+180;
                                  ris[1][1] = "E";
                                  break;
                        }//end switch(lon[1])

                        ris[2] = 0;

                      }else if ( differenza>=90 && differenza<=180 ){//arrivo emisfero nord nell'antimeridiano

                          ris[0][0] = differenza - 90;
                          ris[0][1] = "N";
                          switch (lon[1]){
                            case "E":
                                ris[1][0] = 360 - (lon[0]+180);
                                ris[1][1] = "W";
                                break;
                              case "W":
                                  ris[1][0] = (lon[0])+180;
                                  ris[1][1] = "E";
                                  break;
                        }//end switch(lon[1])

                        ris[2] = 0;

                      }else if ( differenza>180 && differenza<=270 ){//arrivo emisfero nord nel meridiano di partenza

                          ris[0][0] = 270 - differenza;
                          ris[0][1] = "N";
                          ris[1] = lon;
                          ris[2] = R;

                      }else if ( differenza>270 && differenza<=360){//arrivo emisfero sud nel meridiano di partenza
                          ris[0][0] = differenza - 270;
                          ris[0][1] = "S";
                          ris[1] = lon;
                          ris[2] = R;
                      }

                  }else if ( m<=(90+lat[0]*60 ) ){//CASO PARTENZ EMISFERO NORD E NON SUPERAMENTO POLO SUD

                    ris[0][0] = lat[0] - (m/60);
                    if ( ris[0][0]>=0 ){
                        ris[0][1] = "N";
                    }else{
                        ris[0][1] = "S";
                    }
                    ris[1] = lon;
                    ris[2] = R;

                  }//en if

                  break;

                case "S":
                    if ( m>(colat*60) ){//CASO PARTENZA EMISFERO SUD E SUPERAMENTO DEL POLO SUD

                        differenza = (m-(colat*60))/60;
                        if ( differenza<90 ){//arrivo emisfero sud nell'antimeridiano

                            ris[0][0] = 90-differenza;
                            ris[0][1] = "S";
                            switch (lon[1]){
                                case "E":
                                    ris[1][0] = 360-(lon[0]+180);
                                    ris[1][1] = "W";
                                    break;
                                case "W":
                                    ris[1][0] = (-lon[0])+180;
                                    ris[1][1] = "E";
                                    break;
                            }//end switch(lon[1])

                            ris[2] = 0;

                        }else if ( differenza>=90 && differenza<=180 ){//arrivo emisfero nord nell'antimeridiano

                            ris[0][0] = differenza-90;
                            ris[0][1] = "N";
                            switch (lon[1]){
                                case "E":
                                    ris[1][0] = 360-(lon[0]+180);
                                    ris[1][1] = "W";
                                    break;
                                case "W":
                                    ris[1][0] = (-lon[0])+180;
                                    ris[1][1] = "E";
                                    break;
                            }//end switch(lon[1])

                            ris[2] = 0;

                        }else if ( differenza>180 && differenza<=270 ){//arrivo emisfero nord nel meridiano di partenza

                            ris[0][0] = 270 - differenza;
                            ris[0][1] = "N";
                            ris[1] = lon;
                            ris[2] = R;

                        }else if ( differenza>270 && differenza<=360 ){//arrivo emisfero sud nel meridiano di partenza

                            ris[0][0] = differenza - 270;
                            ris[0][1] = "S";
                            ris[1] = lon;
                            ris[2] = R;

                        }

                    }else if ( m<(colat*60) ){//CASO PARTENZA EMISFERO SUD E NON SUPERAMENTO DEL POLO SUD
                        ris[0][0] = lat[0] + (m/60);
                        ris[0][1] = "S";
                        ris[1] = lon;
                        ris[2] = R;
                    }
                    break;
          }//end switch(lat[1])

      }//end if rotta

      return ris;

 }//end function NavigazioneMeridianoPrimoProblema(...)
 exports.NavigazioneMeridianoPrimoProblema=NavigazioneMeridianoPrimoProblema;



 function NavigazioneEquatorePrimoProblema(lat,lon,m,R){
     /**
      * Funzione che risolve la navigazione per equatore nel primo problema di ortodromia
      * 
      * Input:
      * -lat: vettore di latitudine del punto di partenza di due componenti
      *       1-valore latitudine
      *       2-lettera
      * 
      * -lon: vettore di longitudine del punto di partenza di due componenti
      *       1-valore longitudine
      *       2-lettera
      * 
      * -m: valore cammino espresso in miglia nautiche, questo valore deve essere al massimo il cammino per raggiungere il punto di partenza=>un giro del globo
      * 
      * -R: valore rotta iniziale espressa in circolare
      * 
      * Output:
      * -ris: vettore di due componenti
      *       1-vettore di latitudine del punto di arrivo di due componenti
      *         _valore latitudine
      *         _lettera
      *       2-vettore di longitudine del punto di arrivo di due componenti
      *         _valore longitudine
      *         _lettera
      */

      var ris=[[],[]];

      //la latitudine del punto di arrivo coincide con quella del punto di partenza
      ris[0][0] = lat[0];
      ris[0][1] = lat[1];

      //determino la longitudine del punto di arrivo
      let colongitudine=Punto_AND_Differenze.Colongitudine(lon);
      let differenza;

      switch (R){
          case 90:
              switch (lon[1]){
                  case "E":
                      if ( m<=(colongitudine*60) ){//CASO partenza emisfero est con rotta 90 e non superamento antimeridiano di Greenwich
                          differenza=m;
                          ris[1][0] = lon[0]+(differenza760);
                          ris[1][1] = "E";

                      }else if( (m>(colongitudine*60)) && (m<(180+colongitudine)*60) ){//CASO partenza emisfero est con rotta 90, superamento antimeridiano di G. ma non superamento del meridiano di G.
                          differenza=m;
                          ris[1][0] = 360-(lon[0]+(differenza/60));
                          ris[1][1] = "W";

                      }else if ( m>(colongitudine+180)*60 ){//CASO partenza emisfero est con rotta 90, superamento dell'antimeridiano e del meridiano di G.
                          differenza=m-(colongitudine+180)*60;
                          ris[1][0] = 0+differenza/60;
                          ris[1][1] = "E";

                      }
                      break;
                    case "W":
                        if( m<(lon[0]+180)*60 ){//CASO partenza emisfero ovest con rotta 90, non superamento antimeridiano di G.
                            differenza=m;
                            ris[1][0] = (-lon[0])+differenza/60;
                            if(ris[1][0]<0){
                                ris[1][1]="W";
                                ris[1][0]=Math.abs(ris[1][0]);
                            }else{
                                ris[1][1]="E"; //ricorda che la longitudine è già salvata nel calcolo di prima
                            }

                        }else if( m>(lon[0]+180)*60 && m<(lon[0]+360)*60 ){//CASO partenza emisfero ovest co rotta 90 e superamento antimeridiano di G, ma non superamento del meridiano di G
                            differenza=m;
                            ris[1][0] = 360-((-lon[0])+differenza/60);
                            ris[1][1]="W";

                        }
                        break;
                    default:
                        alert("Errore risoluzione navigazione equatoriale, primo problema di ortodromia.");
                        break;
              }//end switch lon[1]
              break;
            case 270:
                switch(lon[1]){
                    case "E":
                        if( m<(lon[0]+180)*60 ){//CASO parteneza emisfero est con rotta 270 e non superamento dell'antimeridiano di G.
                            differenza=m;
                            ris[1][0] = lon[0]-differenza/60;
                            if(ris[1][0]>=0){
                                ris[1][1]="E";
                            }else{
                                ris[1][0]=Math.abs(ris[1][0]);
                                ris[1][1]="W";
                            }

                        }else if( m>(lon[0]+180)*60 && m<(lon[0]+360)*60 ){//CASO partenza emisfero est con rotta 270, superamento antimeridiano di G ma non superamento del meridiano di G.
                            differenza=m;
                            ris[1][0] = 360-Math.abs(lon[0]-differenza/60);
                            ris[1][1]="E";

                        }
                        break;
                    case "W":
                        if( m<(colongitudine*60) ){//CASO partenza emisfero ovest con rotta 270 e non superamento antimeridiano di G.
                            differenza=m;
                            ris[1][0] = Math.abs((-lon[0])-differenza/60);
                            ris[1][1] = "W";

                        }else if( m>=(colongitudine*60) && m<=(colongitudine+180)*60 ){//CASO partenza emisfero ovest con rotta 270, superamento antimeridiano di G. ma non superamento meridiano di G.
                            differenza=m;
                            ris[1][0] = 360-Math.abs((-lon[0])-differenza/60);
                            ris[1][1] = "E";

                        }else if( m>(colongitudine+180)*60 && m<(colongitudine+360)*60 ){//CASO partenza emisfero ovest con rotta 270, superamento antimeridiano di G. e superamento meridiano di G.
                            differenza=m-(colongitudine+180)*60;
                            ris[1][0] = 0-differenza/60;
                            ris[1][1] = "W";

                        }
                        break;
                    default:
                        alert("Errore risoluzione navigazione equatoriale, primo problema ortodromia.");
                        break;
                }//end switch lon[1]
                break;
            default:
                alert("Errore risoluzione navigazione equatoriale, primo problema ortodromia.");
                break;
      }//end switch rotta

      return ris;
 }//end function NavigazioneEquatorePrimoProblema(...)
 exports.NavigazioneEquatorePrimoProblema=NavigazioneEquatorePrimoProblema;



 function RiconosciPrimoProblema(lat,R){
     /**
      * Funzione che riconosce la tipologia di ortodromia del primo problema
      * 
      * Input:
      * -lat: vettore di latitudine del punto di partenza di due componenti
      *       1-valore latitudine
      *       2-lettera
      * 
      * -R: valore della rotta iniziale dell'ortodromia
      * 
      * Output:
      * -ris: stringa con la tipologia di ortodromia
      */
     var ris;

     switch(R){
         case 0:
             ris="navigazione meridiano";
             break;

         case 180:
             ris="navigazione meridiano";
             break;

         case 90:
             if(lat[0]===0){
                 ris="navigazione equatore";
             }else{
                 ris="generale";
             }
             break;

         case 270:
             if(lat[0]===0){
                 ris="navigazione equatore";
             }else{
                 ris="generale";
             }
             break;

         default:
             ris="generale";
             break;

     }

     return ris;
 }//end function RiconosciPrimoProblema(...)
 exports.RiconosciPrimoProblema=RiconosciPrimoProblema;



 function RisolviPrimoProblema(lat,lon,m,R){
     /** 
      * Funzione che risolve il primo problema di ortodromia
      * 
      * Input:
      * -lat: vettore di latitudine del punto di partenza di due componenti
      *       1-valore latitudine
      *       2-lettera
      * 
      * -lon: vettore di longitudine del punto di partenza di due componenti
      *       1-valore longitudine
      *       2-lettera
      * 
      * -m: valore cammino espresso in miglia nautiche
      * 
      * -R: valore rotta iniziale in circolare
      * 
      * Output:
      * -ris: vettore di diverse diensioni a seconda del problema che si presenta
      *       -ZERO DIMENSIONI: caso in cui non è possibile risolvere il problema sottoposto
      *       -TREE DIMENSIONI: caso navigazione equatore
      *                         1-stringa di testo che descrive la tipologia di problema "navigaione equatore"
      *                         2-vettore latitudine arrivo di due componenti
      *                           _valore latitudine
      *                           _lettera
      *                         3-vettore longitudine arrivo di due componenti
      *                           _valore longitudine
      *                           _lettera                        
      *       -QUATTRO DIMENSIONI: caso navigazione per meridiano
      *                            1-stringa di testo che descrive la tipologia di problema "navigazione meridiano"
      *                            2-vettore latitudine arrivo di due componenti
      *                              _valore latitudine
      *                              _lettera
      *                            3-vettore longitudine arrivo di due componenti
      *                              _valore longitudine
      *                              _lettera
      *                            4-valore rotta finale in circolare
      *       -PIU' DIMENSIONI: caso generale
      *                         1-stringa dii testo che descrive la tipologia di problema "generale"
      *                         2-vettore latitudine arrivo di due componenti
      *                           -valore latitudine
      *                           -lettera
      *                         3-vettore longitudine arrivo di due componenti
      *                           -valore longitudine
      *                           -lettera
      *                         4-valore rotta finale
      *                         5-vettore latitudine primo vertice di due componenti
      *                           -valore latitudine
      *                           -lettera
      *                         6-vettore longitudine primo vertice di due componenti  
      *                           -valore longitudine
      *                           -lettera
      *                         7-vettore latitudine secondo vertice di due componenti
      *                           -valore latitudine
      *                           -lettera
      *                         8-vettore longitudine secondo vertice di due componenti
      *                           -valore longitudine
      *                           -lettera
      *                         9-vettore longitudine primo nodo di due componenti
      *                           -valore longitudine
      *                            -lettera
      *                         10-vettore longitudine secondo nodo di due componenti
      *                           -valore longitudine
      *                           -lettera
      *                         11-array multidimensionale, tale array verrà usato per i controlli e risoluzione della navigazione mista
      *                            _stringa contenente "primo problema"
      *                            _vettore di differenza di longitudine di tre dimensioni
      *                             -valore differenza
      *                             -lettera
      *                             -lettera a monte di correzioni (NON VIENE USATA)
      *                            _valore rotta iniziale espressa in circolare
      *                        
     */

     var ris=[];

     let tipologia=RiconosciPrimoProblema(lat,R);

     switch(tipologia){
         case "navigazione equatore":
             let arrivoEquatore = NavigazioneEquatorePrimoProblema(lat,lon,m,R);
             ris[0] = tipologia;
             ris[1] = arrivoEquatore[0];
             ris[2] = arrivoEquatore[1];
             break;

         case "navigazione meridiano":
             let arrivoMeridiano = NavigazioneMeridianoPrimoProblema(lat,lon,m,R);
             ris[0] = tipologia;
             ris[1] = arrivoMeridiano[0];
             ris[2] = arrivoMeridiano[1];
             ris[3] = arrivoMeridiano[2];
             break;

         case "generale":
             let latArr = CalcolaLatitudineArrivo(lat,m,R);
             let deltaLambda = DeltaLambdaPrimoProblema(lat,latArr,m,R);
             let lonArr = CalcolaLongitudineArrivo(lon,deltaLambda);
             deltaLambda = Punto_AND_Differenze.DeltaLambda(lon,lonArr);
             let vertici = CalcolaVertici(lat,lon,latArr,lonArr,deltaLambda,R);
             let latVertice1=vertici[0], lonVertice1=vertici[1];
             let latVertice2=vertici[2], lonVertice2=vertici[3];
             let nodi = CalcolaNodi(lonVertice1);
             let Rf = CalcolaRottaFinale(lat,latArr,deltaLambda,m,R);

             ris[0] = tipologia;
             ris[1] = latArr;
             ris[2] = lonArr;
             ris[3] = Rf;
             ris[4] = latVertice1;
             ris[5] = lonVertice1;
             ris[6] = latVertice2;
             ris[7] = lonVertice2;
             ris[8] = nodi[0];
             ris[9] = nodi[1];
             ris[10] = "primo problema";
             ris[11] = deltaLambda;
             ris[12] = R;
             break;
     }

     return ris;
 }//end function RisolviPrimoProblema(...)
 exports.RisolviPrimoProblema=RisolviPrimoProblema;



 //_________________________________________________________________________________________________
 //_________________________________________________________________________________________________
 /**
  * Di seguito dichiaro le funzioni utili alla risoluzione del secondo problema di ortodromia,
  * nonché le funzioni per la determinazione dei vertici, nodi e rotta finale che verranno usate
  * nella risoluzione del primo problema di ortodromia
  */
 //_________________________________________________________________________________________________
 //_________________________________________________________________________________________________

 /**
  * ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  * Funzioni:
  * -CalcolaVertici()
  * -CalcolaNodi()
  * -CalcolaRottaFinale()
  * -CalcolaRottaIniziale()
  * -CalcolaCammino()
  * -NavigazioneEquatoreSecondo()
  * -NavigazioneMeridianoSecondo()
  * -NavigazioneMeridiano2AntimeridianoSecondo()
  * -RiconosciSecondoProblema()
  * -RisolviSecondoProblema()
  * ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  */



 function CalcolaVertici(lat,lon,latArr,lonArr,deltaLambda,R){
     /**
      * Funzione che determina le coordinate dei vertici dell'ortodromia
      * 
      * Input:
      * -lat: vettore latitudine punto di partenza di due componenti
      *       1-valore latitudine
      *       2-lettera
      * 
      * -lon: vettore longitudine punto di partenza di due componenti
      *       1-valore longitudine
      *       2-lettera
      * 
      * -latArr: vettore latitudine punto arrivo di due componenti
      *          1-valore latitudine
      *          2-lettera
      * 
      * -lonArr: vettore longitudine punto arrivo di due componenti
      *          1-valore longitudine
      *          2-lettera
      * 
      * -deltaLambda: vettore di differenza di longitudine di tre componenti
      *               1-valore differenza
      *               2-lettera
      *               3-lettera a monte di eventuali correzioni, non viene utilizzata
      * 
      * -R: valore rotta iniziale in circolare
      * 
      * Output:
      * -ris: vettore di quattro componenti
      *       1-vettore latitudine primo verticie di due componenti
      *         _valore latitudine
      *         _lettera
      * 
      *       2-vettore longitudine primo vertice di due componenti
      *         _valore longitudine
      *         _lettera
      * 
      *       3-vettore latitudine secondo vertice di due componenti
      *         _valore latitudine
      *         _lettera
      * 
      *       4-vettore longitudine secondo vertice di due componenti
      *         _valore longitudine
      *         _lettera
      */

     var ris=[];

     let Ri = FunctionMath.Circolare2Quadrantale(R);
     let latVertice=[];
     latVertice[0] = FunctionMath.Rad2Deg( Math.acos( Math.cos(FunctionMath.Deg2Rad(lat[0]))*Math.sin(FunctionMath.Deg2Rad(Ri[1])) ) );

     switch(lat[1]){
         case "N":
             if(R<=90 || (R>=270 && R<=360) ){
                 latVertice[0]*=1;
             }else if( (R>90 && R<=180) || (R>180 && R<270) ){
                 latVertice[0]*=(-1);
             }
             break;

         case "S":
             if( R<=90 || (R>=270 && R<=360) ){
                 latVertice[0]*=(-1);
             }else if( (R>90 && R<=180) || (R>180 && R<270) ){
                 latVertice[0]*=1;
             }
             break;
     }

     //calcolo la differenza di longitudine per il vertice
     let num = Math.sin(FunctionMath.Deg2Rad(lat[0])) * Math.sin(FunctionMath.Deg2Rad(latVertice[0]));
     let den = 1 - Math.cos(FunctionMath.Deg2Rad(lat[0]))*Math.cos(FunctionMath.Deg2Rad(latVertice[0]))*Math.sin(FunctionMath.Deg2Rad(Ri[1]));
     let deltaLambdaVertice=[];
     deltaLambdaVertice[0] = Math.sin(FunctionMath.Deg2Rad(Ri[1])) * (num/den);
     deltaLambdaVertice[0] = FunctionMath.Rad2Deg( Math.acos(deltaLambdaVertice[0]) );
     deltaLambdaVertice[1] = deltaLambda[1];

     //determino la longitudine del vertice
     let lonVertice = Punto_AND_Differenze.CalcolaLongitudineArrivo(lon,deltaLambdaVertice);

     //determino la longitudine del vertice opposto
     let lonVerticeOpp=[];
     switch( lonVertice[1] ){
         case "E":
             lonVerticeOpp[0] = 360-(lonVertice[0]+180);
             lonVerticeOpp[1] = "W";
             break;

         case "W":
             lonVerticeOpp[0] = (-lonVertice[0])+180;
             lonVerticeOpp[1] = "E";
             break;

         default:
             alert("Errore valutazione vertice opposto.");
             break;
     }

     //determino le latitudini dei vertici
     let latVerticeOpp=[];
     switch( lat[1] ){
         case "N":
             if( latVertice[0]<0 ){
                 latVertice[1] = "S";
                 latVertice[0] = Math.abs(latVertice[0]);
                 latVerticeOpp[0] = latVertice[0];
                 latVerticeOpp[1] = "N";
             }else{
                 latVertice[1] = "N";
                 latVerticeOpp[0] = latVertice[0];
                 latVerticeOpp[1] = "S";
             }
             break;

         case "S":
             if( latVertice[0]<0 ){
                 latVertice[1] = "N";
                 latVertice[0] = Math.abs(latVertice[0]);
                 latVerticeOpp[0] = latVertice[0];
                 latVerticeOpp[1] = "S";
             }else{
                 latVertice[1] = "S";
                 latVerticeOpp[0] = latVertice[0];
                 latVerticeOpp[1] = "N";
             }
             break;

         default:
             alert("Errore valutazione latitudini vertici.");
             break;
     }

     ris[0] = latVertice;
     ris[1] = lonVertice;
     ris[2] = latVerticeOpp;
     ris[3] = lonVerticeOpp;

     return ris;
 }//end function CalcolaVertici(...)
 exports.CalcolaVertici=CalcolaVertici;



 function CalcolaNodi(lonVertice){
     /**
      * Funzione che determina i nodi dell'ortodromia
      * 
      * Input:
      * -lonVertice: vettore longitudine del vertice di due componenti
      *              1-valore longitudine
      *              2-lettera
      * 
      * Output:
      * -ris: vettore di due componenti
      *       1-vettore longitudine nodo principale di due componenti
      *         _valore longitudine
      *         _lettera
      * 
      *       2-vettore longitudine nodo secondario di due componenti
      *         _valore longitudine
      *         _lettera
      */
     var ris=[];

     let lonNodoPrincipale=[], lonNodoSecondario=[];
     lonNodoPrincipale[1] = "E";
     lonNodoSecondario[1] = "W";

     switch( lonVertice[1] ){
         case "E":
             if( lonVertice[0]>=90 ){
                 lonNodoPrincipale[0] = lonVertice[0]-90;
                 lonNodoSecondario[0] = lonNodoPrincipale[0]+180;
                 if( lonNodoSecondario[0]>=180 ){
                     lonNodoSecondario[0] = 360-lonNodoSecondario[0];
                 } 

             }else if( lonVertice[0]<90 ){
                 lonNodoPrincipale[0] = lonVertice[0]+90;
                 lonNodoSecondario[0] = lonNodoPrincipale[0]+180;
                 if( lonNodoSecondario[0]>=180 ){
                     lonNodoSecondario[0] = 360-lonNodoSecondario[0];
                 }

             }else{
                 alert("Errore valutazione nodi.");
             }
             break;

         case "W":
             if( lonVertice[0]<=90 ){
                 lonNodoPrincipale[0] = (-lonVertice[0])+90;
                 lonNodoSecondario[0] = lonNodoPrincipale[0]+180;
                 if( lonNodoSecondario[0]>=180 ){
                     lonNodoSecondario[0] = 360-lonNodoSecondario[0];
                 }

             }else if( lonVertice[0]>90 ){
                 lonNodoPrincipale[0] = 360-(lonVertice[0]+90);
                 lonNodoSecondario[0] = lonNodoPrincipale[0]+180;
                 if( lonNodoSecondario[0]>=180 ){
                     lonNodoSecondario[0] = 360-lonNodoSecondario[0];
                 }

             }else{
                 alert("Errore valutazione nodi.");
             }
             break;

         default:
             alert("Errore valutazione nodi.");
             break;
     }

     ris[0] = lonNodoPrincipale;
     ris[1] = lonNodoSecondario;


     return ris;
 }//end function CalcolaNodi(...)
 exports.CalcolaNodi=CalcolaNodi;



 function CalcolaRottaFinale(lat,latArr,deltaLambda,m,R){
     /**
      * Funzione che calcola la rotta finale dell'ortodromia
      * 
      * Input:
      * -lat: vettore di latitudine del punto di partenza di due componenti
      *       1-valore latitudine (deve essere positivo)
      *       2-lettera
      * 
      * -latArr: vettore di latitudine del punto di arrivo di due componenti
      *          1-valore latitudine (deve essere positivo)
      *          2-lettera
      * 
      * -deltaLambda: vettore differenza longitudine di tre componenti
      *               1-valore differenza (deve essere positiva)
      *               2-lettera
      *               2-lettera a monte di correzione, NON VIENE USATA
      * 
      * -m: valore del cammino ortodromico espresso in miglia nautiche, deve essere
      *     normalizzato, al massimo assumere il valore corrispondente a un giro del globo
      * 
      * -R: valore della rotta iniziale in gradi circolari
      * 
      * Output:
      * -ris: valore della rotta finale in circolare
      */
     var ris;

     if( lat[1]==="S" ){
         lat[0]*=(-1);
     }

     if( latArr[1]==="S" ){
         latArr[0]*=(-1);
     }



     switch( m ){
         case 21600:
             ris = R;
             break;

         case 10800:
             ris = R+180;
             if( ris>360 ){
                 ris = ris-360;
             }
             break;

         default:
             let beta, num, den;
             num = Math.cos( FunctionMath.Deg2Rad(90-lat[0])) - (Math.cos( FunctionMath.Deg2Rad(m/60) )*Math.cos( FunctionMath.Deg2Rad(90-latArr[0]) ) );
             den = Math.sin( FunctionMath.Deg2Rad(m/60) ) * Math.sin( FunctionMath.Deg2Rad(90-latArr[0]) );

             beta = FunctionMath.Rad2Deg( Math.acos(num/den) );

             switch( deltaLambda[1] ){
                 case "E":
                     ris = 180-beta;
                     break;
                 case "W":
                     ris = 180+beta;
                     break;
                 default:
                     alert("Errore determinazione rotta finale.");
                     break;
             }

             break;

     }//end switch(m)

     if( lat[0]<0 ){
         lat[0] = Math.abs(lat[0]);
     }

     if( latArr[0]<0 ){
         latArr[0] = Math.abs(latArr[0]);
     } 

     return ris;
 }//end function CalcoloRottaFinale(...)
 exports.CalcolaRottaFinale=CalcolaRottaFinale;



 function CalcolaRottaIniziale(lat,latArr,deltaLambda,m){
     /**
      * Funzione che determina la rotta inziale ortodromica
      * 
      * Input:
      * -lat: vettore di latitudine del punto di partenza di due componenti
      *       1-valore latitudine
      *       2-lettera
      * 
      * -latArr: vettore di latitudine del punto di arrivo di due componenti
      *          1-valore latitudine
      *          2-lettera
      * 
      * -deltaLambda: vettore di differenza di longitudine di tre componenti
      *               1-valore differenza
      *               2-lettera differenza
      *               3-lettera a monte di correzioni; NON viene usata
      * 
      * -m: valore del cammino ortodromico espresso in miglia nautiche
      * 
      * Output:
      * -ris: valore della rotta iniziale espressa in circolare
      */

     var ris;

     if( latArr[1]!==lat[1] ){
         latArr[0]*=(-1);
     }

     if( deltaLambda[1]==="W" ){
         deltaLambda[0]*=(-1);
     }

     let num = Math.sin( FunctionMath.Deg2Rad(latArr[0]) ) - Math.cos( FunctionMath.Deg2Rad(m/60) )*Math.sin( FunctionMath.Deg2Rad(lat[0]) );
     let den = Math.sin( FunctionMath.Deg2Rad(m/60) )*Math.cos( FunctionMath.Deg2Rad(lat[0]) );

     ris = FunctionMath.Rad2Deg( Math.acos(num/den) );

     switch( lat[1] ){
         case "N":
             switch( deltaLambda[1] ){
                 case "E":
                     ris*=1;
                     break;

                 case "W":
                     ris = 360-ris;
                     break;
             }
             break;

         case "S":
             switch( deltaLambda[1] ){
                 case "E":
                     ris = 180-ris;
                     break;

                 case "W":
                     ris = 180+ris;
                     break;
             }
             break;
     }//end switch(lat[1])

     if( latArr[0]<0 ){
         latArr[0]=Math.abs(latArr[0]);
     }

     if(deltaLambda[0]<0){
         deltaLambda[0]=Math.abs(deltaLambda[0]);
     }

     return ris;
 }//end function CalcolaROttaIniziale(...)
 exports.CalcolaRottaIniziale=CalcolaRottaIniziale;



 function CalcolaCammino(lat,latArr,deltaLambda){
     /**
      * Funzione che calcola il cammino ortodromico
      * 
      * Input:
      * -lat: vettore di latitudine del punto di partenza di due componenti
      *       1-valore latitudine
      *       2-lettera
      * 
      * -latArr: vettore di latitudine del punto di arrivo di due componenti
      *          1-valore latitudine
      *          2-lettera
      * 
      * -deltaLambda: vettore di differenza di longitudine di tre componenti
      *               1-valore differenza
      *               2-lettera
      *               3-lettera a monte di correzioni, NON viene usata
      * 
      * Output:
      * -ris: valore cammmino in miglia nautiche
      */

     var ris;

     if(latArr[1]!==lat[1]){
         latArr[0]*=(-1);
     }

     ris = Math.sin( FunctionMath.Deg2Rad(lat[0]) )*Math.sin( FunctionMath.Deg2Rad(latArr[0]) ) + Math.cos( FunctionMath.Deg2Rad(lat[0]) )*Math.cos( FunctionMath.Deg2Rad(latArr[0]) )*Math.cos( FunctionMath.Deg2Rad(deltaLambda[0]) );
     ris = FunctionMath.Rad2Deg( Math.acos(ris) )*60;

     if(latArr[0]<0){
         latArr[0]=Math.abs(latArr[0]);
     }

     return ris;
 }//end function CalcolaCammino(...)
 exports:CalcolaCammino=CalcolaCammino;



 function NavigazioneEquatoreSecondo(lon,lonArr){
     /**
      * Funzione che risolve la navigazione sull'equatore per il secondo problema di ortodromia
      * 
      * Input:
      * -lon: vettore di longitudine del punto di partenza di due componenti
      *       1-valore longitudine
      *       2-lettera
      * 
      * -lonArr: vettore di longitudine del punto di arrivo di due componenti
      *          1-valore longitudine
      *          2-lettera
      * 
      * Output:
      * -ris: vettore di due componenti
      *       1-valore cammino espresso in miglia nautiche
      *       2-valore rotta iniziale espressa in circolare
      */
     var ris=[];

     let deltaLambda = Punto_AND_Differenze.DeltaLambda(lon,lonArr);

     ris[0] = deltaLambda[0]*60;

     switch(deltaLambda[1]){
         case "E":
             ris[1] = 90;
             break;

         case "W":
             ris[1] = 270;
             break;

         default:
             alert("Errore valutazione navigazione equatoriale.");
             break;
     }

     return ris;
 }//end function NavigazioneEquatoreSecondo(...)
 exports.NavigazioneEquatoreSecondo=NavigazioneEquatoreSecondo;



 function NavigazioneMeridianoSecondo(lat,latArr){
     /**
      * Funzione che risolve la navigazione sul meridiano nel secondo problema di ortodromia
      * 
      * Input:
      * -lat: vettore di latitudine del punto di partenza di due componenti
      *       1-valore latitudine
      *       2-lettera
      * 
      * -latArr: vettore di latitudine del punto di arrivo di due componenti
      *          1-valore latitudine
      *          2-lettera
      * 
      * Output:
      * -ris: vettore di due componenti
      *       1-valore del cammino espresso in miglia nautiche
      *       2-valore della rotta iniziale espressa in circolare
      */
     var ris=[];

     let deltaPhi = Punto_AND_Differenze.DeltaPhi(lat,latArr);

     ris[0] = deltaPhi[0]*60;

     switch(deltaPhi[1]){
         case "N":
             ris[1] = 0;
             break;

         case "S":
             ris[1] = 180;
             break;

         default:
             alert("Errore valutazione rotta iniziale, navigazione meridiano con arrivo meridiano.");
             break;
     }

     return ris;
 }//end function NavigazioneMeridianoSecondo()
 exports.NavigazioneMeridianoSecondo=NavigazioneMeridianoSecondo;



 function NavigazioneMeridiano2AntimeridianoSecondo(lat,latArr){
     /**
      * Funzione che risolve il caso particolare di ortodromia in cui si
      * naviga per il meridiano del punto di partenza e si arriva 
      * nell'antimeridiano
      * 
      * Input:
      * -lat: vettore di latitudine del punto di arrivo di due componenti
      *       1-valore latitudine
      *       2-lettera
      * 
      * -latArr: vettore di latitudine del punto di arrivo di due componenti
      *          1-valore latitudine
      *          2-lettera
      * 
      * -lonArr:vettore di longitudine del punto di arrivo
      * 
      * Output:
      * -ris: vettore di tre componenti
      *       1-valore del cammino ortodromico espresso in miglia nautiche
      *       2-valore della rotta iniziale espressa in circolare
      *       3-valore della rotta finale espressa in circolare
      */

     var ris=[];

     let colat = Punto_AND_Differenze.Colatitudine(lat);
     let colatArr = Punto_AND_Differenze.Colatitudine(latArr);

     //calcolo il cammino
     if( lat[1]===latArr[1] ){
         ris[0] = (colat+colatArr)*60;
     }else if( lat[1]!==latArr[1] ){
         if( latArr[0]<=lat[0] ){
             ris[0] = (colat+90+latArr[0])*60;
         }else if( latArr[0]>lat[0] ){
             ris[0] = (lat[0]+90+colatArr)*60;
         }else{
             alert("Errore calcolo cammino navigazione meridiano con arrivo antimeridiano.");
         }
     }else{
         alert("Errore valutazione cammino navigazione meridiano con arrivo antimeridiano.");
     }

     //determino i valori delle rotte
     if( lat[1]===latArr[1] ){
         switch(lat[1]){
             case "N":
                 ris[1] = 0;
                 ris[2] = 180;
                 break;

             case "S":
                 ris[1] = 180;
                 ris[2] = 0;
                 break;

             default:
                 alert("Errore valutazione rotta navigazione meridiano con arrivo antimeridiano.");
                 break;
         }
     }else if( lat[1]!==latArr[1] ){
         if(latArr[0]<=lat[0]){
             switch(lat[1]){
                 case "N":
                     ris[1] = 0;
                     ris[2] = 180;
                     break;

                 case "S":
                     ris[1] = 180;
                     ris[2] = 0;
                     break;
             }
         }else if(latArr[0]>lat[0]){
             switch(lat[1]){
                 case "N":
                     ris[1] = 180;
                     ris[2] = 0;
                     break;

                 case "S":
                     ris[1] = 0;
                     ris[2] = 180;
                     break;
             }
         }else{
             alert("Errore valutazione rotta navigazione meridiano con arrivo antimeridiano.");
         }
     }

     return ris;
 }//end function NavigazioneMeridiano2AntimeridianoSecondo(...)
 exports.NavigazioneMeridiano2AntimeridianoSecondo=NavigazioneMeridiano2AntimeridianoSecondo;



 function RiconosciSecondoProblema(lat,lon,latArr,lonArr){
     /**
      * Funzione che riconosce il secondo problema di ortodromia sottoposto dall'utente
      * 
      * Input:
      * -lat: vettore di latitudine del punto di partenza di due componenti
      *       1-valore latitudine
      *       2-lettera
      * 
      * -lon: vettore di longitudine del punto di partenza di due componenti
      *       1-valore longitudine
      *       2-lettera
      * 
      * -latArr: vettore di latitudine del punto di arrivo di due componenti
      *          1-valore latitudine
      *          2-lettera
      * 
      * -lonArr: vettore di longitudine del punto di arrivo di due componenti
      *          1-valore longitudine
      *          2-lettera
      * 
      * Output:
      * -ris: stringa con la tipologia di problema
      */

     let ris;

     let antimeridiano = Punto_AND_Differenze.CalcolaAntimeridiano(lon);
    

     //creo costrutto condizionale che riconosce la tipologia di problema
     if( (antimeridiano[0]===lonArr[0]) && (antimeridiano[1]===lonArr[1]) ){
         ris = "navigazione Meridiano2Antimeridiano";
     }else if( (lon[0]===lonArr[0]) && (lon[1]===lonArr[1]) ){
         ris = "navigazione meridiano";
     }else if( (lon[0]===0 || lon[0]===180) && (lon[0]===lonArr[0]) ){
         ris = "navigazione meridiano";
     }else if( lat[0]===0 && latArr[0]===0 ){
        ris = "navigazione equatoriale";
    }else{
        ris = "generale";
    }

     return ris;
 }//end function RiconosciSecondoProblema(...)
 exports.RiconosciSecondoProblema=RiconosciSecondoProblema;



 function RisolviSecondoProblema(lat,lon,latArr,lonArr){
     /**
      * Funzione che risolve il secondo problema di ortodromia
      * 
      * Input:
      * -lat: vettore latitudine del punto di partenza di due componenti
      *       1-valore latitudine
      *       -lettera
      * 
      * -lon: vettore longitudine del punto di partenza di de componenti
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
      * Ouptut:
      * -ris: vettore risultati multidimensionale dipendente dal problema presentato
      *       -3 DIMENSIONI, navigazione equatoriale
      *        1-stringa contenente "navigazione equatoriale"
      *        2-valore cammino espresso in miglia nautiche
      *        3-valore contenente la rotta iniziale espressa in circolare
      * 
      *       -3 DIMENSIONI, navigazione meridiano
      *        1-stringa contenente "navigazione meridiano"
      *        2-valore cammino espresso in miglia nautiche
      *        3-valore rotta iniziale espressa in circolare
      * 
      *       -4 DIMENSIONI, navigazione meridiano con arrivo antimeridiano
      *        1-stringa contenente "navigazione Meridiano2Antimeridiano"
      *        2-valore cammino espresso in miglia nautiche
      *        3-valore rotta iniziale espressa in circolare
      *        4-valore rotta finale espressa in circolare
      * 
      *       -PIU' DIMENSIONI, caso generale
      *        1-stringa contenente "generale"
      *        2-valore cammino espresso in miglia nautiche
      *        3-valore rotta iniziale espressa in circolare
      *        4-valore rotta finale espressa in circolare
      *        5-vettore latitudine primo vertice di due componenti
      *          _valore latitudine 
      *          _lettera
      *        6-vettore longitudine primo vertice di due componenti 
      *          _valore longitudine
      *          _lettera
      *        7-vettore latitudine secondo vertice di due componenti
      *          _valore longitudine
      *          _lettera
      *        8-vettore longitudine secondo vertice di due componenti
      *          _valore longitudine
      *          _lettera
      *        9-vettore longitudine nodo principale di due componenti
      *          _valore longitudine
      *          _lettera
      *        10-vettore longitudine nodo secondario di due componenti
      *           _valore longitudine
      *           _lettera
      * 
      *           quelli di seguito dervono solo per la risoluzione della nav mista e in ogni caso memorizzano alcuni calcoli effettuati
      *        11-stringa contenente "secondo problema"
      *        12-vettore differenza di longitudine tra il punto di partenza e di arrivo di tre componenti
      *           -valore differenza
      *           -lettera
      *           -lettera a monte di correzioni (NON VIENE USATA)
      *           _
      */

     let ris=[];

     let tipologia = RiconosciSecondoProblema(lat,lon,latArr,lonArr);
     let sol;

     switch (tipologia){
         case "navigazione equatoriale":
             sol = NavigazioneEquatoreSecondo(lon,lonArr);
             ris[0] = tipologia;
             ris[1] = sol[0];
             ris[2] = sol[1];
             break;

         case "navigazione meridiano":
             sol = NavigazioneMeridianoSecondo(lat,latArr);
             ris[0] = tipologia;
             ris[1] = sol[0];
             ris[2] = sol[1];
             break;

         case "navigazione Meridiano2Antimeridiano":
             sol = NavigazioneMeridiano2AntimeridianoSecondo(lat,latArr);
             ris[0] = tipologia;
             ris[1] = sol[0];
             ris[2] = sol[1];
             ris[3] = sol[2];
             break;

         case "generale":
             //sol = RisolviSecondoProblema(lat,lon,latArr,lonArr);
             let deltaPhi = Punto_AND_Differenze.DeltaPhi(lat,latArr);
             let deltaLambda = Punto_AND_Differenze.DeltaLambda(lon,lonArr);
             let m = CalcolaCammino(lat,latArr,deltaLambda);
             let Ri = CalcolaRottaIniziale(lat,latArr,deltaLambda,m);
             let vertici = CalcolaVertici(lat,lon,latArr,lonArr,deltaLambda,Ri);
             let nodi = CalcolaNodi(vertici[1]);
             let Rf = CalcolaRottaFinale(lat,latArr,deltaLambda,m,Ri);

             ris[0] = tipologia;
             ris[1] = m;
             ris[2] = Ri;
             ris[3] = Rf;
             ris[4] = vertici[0]; //latitudine primo vertice
             ris[5] = vertici[1]; //longitudine primo vertice
             ris[6] = vertici[2]; //latitudine secondo vertice
             ris[7] = vertici[3]; //longitudine secondo vertice
             ris[8] = nodi[0]; //longitudine nodo principale
             ris[9] = nodi[1]; //longitudine nodo secondario
             ris[10] = "secondo problema";
             ris[11] = deltaLambda;
             break;

         default:
             alert("Errore risoluzione secondo problema.");
             break;

     }//end switch(tipologia)

     return ris;
 }//end function  RisolviSecondoProblema(...)
 exports.RisolviSecondoProblema=RisolviSecondoProblema;



 //_________________________________________________________________________________________________
 /**
  * Di seguito dichiaro le funzioni che gestiscono gli output dei problemi di ortodromia
  */
 //_________________________________________________________________________________________________



 function SetOutputPrimo(ris){
    /**
     * Funzione che gestisce gli output del primo problema di ortodromia
     * 
     * Input:
     * -ris: vettore di varie dimensioni dei risultati dei calcoli, IMPORTANTE--> il 1° elemento dell'array è la tipologia di problema
     * 
     * Output:
     * -out: stringa con i risultati di output per l'utente
     */

    var out;

    switch( ris[0] ){
        case "generale":
            let latArr = FunctionMath.Gradi2Primi(ris[1][0]); //vettore con solo gradi e primi di latitudine
            let lonArr = FunctionMath.Gradi2Primi(ris[2][0]); //vettore con solo gradi e primi di longitudine
            let Rf = FunctionMath.CorreggiRoundOffRotte(ris[3]);
            let latVertice1 = FunctionMath.Gradi2Primi(ris[4][0]); //vettore con solo gradi e primi di latitudine
            let lonVertice1 = FunctionMath.Gradi2Primi(ris[5][0]); //vettore con solo gradi e primi di longitudine
            let latVertice2 = FunctionMath.Gradi2Primi(ris[6][0]); //vettore con solo gradi e primi di latitudine
            let lonVertice2 = FunctionMath.Gradi2Primi(ris[7][0]); //vettore con solo gradi e primi di longitudine
            let lonNodoPrincipale = FunctionMath.Gradi2Primi(ris[8][0]); //vettore con solo gradi e primi di longitudine
            let lonNodoSecondario = FunctionMath.Gradi2Primi(ris[9][0]); //vettore con solo gradi e primi di longitudine 

            out = `Punto di arrivo
Latitudine: ${latArr[0]}° ${latArr[1].toFixed(2)}' ${ris[1][1]}
Longitudine: ${lonArr[0]}° ${lonArr[1].toFixed(2)}' ${ris[2][1]}

Rotta Finale: ${Rf.toFixed(2)}°

Primo Vertice
Latitudine: ${latVertice1[0]}° ${latVertice1[1].toFixed(2)}' ${ris[4][1]}
Longitudine: ${lonVertice1[0]}° ${lonVertice1[1].toFixed(2)}' ${ris[5][1]}

Secondo Vertice
Latitudine: ${latVertice2[0]}° ${latVertice2[1].toFixed(2)}' ${ris[6][1]}
Longitudine: ${lonVertice2[0]}° ${lonVertice2[1].toFixed(2)}' ${ris[7][1]}

Nodo Principale
Longitudine: ${lonNodoPrincipale[0]}° ${lonNodoPrincipale[1].toFixed(2)}' ${ris[8][1]}

Nodo Secondario
Longitudine: ${lonNodoSecondario[0]}° ${lonNodoSecondario[1].toFixed(2)}' ${ris[9][1]}`;
           break;

        case "navigazione equatore":
            let lonArr1 = FunctionMath.Gradi2Primi(ris[2][0]);//vettore con solo gradi e primi  di longitudine

            out = `Navigazione equatoriale

Punto di arrivo
Longitudine: ${lonArr1[0]}° ${lonArr1[1].toFixed(2)}' ${ris[2][1]}`;
            break;

        case "navigazione meridiano":
            let latArr2 = FunctionMath.Gradi2Primi(ris[1][0]);//vettore con solo gradi e primi di latitudine
            let lonArr2 = FunctionMath.Gradi2Primi(ris[2][0]); //vettore con solo gradi e primi di longitudine
            let Rf1 = FunctionMath.CorreggiRoundOffRotte(ris[3]);

            out = `Navigazione su meridiano

Punto di arrivo
Latitudine: ${latArr2[0]}° ${latArr2[1].toFixed(2)}' ${ris[1][1]}
Longiudine: ${lonArr2[0]}° ${lonArr2[1].toFixed(2)}' ${ris[2][1]}

Rotta Finale: ${Rf1.toFixed(2)}°`
            break;
    }//end switch(ris[0])

    return out;
}//end function SetOutputPrimo()
exports.SetOutputPrimo=SetOutputPrimo;



function SetOutputSecondo(ris){
    /**
     * Funzione che gestisce gli output del secondo problema di ortodromia
     * 
     * Input:
     * -ris: vettore di varie dimensioni dei risultati dei calcoli, IMPORTANTE--> il 1° elemento dell'array è la tipologia di problema
     * 
     * Output:
     * -out: stringa con i risultati di output per l'utente
     */

    let out;

    let m, Ri, Rf;

    switch( ris[0] ){
        case "generale":
            m = ris[1];
            Ri = FunctionMath.CorreggiRoundOffRotte(ris[2]);
            Rf = FunctionMath.CorreggiRoundOffRotte(ris[3]);
            let latVertice1 = FunctionMath.Gradi2Primi(ris[4][0]); //vettore con solo gradi e primi di latitudine
            let lonVertice1 = FunctionMath.Gradi2Primi(ris[5][0]); //vettore con solo gradi e primi di longitudine
            let latVertice2 = FunctionMath.Gradi2Primi(ris[6][0]); //vettore con solo gradi e primi di latitudine
            let lonVertice2 = FunctionMath.Gradi2Primi(ris[7][0]); //vettore con solo gradi e primi di longitudine
            let lonNodoPrincipale = FunctionMath.Gradi2Primi(ris[8][0]); //vettore con solo gradi e primi di longitudine
            let lonNodoSecondario = FunctionMath.Gradi2Primi(ris[9][0]); //vettore con solo gradi e primi di longitudine 

            out = `Cammino: ${m.toFixed(2)}NM

Rotta Iniziale: ${Ri.toFixed(2)}°

Rotta Finale: ${Rf.toFixed(2)}°

Primo Vertice
Latitudine: ${latVertice1[0]}° ${latVertice1[1].toFixed(2)}' ${ris[4][1]}
Longitudine: ${lonVertice1[0]}° ${lonVertice1[1].toFixed(2)}' ${ris[5][1]}

Secondo Vertice
Latitudine: ${latVertice2[0]}° ${latVertice2[1].toFixed(2)}' ${ris[6][1]}
Longitudine: ${lonVertice2[0]}° ${lonVertice2[1].toFixed(2)}' ${ris[7][1]}

Nodo Principale
Longitudine: ${lonNodoPrincipale[0]}° ${lonNodoPrincipale[1].toFixed(2)}' ${ris[8][1]}

Nodo Secondario
Longitudine: ${lonNodoSecondario[0]}° ${lonNodoSecondario[1].toFixed(2)}' ${ris[9][1]}`;
            break;

        case "navigazione equatoriale":
            m = ris[1];
            Ri = FunctionMath.CorreggiRoundOffRotte(ris[2]);

            out = `Cammino: ${m.toFixed(2)}NM

Rotta Iniziale: ${Ri.toFixed(2)}°`;
            break;

        case "navigazione meridiano":
            m = ris[1];
            Ri = FunctionMath.CorreggiRoundOffRotte(ris[2]);

            out = `Cammino: ${m.toFixed(2)}NM
            
Rotta Iniziale: ${Ri.toFixed(2)}°

I vertici sono i poli geografici`;
            break;

        case "navigazione Meridiano2Antimeridiano":
            m = ris[1];
            Ri = FunctionMath.CorreggiRoundOffRotte(ris[2]);
            Rf = FunctionMath.CorreggiRoundOffRotte(ris[3]);

            out = `Cammino: ${m.toFixed(2)}NM
            
Rotta Iniziale: ${Ri.toFixed(2)}°

Rotta Finale: ${Rf.toFixed(2)}°

I vertici sono i poli geografici`;
            break;
    }

    return out;
}//end function SetOutputSecondo(...)
exports.SetOutputSecondo=SetOutputSecondo;



//__________________________________________________________________________________________________
/**
 * Di seguito dichiaro le funzioni utili alla risoluzione dei waypoints
 */
//__________________________________________________________________________________________________

function WaypointsCammino(numeroWay,lat,lon,latArr,lonArr,risultati){
    /**
     * Funzione che determina le coordinatet dei waypoints con il metodo della
     * ugual differenza in cammino
     * 
     * Input:
     * -numeroWay: valore intero che identifica il numero dei waypoints che vuole l'utente
     * 
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
     * -risultati: multiarray che contiene i risultati della risoluzione dell'ortodromia
     *             per vedere la struttura consultare la function in questo file "RisolviSecondo()"
     * 
     * Output:
     * -ris: array di due componenti
     *       1-vettore delle latitudini di due componenti
     *         _valore latitudine
     *         _lettera
     *       2-vettore delle longitudine di due componenti
     *         _valore longitudine
     *         _lettera
     */
    let ris=[];

    let camminoWay;
    let latWay=[]; lonWay=[];
    let aLat=[], aLon=[]; //sono due variabili d'appoggio

    switch(risultati[0]){
        case "generale":
            camminoWay = risultati[1] / (numeroWay+1);

            //memorizzo il punto di partenza nei vettori dei waypoints
            latWay[0] = lat, lonWay[0] = lon;

            
            for(i=1; i<=numeroWay; i++){

                if(lat[1]==="S"){
                    lat[0]*=(-1);
                }

                //creo variabili d'appoggio
                let alfa, beta, num, den, deltaLambdaX=[];

                alfa = Math.sin( FunctionMath.Deg2Rad(lat[0]) ) * Math.cos( FunctionMath.Deg2Rad(i*(camminoWay/60)) );
                beta = Math.cos( FunctionMath.Deg2Rad(lat[0]) ) * Math.sin( FunctionMath.Deg2Rad(i*(camminoWay/60)) ) * Math.cos( FunctionMath.Deg2Rad(risultati[2]) );

                //calcolo latitudine e lettera del waypoint
                aLat[0] = FunctionMath.Rad2Deg( Math.asin(alfa+beta) );
                alfa=0, beta=0;
                if(aLat[0]<0){
                    aLat[1] = "S";
                    aLat[0] = Math.abs(latWay[i][0]);
                }else{
                    aLat[1] = "N";
                }

                latWay[i] = aLat;
                aLat=[];

                //calcolo differenza di longitudine
                if(latWay[i][1]!==lat[1]){
                    latWay[i][0] *= (-1);
                }

                if(lat[0]<0){
                    lat[0]=Math.abs(lat[0]);
                }

                num = Math.cos( FunctionMath.Deg2Rad(i*(camminoWay/60)) ) - Math.sin( FunctionMath.Deg2Rad(lat[0]) )*Math.sin( FunctionMath.Deg2Rad(latWay[i][0]) );
                den = Math.cos( FunctionMath.Deg2Rad(lat[0]) ) * Math.cos( FunctionMath.Deg2Rad(latWay[i][0]) );
                deltaLambdaX[0] = FunctionMath.Rad2Deg( Math.acos(num/den) );
                deltaLambdaX[1] = risultati[11][1];//la lettera deltaLambdaX è uguale alla lettera deltaLmabda tra partenza e arrivo

                if(latWay[i][0]<0){
                    latWay[i][0]=Math.abs(latWay[i][0]);
                }

                //calcolo longitudine del waypoint
                lonWay[i] = Punto_AND_Differenze.CalcolaLongitudineArrivo(lon,deltaLambdaX);

                deltaLambdaX=[], num=0, den=0;

            }//end for

            if(lat[0]<0){
                lat[0]=Math.abs(lat[0]);
            }

            break;

        case "navigazione Meridiano2Antimeridiano":
            camminoWay = risultati[1] / (numeroWay+1);

            for(i=1; i<=numeroWay; i++){
                let risParziali = NavigazioneMeridianoPrimoProblema(lat,lon,i*camminoWay,risultati[2]);
                latWay[i] = risParziali[0];
                lonWay[i] = risParziali[1];
            }//end for

            break;

        case "navigazione meridiano":
            camminoWay = risultati[1] / (numeroWay+1);

            for(i=1; i<=numeroWay; i++){
                let risParziali1 = NavigazioneMeridianoPrimoProblema(lat,lon,i*camminoWay,risultati[2]);
                latWay[i] = risParziali1[0];
                lonWay[i] = risParziali1[1];
            }//end for

            break;

        case "navigazione equatoriale":
            camminoWay = risultati[1] / (numeroWay+1);

            for(i=1; i<=numeroWay; i++){
                let risParziali2 = NavigazioneEquatorePrimoProblema(lat,lon,i*camminoWay,risultati[2]);
                latWay[i] = risParziali2[0];
                lonWay[i] = risParziali2[1];
            }//end for

            break;
    }//end switch(risultati[0])

    latWay[numeroWay+1] = latArr;
    lonWay[numeroWay+1] = lonArr;

    ris[0] = latWay;
    ris[1] = lonWay;

    return ris;
}//end function WaypointsCammino()
exports.WaypointsCammino=WaypointsCammino;



function WaypointsLongitudine(numeroWay,lat,lon,latArr,lonArr,risultati){
    /**
     * Funzione che calcola le coordinate dei waypoints con il metodo delle
     * ugual differenze in longitudine
     * 
     * Input:
     * -numeroWay: valore intero che identifica il numero dei waypoints che vuole l'utente
     * 
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
     * -risultati: multiarray che contiene i risultati della risoluzione dell'ortodromia
     *             per vedere la struttura consultare la function in questo file "RisolviSecondo()"
     * 
     * 
     * Output:
     * -ris: array contenente le coordinate di due componenti
     *       1-vettore latitudini waypoints di due componenti
     *         _valore latitudine
     *         _lettera
     *       2-vettore longitudini waypoints di due componenti
     *         _valore longitudini
     *         _lettera
     */
    let ris=[];

    let deltaLonWay; //creo la variabile come vettore, in modo tale che il secondo elemento è la lettera del deltaLambda tra partenza e arrivo
    let latWay=[], lonWay=[];
    let aLat=[], aLon=[]; //variabili d'appoggio

    switch(risultati[0]){
        case "generale":
            latWay[0] = lat, lonWay[0] = lon;

            deltaLonWay = risultati[11][0] / (numeroWay+1);

            if(lat[1]==="S"){
                lat[0]*=(-1);
            }

            

            
            for(i=1; i<=numeroWay; i++){

                if(risultati[11][1]==="W"){
                    deltaLonWay*=(-1);
                }
                
                //calcolo la latitudine dei waypoints
                let a = Math.tan( FunctionMath.Deg2Rad(lat[0]) ) * Math.cos( FunctionMath.Deg2Rad(i*deltaLonWay) );
                let b = Math.sin( FunctionMath.Deg2Rad(i*deltaLonWay) ) / ( Math.cos( FunctionMath.Deg2Rad(lat[0]) ) * Math.tan( FunctionMath.Deg2Rad(risultati[2]) ) );
                aLat[0] = FunctionMath.Rad2Deg( Math.atan(a + b) );
                a=0, b=0;

                if(aLat[0]>=0){
                    aLat[1] = "N";
                }else{
                    aLat[1] = "S";
                    aLat[0] = Math.abs(aLat[0]);
                }

                latWay[i] = aLat;
                aLat=[];

                //determino la longitudine dei waypoints
                if(deltaLonWay<0){
                    deltaLonWay=Math.abs(deltaLonWay);
                }

                lonWay[i] = Punto_AND_Differenze.CalcolaLongitudineArrivo( lon, [ i*deltaLonWay,risultati[11][1] ] );

            }//end for

            if(deltaLonWay<0){
                deltaLonWay=Math.abs(deltaLonWay);
            }

            if(lat[0]<0){
                lat[0]=Math.abs(lat[0]);
            }

            latWay[numeroWay+1] = latArr;
            lonWay[numeroWay+1] = lonArr;

            ris[0] = latWay;
            ris[1] = lonWay;

            break;

        case "navigazione equatoriale":

            latWay[0] = lat;
            lonWay[0] = lon;

            deltaLonWay = risultati[11][0] / (numeroWay+1);

            for(i=1; i<=numeroWay; i++){
                lonWay[i] = Punto_AND_Differenze.CalcolaLongitudineArrivo( lon, [ i*deltaLonWay,risultati[11][1] ]);
                latWay[i] = lat;
            }//end for

            lonWay[numeroWay+1] = lonArr;

            ris[0] = latWay;
            ris[1] = lonWay;

            break;

        case "navigazione meridiano":
            alert("Non è possibile determinare i waypoints con questo metodo.");
            break;

        case "navigazione Meridiano2Antimeridiano":
            alert("Non è possibile determinare i waypoints con questo metodo.");
            break;

        default:
            alert("Errore risoluzione dei waypoints.");
            break;
    }//end switch(risultati[0])

    return ris;
}//end function WaypointsLongitudine(...)
exports.WaypointsLongitudine=WaypointsLongitudine;



function SetOutputWaypoints(risWay){
    /**
     * Funzione che setta gli output dei waypoints da mostrare all'utente
     * 
     * Input:
     * -risWay: array contenente i risultati dei calcoli dei waypoints
     * 
     * Output:
     * -output: stringa con gli output da mostrare
     */
    let output;

    
    let lat = FunctionMath.Gradi2Primi( FunctionMath.CorreggiRoundOff(risWay[0][0][0]) );
    let lon = FunctionMath.Gradi2Primi( FunctionMath.CorreggiRoundOff(risWay[1][0][0]) );

    let out = "Punto di Partenza"+"\n"+lat[0]+"°"+" "+lat[1].toFixed(2)+"'"+" "+risWay[0][0][1]+"\n"+lon[0]+"°"+" "+lon[1].toFixed(2)+"'"+" "+risWay[1][0][1]+"\n";

    for(i=1; i<(risWay[0].length -1); i++ ){
        let latWay = FunctionMath.Gradi2Primi( FunctionMath.CorreggiRoundOff(risWay[0][i][0]) );
        let lonWay = FunctionMath.Gradi2Primi( FunctionMath.CorreggiRoundOff(risWay[1][i][0]) );

        out = out + "\n"+i+"° Waypoint\n"+latWay[0]+"° "+latWay[1].toFixed(2)+"' "+risWay[0][i][1]+"\n"+lonWay[0]+"° "+lonWay[1].toFixed(2)+"' "+risWay[1][i][1]+"\n";


    }//end for

    let j=risWay[0].length-1;
    let latArr = FunctionMath.Gradi2Primi( FunctionMath.CorreggiRoundOff(risWay[0][j][0]) );
    let lonArr = FunctionMath.Gradi2Primi( FunctionMath.CorreggiRoundOff(risWay[1][j][0]) );

    out = out+"\nPunto di Arrivo\n"+latArr[0]+"° "+latArr[1].toFixed(2)+"' "+risWay[0][j][1]+"\n"+lonArr[0]+"° "+lonArr[1].toFixed(2)+"' "+risWay[1][j][1];

    output = `\n \n COORDINATE WAYPOINTS

${out}`;

    return output;
}//end function SetOutputWaypoints(...)
exports.SetOutputWaypoints=SetOutputWaypoints;