function initMap() {

    // Maak de kaart aan
    map = new ol.Map({
        // controls: ol.control.defaults().extend([
        //     new ol.control.FullScreen()
        // ]),
        target: 'map',
        layers: [],
        view: new ol.View({
            center: ol.proj.fromLonLat([4.364829464530436, 51.61527942253821]),
            zoom: 13,
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
        console.log(Xcoord, Ycoord);

        var url = 'https://waarneming.nl/api/v1/locations/geojson/?format=json&point=POINT%28' + Xcoord + '+' + Ycoord + '%29';

        let postData = {
            'url': url
        };

        //ajax call voor gebiedsindeling van waarneming.nl
        $.ajax({
            url: 'php/geoproxycurl.php',
            method: 'post',
            dataType: 'json',
            data: postData
        }).done(function (data){
                $("#gebiedskeuzeintro").hide();
                // $("#datalagen").toggle();
                document.getElementById("gebiedskeuze").innerHTML = "";

                // na nieuwe dubbelklik, oude gebiedsindeling leegmaken
                if (waarneming) {
                    waarneming.clear();
                }

                waarneming.addFeatures(new ol.format.GeoJSON().readFeatures(data, {
                    dataProjection: 'EPSG:4326',
                    featureProjection: 'EPSG:3857'
                }));

                //Voeg gebieds titel toe aan de sidebar
                gebiedskeuze = window.top.innerHTML = '<p><strong>' + data.features[0].properties.title + '</strong></p>';
                $('#gebiedskeuze').append(gebiedskeuze)
        });

        //oproepen perceelsgrenzen binnen grenzen gebiedsindeling waarneming.nl

    });
}