const utilsModule = require("tns-core-modules/utils/utils");
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

/*
* Dichiaro di seguito la funzione che rimanda alla pagina della privacy dell'università Partehenope di Napoli
* */
function onLink(){
    utilsModule.openUrl("https://www.uniparthenope.it/ateneo/privacy");
}
exports.onLink = onLink;
