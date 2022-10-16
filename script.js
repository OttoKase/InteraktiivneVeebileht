(function () {
    "use strict";

    //clock

    document.addEventListener("DOMContentLoaded", function () {

        let c = document.getElementById("clock");

        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);

        function updateClock() {

            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            let kellaaeg = "EL";
            if (h > 12) {
                kellaaeg = "PL";
                h = parseInt(h) - 12;
            }
            else if (h == "00" && m == "00" && s == "00") kellaaeg = "öösel";
            else if (h == "00" && m == "00" && s == "00" && kellaaeg == "PL") kellaaeg = "päeval";

            c.innerHTML = h + ":" + m + ":" + s + " " + kellaaeg;

        };

    });

    // forms

    document.getElementById("form").addEventListener("submit", estimateDelivery);

    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";

    function estimateDelivery(event) {
        event.preventDefault();

        let summa = 0;
        let kingitus = document.getElementById("v1").checked;
        let kontaktivaba = document.getElementById("v2").checked;
        let raadio1 = document.getElementById("radio1").checked;
        let raadio2 = document.getElementById("radio2").checked;
        let esinimi = document.getElementById("fname").value;
        let perenimi = document.getElementById("lname").value;

        if (kingitus) summa += 5;
        if (kontaktivaba) summa += 1;

        let linn = document.getElementById("linn");

        if (linn.value === "") {

            alert("Palun valige linn nimekirjast");

            linn.focus();

            return;
        } else if (esinimi == "" || perenimi == "") {
            alert("Palun sisestage oma nimi!");
            return;
        } else if (/\d/.test(esinimi) || /\d/.test(perenimi)) {
            // https://stackoverflow.com/questions/5778020/check-whether-an-input-string-contains-a-number-in-javascript
            alert("Palun ärge kasutage nime sisestamisel numbreid!");
            return;
        } else if (!raadio1 && !raadio2) {
            alert("Palun valige palju soovite jootraha jätta!");
            return;
        } else {

            if (linn.value == "trt") summa += 2.5;
            else if (linn.value == "nrv") summa += 2.5;
            else if (linn.value == "prn") summa += 3;

            let protsent = 0;

            if (raadio1) protsent = summa / 20;
            else if (raadio2) protsent = summa / 10;
            summa += protsent;

            e.innerHTML = summa + " &euro;";

        }

        console.log("Tarne hind on arvutatud");
    }

})();

// map

let mapAPIKey = "Aoy__AZmXGhpLnrOgKzrQCXiTkGYvwCeDdyPJx7Yb9Fc4U1wHSb2jhi19vhueIXY";
let map, infobox1, infobox2;

function GetMap() {

    "use strict";

    let Kallavere = new Microsoft.Maps.Location(
        59.4894878,
        25.0299505
    );

    let Tartu = new Microsoft.Maps.Location(
        58.38104,
        26.71992
    );

    let keskkoht = new Microsoft.Maps.Location(
        58.9352639,
        25.8749353
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: keskkoht,
        zoom: 7,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
    });

    let pushpin1 = new Microsoft.Maps.Pushpin(Kallavere, {
        title: 'Rootsi-Kallavere Küla Muusem',
        text: 'RKK'
    });

    let pushpin2 = new Microsoft.Maps.Pushpin(Tartu, {
        title: 'Tartu Ülikool',
        subTitle: 'Hea koht',
        text: 'UT'
    });

    infobox1 = new Microsoft.Maps.Infobox(Kallavere, {
        visible: false
    });

    infobox2 = new Microsoft.Maps.Infobox(Tartu, {
        visible: false
    });

    pushpin1.metadata = {
        title: 'Rootsi-Kallavere Küla Muuseum',
        description: 'Külalised on alati oodatud!',
        showPointer: false,
    };

    pushpin2.metadata = {
        title: 'Tartu Ülikooli parim õppehoone',
        description: 'Tudengid on alati oodatud!',
        showPointer: false,
    };

    Microsoft.Maps.Events.addHandler(pushpin1, 'click', pushpinClicked1);
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked2);

    map.entities.push(pushpin1);
    map.entities.push(pushpin2);
    infobox1.setMap(map);
    infobox2.setMap(map);
}

function pushpinClicked1(e) {
    if (e.target.metadata) {
        infobox1.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
}

function pushpinClicked2(e) {
    if (e.target.metadata) {
        infobox2.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

