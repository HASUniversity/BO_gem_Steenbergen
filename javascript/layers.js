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

    let postDatabrp = {
        'url': 'https://geodata.nationaalgeoregister.nl/brpgewaspercelen/wfs?service=wfs&version=2.0.0&request=GetFeature&typeName=brpgewaspercelen:brpgewaspercelen&outputFormat=json&srsname=EPSG:4326&bbox=4.2871,51.5953,4.3971,51.6553,EPSG:4326'
    };

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
                color: 'rgba(0,0,0,0.3)'
            })
        })
    });
    map.addLayer(perceelwfs);

    // Vector laag voor gebiedsindeling waarneming.nl
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







    var pogingwmsahn = new ol.layer.Tile({
        title: "Poging wms ahn",
        type: 'overlay',
        source: new ol.source.TileWMS({
            url: "https://geodata.nationaalgeoregister.nl/ahn2/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=ahn2_5m&STYLES=&CRS=EPSG:3857&WIDTH=836&HEIGHT=1486&BBOX=640396.0332203114%2C7012365.015999583%2C648383.7026761123%2C7026563.194003555"
        })
    });
    console.log(pogingwmsahn);
    map.addLayer(pogingwmsahn);
    







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