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
    Perceelsgrenzen = new ol.layer.Vector({
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
    Perceelsgrenzen.setVisible(false);
    map.addLayer(Perceelsgrenzen);




    let postDatapilot = {
        'url': 'https://bogemeentesteenbergen.azurewebsites.net/data/pilotgebied.json'
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
    Pilotgebied = new ol.layer.Vector({
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
    Pilotgebied.setVisible(false);
    map.addLayer(Pilotgebied);










    // grondsoorten wms
    var grondsoortenwms = new ol.source.ImageWMS({
        url: 'http://localhost:8080/geoserver/BOsteenbergen/wms?',
        params: {
            'layers': 'grondsoortenkaart',
        }
    });
    Grondsoorten = new ol.layer.Image({
        source: grondsoortenwms,
        title: 'Grondsoorten',
        type: 'overlay'
    });
    Grondsoorten.setVisible(false);
    map.addLayer(Grondsoorten);



    // https://ahn.arcgisonline.nl/arcgis/rest/services/AHNviewer/AHN3_r/ImageServer/exportImage?f=image&bandIds=&renderingRule=%7B%22rasterFunction%22%3A%22AHN2%20-%20Color%20Ramp%20D%22%7D&bbox=80189.39382829366%2C401486.8487645384%2C83383.45021640643%2C404436.42966370017&imageSR=28992&bboxSR=28992&size=1006%2C929



    // let postAhn = {
    //     'url': 'https://ahn.arcgisonline.nl/arcgis/rest/services/AHNviewer/AHN3_r/ImageServer/exportImage?f=image&bandIds=&renderingRule=%7B%22rasterFunction%22%3A%22AHN2%20-%20Color%20Ramp%20D%22%7D&bbox=' + bboxya + '%2C' + bboxxa + '%2C' + bboxyb + '%2C' + bboxxb + '&imageSR=28992&bboxSR=28992&size=1006%2C929'
    // };
    // console.log(postAhn);


    Hoogtekaart = new ol.layer.Tile({
        opacity: 1.0,
        title: "Hoogtekaart",
        type: "overlay",
        source: new ol.source.TileWMS({
            url: "https://geodata.nationaalgeoregister.nl/ahn2/wms?",
            params: {
                "SERVICE":"WMS",
                "REQUEST":"GetMap",
                "FORMAT":"image/png",
                "WIDTH":"400",
                "HEIGHT":"500",
                "TILED":"256x256",
                "BBOX":"13014,306243,286599,623492",
                "LAYERS": "ahn2_5m",
                "SRS": "EPSG:3857",
                "CRS": "EPSG:28992",
                "VERSION":"1.3.0",
                "STYLES": "",
            }
        })
    });
    Hoogtekaart.setVisible(false);
    map.addLayer(Hoogtekaart);










    var settingsndvi = {
        "url": "https://agrodatacube.wur.nl/api/v2/rest/fields/9411844/ndvi?output_epsg=4326&fromdate=20210101&todate=20220101&page_size=366&page_offset=0",
        "method": "GET",
        "timeout": 0,

        "headers": {
          "Accept": "application/json",
          "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3N1ZWR0byI6Im1lbm5vdmFuZGVyc3BhbmtAZ21haWwuY29tIiwicmVzb3VyY2UiOlsiKiJdLCJpYXQiOjE2MjA4MjkwNjh9.CqAr04BXeDsB5HQpZWYZ9MyIugzLKTs8m-Nfuo-LFSA"
        },
      };
      
      $.ajax(settingsndvi).done(function (data) {
        console.log(data);

        ndvisource.addFeatures(new ol.format.GeoJSON().readFeatures(data, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857'
        }));
      });

      ndvisource = new ol.source.Vector();
      Ndvi = new ol.layer.Vector({
          source: ndvisource,
          title: 'NDVI',
          type: 'overlay'
      });
      Ndvi.setVisible(false);
      map.addLayer(Ndvi);







    // Huidige locatie stip
    markeropeigenlocatie = new ol.source.Vector();
    var eigenlocatielaag = new ol.layer.Vector({
        source: markeropeigenlocatie,
        title: 'Huidige locatie',
        ZIndex: 9999,
        // type: 'overlay'
    });
    map.addLayer(eigenlocatielaag);

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









    //   let grondsoortenurl = {
    //     'url': 'http://localhost:8080/geoserver/BOsteenbergen/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=BOsteenbergen%3Agrondsoortenkaart&outputFormat=application%2Fjson'
    // };

    // //ajax call voor grondsoorten
    // $.ajax({
    //         url: 'php/geoproxycurl.php',
    //         method: 'post',
    //         dataType: 'json',
    //         data: grondsoortenurl
    //     }).done(function (data) {

    //         grondsoortensource.addFeatures(new ol.format.GeoJSON().readFeatures(data, {
    //             dataProjection: 'EPSG:4326',
    //             featureProjection: 'EPSG:3857'
    //         }));
    //     })
    //     .fail(function (message) {
    //         console.log(message)
    //     });


    // //grondsoortenwf
    // grondsoortensource = new ol.source.Vector();
    // var grondsoortenkaart = new ol.layer.Vector({
    //     source: grondsoortensource,
    //     title: 'Grondsoorten',
    //     type: 'overlay',
    //     // style: new ol.style.Style({
    //     //     stroke: new ol.style.Stroke({
    //     //         width: 3,
    //     //         color: 'rgba(299,0,0,1.0)'
    //     //     })
    //     // })
    // });
    // grondsoortenkaart.setVisible(false);
    // map.addLayer(grondsoortenkaart);









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