var frames = require("tns-core-modules/ui/frame").Frame;


function onIstruzioniTap() {
    var navigationEntry = {
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
    var navigationEntryTeoria = {
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
    var navigationEntryPrimo = {
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
    var navigationEntrySecondo = {
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
    var navigationEntryConway = {
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
    var navigationEntrySenzaway = {
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
    var navigationEntryAbout = {
        moduleName: "view/info/info",
        transition: {
            name: "fade",
            duration: 1230
        }
    };
    frames.topmost().navigate(navigationEntryAbout);
}
exports.onAbout = onAbout;
