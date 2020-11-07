var observable = require("tns-core-modules/data/observable");

var tipoList;

exports.onLoaded = function (args) {
    var page = args.object;

    tipoList = page.getViewById("tipoList");


    var lossodromia = new observable.fromObject({
        tipologia: ["Terra sferica", "WGS84"]
    });

    page.bindingContext = lossodromia;
    console.log("PRIMO PROBLEMA");
};

function onTap(fargs){
    var button=fargs.object;

    switch (parseInt(tipoList.selectedIndex)){
        case 0:
            console.log("Hai selezionato terra sferica");
            break;
        case 1:
            console.log(("Hai selezionato terrqa ellissoidica"));
            break;
        default:
            console.log("NEssuno");
            break;
    }
}
exports.onTap=onTap;



