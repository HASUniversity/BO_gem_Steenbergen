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

    //functie voor de meestgevange vis
    map.on('dblclick', function (evt) {
        console.log(map);
    });
}