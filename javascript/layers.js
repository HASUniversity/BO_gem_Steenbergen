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

    // var slider = $("#gekozentransparantietest").val() / 100;
    // console.log(slider);

    // var transparantie = slider;

    // //perceelsgrenzen wms
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
    //     opacity: transparantie,
    // });
    // perceelwms.setVisible(false);
    // map.addLayer(perceelwms);



    let postDatabrp = {
        'url': 'https://geodata.nationaalgeoregister.nl/brpgewaspercelen/wfs?service=wfs&version=2.0.0&request=GetFeature&typeName=brpgewaspercelen:brpgewaspercelen&outputFormat=json&srsname=EPSG:4326&bbox=4.2871,51.5953,4.3971,51.6553,EPSG:4326'
    };

    console.log(postDatabrp);

    //ajax call voor brpgewaspercelen
    $.ajax({
        url: 'php/geoproxycurl.php',
        method: 'post',
        dataType: 'json',
        data: postDatabrp
    }).done(function (data) {
        console.log(data);

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
        title: 'Perceelsgrenzenwfs',
        type: 'overlay',
    });
    map.addLayer(perceelwfs);


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