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

    // De kaart laadt met onderstaande functie alleen de data in die binnen de boudingboxes valt
    map.on('moveend', function (evt) {

        // Volledige boundingbox verkrijgen van de kaart
        let bbox = map.getView().calculateExtent(map.getSize());
        console.log(bbox);

        let bbox28992 = ol.proj.transformExtent(bbox, 'EPSG:3857', 'EPSG:28992')
        console.log(bbox28992);

    });


    var geolocation = new ol.Geolocation({
        projection: map.getView().getProjection(),
        tracking: true,
        trackingOptions: {
            enableHighAccuracy: true,
        }
    });

    // Extra openlayers control die ervoor zorgt dat je naar je huidige locatie wordt gezoomd
    //Knop om naar je huidige locatie in te zoomen
    var zoomToCurrentLocation = ol.extent.createEmpty();
    geolocation.on('change:accuracyGeometry', function() {
        geolocation.getAccuracyGeometry().getExtent(zoomToCurrentLocation);
    });

    // Voeg de functie toe aan de knop
    var zoomimage = new Image(20, 20);
    zoomimage.src = 'img/locate.png';

    zoomToExtentControl = new ol.control.ZoomToExtent({
        extent: zoomToCurrentLocation,
        className: 'custom-zoom-extent',
        label: zoomimage
    });
    // Voeg de knop toe aan de kaart
    map.addControl(zoomToExtentControl);


    // listen to changes in position
    geolocation.once('change:position', function (evt) {

        // gooi je eigen locatie leeg als ie een nieuwe locatie heeft gevonden
        markeropeigenlocatie.clear();

        // Cirkel om je eigen punt heen wat de accuraatheid is van het punt. Je locatie kan ergens binnen die locatie zijn.
        var accuracyFeature = new ol.Feature();
        geolocation.on('change:accuracyGeometry', function () {
            accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
        });

        // De locatie waar de kaart denkt dat jij bent. Plaats ie nu een punt bovenop
        let myLocationGeom = new ol.geom.Point(geolocation.getPosition());
        let myLocationFeature = new ol.Feature({
            geometry: myLocationGeom,
        });

        // Stijl voor de punt
        myLocationFeature.setStyle(locatieStijlPunt);
        // Stijl voor de cirkel
        accuracyFeature.setStyle(locatieStijlVlak);

        markeropeigenlocatie.addFeature(myLocationFeature);
        markeropeigenlocatie.addFeature(accuracyFeature);
    });


    //Wanneer er single click op de kaart moet de gebiedsgrenzen ook worden verwijderd.
    map.on('click', function (evt){
        // Verwijder de waarneminglaag
        if (waarneming) {
            waarneming.clear();
        }

        // Verwijder de gebiedstitel
        document.getElementById("gebiedskeuze").innerHTML = "";
        // Laat de intro tekst ook weer zien
        $('#gebiedskeuzeintro').show();
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