<!DOCTYPE html>
<html>

<head>
    <!--Koppeling naar de CSS van OpenLayers-->
    <link href="vendor\ol\ol.css" rel="stylesheet" />

    <!-- Eigen css -->
    <link href="css\css.css" rel="stylesheet" />
    <link href="css\csskaart.css" rel="stylesheet" />
    <link href="css\controls.css" rel="stylesheet" />

    <!-- tijdelijke codes in php -->
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
    <script src="//code.jquery.com/jquery-1.12.4.js"></script>
    <script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.6.2/proj4.min.js"></script>
</head>

<body>
    <main>

        <div class="header">
            <div class="header-left">
                <span>
                    <img src="img\logo_biobodemscope.png" style="height:70px;">
                    <a href="#default" id="logo" class="active">BioBodemScope</a>
                </span>

            </div>
            <div class="header-right">
                <a href="#overons">Over ons</a>
                <a href="#intro">Intro</a>
                <a href="#kennis">Kennis</a>
                <a href="#inloggen">Inloggen</a>
            </div>
        </div>

        <section>
            <div class="placeholderbasemapswitcher">
                <ul id="basemaplayers" class="basemapswitch"></ul>
            </div>
            <div id="map"></div>
        </section>

        <aside>
            <div class="plaatsingaside">
                <div class="tab">
                    <button class="tablinks" onclick="openTab(event, 'buurtschap')" id="defaultOpen"><img src="img/viewermodus_buurtschap.png" style="width:100%"></button>
                    <button class="tablinks" onclick="openTab(event, 'perceel')"><img src="img/viewermodus_perceel.png" style="width:100%"></button>
                    <button class="tablinks" onclick="openTab(event, 'forum')"><img src="img/viewermodus_forum.png" style="width:100%"></button>
                </div>

                <div id="buurtschap" class="tabcontent">

                    <div class="tab2">
                        <button class="tablinks2" onclick="openTab2(event, 'lagen')" id="defaultOpen2">Lagen</button>
                        <button class="tablinks2" onclick="openTab2(event, 'gegevens')">Gegevens</button>
                        <button class="tablinks2" onclick="openTab2(event, 'adviezen')">Adviezen</button>
                    </div>

                    <div id="lagen" class="tabcontent2">
                        <h3>Gebied:</h3>
                        <div id="gebiedskeuze" class="gebiedskeuzetekst"></div>
                        <p id="gebiedskeuzeintro">(Dubbelklik op een plek in de kaart)</p>

                        <div id="datalagen">
                            <h3>Beschikbare datalagen</h3>
                            <p>Check de kaartlagen aan of uit, verander de transparantie en versleep de kaartvolgorde.
                            </p>
                            <ul id="overlaylayers" class="sortable-list"></ul><br>
                        </div>
                    </div>

                    <div id="gegevens" class="tabcontent2">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                            ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                            in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>

                    <div id="adviezen" class="tabcontent2">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                            ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                            in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>



                    <div id="perceel" class="tabcontent">

                        <div class="tab3">
                            <button class="tablinks3" onclick="openTab3(event, 'lagen3')"
                                id="defaultOpen3">Lagen</button>
                            <button class="tablinks3" onclick="openTab3(event, 'gegevens3')">Gegevens</button>
                            <button class="tablinks3" onclick="openTab3(event, 'adviezen3')">Adviezen</button>
                        </div>

                        <div id="lagen3" class="tabcontent3">
                            <h3>Gebied:</h3>
                            <div id="gebiedskeuze" class="gebiedskeuzetekst"></div>
                            <p id="gebiedskeuzeintro">(Dubbelklik op een plek in de kaart)</p>

                            <div id="datalagen">
                                <h3>Beschikbare datalagen</h3>
                                <p>Check de kaartlagen aan of uit, verander de transparantie en versleep de
                                    kaartvolgorde.
                                </p>
                                <ul id="overlaylayers" class="sortable-list"></ul>

                            </div>
                        </div>

                        <div id="gegevens3" class="tabcontent3">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                ullamco
                                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                                in
                                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>

                        <div id="adviezen3" class="tabcontent3">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                ullamco
                                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                                in
                                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>

                    </div>

                    <div id="forum" class="tabcontent">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat
                            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
        </aside>
    </main>

    <!--Tijdelijk script voor sleepbaar listitem-->
    <script>
        $('.sortable-list').sortable({
            connectWith: '.sortable-list',
            update: function (event, ui) {
                var order = $(this).sortable('toArray');

                let maplayers = map.getLayers().getArray();

                console.log(maplayers);

                $.each(order, function (i, orderlayer) {
                    console.log(orderlayer);
                    $.each(maplayers, function (j, overlay) {
                        console.log(ol.util.getUid(overlay));
                        if (orderlayer == ol.util.getUid(overlay)) {
                            overlay.setZIndex(1000 - i);
                        }
                    })
                })

            }
        });
    </script>

    <!-- Tijdelijk script voor tabs -->
    <script>
        function openTab(evt, tabName) {
            var i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
            document.getElementById(tabName).style.display = "block";
            evt.currentTarget.className += " active";
        }

        function openTab2(evt, tabName2) {
            var i, tabcontent2, tablinks2;
            tabcontent2 = document.getElementsByClassName("tabcontent2");
            for (i = 0; i < tabcontent2.length; i++) {
                tabcontent2[i].style.display = "none";
            }
            tablinks2 = document.getElementsByClassName("tablinks2");
            for (i = 0; i < tablinks2.length; i++) {
                tablinks2[i].className = tablinks2[i].className.replace(" active", "");
            }
            document.getElementById(tabName2).style.display = "block";
            evt.currentTarget.className += " active";
        }

        function openTab3(evt, tabName3) {
            var i, tabcontent3, tablinks3;
            tabcontent3 = document.getElementsByClassName("tabcontent3");
            for (i = 0; i < tabcontent3.length; i++) {
                tabcontent3[i].style.display = "none";
            }
            tablinks3 = document.getElementsByClassName("tablinks3");
            for (i = 0; i < tablinks3.length; i++) {
                tablinks3[i].className = tablinks3[i].className.replace(" active", "");
            }
            document.getElementById(tabName3).style.display = "block";
            evt.currentTarget.className += " active";
        }


        // Get the element with id="defaultOpen" and click on it
        document.getElementById("defaultOpen").click();
        document.getElementById("defaultOpen2").click();
        document.getElementById("defaultOpen3").click();
    </script>


    <!--Koppeling naar Javascript van OpenLayers-->
    <script src="vendor\ol\ol.js"></script>

    <!--Koppeling naar eigen JavaScript code-->
    <script src="javascript\global.js"></script>
    <script src="javascript\styles.js"></script>
    <script src="javascript\map.js"></script>
    <script src="javascript\layers.js"></script>
    <script src="javascript\screenfunctions.js"></script>
    <script src="javascript\main.js"></script>
</body>

</html>