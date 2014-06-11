
jasmine.Matchers.prototype.toContainHtml = function (expectedHtml) {
    var cleanedHtml = this.actual.innerHTML.toLowerCase().replace(/\r\n/g, "");
    // IE < 9 strips whitespace immediately following comment nodes. Normalize by doing the same on all browsers.
    cleanedHtml = cleanedHtml.replace(/(<!--.*?-->)\s*/g, "$1");
    expectedHtml = expectedHtml.replace(/(<!--.*?-->)\s*/g, "$1");
    cleanedHtml = cleanedHtml.replace(/ __ko__\d+=\"(ko\d+|null)\"/g, "");
    this.actual = cleanedHtml; // Fix explanatory message
    return cleanedHtml === expectedHtml;
};

jasmine.nodeText = function(node) {
    return 'textContent' in node ? node.textContent : node.innerText;
};

jasmine.Matchers.prototype.toContainText = function (expectedText) {
    var actualText = jasmine.nodeText(this.actual);
    var cleanedActualText = actualText.replace(/\r\n/g, "\n");
    this.actual = cleanedActualText; // Fix explanatory message
    return cleanedActualText === expectedText;
};

jasmine.addScriptReference = function (scriptUrl) { 
    if (window.console)
        console.log("Loading " + scriptUrl + "...");
    document.write("<scr" + "ipt type='text/javascript' src='" + scriptUrl + "'></sc" + "ript>");
};


jasmine.createKeyUpEvent = function (keyCode) {
    var pressUp = window.jQuery.Event("keyup");
    pressUp.ctrlKey = false;
    pressUp.keyCode = keyCode;
    return pressUp;
};

jasmine.createKeyDownEvent = function (keyCode) {
    var pressUp = window.jQuery.Event("keydown");
    pressUp.ctrlKey = false;
    pressUp.keyCode = keyCode;
    return pressUp;
};
jasmine.createMouseEvent = function(eventType) {
    var event = window.jQuery.Event(eventType);
    event.pageX = 1;
    event.pageY = 1;
    return event;
};
jasmine.getMockLocation = function (url) {
    var hashRet = '';
    var searchRet = '';
    var hrefRet = url;
    if (url.indexOf('#') >= 0)
    {
        hashRet = url.substring(url.indexOf('#'));
        url = url.substring(0, url.indexOf('#'));
    }
    if (url.indexOf('?') >= 0) {
        searchRet = url.substring(url.indexOf('?'));
        url = url.substring(0, url.indexOf('?'));
    }

    var protocolRet = url.substring(0, url.indexOf(':') + 1);
    url = url.substring(url.indexOf(':') + 3);

    var hostRet = url;
    if(url.indexOf('/'))
    {
        hostRet = url.substring(0, url.indexOf('/'));
    }
    var pathName = url.substring(hostRet.length);
    return {
        hash: hashRet,
        host: hostRet,
        hostname: hostRet,
        href: hrefRet,
        pathname: pathName,
        port: '80',
        protocol: protocolRet,
        search: searchRet,
        replace: function(url) {
        },
        assign: function(url) {
        },
        reload: function() {
        }
    };
};
jasmine.createNavigator = function (userAgent) {
   return {
       userAgent: userAgent
    };
};

jasmine.expectJsonGetAjax = function(url) {
    expect($.ajax.mostRecentCall.args[0]["type"]).toEqual("GET");
    expect($.ajax.mostRecentCall.args[0]["url"]).toEqual(url);
    expect($.ajax.mostRecentCall.args[0]["contentType"]).toEqual("application/json; charset=utf-8");
    expect($.ajax.mostRecentCall.args[0]["dataType"]).toEqual("json");
};
jasmine.expectJsonPostAjax = function (url, data) {
    expect($.ajax.mostRecentCall.args[0]["type"]).toEqual("POST");
    expect($.ajax.mostRecentCall.args[0]["url"]).toEqual(url);
    if (data) {
        expect($.ajax.mostRecentCall.args[0]["data"]).toEqual(data);
    }
    expect($.ajax.mostRecentCall.args[0]["contentType"]).toEqual("application/json; charset=utf-8");
    expect($.ajax.mostRecentCall.args[0]["dataType"]).toEqual("json");
};

jasmine.mockDocument = function (document) {
    var cookies = {};
    document.__defineGetter__('cookie', function () {
        var output = [];
        for (var cookieName in cookies) {
            output.push(cookieName + "=" + cookies[cookieName]);
        }
        return output.join(";");
    });
    document.__defineSetter__('cookie', function (s) {
        var indexOfSeparator = s.indexOf("=");
        var key = s.substr(0, indexOfSeparator);
        var value = s.substring(indexOfSeparator + 1);
        cookies[key] = value;
        return key + "=" + value;
    });
    document.clearCookies = function () {
        cookies = {};
    };
};

jasmine.mockWindow = function() {
    var alert = jasmine.createSpy();
    var open = jasmine.createSpy();
    return {
        alert: alert,
        open: open,
        screen: {
            width: 2000,
            height: 2000
        },
        document: {
            
        }
    };
};

jasmine.getPropertyCount = function (object) {

    var count = 0;
    for (var k in object) {
        if (object.hasOwnProperty(k)) {
            ++count;
        }
    }
    return count;
};
