<!DOCTYPE html>
<html>

<head>
    <!--Koppeling naar de CSS van OpenLayers-->
    <link href="vendor\ol\ol.css" rel="stylesheet" />

    <!-- Eigen css -->
    <link href="css\css.css" rel="stylesheet" />
    <link href="css\csskaart.css" rel="stylesheet" />

    <!-- tijdelijke codes in php -->
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
    <script src="//code.jquery.com/jquery-1.12.4.js"></script>
    <script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
</head>

<body>
    <main>
        <aside>
            <div class="plaatsingaside">
                <h1>Bodem- en Biodiversiteitsmonitor</h1>
                <h3>Gebied:</h3>
                <div id="gebiedskeuze" class="gebiedskeuzetekst"></div>
                <p id="gebiedskeuzeintro">(Dubbelklik op een plek in de kaart)</p>
                <h3>Achtergrondkaart</h3>
                <ul id="basemaplayers"></ul>
                <div id="datalagen">
                    <h3>Beschikbare datalagen</h3>
                    <p>Check de kaartlagen aan of uit, verander de transparantie en versleep de kaartvolgorde.</p>
                    <ul id="overlaylayers"></ul>
                    <input type="range" min="1" max="100" value="50" id="gekozentransparantietest" onchange='updateOpacityPerceelwms()'>
                    <!-- <ul id="sortable">
                        <li class="ui-state-default">
                            <input type="checkbox">NDVI Index</input><br>
                            <input class="transparantie" type="range" min="1" max="100" value="100">
                        </li>
                        <li class="ui-state-default">
                            <input type="checkbox">Waarnemingen</input><br>
                            <input class="transparantie" type="range" min="1" max="100" value="100">
                        </li>
                        <li class="ui-state-default">
                            <input type="checkbox">Bloemrijke akkerranden</input><br>
                            <input class="transparantie" type="range" min="1" max="100" value="100">
                        </li>
                        <li class="ui-state-default">
                            <input type="checkbox">Hoogtekaart</input><br>
                            <input class="transparantie" type="range" min="1" max="100" value="100">
                        </li>
                        <li class="ui-state-default">
                            <input type="checkbox">Maaibestek</input><br>
                            <input class="transparantie" type="range" min="1" max="100" value="100">
                        </li>
                        <li class="ui-state-default">
                            <input type="checkbox">Grondsoortenkaart</input><br>
                            <input class="transparantie" type="range" min="1" max="100" value="100">
                        </li>
                        <li class="ui-state-default">
                            <input type="checkbox">Etc.</input><br>
                            <input class="transparantie" type="range" min="1" max="100" value="100">
                        </li>
                    </ul> -->

                </div>
            </div>
        </aside>

        <section>
            <div id="map"></div>
        </section>

    </main>

    <!--Tijdelijk script voor sleepbaar listitem-->
    <script>
        $("#overlaylayers").sortable();
    </script>

    <!--Koppeling naar Javascript van OpenLayers-->
    <script src="vendor\ol\ol.js"></script>

    <!--Koppeling naar eigen JavaScript code-->
    <script src="javascript\global.js"></script>
    <script src="javascript\screenfunctions.js"></script>
    <script src="javascript\map.js"></script>
    <script src="javascript\layers.js"></script>
    <script src="javascript\main.js"></script>
    <script src="javascript\updateopacitylayerperceelwms.js"></script>
</body>

</html>