$(function () {
    Page.initiate();
});

var Page = {
    initiate: function () {
        this.initiateSidebar();
        this.initiateParse();
    },
    initiateSidebar: function () {
        var file = location.pathname.substring(1);
        $("#href-" + PAGE).addClass("active");
    },
    initiateParse: function () {
        Parse.initialize("CSSA Parse Server");
        Parse.serverURL = 'http://ucsdcssa.org:1337/parse'
    }
}

var User = {
    logout: function () {
        if (confirm("Are You Sure You Want to Log Out?")) {
            ajax({
                url: "/ajax/handler?action=logout",
                type: "get",
                success: function (result) {
                    var data = JSON.parse(result);
                    if (data["error_code"] == 0) {
                        window.location.href = "/admin/login.html";
                    }
                    else {
                        alert(data["error_log"]);
                    }
                }
            });
        }
    }
}

function ajax(obj) {
    $.ajax({
        url: obj.url,
        type: obj.type,
        data: obj.data,
        success: function (result) {
            var data = JSON.parse(result);
            if (data["error_code"] == 0) {
                obj.success(data["content"]);
            }
            else {
                if (obj.error) {
                    obj.error(data["error_code"], data["error_log"]);
                }
                else {
                    alert("Error " + data["error_code"] + ": " + data["error_log"]);
                }
            }
        },
        error: function () {
            if (obj.error) {
                obj.error(404, "Server Connection Error");
            }
            else {
                alert("Server Connection Error");
            }
        }
    });
}