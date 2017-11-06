/**
 * Created by Andreas Hammer (c) 2016-
 */
$(function () {
    $("#wine-label").click(function () {
        $("#list-wine").toggle();
    });
    $("#strong-wine-label").click(function () {
        $("#list-strong-wine").toggle();
    });
    $("#liquor-label").click(function () {
        $("#list-liquor").toggle();
    });
    $("input[name='wine']").click(function () {
        $("#list-wine").toggle();
        var c = this.checked;
        $("input").each(function () {
            if (this.parentNode.parentNode.id == "list-wine") {
                this.checked = c;
            }
        });
    });
    $("input[name='liquor']").click(function () {
        $("#list-liquor").toggle();
        var c = this.checked;
        $("input").each(function () {
            if (this.parentNode.parentNode.id == "list-liquor") {
                this.checked = c;
            }
        });
    });
    $("input[name='strongwine']").click(function () {
        $("#list-strong-wine").toggle();
        var c = this.checked;
        $("input").each(function () {
            if (this.parentNode.parentNode.id == "list-strong-wine") {
                this.checked = c;
            }
        });
    });
    $("input").each(function () {
        var n = "";
        switch (this.parentNode.parentNode.id) {
            case "list-wine":
                n = "wine";
                break;
            case "list-liquor":
                n = "liquor";
                break;
            case "list-strong-wine":
                n = "strongwine";
                break;
        }
        if (n == "")
            return;
        $(this).click(function () {
            var d = true;
            var a = this.parentNode.parentNode.id;
            console.log(n);
            $("input").each(function () {
                if (this.parentNode.parentNode.id == a) {
                    if (!this.checked)
                        d = false;
                }
            });
            document.getElementsByName(n)[0].checked = d;
        });
    });
    $("a").click(function () {
        var url = this.href;
        if (url == "/")
            return;
        $.ajax({
            url: "/linkClick",
            method: "GET",
            data: {
                url: url
            }
        });
    });
    if (getParameterByName("pageNum") != "" && getParameterByName("pageNum") != null) {
        if (getParameterByName("pageNum") != "1") {
            document.getElementById("lastPage").style.display = "";
        }
    }
    if (document.getElementById("nextPage") != null)
        document.getElementById("nextPage").style.display = "";
    readyURL();
    var int = setInterval(function () {
        if (Cookies.get("cookieconsent_dismissed") != "yes")
            return;
        if (Cookies.get("fattigstudentVisit") == null) {
            var exp = new Date();
            exp.setHours(0, 0, 0, 0);
            exp.setDate(exp.getDate() + 1);
            Cookies.set("fattigstudentVisit", "visit", {expires: exp});
            $.ajax({
                url: "/visitationCounter",
                method: "GET",
                data: {}
            });
        }
        clearInterval(int);
    }, 500);
    window.addEventListener("keydown", function (event) {
        if ($("input[name='search']").is(":focus") || $("input[name='pmax']").is(":focus") || $("input[name='pmin']").is(":focus") || $("input[name='vmax']").is(":focus") || $("input[name='vmin']").is(":focus")) {
            if (event.keyCode == 13) {
                document.getElementById("searchForm").submit();
            }
        }
    });
    document.getElementById("searchForm").onsubmit = function(){
        setLocation();
        return true;
    }
});

function advanced(h) {
    $("#advanceSearch").toggle();
}

function nextPage() {
    var num = Number(getParameterByName("pageNum") != "" ? (getParameterByName("pageNum") != null ? getParameterByName("pageNum") : 1) : 1);
    num++;
    $("input[name='pageNum']").val(num);
    if (getParameterByName("orderBy") != "") {
        $("input[name='orderBy']").val(getParameterByName("orderBy"));
    }
    if (getParameterByName("ASC")) {
        $("input[name='ASC']").attr("checked", true);
    }
    document.getElementById("searchForm").submit();
}

function lastPage() {
    var num = Number(getParameterByName("pageNum") != "" ? (getParameterByName("pageNum") != null ? getParameterByName("pageNum") : 1) : 1);
    num--;
    if (num < 1)
        num = 1;
    $("input[name='pageNum']").val(num);
    document.getElementById("searchForm").submit();
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function srch() {
    $("input[name='pageNum']").val("1");
    $("input[name='orderBy']").val("PPK");
    $("input[name='ASV']").attr("checked", false);
    document.getElementById("searchForm").submit();
}

function sort(a) {
    var h = a.innerHTML;
    if (h == "Type")
        h = "Varetype";
    if (h == "Produktnavn")
        h = "Varenavn";
    if (h == "PPK" || h == "Volum" || h == "Alkohol")
        c = getParameterByName("orderBy") == h && getParameterByName("ASC") == null;
    else
        c = (getParameterByName("orderBy") != h && getParameterByName("ASC") != null) || getParameterByName("ASC") == null;
    $("input[name='ASC']").attr("checked", c);
    $("input[name='orderBy']").val(h);
    $("input[name='pageNum']").val("1");
    document.getElementById("searchForm").submit();
}

function readyURL() {
    var p = getURLParams();
    if (p == null) {
        if ($("input[name='orderBy']").val() == "")
            $("input[name='orderBy']").val("PPK");
        else if ($("input[name='pageNum']").val() == "")
            $("input[name='pageNum']").val("1");
        return;
    }
    var index = p[0];
    var val = p[1];
    for (var i = 0; i < index.length; i++) {
        if (val[i] == "on" && index[i] != "search" && index[i] != "roulette")
            $("input[name='" + index[i] + "']").attr("checked", true);
        else if (index[i] != "roulette")
            $("input[name='" + index[i] + "']").val(val[i]);
    }
    if ($("input[name='orderBy']").val() == "")
        $("input[name='orderBy']").val("PPK");
    else if ($("input[name='pageNum']").val() == "")
        $("input[name='pageNum']").val("1");
}

function getURLParams() {
    var url = window.location.href;
    if (url.indexOf("?") < 0)
        return null;
    url = url.split("?")[1];
    var param = url.split("&");
    var val = [];
    var index = [];
    for (var i = 0; i < param.length; i++) {
        var x = param[i].split("=");
        if (x[1] == "roulette")
            continue;
        x[1] = validate(x[1]);
        val.push(decodeURI(x[1]));
        index.push(x[0]);
    }
    return [index, val];
}

function validate(v) {
    var a;
    if (v.indexOf("+") > -1) {
        a = v.split("+");
        v = a.join(" ");
    }
    return v;
}

function rlette() {
    $("input[name='roulette']").attr("checked", true);
    document.getElementById("searchForm").submit();
}

function setLocation() {
    if (navigator.geolocation) {
        v = false;
        navigator.geolocation.getCurrentPosition(function (position) {
            $("input[name='lat']").val(position.coords.latitude);
            $("input[name='long']").val(position.coords.longitude);
            v = true;
        });
        while(!v){}
    }
}