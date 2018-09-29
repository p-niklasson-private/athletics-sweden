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
        '<a ' + option('m_start', active)  + ' href="multi.html"><i class="fa fa-trophy"></i>  Mångkamp - Start</a>' +
        '<a href="#">=====================</a>' +
        '<a ' + option('m_cast', active)   + ' href="multi_m_castorama.html"><i class="fa fa-mars"></i>&nbsp;&nbsp;Män Castorama</a>' +
        '<a ' + option('m_10', active)     + ' href="multi_m_10.html"><i class="fa fa-mars"></i>&nbsp;&nbsp;Män 10-kamp</a>' +
        '<a ' + option('m_7i', active)     + ' href="multi_m_7i.html"><i class="fa fa-mars"></i>&nbsp;&nbsp;Män 7-kamp (i)</a>' +
        '<a ' + option('p17_10', active)   + ' href="multi_p17_10.html"><i class="fa fa-mars"></i>&nbsp;&nbsp;P17 10-kamp</a>' +
        '<a ' + option('p17_7i', active)   + ' href="multi_p17_7i.html"><i class="fa fa-mars"></i>&nbsp;&nbsp;P17 7-kamp (i)</a>' +
        '<a ' + option('p15_8', active)    + ' href="multi_p15_8.html"><i class="fa fa-mars"></i>&nbsp;&nbsp;P15 8-kamp</a>' +
        '<a ' + option('p15_7i', active)   + ' href="multi_p15_7i.html"><i class="fa fa-mars"></i>&nbsp;&nbsp;P15 7-kamp (i)</a>' +
        '<a href="#">=====================</a>' +
        '<a ' + option('w_cast', active)   + ' href="multi_w_castorama.html"><i class="fa fa-venus"></i>&nbsp;&nbsp;Kvinnor Castorama</a>' +
        '<a ' + option('w_7', active)      + ' href="multi_w_7.html"><i class="fa fa-venus"></i>&nbsp;&nbsp;Kvinnor 7-kamp</a>' +
        '<a ' + option('w_5i', active)     + ' href="multi_w_5i.html"><i class="fa fa-venus"></i>&nbsp;&nbsp;Kvinnor 5-kamp (i)</a>' +
        '<a ' + option('f17_5i', active)   + ' href="multi_f17_5i.html"><i class="fa fa-venus"></i>&nbsp;&nbsp;F17 5-kamp (i)</a>' +
        '<a ' + option('f15_6', active)    + ' href="multi_f15_6.html"><i class="fa fa-venus"></i>&nbsp;&nbsp;F15 6-kamp</a>' +
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

function dbStoreResults(combinedEvent, results) {
    console.log("Storing new data for '" + combinedEvent + "' in indexedDB Storage:");
	console.log(results);
    var db = new ydn.db.Storage('athletics-sweden-multi');
    db.put('athletics-sweden-multi', results, combinedEvent);
}

function init(combinedEvent, title) {
    // Initiate the web package
    header(title);
    menu(combinedEvent);
    footer();
    
    // Fetch data from the indexedDB
    var db = new ydn.db.Storage('athletics-sweden-multi');
    var req = db.get('athletics-sweden-multi', combinedEvent);
    req.done(function(results) {
        if (! results) {
            results = {};
        }
        finished(combinedEvent, results);
    });
    req.fail(function(e) {
        console.log(e.message);
    });
}

function finished(combinedEvent, results) {
    var eventsArray = getSubEvents(combinedEvent);
	for (var i = 0; i < eventsArray.length; i++) {
	    var subEvent = eventsArray[i];
	    var name = 'mark_' + subEvent;
	    var mark = results[subEvent];
	    if (mark) {
            document.getElementById(name).value = mark;
            calculateScoring(combinedEvent, subEvent, mark);
	    }
        else {
            results[subEvent] = '';
        }
	}
	dbStoreResults(combinedEvent, results);
}

function clean(combinedEvent) {
    var results = {};
    var eventsArray = getSubEvents(combinedEvent);
    for (var i = 0; i < eventsArray.length; i++) {
        var subEvent = eventsArray[i];
        var name = 'mark_' + subEvent;
        document.getElementById(name).value = '';
        results[subEvent] = '';
        calculateScoring(combinedEvent, subEvent, '');
	}
	dbStoreResults(combinedEvent, results);
}

