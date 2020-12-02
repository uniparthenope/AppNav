const utilsModule = require("tns-core-modules/utils/utils");

/*
* Dichiaro di seguito la funzione che rimanda alla pagina della privacy dell'università Partehenope di Napoli
* */
function onLink(){
    utilsModule.openUrl("https://www.uniparthenope.it/ateneo/privacy");
}
exports.onLink = onLink;
