$(function() {
    var event = findGetParameter('event');
    if (! event) {
        event = 'm_start';
    }
    init(event);
});

function w3_open() {
    document.getElementById("sidenav").style.display = "block";
}

function w3_close() {
    document.getElementById("sidenav").style.display = "none";
}

function option(item, active) {
    if (active.indexOf(item) >= 0) {
        return 'class="w3-red"';
    }
    else {
        return '';
    }
}

function menu(active) {
    var menuString =
    '<nav class="w3-sidenav w3-card-2 w3-white w3-top" style="width:200px;display:none;right:0;z-index:2" id="sidenav">' +
    '<div class="w3-container w3-theme-d2">' +
    '<span onclick="w3_close()" class="w3-closenav w3-right w3-xlarge"><i class="fa fa-close"></i></span>' +
    '</div>' +
    '<br>' +
    '<a ' + option('m_start', active)  + ' href="multi.html?event=m_start"><i class="fa fa-trophy"></i>  Mångkamp - Start</a>' +
    '<a href="#">=====================</a>' +
    '<a ' + option('m_cast', active)   + ' href="multi.html?event=m_cast"><i class="fa fa-mars"></i>&nbsp;&nbsp;Män Castorama</a>' +
    '<a ' + option('m_10', active)     + ' href="multi.html?event=m_10"><i class="fa fa-mars"></i>&nbsp;&nbsp;Män 10-kamp</a>' +
    '<a ' + option('m_7i', active)     + ' href="multi.html?event=m_7i"><i class="fa fa-mars"></i>&nbsp;&nbsp;Män 7-kamp (i)</a>' +
    '<a ' + option('p17_10', active)   + ' href="multi.html?event=p17_10"><i class="fa fa-mars"></i>&nbsp;&nbsp;P17 10-kamp</a>' +
    '<a ' + option('p17_7i', active)   + ' href="multi.html?event=p17_7i"><i class="fa fa-mars"></i>&nbsp;&nbsp;P17 7-kamp (i)</a>' +
    '<a ' + option('p15_8', active)    + ' href="multi.html?event=p15_8"><i class="fa fa-mars"></i>&nbsp;&nbsp;P15 8-kamp</a>' +
    '<a ' + option('p15_7i', active)   + ' href="multi.html?event=p15_7i"><i class="fa fa-mars"></i>&nbsp;&nbsp;P15 7-kamp (i)</a>' +
    '<a href="#">=====================</a>' +
    '<a ' + option('w_cast', active)   + ' href="multi.html?event=w_cast"><i class="fa fa-venus"></i>&nbsp;&nbsp;Kvinnor Castorama</a>' +
    '<a ' + option('w_7', active)      + ' href="multi.html?event=w_7"><i class="fa fa-venus"></i>&nbsp;&nbsp;Kvinnor 7-kamp</a>' +
    '<a ' + option('w_5i', active)     + ' href="multi.html?event=w_5i"><i class="fa fa-venus"></i>&nbsp;&nbsp;Kvinnor 5-kamp (i)</a>' +
    '<a ' + option('f17_5i', active)   + ' href="multi.html?event=f17_5i"><i class="fa fa-venus"></i>&nbsp;&nbsp;F17 5-kamp (i)</a>' +
    '<a ' + option('f15_6', active)    + ' href="multi.html?event=f15_6"><i class="fa fa-venus"></i>&nbsp;&nbsp;F15 6-kamp</a>' +
    '</nav>' +
    '<div class="w3-container" style="margin-top:60px"> </div>';

    document.getElementById('menu').innerHTML = menuString;
}

function header(title) {
    var headerString =
    '<header class="w3-display-container w3-red w3-top" style="height:60px;width:100%">' +
    '<div class="w3-padding w3-display-left"><a href="https://hanvikenssk.myclub.se/friidrott" target="_blank"><img src="images/hanviken-rund.jpg" class="w3-circle" style="width:50px;height:50px;"></a></div>' +
    '<div class="w3-padding w3-display-middle"><h4><center>' + title + '</center></h4></div>' +
    '<div class="w3-padding w3-display-right"><h3><i class="w3-opennav fa fa-bars" onclick="w3_open()"></i></h3></div>' +
    '</header>';

    document.getElementById('header').innerHTML = headerString;
}