function calculateScoring(combinedEvent, subEvent, mark) {
    // Fetch data from the indexedDB
    var db = new ydn.db.Storage('athletics-sweden-multi');
    var req = db.get('athletics-sweden-multi', combinedEvent);
    req.done(function(results) {
	    if (mark != '') {
		    document.getElementById('points_' + subEvent).innerHTML = doCalculation(combinedEvent.charAt(0), subEvent, mark);
		    document.getElementById('points_total').innerHTML = getTotalPts(combinedEvent);
            results[subEvent] = mark;
	    }
	    else
	    {
		    document.getElementById('points_' + subEvent).innerHTML = '';
		    document.getElementById('points_total').innerHTML = getTotalPts(combinedEvent);
		    results[subEvent] = '';
	    }
	    dbStoreResults(combinedEvent, results);
    });
}

function getTotalPts(combinedEvent) {
	var totalPts = 0;
	var eventsArray = getSubEvents(combinedEvent);
	
	for (var i = 0; i < eventsArray.length; i++)
	{
		if (document.getElementById('points_' + eventsArray[i]).innerHTML)
			totalPts += parseInt(document.getElementById('points_' + eventsArray[i]).innerHTML);
	}
	
	return totalPts;
}

function getSubEvents(combinedEvent) {
	var eventsArray;
	
	switch (combinedEvent)
	{
		case 'm_10' :
			eventsArray = new Array('100', 'LJ', 'SP', 'HJ', '400', '110H', 'DT', 'PV', 'JT', '1500');
			break;
		case 'm_cast' :
			eventsArray = new Array('SP', 'DT', 'JT', 'HT');
			break;
		case 'p17_10' :
			eventsArray = new Array('110H', 'DT', 'PV', 'JT', '300', '100', 'LJ', 'SP', 'HJ', '1000');
			break;
		case 'p15_8' :
			eventsArray = new Array('80H', 'DT', 'PV', 'JT', 'LJ', 'SP', 'HJ', '800');
			break;
		case 'm_7i' :
			eventsArray = new Array('60', 'LJ', 'SP', 'HJ', '60H', 'PV', '1000');
			break;
		case 'p17_7i' :
			eventsArray = new Array('60', 'PV', 'LJ', '60H', 'HJ', 'SP', '800');
			break;
		case 'p15_7i' :
			eventsArray = new Array('60', 'PV', 'LJ', '60H', 'HJ', 'SP', '600');
			break;
		case 'w_7' :
			eventsArray = new Array('100H', 'HJ', 'SP', '200', 'LJ', 'JT', '800');
			break;
		case 'w_cast' :
			eventsArray = new Array('SP', 'DT', 'JT', 'HT');
			break;
		case 'f15_6' :
			eventsArray = new Array('80H', 'HJ', 'SP', 'LJ', 'JT', '600');
			break;
		case 'w_5i' :
			eventsArray = new Array('60H', 'HJ', 'SP', 'LJ', '800');
			break;
		case 'f17_5i' :
			eventsArray = new Array('60H', 'HJ', 'SP', 'LJ', '600');
			break;

	}
	
	return eventsArray;
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
				break;
			case '100' : // 100 meters
				a = 25.4347;
				b = 18;
				c = 1.81;
				return calculateRunning(getSeconds(mark), a, b, c);
				break;
			case '200' : // 200 meters
				a = 5.8425;
				b = 38;
				c = 1.81;
				return calculateRunning(getSeconds(mark), a, b, c);
				break;
			case '300' : // 300 meters
				a = 2.58503;
				b = 60.1;
				c = 1.81;
				return calculateRunning(getSeconds(mark), a, b, c);
				break;
			case '400' : // 400 meters
				a = 1.53775;
				b = 82;
				c = 1.81;
				return calculateRunning(getSeconds(mark), a, b, c);
				break;
			case '600' : // 600 meters
				a = 0.348273;
				b = 156.5;
				c = 1.823;
				return calculateRunning(getSeconds(mark), a, b, c);
				break;
			case '800' : // 800 meters
				a = 0.160027;
				b = 231;
				c = 1.836;
				return calculateRunning(getSeconds(mark), a, b, c);
				break;
			case '1000' : // 1.000 meters
				a = 0.08713;
				b = 305.5;
				c = 1.85;
				return calculateRunning(getSeconds(mark), a, b, c);
				break;
			case '1500' : // 1.500 meters
				a = 0.03768;
				b = 480;
				c = 1.85;
				return calculateRunning(getSeconds(mark), a, b, c);
				break;
			case '60H' : // 60 meter hurdles
				a = 20.5173;
				b = 15.5;
				c = 1.92;
				return calculateRunning(getSeconds(mark), a, b, c);
				break;
			case '80H' : // 80 meter hurdles
				a = 11.1075;
				b = 20.7;
				c = 1.92;
				return calculateRunning(getSeconds(mark), a, b, c);
				break;
			case '110H' : // 110 meter hurdles
				a = 5.74352;
				b = 28.5;
				c = 1.92;
				return calculateRunning(getSeconds(mark), a, b, c);
				break;
			case 'HJ' : // High jump
				a = 0.8465;
				b = 75;
				c = 1.42;
				return calculateField(getCentimeters(mark), a, b, c);
				break;
			case 'PV' : // Pole vault
				a = 0.2797;
				b = 100;
				c = 1.35;
				return calculateField(getCentimeters(mark), a, b, c);
				break;
			case 'LJ' : // Long jump
				a = 0.14354;
				b = 220;
				c = 1.40;
				return calculateField(getCentimeters(mark), a, b, c);
				break;
			case 'SP' : // Shot put
				a = 51.39;
				b = 1.5;
				c = 1.05;
				return calculateField(getMeters(mark), a, b, c);
				break;
			case 'DT' : // Discus throw
				a = 12.91;
				b = 4;
				c = 1.10;
				return calculateField(getMeters(mark), a, b, c);
				break;
			case 'JT' : // Javelin throw
				a = 10.14;
				b = 7;
				c = 1.08;
				return calculateField(getMeters(mark), a, b, c);
				break;
			case 'HT' : // Hammer throw
				a = 13.0449;
				b = 7;
				c = 1.05;
				return calculateField(getMeters(mark), a, b, c);
				break;
			default :
				return null;
				break;
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
				break;
			case '200' : // 200 meter
				a = 4.99087;
				b = 42.5;
				c = 1.81;
				return calculateRunning(getSeconds(mark), a, b, c);
				break;
			case '400' : // 400 meter
				a = 1.34285;
				b = 91.7;
				c = 1.81;
				return calculateRunning(getSeconds(mark), a, b, c);
				break;
			case '600' : // 600 meter
				a = 0.264892;
				b = 176.6;
				c = 1.85;
				return calculateRunning(getSeconds(mark), a, b, c);
				break;
			case '800' : // 800 meter
				a = 0.11193;
				b = 254;
				c = 1.88;
				return calculateRunning(getSeconds(mark), a, b, c);
				break;
			case '1500' : // 1.500 meter
				a = 0.02883;
				b = 535;
				c = 1.88;
				return calculateRunning(getSeconds(mark), a, b, c);
				break;
			case '60H' : // 60 meter hurdles
				a = 20.0479;
				b = 17;
				c = 1.835;
				return calculateRunning(getSeconds(mark), a, b, c);
				break;
			case '80H' : // 80 meter hurdles
				a = 12.9828;
				b = 21.9;
				c = 1.835;
				return calculateRunning(getSeconds(mark), a, b, c);
				break;
			case '100H' : // 100 meter hurdles
				a = 9.23076;
				b = 26.7;
				c = 1.835;
				return calculateRunning(getSeconds(mark), a, b, c);
				break;
			case 'HJ' : // High jump
				a = 1.84523;
				b = 75;
				c = 1.348;
				return calculateField(getCentimeters(mark), a, b, c);
				break;
			case 'PV' : // Pole vault
				a = 0.44125;
				b = 100;
				c = 1.35;
				return calculateField(getCentimeters(mark), a, b, c);
				break;
			case 'LJ' : // Long jump
				a = 0.188807;
				b = 210;
				c = 1.41;
				return calculateField(getCentimeters(mark), a, b, c);
				break;
			case 'SP' : // Shot put
				a = 56.0211;
				b = 1.5;
				c = 1.05;
				return calculateField(getMeters(mark), a, b, c);
				break;
			case 'DT' : // Discus throw
				a = 12.3311;
				b = 3;
				c = 1.10;
				return calculateField(getMeters(mark), a, b, c);
				break;
			case 'JT' : // Javelin throw
				a = 15.9803;
				b = 3.8;
				c = 1.04;
				return calculateField(getMeters(mark), a, b, c);
				break;
			case 'HT' : // Hammer throw
				a = 17.5458;
				b = 6;
				c = 1.05;
				return calculateField(getMeters(mark), a, b, c);
				break;
			default :
				return null;
				break;
		}
	}
	else
		return null;
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
	var i;
	var mySeconds = 0;
	var tempTime = StrReverse(mark);
	var timeArray = tempTime.split(':')		// reverse the time string and split it at the colons
	
	for (i = 0; i < timeArray.length; i++)
		mySeconds += StrReverse(timeArray[i]) * Math.pow(60, i)
	
	return mySeconds;
}

function getMeters(mark) {
	return mark;
}


function getCentimeters(mark) {
	return mark * 100;
}

function StrReverse(str) {
	if (! str)
		return '';
	else
	{
		var revstr = '';
		for (i = str.length - 1; i >= 0; i--)
			revstr += str.charAt(i)
		
		return revstr;
	}
}
