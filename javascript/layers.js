function initLayers() {
    // Functie om alle lagen in de kaart aan te maken

    //Achtergrondlaag satelliet
    var ESRIsatteliet = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            attributions: ['Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community']
        }),
        title: 'Satteliet',
        type: 'basemap'
    });
    map.addLayer(ESRIsatteliet);

    //  OpenStreetMap achtergrond
    var OSMlayer = new ol.layer.Tile({
        source: new ol.source.OSM(),
        title: 'OpenStreetMap',
        type: 'basemap'
    });
    map.addLayer(OSMlayer);

    //perceelsgrenzen wms
    var perceelwms = new ol.layer.Tile({
        source: new ol.source.TileWMS(({
            url: "https://geodata.nationaalgeoregister.nl/brpgewaspercelen/wms?",
            attributions: ' ',
            params: {
                "LAYERS": "brpgewaspercelen",
                "TILED": "true",
                "VERSION": "1.3.0"
            },
        })),
        title: "Perceelsgrenzen",
        type: 'overlay',
        opacity: 1.0,
    });
    perceelwms.setVisible(false);
    map.addLayer(perceelwms);

    // //Perceelsgrenzen WFS
    // perceelwfsource = new ol.source.Vector();
    // var perceelwfs = new ol.layer.Vector({
    //     source: perceelwfsource,
    //     title: 'Perceelsgrenzen',
    //     type: 'overlay'
    // });

    // map.addLayer(perceelwfs);

    // $.ajax({
    //     url: 'https://geodata.nationaalgeoregister.nl/brpgewaspercelen/wfs?request=GetFeature&typeName=brp:Bouwland&service=wfs',
    //     success: function (data) {
    //     console.log(data);
    //     }
    // }).fail(function () {
    //     console.log("Het is niet gelukt");
    // });
    // perceelwfsource.addFeatures(new ol.format.GeoJSON().readFeatures(data, {
    //     dataProjection: 'EPSG:4326',
    //     featureProjection: 'EPSG:3857'
    // }));

    // Vector laag voor features
    waarneming = new ol.source.Vector();
    var waarneminglaag = new ol.layer.Vector({
        source: waarneming,
        title: 'Gebiedsindeling',
        // type: 'overlay',
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                width: 4,
                color: '#3388ff'
            })
        })

    });
    map.addLayer(waarneminglaag);

}