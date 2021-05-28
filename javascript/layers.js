function initLayers() {
    // Functie om alle lagen in de kaart aan te maken

    //Achtergrondlaag satelliet
    var ESRIsatteliet = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            attributions: ['&copy; Esri &mdash; Source: Esri']
        }),
        title: 'satelliet',
        type: 'basemap'
    });
    map.addLayer(ESRIsatteliet);

    //  OpenStreetMap achtergrond
    var OSMlayer = new ol.layer.Tile({
        source: new ol.source.OSM(),
        title: 'osm',
        type: 'basemap',
        attributions: ['Openstreetmap']
    });
    map.addLayer(OSMlayer);







    let postDatabrp = {
        'url': 'https://geodata.nationaalgeoregister.nl/brpgewaspercelen/wfs?service=wfs&version=2.0.0&request=GetFeature&typeName=brpgewaspercelen:brpgewaspercelen&outputFormat=json&srsname=EPSG:4326&bbox=4.29136,51.58539,4.45238,51.65942,EPSG:4326'
    };

    // https://geodata.nationaalgeoregister.nl/brpgewaspercelen/wfs?service=wfs&version=2.0.0&request=GetFeature&typeName=brpgewaspercelen:brpgewaspercelen&outputFormat=json&srsname=EPSG:4326&bbox=4.2871,51.5953,4.3971,51.6553,EPSG:4326

    //https://gmd.has.nl/geoserver/stib/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=stib:gemeenten2019&outputFormat=application%2Fjson

    //ajax call voor brpgewaspercelen
    $.ajax({
            url: 'php/geoproxycurl.php',
            method: 'post',
            dataType: 'json',
            data: postDatabrp
        }).done(function (data) {

            perceelwfssource.addFeatures(new ol.format.GeoJSON().readFeatures(data, {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
            }));
        })
        .fail(function (message) {
            console.log(message)
        });


    //Perceelsgrenzen WFS
    perceelwfssource = new ol.source.Vector();
    var perceelwfs = new ol.layer.Vector({
        source: perceelwfssource,
        title: 'Perceelsgrenzen',
        type: 'overlay',
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                width: 2,
                color: 'rgba(220, 194, 22, 0.5)'
            })
        })
    });
    perceelwfs.setVisible(false);
    map.addLayer(perceelwfs);








    let postDatapilot = {
        'url': 'http://localhost:8080/geoserver/BOsteenbergen/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=BOsteenbergen%3Apilotgebiedtwee&maxFeatures=50&outputFormat=application%2Fjson'
    };

    //ajax call voor pilotgebied
    $.ajax({
            url: 'php/geoproxycurl.php',
            method: 'post',
            dataType: 'json',
            data: postDatapilot
        }).done(function (data) {

            pilotgebiedsource.addFeatures(new ol.format.GeoJSON().readFeatures(data, {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
            }));
        })
        .fail(function (message) {
            console.log(message)
        });


    //Pilotgebiedsgrenzen
    pilotgebiedsource = new ol.source.Vector();
    var pilotgebied = new ol.layer.Vector({
        source: pilotgebiedsource,
        title: 'Pilotgebied',
        type: 'overlay',
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                width: 3,
                color: 'rgba(299,0,0,1.0)'
            })
        })
    });
    pilotgebied.setVisible(false);
    map.addLayer(pilotgebied);












    






    // Vector laag voor gebiedsindeling waarneming.nl
    waarneming = new ol.source.Vector();
    var waarneminglaag = new ol.layer.Vector({
        source: waarneming,
        title: 'Gebiedsindeling',
        ZIndex: 9999,
        // type: 'overlay',
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                width: 4,
                color: '#1f9a5d'
            })
        })

    });
    map.addLayer(waarneminglaag);




    // Huidige locatie stip
    markeropeigenlocatie = new ol.source.Vector();
    var eigenlocatielaag = new ol.layer.Vector({
        source: markeropeigenlocatie,
        title: 'Huidige locatie',
        // type: 'overlay'
    });
    map.addLayer(eigenlocatielaag);





    // var pogingwmsahn = new ol.layer.Tile({
    //     title: "Poging wms ahn",
    //     type: 'overlay',
    //     source: new ol.source.TileWMS({
    //         url: "https://geodata.nationaalgeoregister.nl/ahn2/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=ahn2_5m&STYLES="
    //     })
    // });
    // // console.log(pogingwmsahn);
    // map.addLayer(pogingwmsahn);








    // // WMS
    // var newwms = new ol.layer.Tile({
    //     source: new ol.source.TileWMS(({
    //         url: "https://geodata.nationaalgeoregister.nl/tiles/service/wmts?request=GetCapabilities",
    //         attributions: ' ',
    //         params: {
    //             "LAYERS": "ahn3_05m_dtm",
    //             // "TILED": "true",
    //             "VERSION": "1.0.0"
    //         },
    //     })),
    //     title: "New wms",
    //     type: 'overlay',
    //     opacity: 1.0,
    // });
    // // perceelwms.setVisible(false);
    // map.addLayer(newwms);













    // // WMS
    // var perceelwms = new ol.layer.Tile({
    //     source: new ol.source.TileWMS(({
    //         url: "https://geodata.nationaalgeoregister.nl/brpgewaspercelen/wms?",
    //         attributions: ' ',
    //         params: {
    //             "LAYERS": "brpgewaspercelen",
    //             "TILED": "true",
    //             "VERSION": "1.3.0"
    //         },
    //     })),
    //     title: "Perceelsgrenzen",
    //     type: 'overlay',
    //     opacity: 1.0,
    // });
    // // perceelwms.setVisible(false);
    // map.addLayer(perceelwms);

}