function content(event) {
    var contentString = '';
    
    if (event == 'm_start') {
        contentString +=
        '<div class="w3-container w3-round-large w3-light-grey w3-margin">' +
        '<p></p>' +
        '<center>' +
        'Startsida för Mångkamp<br>' +
        'Vänligen välj Mångkampstabell i menyn' +
        '</center>' +
        '<p></p>' +
        '</div>';
    }
    else {
        var eventsArray = getSubEvents(event);
        contentString +=
        '<div class="w3-container w3-round-large w3-light-grey w3-margin">' +
        '<p></p>' +
        '<center>' +
        '<table border="0" cellpadding="2" cellspacing="0" width="320px">' +
        '<tr>' +
        '<td align="left"><b>Notering</b></td>' +
        '<td colspan="2"><input type="text" id="note" size="14" onchange="calculateScoring(\'' + event + '\', \'note\', this.value)" /></td>' +
        '</tr>' +
        '<tr><td colspan="3">&nbsp;</td></tr>' +
        '<tr>' +
        '<td align="left"><b>Gren</b></td>' +
        '<td align="center"><b>Resultat</b></td>' +
        '<td align="right"><b>Poäng</b></td>' +
        '</tr>';
    
        for (var i = 0; i < eventsArray.length; i++) {
            var subEvent = eventsArray[i];
            if (subEvent == 'break') { 
                contentString += '<tr><td><p></p></td></tr>'
            }
            else {
                var subEventTitle = getSubEventTitle(subEvent);
                var name = 'mark_' + subEvent;
            
                contentString +=
                '<tr>' +
                '<td>' + subEventTitle + '</td>' +
                '<td><input type="number" id="mark_' + subEvent + '" class="right-text" min="0.0" max="999.99" step="0.01" placeholder="0,00" onchange="calculateScoring(\'' + event + '\', \'' + subEvent + '\', this.value)" /></td>' +
                '<td align="right"><div id="points_' + subEvent + '"></div></td>' +
                '</tr>';
            }
        }

        contentString +=
        '<tr><td><p></p></td></tr>' +
        '<tr>' +
        '<td colspan="2" align="left"><b>Totalpoäng:</b></td>' +
        '<td align="right"><b><div id="points_total"></b></div></td>' +
        '</tr>' +
        '</table>' +
        '<input type="button" onClick="clean(\'' + event +'\')" value="Rensa">' +
        '</center>' +
        '<p></p>' +
        '</div>';
    }
    document.getElementById('content').innerHTML = contentString;
}

function footer() {
    var footerString =
    '<center>' +
    '<table border="0" cellpadding="2" cellspacing="0" width="95%">' +
    '<tr>' +
    '<td align="center">&copy; <a href="mailto:friidrott@niklassons.net">friidrott@niklassons.net</a></i></td>' +
    '</tr>' +
    '</table>' +
    '</center>';

    document.getElementById('footer').innerHTML = footerString;
}

function dbStoreResults(combinedEvent, resultList) {
    console.log("Storing new data for '" + combinedEvent + "' in indexedDB Storage:");
    var storeObj = {'results': resultList};
    console.log(storeObj);
    var db = new ydn.db.Storage('athletics-sweden-multi');
    db.put('athletics-sweden-multi', storeObj, combinedEvent);
}

function init(combinedEvent) {
    var title = getEventTitle(combinedEvent);
    header(title);
    menu(combinedEvent);
    content(combinedEvent);
    footer();

    if (combinedEvent != 'm_start') {
        // Fetch data from the indexedDB
        var db = new ydn.db.Storage('athletics-sweden-multi');
        var req = db.get('athletics-sweden-multi', combinedEvent);
        var resultList;
        req.done(function(storeObj) {
            if (! storeObj) {
                var resultObj = {};
                resultList= [resultObj];
            }
            else {
                resultList = storeObj.results;
            }
            finished(combinedEvent, resultList);
        });
        req.fail(function(e) {
            console.log(e.message);
        });
    }
}

function finished(combinedEvent, resultList) {
    var eventsArray = getSubEvents(combinedEvent);
    var resultObj = resultList[0];

    var note = resultObj['note'];
    if (note) {
        document.getElementById('note').value = note;
    }
    else {
        resultObj['note'] = '';
    }
    for (var i = 0; i < eventsArray.length; i++) {
        var subEvent = eventsArray[i];
        if (subEvent == 'break') { continue; }
        var name = 'mark_' + subEvent;
        var mark = resultObj[subEvent];
        if (mark) {
            document.getElementById(name).value = mark;
            calculateScoring(combinedEvent, subEvent, mark);
        }
        else {
            resultObj[subEvent] = '';
        }
    }
    resultList[0] = resultObj;
    dbStoreResults(combinedEvent, resultList);
}

