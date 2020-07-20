function checkNum(str) {
    for (var i = 0; i < str.length; i++) {
        var ch = str.substring(i, i + 1)
        if (ch != "." && ch != "+" && ch != "-" && ch != "e" && ch != "E" && (ch < "0" || ch > "9")) {
            alert("请输入有效的数字");
            return false;
        }
    }
    return true
}
var alt, ap, rate, spd, dis;

function compute_rate(sel) {
    if (checkdata() == false) return;
    if (document.form0.dis_nm.value == "" && document.form0.dis_km.value == "") {
        alert("请输入计划的下降距离!");
        return;
    }
    if (document.form0.alt_ft.value != "") {
        alt = document.form0.alt_ft.value;
        //document.form0.alt_m.value = parseInt(alt / 3.28);
    } else {
        alt = document.form0.alt_m.value * 3.28;
        //document.form0.alt_ft.value = parseInt(alt * 3.28);
    }

    if (document.form0.ap_ft.value != "") {
        ap = document.form0.ap_ft.value;
        //document.form0.ap_m.value = parseInt(ap / 3.28);
    } else {
        ap = document.form0.ap_m.value * 3.28;
        //document.form0.ap_ft.value = parseInt(ap * 3.28);
    }

    if (document.form0.dis_nm.value != "") dis = document.form0.dis_nm.value;
    else dis = document.form0.dis_km.value / 1.852;

    if (document.form0.spd_nm.value != "") spd = document.form0.spd_nm.value;
    else spd = document.form0.spd_km.value / 1.852;

    rate = (alt - ap) / ((dis / spd) * 60);

    if (sel == 2) document.form0.rate_m.value = parseInt(rate / 3.28 / 60);
    else document.form0.rate_ft.value = parseInt(rate);
}

function compute_dis(sel) {
    if (checkdata() == false) return;
    if (document.form0.rate_ft.value == "" && document.form0.rate_m.value == "") {
        alert("请输入下降率!");
        return;
    }
    if (document.form0.alt_ft.value != "") {
        alt = document.form0.alt_ft.value;
        //document.form0.alt_m.value = parseInt(alt / 3.28);
    } else {
        alt = document.form0.alt_m.value * 3.28;
        //document.form0.alt_ft.value = parseInt(alt * 3.28);
    }

    if (document.form0.ap_ft.value != "") {
        ap = document.form0.ap_ft.value;
        //document.form0.ap_m.value = parseInt(ap / 3.28);
    } else {
        ap = document.form0.ap_m.value * 3.28;
        //document.form0.ap_ft.value = parseInt(ap * 3.28);
    }

    if (document.form0.rate_ft.value != "") rate = document.form0.rate_ft.value;
    else rate = document.form0.rate_m.value * 3.28 * 60;

    if (document.form0.spd_nm.value != "") spd = document.form0.spd_nm.value;
    else spd = document.form0.spd_km.value / 1.852;

    dis = (alt - ap) / rate / 60 * spd;

    if (sel == 2) document.form0.dis_km.value = parseInt(dis * 1.852);
    else document.form0.dis_nm.value = parseInt(dis);
}


function checkdata() {
    if (document.form0.alt_m.value == "" && document.form0.alt_ft.value == "") {
        alert("请输入当前高度!");
        return false;
    }
    if (document.form0.ap_m.value == "" && document.form0.ap_ft.value == "") {
        alert("请输入机场高度!");
        return false;
    }
    if (document.form0.spd_nm.value == "" && document.form0.spd_km.value == "") {
        alert("请输入当前地速!");
        return false;
    }
    if (checkNum(document.form0.alt_m.value) == false && checkNum(document.form0.alt_ft.value) == false) return false;
    if (checkNum(document.form0.ap_m.value) == false && checkNum(document.form0.ap_ft.value) == false) return false;
    if (checkNum(document.form0.spd_nm.value) == false && checkNum(document.form0.spd_km.value) == false) return false;
}