<?php

$url1 = ("https://waarneming.nl/api/v1/locations/geojson/?format=json&point=POINT%28");

$url2 = $_COOKIE["xcoord"];

$url3 = ("+");

$url4 = $_COOKIE["ycoord"];

$url5 = ("%29");

echo file_get_contents($url1 . $url2 . $url3 . $url4 . $url5);

?>