function clean(combinedEvent) {
    var resultObj = {};
    var resultList;
    var eventsArray = getSubEvents(combinedEvent);
    
    // Handle the note field
    document.getElementById('note').value = '';
    resultObj['note'] = '';

    // Handle the event fields
    for (var i = 0; i < eventsArray.length; i++) {
        var subEvent = eventsArray[i];
        if (subEvent == 'break') { continue; }
        var name = 'mark_' + subEvent;
        document.getElementById(name).value = '';
        resultObj[subEvent] = '';
        calculateScoring(combinedEvent, subEvent, '');
    }
    resultList = [resultObj];
    dbStoreResults(combinedEvent, resultList);
}

function calculateScoring(combinedEvent, subEvent, mark) {
    // Fetch data from the indexedDB
    var db = new ydn.db.Storage('athletics-sweden-multi');
    var req = db.get('athletics-sweden-multi', combinedEvent);
    var resultList;
    var resultObj;
    req.done(function(storeObj) {
        resultList = storeObj.results;
        resultObj = resultList[0];
        if (subEvent == 'note') {
            resultObj[subEvent] = mark;
        }
        else if (mark != '') {
            document.getElementById('points_' + subEvent).innerHTML = doCalculation(combinedEvent.charAt(0), subEvent, mark);
            document.getElementById('points_total').innerHTML = getTotalPts(combinedEvent);
            resultObj[subEvent] = mark;
        }
        else {
            document.getElementById('points_' + subEvent).innerHTML = '';
            document.getElementById('points_total').innerHTML = getTotalPts(combinedEvent);
            resultObj[subEvent] = '';
        }
        resultList[0] = resultObj;
        dbStoreResults(combinedEvent, resultList);
    });
}

function getTotalPts(combinedEvent) {
    var totalPts = 0;
    var eventsArray = getSubEvents(combinedEvent);

    for (var i = 0; i < eventsArray.length; i++) {
        var subEvent = eventsArray[i];
        if (subEvent == 'break') { continue; }
        if (document.getElementById('points_' + subEvent).innerHTML) {
            totalPts += parseInt(document.getElementById('points_' + subEvent).innerHTML);
        }
    }

    return totalPts;
}

function getEventTitle(combinedEvent) {
    switch (combinedEvent)
    {
        case 'm_start': return 'Mångkamp';
        case 'm_cast' : return 'Män Castorama';
        case 'm_10' :   return 'Män 10-kamp';
        case 'm_7i' :   return 'Män 7-kamp (i)';
        case 'p17_10' : return 'P17 10-kamp';
        case 'p17_7i' : return 'P17 7-kamp (i)';
        case 'p15_8' :  return 'P15 8-kamp';
        case 'p15_7i' : return 'P15 7-kamp (i)';
        case 'w_cast' : return 'Kvinnor Castorama';
        case 'w_7' :    return 'Kvinnor 7-kamp';
        case 'w_5i' :   return 'Kvinnor 5-kamp (i)';
        case 'f17_5i' : return 'F17 5-kamp (i)';        
        case 'f15_6' :  return 'F15 6-kamp';
    }
}
        

function getSubEvents(combinedEvent) {
    switch (combinedEvent)
    {
        case 'm_cast' :  return new Array('SP', 'DT', 'JT', 'HT');
        case 'm_10' :    return new Array('100', 'LJ', 'SP', 'HJ', '400', 'break', '110H', 'DT', 'PV', 'JT', '1500');
        case 'm_7i' :    return new Array('60', 'LJ', 'SP', 'HJ', 'break', '60H', 'PV', '1000');
        case 'p17_10' :  return new Array('110H', 'DT', 'PV', 'JT', '300', 'break', '100', 'LJ', 'SP', 'HJ', '1000');
        case 'p17_7i' :  return new Array('60', 'PV', 'LJ', 'break', '60H', 'HJ', 'SP', '800');        
        case 'p15_8' :   return new Array('80H', 'DT', 'PV', 'JT', 'break', 'LJ', 'SP', 'HJ', '800');
        case 'p15_7i' :  return new Array('60', 'PV', 'LJ', 'break', '60H', 'HJ', 'SP', '600');
        case 'w_cast' :  return new Array('SP', 'DT', 'JT', 'HT');
        case 'w_7' :     return new Array('100H', 'HJ', 'SP', '200', 'break', 'LJ', 'JT', '800');
        case 'w_5i' :    return new Array('60H', 'HJ', 'SP', 'break', 'LJ', '800');
        case 'f17_5i' :  return new Array('60H', 'HJ', 'SP', 'break', 'LJ', '600');        
        case 'f15_6' :   return new Array('80H', 'HJ', 'SP', 'break', 'LJ', 'JT', '600');
    }
}

