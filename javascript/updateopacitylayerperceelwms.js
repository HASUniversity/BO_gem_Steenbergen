function updateOpacityPerceelwms() {

    if (perceelwms) {
        perceelwms.clear();
    }

    var slider = $("#gekozentransparantietest").val() / 100;
    console.log(slider);

    var transparantie = slider;

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
        opacity: transparantie,
    });
    map.addLayer(perceelwms);
}