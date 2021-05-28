function buildLayerSwitcher() {
    // ophalen van alle lagen uit de map
    var mapLayers = map.getLayers().getArray();
    // voor elke laag uit de map

    $.each(mapLayers, function (i, layer) {

        // als de laag een basemap is
        if (layer.values_.type == 'basemap') {
            // opbouwen Li-item met radiobutton
            let liTekst = '<li><input type="radio" id="' + layer.ol_uid + '" name="' + layer.values_.type + '" value="' + layer.ol_uid + '"';
            //zorg dat de zichtbare is aangevinkt
            if (layer.values_.visible) {
                liTekst += "checked>";
            } else {
                liTekst += ">";
            }
            //zorg ervoor dat je ook op de tekst kan klikken
            liTekst += '<label id="' + layer.values_.title + '" class="layer-thumbnail ' + layer.values_.title + '" for="' + layer.ol_uid + '"></label></li>';
            // voeg de li toe aan de ul
            $('#basemaplayers').append(liTekst);



        } else if (layer.values_.type == "overlay") {
            //als de laag een overlay is
            // opbouwen li item met een checkbox
            let liTekst = '<li class="ui-state-default" id="' + layer.ol_uid + '"><input type="checkbox" id="' + layer.ol_uid + '" name="' + layer.ol_uid + '" value="' + layer.ol_uid + '" class="overlayswitch"';
            //zorg dat de chekbox van zichtbare aan staat
            if (layer.values_.visible) {
                liTekst += "checked>";
            } else {
                liTekst += ">";
            }
            //zorg ervoor dat je ook op de tekst kan klikken
            liTekst += '<label for="' + layer.ol_uid + '">' + layer.values_.title + '</label></br>';

            //transparantieslider
            liTekst += '<input type="range" min="1" max="100" value="50" id="gekozentransparantie" style="width:90%;"></li>';

            // voeg de li toe an de ul
            $('#overlaylayers').append(liTekst);

        }
    });

    // werkende layer switchers
    // Wanneer het een radio button is
    $('input[type=radio][name=basemap]').on('change', function () {
        let ol_uid = this.value;
        map.getLayers().forEach(function (layer) {
            if (layer.ol_uid == ol_uid) {
                layer.setVisible(true);
            } else if (layer.values_.type == 'basemap') {
                layer.setVisible(false);
            }
        });
    });

    $(function() {

        $("#osm").hide();
    
        $('input[type=radio][id=23]').on('change', function(){
            $("#satelliet").hide();
            $("#osm").show();
        });

        $('input[type=radio][id=25]').on('change', function(){
            $("#osm").hide();
            $("#satelliet").show();
        });
    });

    // Wanneer het checkbox is
    $('input[type=checkbox][class=overlayswitch]').on('change', function () {
        let ol_uid = this.value;
        map.getLayers().forEach(function (layer) {
            if (layer.ol_uid == ol_uid) {
                if (layer.getVisible()) {
                    layer.setVisible(false);
                } else {
                    layer.setVisible(true);
                }
            }
        });
    });
}