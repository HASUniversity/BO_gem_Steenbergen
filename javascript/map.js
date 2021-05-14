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

        $(document).ready(function () {
            createCookie("xcoord", Xcoord, "10");
            createCookie("ycoord", Ycoord, "10");
        });

        function createCookie(name, value, days) {
            var expires;
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toGMTString();
            } else {
                expires = "";
            }
            document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
        }

        $.ajax({
            url: 'php/geoproxycurl.php',
            type: 'GET',
            dataType: 'json',
            // crossDomain : true,
            // accept: 'application/json',
            context: document.text,
            success: function (data) {
                console.log(data);
            }
        }).fail(function () {
            console.log("Ik kan het niet vinden");
        });

    });
}