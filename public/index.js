var inst = new mdui.Drawer('#drawer');
var cdn = "https://cafpc-efb.oss-cn-beijing.aliyuncs.com/"
var api = "https://aip.sparrowhe.top/api/"

document.onload = newAvailable();

function newAvailable() {
    html = $("#card").html();
    if ($.cookie('file') && $.cookie('icao')) {
        mdui.dialog({
            title: '提示',
            content: `检测到上次打开的航图${$.cookie('file')}，是否打开`,
            buttons: [{
                    text: '取消'
                },
                {
                    text: '确认',
                    onClick: function (inst) {
                        viewFiles($.cookie('file'), $.cookie('icao'));
                    }
                }
            ]
        });
    }
    $("#card").html(html + '<div class="mdui-typo-caption-opacity mdui-text-center">系统数据：eAIP ' + getAvailable() + '</div><br><div class="mdui-typo-caption-opacity mdui-text-center">当前生效数据：eAIP ' + showtime() + '</div><br>');
}
///------Thanks for CES4097 & CES0625
function showtime() {
    var aip = ["2019-12-4", "2020-1-2", "2020-1-30", "2020-2-27", "2020-3-26", "2020-4-23", "2020-5-21", "2020-6-18", "2020-7-16", "2020-8-13", "2020-9-10", "2020-10-08", "2020-11-05", "2020-12-03", "2020-12-31"];
    var cycle = "err";
    var nowdate = new Date();
    var year = nowdate.getFullYear(),
        month = nowdate.getMonth() + 1,
        date = nowdate.getDate(),
        day = nowdate.getDay();
    for (var i = 0; i < aip.length; i++) {
        //i = 3;
        var nowaip = new Date(aip[i]);
        var baip = new Date(aip[i - 1]);
        if (nowdate > baip && nowdate < nowaip) {
            if (i < 9) {
                cycle = "200" + (i - 1);
            } else {
                cycle = "20" + (i - 1);
            }
        }
    }
    return cycle;
}
///--------

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
    $.cookie('icao', icao);
    $.cookie('file', file);
    html = '<object style="height:100%;width:100%;" data="public/pdfjs/web/viewer.html?file=' + cdn + getAvailable() + "/" + icao + "/" + file + '"></object>'
    html += '<button class="mdui-btn mdui-btn-raised mdui-ripple" onclick=viewCharts("' + icao + '","' + icao[0] + icao[1] + '")>Back</button>'
    $("#card").html(html)
}

function showList(start) {
    genAirportsList(getAirportsListbyStart(start, getAvailable()))
}

function showRvsm() {
    $("#card").html('<img class="mdui-img-fluid" src="https://www.aircn.org/toolbox/rvsm.jpg" />');
}

function showDesend() {
    $("#card").html('<div align="center"><form name=form0 action=""><table border="1"width="450"id="table1"><tr><td width="96%"colspan="3"><p align="center"><u>下高计算器</u></td></tr><tr><td width="22%"></td><td width="38%"align="center">英尺</td><td width="36%"align="center">米</td></tr><tr><td width="22%">当前高度<font color="#FF0000"><b>*</b></font></td><td width="38%"><p align="center"><input type="text"name="alt_ft"size="19"></td><td width="36%"><p align="center"><input type="text"name="alt_m"size="19"></p></td></tr><tr><td width="22%">机场高度<font color="#FF0000"><b>*</b></font></td><td width="38%"><p align="center"><input type="text"name="ap_ft"size="19"></td><td width="36%"><p align="center"><input type="text"name="ap_m"size="19"></p></td></tr><tr><td>下降率</td><td><p align="center"><input type="text"name="rate_ft"size="7">/分钟<input onClick="compute_rate(1)"type=button value="计算"name=rate_bt0></td><td><p align="center"><input type="text"name="rate_m"size="7">/秒&nbsp;<input onClick="compute_rate(2)"type=button value="计算"name=rate_bt></td></tr><tr><td></td><td align="center">海里</td><td align="center">公里</td></tr><tr><td>下高地速<font color="#FF0000"><b>*</b></font></td><td><p align="center"><input type="text"name="spd_nm"size="19"></td><td><p align="center"><input type="text"name="spd_km"size="19"></td></tr><tr><td>下降距离</td><td><p align="center"><input type="text"name="dis_nm"size="13"><input onClick="compute_dis(1)"type=button value="计算"name=rate_bt1></td><td><p align="center"><input type="text"name="dis_km"size="13"><input onClick="compute_dis(2)"type=button value="计算"name=rate_bt2></td></tr><tr><td colspan="3">使用方法:<br>1.输入&quot;当前高度&quot;,&quot;机场高度&quot;,&quot;当前地速&quot;,&quot;下降率&quot;后,计算&quot;下降距离&quot;.<br>2.填写&quot;当前高度&quot;,&quot;机场高度&quot;,&quot;当前地速&quot;,&quot;下降距离&quot;后,计算&quot;下降率&quot;.<br>注意事项:<br>1.&quot;当前高度&quot;,&quot;机场高度&quot;为必填项,可选择填写公制或英制数据,如两者都有数据,以英制数据进行计算.<br>2.可以自由选择以英制或公制计算,点击相应的计算按钮.<br>3.下高地速可以在当前地速基础上稍减,如巡航450,可设为350</td></tr></table></form></div>');
}

function showErc() {
    var url = cdn + getAvailable() + "/ENR6/Fixed/"
    $("#card").html('<object style="height:85%;width:100%;" data="erc"></object>')
}