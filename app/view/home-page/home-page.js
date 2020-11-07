var frames = require("tns-core-modules/ui/frame").Frame;


function onIstruzioniTap() {
    var navigationEntry = {
        moduleName: "view/istruzioni/istruzioni",
        transition: {
            name: "fade"
        }
    };
    frames.topmost().navigate(navigationEntry);
}
exports.onIstruzioniTap = onIstruzioniTap;

function onTeoriaTap() {
    var navigationEntry = {
        moduleName: "view/cenniTeoria/cenniTeoria",
        transition: {
            name: "fade"
        }
    };
    frames.topmost().navigate(navigationEntry);
}
exports.onTeoriaTap = onTeoriaTap;

function onPrimoproblemaTap() {
    var navigationEntry = {
        moduleName: "view/lossodromia/primoProblema/primoProblema",
        transition: {
            name: "fade"
        }
    };
    frames.topmost().navigate(navigationEntry);
}
exports.onPrimoproblemaTap = onPrimoproblemaTap;

function onSecondoproblemaTap() {
    var navigationEntry = {
        moduleName: "view/lossodromia/secondoProblema/secondoProblema",
        transition: {
            name: "fade"
        }
    };
    frames.topmost().navigate(navigationEntry);
}
exports.onSecondoproblemaTap = onSecondoproblemaTap;

function onConwaypointsTap() {
    var navigationEntry = {
        moduleName: "view/ortodromia/conwaypoints/conwaypoints",
        transition: {
            name: "fade"
        }
    };
    frames.topmost().navigate(navigationEntry);
}
exports.onConwaypointsTap = onConwaypointsTap;

function onSenzawaypointsTap() {
    var navigationEntry = {
        moduleName: "view/ortodromia/senzawaypoints/senzawaypoints",
        transition: {
            name: "fade"
        }
    };
    frames.topmost().navigate(navigationEntry);
}
exports.onSenzawaypointsTap = onSenzawaypointsTap;
