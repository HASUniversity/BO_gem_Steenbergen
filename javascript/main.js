$(document).ready(function(){
    // voor onderstaande functies uit als de website is geladen

    proj4.defs('EPSG:28992','+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +towgs84=565.417,50.3319,465.552,-0.398957,0.343988,-1.8774,4.0725 +units=m +no_defs'); 
    ol.proj.proj4.register(proj4);

    initMap();
    initLayers();
    buildLayerSwitcher();

});