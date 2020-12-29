const frames = require("tns-core-modules/ui/frame").Frame;
const observableModule = require("tns-core-modules/data/observable");
let appversion = require("nativescript-appversion");


exports.onNavigatingTo = function (args) {
    let page = args.object;
    let viewModel = observableModule.fromObject({});

    appversion.getVersionName().then(function(v) {
        page.getViewById("version").text = "Versione: " + v;
    });

    page.bindingContext = viewModel;
};

function onIstruzioniTap() {
    let navigationEntry = {
        moduleName: "view/istruzioni/istruzioni",
        transition: {
            name: "fade",
            duration: 1000
        }
    };
    frames.topmost().navigate(navigationEntry);
}
exports.onIstruzioniTap = onIstruzioniTap;

function onTeoriaTap() {
    let navigationEntryTeoria = {
        moduleName: "view/cenniTeoria/cenniTeoria",
        transition: {
            name: "fade",
            duration: 1000
        }
    };
    frames.topmost().navigate(navigationEntryTeoria);
}
exports.onTeoriaTap = onTeoriaTap;

function onPrimoproblemaTap() {
    let navigationEntryPrimo = {
        moduleName: "view/lossodromia/primoProblema/primoProblema",
        transition: {
            name: "fade",
            duration: 1000
        }
    };
    frames.topmost().navigate(navigationEntryPrimo);
}
exports.onPrimoproblemaTap = onPrimoproblemaTap;

function onSecondoproblemaTap() {
    let navigationEntrySecondo = {
        moduleName: "view/lossodromia/secondoProblema/secondoProblema",
        transition: {
            name: "fade",
            duration: 1000
        }
    };
    frames.topmost().navigate(navigationEntrySecondo);
}
exports.onSecondoproblemaTap = onSecondoproblemaTap;

function onConwaypointsTap() {
    let navigationEntryConway = {
        moduleName: "view/ortodromia/conwaypoints/conwaypoints",
        transition: {
            name: "fade",
            duration: 1000
        }
    };
    frames.topmost().navigate(navigationEntryConway);
}
exports.onConwaypointsTap = onConwaypointsTap;

function onSenzawaypointsTap() {
    let navigationEntrySenzaway = {
        moduleName: "view/ortodromia/senzawaypoints/senzawaypoints",
        transition: {
            name: "fade",
            duration: 1000
        }
    };
    frames.topmost().navigate(navigationEntrySenzaway);
}
exports.onSenzawaypointsTap = onSenzawaypointsTap;

function onAbout(){
    let navigationEntryAbout = {
        moduleName: "view/info/info",
        transition: {
            name: "fade",
            duration: 1230
        }
    };
    frames.topmost().navigate(navigationEntryAbout);
}
exports.onAbout = onAbout;

