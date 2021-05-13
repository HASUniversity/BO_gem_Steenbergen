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

        let url = 'https://waarneming.nl/api/v1/locations/geojson/?format=json&point=POINT%28' + Xcoord + '+' + Ycoord + '%29'

        console.log(url);

        $.ajax({
            type: 'GET',
            data: url,
            dataType: 'json',
            success: function (data) {
                console.log(data);
                // waarneming = new ol.format.GeoJSON().readFeatures(data);
            }
        });

    });
}