function getSubEventTitle(subEvent) {
    switch (subEvent)
    {
        case '60' :   return "60 meter [s]";
        case '100' :  return "100 meter [s]";
        case '200' :  return "200 meter [s]";
        case '300' :  return "300 meter [s]";
        case '400' :  return "400 meter [s]";
        case '600' :  return "600 meter [s]";
        case '800' :  return "800 meter [s]";
        case '1000' : return "1.000 meter [s]"; 
        case '1500' : return "1.500 meter [s]";
        case '60H' :  return "60 m häck [s]"; 
        case '80H' :  return "60 m häck [s]";
        case '100H' : return "100 m häck [s]"; 
        case '110H' : return "110 m häck [s]"; 
        case 'HJ' :   return "Höjdhopp [m]"; 
        case 'PV' :   return "Stavhopp [m]"; 
        case 'LJ' :   return "Längdhopp [m]";
        case 'SP' :   return "Kula [m]";
        case 'DT' :   return "Diskus [m]";
        case 'JT' :   return "Spjut [m]";
        case 'HT' :   return "Slägga [m]";
    }
}

function doCalculation(sex, eventName, mark) {
    var a, b, c;

    if (sex == 'm' || sex == 'p')
    {
        switch (eventName)
        {
            case '60' : // 60 meters
                a = 58.0150;
                b = 11.5;
                c = 1.81;
                return calculateRunning(getSeconds(mark), a, b, c);
            case '100' : // 100 meters
                a = 25.4347;
                b = 18;
                c = 1.81;
                return calculateRunning(getSeconds(mark), a, b, c);
            case '200' : // 200 meters
                a = 5.8425;
                b = 38;
                c = 1.81;
                return calculateRunning(getSeconds(mark), a, b, c);
            case '300' : // 300 meters
                a = 2.58503;
                b = 60.1;
                c = 1.81;
                return calculateRunning(getSeconds(mark), a, b, c);
            case '400' : // 400 meters
                a = 1.53775;
                b = 82;
                c = 1.81;
                return calculateRunning(getSeconds(mark), a, b, c);
            case '600' : // 600 meters
                a = 0.348273;
                b = 156.5;
                c = 1.823;
                return calculateRunning(getSeconds(mark), a, b, c);
            case '800' : // 800 meters
                a = 0.160027;
                b = 231;
                c = 1.836;
                return calculateRunning(getSeconds(mark), a, b, c);
            case '1000' : // 1.000 meters
                a = 0.08713;
                b = 305.5;
                c = 1.85;
                return calculateRunning(getSeconds(mark), a, b, c);
            case '1500' : // 1.500 meters
                a = 0.03768;
                b = 480;
                c = 1.85;
                return calculateRunning(getSeconds(mark), a, b, c);
            case '60H' : // 60 meter hurdles
                a = 20.5173;
                b = 15.5;
                c = 1.92;
                return calculateRunning(getSeconds(mark), a, b, c);
            case '80H' : // 80 meter hurdles
                a = 11.1075;
                b = 20.7;
                c = 1.92;
                return calculateRunning(getSeconds(mark), a, b, c);
            case '110H' : // 110 meter hurdles
                a = 5.74352;
                b = 28.5;
                c = 1.92;
                return calculateRunning(getSeconds(mark), a, b, c);
            case 'HJ' : // High jump
                a = 0.8465;
                b = 75;
                c = 1.42;
                return calculateField(getCentimeters(mark), a, b, c);
            case 'PV' : // Pole vault
                a = 0.2797;
                b = 100;
                c = 1.35;
                return calculateField(getCentimeters(mark), a, b, c);
            case 'LJ' : // Long jump
                a = 0.14354;
                b = 220;
                c = 1.40;
                return calculateField(getCentimeters(mark), a, b, c);
            case 'SP' : // Shot put
                a = 51.39;
                b = 1.5;
                c = 1.05;
                return calculateField(getMeters(mark), a, b, c);
            case 'DT' : // Discus throw
                a = 12.91;
                b = 4;
                c = 1.10;
                return calculateField(getMeters(mark), a, b, c);
            case 'JT' : // Javelin throw
                a = 10.14;
                b = 7;
                c = 1.08;
                return calculateField(getMeters(mark), a, b, c);
            case 'HT' : // Hammer throw
                a = 13.0449;
                b = 7;
                c = 1.05;
                return calculateField(getMeters(mark), a, b, c);
            default :
                return null;
        }
    }
    else if (sex == 'w' || sex == 'f')
    {
        switch (eventName)
        {
            case '100' : // 100 meter
                a = 17.8570;
                b = 21;
                c = 1.81;
                return calculateRunning(getSeconds(mark), a, b, c);
            case '200' : // 200 meter
                a = 4.99087;
                b = 42.5;
                c = 1.81;
                return calculateRunning(getSeconds(mark), a, b, c);
            case '400' : // 400 meter
                a = 1.34285;
                b = 91.7;
                c = 1.81;
                return calculateRunning(getSeconds(mark), a, b, c);
            case '600' : // 600 meter
                a = 0.264892;
                b = 176.6;
                c = 1.85;
                return calculateRunning(getSeconds(mark), a, b, c);
            case '800' : // 800 meter
                a = 0.11193;
                b = 254;
                c = 1.88;
                return calculateRunning(getSeconds(mark), a, b, c);
            case '1500' : // 1.500 meter
                a = 0.02883;
                b = 535;
                c = 1.88;
                return calculateRunning(getSeconds(mark), a, b, c);
            case '60H' : // 60 meter hurdles
                a = 20.0479;
                b = 17;
                c = 1.835;
                return calculateRunning(getSeconds(mark), a, b, c);
            case '80H' : // 80 meter hurdles
                a = 12.9828;
                b = 21.9;
                c = 1.835;
                return calculateRunning(getSeconds(mark), a, b, c);
            case '100H' : // 100 meter hurdles
                a = 9.23076;
                b = 26.7;
                c = 1.835;
                return calculateRunning(getSeconds(mark), a, b, c);
            case 'HJ' : // High jump
                a = 1.84523;
                b = 75;
                c = 1.348;
                return calculateField(getCentimeters(mark), a, b, c);
            case 'PV' : // Pole vault
                a = 0.44125;
                b = 100;
                c = 1.35;
                return calculateField(getCentimeters(mark), a, b, c);
            case 'LJ' : // Long jump
                a = 0.188807;
                b = 210;
                c = 1.41;
                return calculateField(getCentimeters(mark), a, b, c);
            case 'SP' : // Shot put
                a = 56.0211;
                b = 1.5;
                c = 1.05;
                return calculateField(getMeters(mark), a, b, c);
            case 'DT' : // Discus throw
                a = 12.3311;
                b = 3;
                c = 1.10;
                return calculateField(getMeters(mark), a, b, c);
            case 'JT' : // Javelin throw
                a = 15.9803;
                b = 3.8;
                c = 1.04;
                return calculateField(getMeters(mark), a, b, c);
            case 'HT' : // Hammer throw
                a = 17.5458;
                b = 6;
                c = 1.05;
                return calculateField(getMeters(mark), a, b, c);
            default :
                return null;
        }
    }
    else {
        return null;
    }
}

function calculateRunning(mark, a, b, c) {
    var points = Math.floor(a * Math.pow(b - mark, c));
    if ( isNaN(points) ) {
        return 0;
    }
    else {
        return points;
    }
}

function calculateField(mark, a, b, c) {
    var points = Math.floor(a * Math.pow(mark - b, c));
    if ( isNaN(points) ) {
        return 0;
    }
    else {
        return points;
    }
}

function getSeconds(mark) {
    return mark;
}

function getMeters(mark) {
    return mark;
}

function getCentimeters(mark) {
    return mark * 100;
}

function findGetParameter(parameterName) {
    var result = null,
    tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}


