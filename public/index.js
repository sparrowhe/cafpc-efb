var inst = new mdui.Drawer('#drawer');
var cdn = "http://cafpc-efb.oss-cn-beijing.aliyuncs.com/"
var api = "http://aip.sparrowhe.top/api/"

function closeBar() {
    inst.toggle();
}

function getAvailable() {
    var version = ""
    $.ajax({
        url: api + "available.json",
        async: false,
        success: function (res) {
            version = res.version;
        }
    })
    return version;
}

function getChartList(version) {
    var lists = "";
    $.ajax({
        url: api + "" + version + ".json",
        async: false,
        success: function (res) {
            lists = res;
        }
    })
    return lists;
}

function getChartsListbyStart(start, version) {
    var tmp = getChartList(version);
    var charts = [];
    for (var i = 0; i < tmp.length; i++) {
        if (tmp[i]["id"].length > 4 && tmp[i]["id"].startsWith(start)) {
            charts.push({
                "id": tmp[i]["id"],
                "name": tmp[i]["name"],
                "file": tmp[i]["file"]
            })
        }
    }
    return charts;
}

function getAirportsListbyStart(start, version) {
    var tmp = getChartList(version);
    var airports = [];
    for (var i = 0; i < tmp.length; i++) {
        if (tmp[i]["id"].length == 4 && tmp[i]["id"].startsWith(start)) {
            airports.push({
                "name": tmp[i]["name"],
                "id": tmp[i]["id"]
            });
        }
    }
    return airports;
}

function genAirportsList(airports) {
    var html = '<div class="mdui-table-fluid"> <table class="mdui-table mdui-table-hoverable"><thead><tr><th>ICAO</th><th>Name</th><th>Action</th></tr></thead><tbody>';
    for (var i = 0; i < airports.length; i++) {
        html += '<tr><td>' + airports[i]["id"] + '</td><td>' + airports[i]["name"] + '</td><td><button class="mdui-btn mdui-btn-raised mdui-ripple" onclick=viewCharts("' + airports[i]["id"] + '","' + airports[i]["id"][0] + airports[i]["id"][1] + '")>View</button></td></tr>';
    }
    html += "</tbody></table></div>";
    $("#card").html(html);
}

function viewCharts(icao, start) {
    viewAirportCharts(getChartsListbyStart(icao, getAvailable()), start)
}

function viewAirportCharts(charts, start) {
    var html = '<div class="mdui-table-fluid"> <table class="mdui-table mdui-table-hoverable"><thead><tr><th>Name</th><th>Action</th></tr></thead><tbody>';
    for (var i = 0; i < charts.length; i++) {
        html += '<tr><td>' + charts[i]["name"] + '</td><td><button class="mdui-btn mdui-btn-raised mdui-ripple" onclick=viewFiles("' + charts[i]["file"] + '","' + charts[i]["id"].split("-")[0] + '")>View</button></td></tr>';
    }
    html += '</tbody></table></div><br><button class="mdui-btn mdui-btn-raised mdui-ripple" onclick=showList("' + start + '")>Back</button>';
    $("#card").html(html);
}

function viewFiles(file, icao) {
    html = '<object style="height:100%;width:100%;" data="public/pdfjs/web/viewer.html?file=' + cdn + getAvailable() + "/" + icao + "/" + file + '"></object>'
    html += '<button class="mdui-btn mdui-btn-raised mdui-ripple" onclick=viewCharts("' + icao + '")>View</button>'
    $("#card").html(html)
}

function showList(start) {
    genAirportsList(getAirportsListbyStart(start, getAvailable()))
}
