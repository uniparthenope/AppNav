var frameModule = require('tns-core-modules/ui/frame');
var observableModule = require('tns-core-modules/data/observable');
const { Menu } = require('nativescript-menu');
const { getViewById, action, Frame } = require('@nativescript/core');
const { fromAstNodes } = require('@nativescript/core/ui/styling/css-selector');

var page;

exports.loaded = function (args){
    page = args.object;

}


exports.onAbout = function(){
    let navigationEntry = {
        moduleName: "view/info/info",
        transition: {
            name: "fade",
            duration: 300
        }
    };
    Frame.topmost().navigate(navigationEntry);
}


exports.onIstruzioniTap = function(){
    let navigationEntry = {
        moduleName: "view/istruzioni/istruzioni",
        transition: {
            name: "fade",
            duration: 300
        }
    };
    Frame.topmost().navigate(navigationEntry);
}


exports.onTeoriaTap = function(){
    let navigationEntry = {
        moduleName: "view/cenniTeoria/cenniTeoria",
        transition: {
            name: "fade",
            duration: 300
        }
    };
    Frame.topmost().navigate(navigationEntry);
}


exports.onLossodromiaTap = function(){
    let navigationEntryLosso = {
        moduleName: "view/lossodromia/lossodromia",
        transition: {
            name: "fade",
            duration: 300
        }
    };
    Frame.topmost().navigate(navigationEntryLosso);
}

exports.onOrtodromiaTap = function(){
    Menu.popup({
        view: page.getViewById("menuOrtodromia"),
        actions: ["Senza Waypoints", "Con Waypoints"]
    })
    .then(action=>{
        switch (action.id){
            case 0:
                let navigationEntryConWay = {
                    moduleName: "view/ortodromia/senzawaypoints/senzawaypoints",
                    transition: {
                        name: "fade",
                        duration: 300
                    }
                };
                Frame.topmost().navigate(navigationEntryConWay);
                break;
            case 1:
                let navigationEntrySenzaWay = {
                    moduleName: "view/ortodromia/conwaypoints/conwaypoints",
                    transition: {
                        name: "fade",
                        duration: 300
                    }
                };
                Frame.topmost().navigate(navigationEntrySenzaWay);
                break;
            default:

                break;
        }
    })
    .catch(console.log);
}



