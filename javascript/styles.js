// Stijlen die toegevoegd kunnen worden aan layers
locatieStijlPunt = new ol.style.Style({
    image: new ol.style.Circle({
        radius: 5,
        fill: new ol.style.Fill({
            color: 'rgba(108, 92, 231, 1.0)'
        }),
        stroke: new ol.style.Stroke({
            width: 4,
            color: 'rgba(108, 92, 231, 0.5)'
        })
    })
});

locatieStijlVlak = new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(108, 92, 231, 0.05)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(108, 92, 231, 0.5)',
            width: 2
        })
});