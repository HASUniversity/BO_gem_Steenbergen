function initMap() {

    // Maak de kaart aan
    map = new ol.Map({
        // controls: ol.control.defaults().extend([
        //     new ol.control.FullScreen()
        // ]),
        target: 'map',
        layers: [],
        view: new ol.View({
            center: ol.proj.fromLonLat([4.313891500144687, 51.579039627392966]),
            zoom: 14,
        }),
        interactions: ol.interaction.defaults({
            //doubleclickzoom staat uit om te voorkomen dat mobiele gebruikers inzoomen op de website ipv de kaart
            doubleClickZoom: false
        })
    });

    //Dubbelklikfunctie
    map.on('dblclick', function (evt) {

        //Oproepen gebiedsindeling waarneming.nl
        let coordinate4326 = ol.proj.toLonLat(evt.coordinate); // coordinaten omzetten naar EPSG:4326

        let Xcoord = coordinate4326[0];
        let Ycoord = coordinate4326[1];

        //cookie functie om de geklikte coordinaten te onthouden, wat wordt opgestuurd in de link
        $(document).ready(function () {
            createCookie("xcoord", Xcoord, "1");
            createCookie("ycoord", Ycoord, "1");
        });

        function createCookie(name, value, days) {
            var expires;
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toGMTString();
            } else {
                expires = "";
            }
            document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
        }

        //ajax call voor gebiedsindeling van waarneming.nl
        $.ajax({
            url: 'php/getgeobounds.php',
            type: 'GET',
            dataType: 'json',
            // crossDomain : true,
            // accept: 'application/json',
            context: document.text,
            success: function (data) {

                $("#gebiedskeuzeintro").hide();
                $("#datalagen").show();
                document.getElementById("gebiedskeuze").innerHTML = "";

                if (waarneming) {
                    waarneming.clear();
                }

                console.log(data);

                waarneming.addFeatures(new ol.format.GeoJSON().readFeatures(data, {
                    dataProjection: 'EPSG:4326',
                    featureProjection: 'EPSG:3857'
                }));

                //Voeg gebieds titel toe aan de sidebar
                gebiedskeuze = window.top.innerHTML = '<p><strong>' + data.features[0].properties.title + '</strong></p>';
                $('#gebiedskeuze').append(gebiedskeuze);

            }
        }).fail(function () {
            alert("Er is iets fout gegaan.");
        });

        //oproepen perceelsgrenzen binnen grenzen gebiedsindeling waarneming.nl

    });
}