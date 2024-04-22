$(function(){
    hentAlleBilletter();
});

function hentAlleBilletter() {
    $.get( "/hentBillett", function( billett ) {
        formaterBilletter(billett);
    });
};

function formaterBilletter(billett){
    var ut = "<table class='table table-striped'>" +
        "<tr>" +
        "<th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnummer</th><th>E-postadresse</th>" +
        "</tr>";
    for(let i in billett ){
        ut+="<tr>" +
            "<td>"+billett[i].film+"</td>"+
            "<td>"+billett[i].antall+"</td>"+
            "<td>"+billett[i].fornavn+"</td>"+
            "<td>"+billett[i].etternavn+"</td>"+
            "<td>"+billett[i].telefonnummer+"</td>"+
            "<td>"+billett[i].epost+"</td>"+
            "</tr>";
    }
    $("#alleBilletter").html(ut);
}

function slettBilletter() { //for å oppdatere siden når billetter slettes
    $.get("/slettBilletter", function () {
        window.location.href = 'index.html';
    });
};

function registrerBillett(){

    const innantall = $("#antall").val();
    const fornavn = $("#fornavn").val();
    const etternavn = $("#etternavn").val();
    const inntelefonummer = $("#telefonnummer").val();
    const epost = $("#epost").val();

    const antall = Number(innantall);
    const telefonnummer = Number(inntelefonummer);

    if (isNaN(antall)||antall<1){
        $("#feilantall").html("Skriv inn et tall")
    }

    if (!fornavn){
        $("#feilfornavn").html("Kan ikke være blank, skriv inn fornavn")
    }

    if (!etternavn){
        $("#feiletternavn").html("Kan ikke være blank, skriv inn etternavn")
    }

    if (isNaN(telefonnummer)||telefonnummer<9999999){
        $("#feiltelefonnr").html("Skriv inn et gyldig telefonnummer")
    }

    if (!gyldigEpost(epost)) {
        $("#feilepost").html("Skriv inn en gyldig epost");
    }

    else{
        const billett = {
            film : $("#film").val(),
            antall : $("#antall").val(),
            fornavn : $("#fornavn").val(),
            etternavn : $("#etternavn").val(),
            telefonnummer : $("#telefonnummer").val(),
            epost : $("#epost").val(),
        };
        $.post("/lagreBillett",billett, function (){
            hentAlleBilletter();
        });

        //setter alle feltene til blanke etter man har skrevet inn riktig
        $("#film").val("");
        $("#antall").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefonnummer").val("");
        $("#epost").val("");

        //Må også ta bort feilmeldingene
        $("#feilantall").html("");
        $("#feilfornavn").html("");
        $("#feiletternavn").html("");
        $("#feiltelefonnr").html("");
        $("#feilepost").html("");
    }

}
function gyldigEpost(epost) {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(epost);
}