function loadErc(url) {
    var mapExtent = [67.45321700, 9.72893433, 138.58848723, 56.47119800];
    var mapMinZoom = 5;
    var mapMaxZoom = 8;
    var bounds = new L.LatLngBounds(
        new L.LatLng(mapExtent[1], mapExtent[0]),
        new L.LatLng(mapExtent[3], mapExtent[2]));
    var map = L.map('map', {
        maxBounds: bounds,
        renderer: L.canvas()
    }).fitBounds(bounds);
    //L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    var layer;
    var options = {
        minZoom: mapMinZoom,
        maxZoom: mapMaxZoom,
        opacity: 1.0,
        attribution: 'Data from <a href="http://aischina.com/">中国民用航空局空中交通管理局航行情报中心</a>',
        tms: false
    };
    layer = L.tileLayer(url+'{z}/{x}/{y}.png', options).addTo(map);
}