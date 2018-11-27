$(function() {

    $("#flip_charts").click(function(){
        $("#charts_panel").slideToggle("slow");
        $("i", this).toggleClass("fa fa-caret-down fa fa-caret-up");
    });
    
});

function w3_open() {
    $("#sidenav").show();
}

function w3_close() {
    $("#sidenav").hide();
}

function option(item, active) {
    if (active.indexOf(item) >= 0) {
        return 'class="w3-red"';
    }
    else {
        return '';
    }
}

function setActiveItem(id, event) {
    if (localStorage) {
        localStorage.setItem(event, id);
    }
}

function getActiveItem(event) {
    if (localStorage) {
        return localStorage.getItem(event);
    }
}

function menu(active) {
    var menuString =
    '<nav class="w3-sidenav w3-card-2 w3-white w3-top" style="width:200px;display:none;right:0;z-index:2" id="sidenav">' +
    '<div class="w3-container w3-theme-d2">' +
    '<span onclick="w3_close()" class="w3-closenav w3-right w3-xlarge"><i class="fa fa-close"></i></span>' +
    '</div>' +
    '<br>' +
    '<a href="../index.html"><i class="fa fa-home"></i>  Hem</a>' +
    '<a href="#">=====================</a>' +
    '<a ' + option('m_start', active)  + ' href="index.html?event=m_start"><i class="fa fa-trophy"></i>  Mångkamp - Start</a>' +
    '<a href="#">=====================</a>' +
    '<a ' + option('m_cast', active)   + ' href="index.html?event=m_cast"><i class="fa fa-mars"></i>&nbsp;&nbsp;Män Castorama</a>' +
    '<a ' + option('m_10', active)     + ' href="index.html?event=m_10"><i class="fa fa-mars"></i>&nbsp;&nbsp;Män 10-kamp</a>' +
    '<a ' + option('m_7i', active)     + ' href="index.html?event=m_7i"><i class="fa fa-mars"></i>&nbsp;&nbsp;Män 7-kamp (i)</a>' +
    '<a ' + option('p17_10', active)   + ' href="index.html?event=p17_10"><i class="fa fa-mars"></i>&nbsp;&nbsp;P17 10-kamp</a>' +
    '<a ' + option('p17_7i', active)   + ' href="index.html?event=p17_7i"><i class="fa fa-mars"></i>&nbsp;&nbsp;P17 7-kamp (i)</a>' +
    '<a ' + option('p15_8', active)    + ' href="index.html?event=p15_8"><i class="fa fa-mars"></i>&nbsp;&nbsp;P15 8-kamp</a>' +
    '<a ' + option('p15_7i', active)   + ' href="index.html?event=p15_7i"><i class="fa fa-mars"></i>&nbsp;&nbsp;P15 7-kamp (i)</a>' +
    '<a href="#">=====================</a>' +
    '<a ' + option('w_cast', active)   + ' href="index.html?event=w_cast"><i class="fa fa-venus"></i>&nbsp;&nbsp;Kvinnor Castorama</a>' +
    '<a ' + option('w_7', active)      + ' href="index.html?event=w_7"><i class="fa fa-venus"></i>&nbsp;&nbsp;Kvinnor 7-kamp</a>' +
    '<a ' + option('w_5i', active)     + ' href="index.html?event=w_5i"><i class="fa fa-venus"></i>&nbsp;&nbsp;Kvinnor 5-kamp (i)</a>' +
    '<a ' + option('f17_5i', active)   + ' href="index.html?event=f17_5i"><i class="fa fa-venus"></i>&nbsp;&nbsp;F17 5-kamp (i)</a>' +
    '<a ' + option('f15_6', active)    + ' href="index.html?event=f15_6"><i class="fa fa-venus"></i>&nbsp;&nbsp;F15 6-kamp</a>' +
    '<a href="#">=====================</a>' +
    '<a ' + option('expert', active)   + ' href="expert.html"><i class="fa fa-database"></i>&nbsp;&nbsp;Expert DB admin</a>' +
    '</nav>' +
    '<div class="w3-container" style="margin-top:60px"> </div>';

    $('#menu').html(menuString);
}

function header(title) {
    var headerString =
    '<header class="w3-display-container w3-red w3-top" style="height:60px;width:100%">' +
    '<div class="w3-padding w3-display-left"><a href="https://hanvikenssk.myclub.se/friidrott" target="_blank"><img src="images/hanviken-rund.jpg" class="w3-circle" style="width:50px;height:50px;"></a></div>' +
    '<div class="w3-padding w3-display-middle"><h4><center>' + title + '</center></h4></div>' +
    '<div class="w3-padding w3-display-right"><h3><i class="w3-opennav fa fa-bars" onclick="w3_open()"></i></h3></div>' +
    '</header>';

    $('#header').html(headerString);
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
        '<td align="left"><b>Namn:</b></td>' +
        '<td colspan="2" align="center"><input type="text" id="name" size="16" placeholder="Ny post..." onchange="updateItem(\'' + event + '\', \'name\', this.value)" /></td>' +
        '</tr>' +
        '<tr>' +
        '<td align="left"><b>Tävling:</b></td>' +
        '<td colspan="2" align="center"><input type="text" id="competition" size="16" placeholder="Tävling..." onchange="updateItem(\'' + event + '\', \'competition\', this.value)" /></td>' +
        '<tr/>' +
        '<tr>' +
        '<tr><td colspan="3">&nbsp;</td></tr>' +
        '<tr>' +
        '<td align="left"><b>Gren:</b></td>' +
        '<td align="center"><b>Resultat:</b></td>' +
        '<td align="right"><b>Poäng:</b></td>' +
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
                '<td align="center"><input type="number" id="mark_' + subEvent + '" class="right-text" min="0.0" max="999.99" step="0.01" placeholder="0.00" onchange="updateItem(\'' + event + '\', \'' + subEvent + '\', this.value)" /></td>' +
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
        '</center>' +
        '<p></p>' +
        '</div>';
    }
    $('#content').html(contentString);
}

function footer() {
    var footerString =
    '<p></p>' +
    '<center>' +
    '<table border="0" cellpadding="2" cellspacing="0" width="95%">' +
    '<tr>' +
    '<td align="center">&copy; <a href="mailto:friidrott@niklassons.net">friidrott@niklassons.net</a></i></td>' +
    '</tr>' +
    '</table>' +
    '</center>' +
    '<p></p>';

    $('#footer').html(footerString);
}

function dbStoreResults(id, event, name, competition, resultObj) {
    console.log("Storing new data for '" + event + "' in indexedDB Storage:");
    var db = new Dexie("athletics-sweden-multi-dexie");
    db.version(2).stores({ results: 'id, event, name, competition, resultObj'});
    db.results.put({
        id: id,
		event: event,
        name: name,
        competition: competition,
        resultObj: resultObj
	});
}

function init(event) {
    var title = getEventTitle(event);
    header(title);
    menu(event);
    content(event);
    if (event == 'm_start') {
        $('#charts').html('');
    }
    footer();

    if (event != 'm_start') {
        var id = getActiveItem(event);
        if (id != null) {
            console.log('Found item with id ' + id + '...');
            displayItem(id, event);
        }
        else { 
            console.log('Found no results in DB. Creating new item for ' + event + '...');
            newItem(event);
        }
        populateData(event)
    }
}

function newItem(event) {
    var id = String(Date.now());
    console.log('Creating id \'' + id + '\'');
    var resultObj = {};
    var name = '';
    var competition = '';
    var eventsArray = getSubEvents(event);
    for (var i = 0; i < eventsArray.length; i++) {
        var subEvent = eventsArray[i];
        if (subEvent == 'break') { continue; }
        resultObj[subEvent] = '';
    }
    dbStoreResults(id, event, name, competition, resultObj);
    setItem(id, event);
}

function deleteItem(event) {
    var id = getActiveItem(event);
    var db = new Dexie("athletics-sweden-multi-dexie");
    var deleteOk = false;
    db.version(2).stores({ results: 'id, event, name, competition, resultObj'});
    db.results.get(id, function (results) {
        
        // If the data item has a name, check if it is OK to delete it
        if (results.name) {
            if (confirm("Vill du verkligen ta bort data för \'" + results.name + "\'?")) {
                deleteOk = true;
            }
        }
        
        // If the Item has no name, we just delete it without a warning
        else {
            deleteOk = true;
        }
        if (deleteOk) {
            // Delete the id
            console.log('Deleting id \'' + id + '\'');
            db.results.delete(id);
    
            // Find the last item for the event, and set it as active
            // If no item found, create a new item
            var resultCollection = db.results.where('event').equals(event);
            resultCollection.last(function(results) {
                if (results) {
                    setItem(results.id, event);
                }
                else {
                    newItem(event);
                }
            });
        }
    });
}

function updateItem(event, subEvent, mark) {
    var id = getActiveItem(event);
    console.log('Updating id \'' + id + '\'');
    var db = new Dexie("athletics-sweden-multi-dexie");
    db.version(2).stores({ results: 'id, event, name, competition, resultObj'});
    db.results.get(id, function (results) {
        if (subEvent == 'name') {
            results.name = mark;
        }
        else if (subEvent == 'competition') {
            results.competition = mark;
        }
        else {
            results.resultObj[subEvent] = mark;
        }
        dbStoreResults(id, event, results.name, results.competition, results.resultObj);
        setItem(id, event);
    });
}

function setItem(id, event) {
    displayItem(id, event);
    setActiveItem(id, event);
    populateData(event);
}

function displayItem(id, event) {
    var db = new Dexie("athletics-sweden-multi-dexie");
    db.version(2).stores({ results: 'id, event, name, competition, resultObj'});
    
    var buttonString1 =
        '<div class="w3-container w3-round-large w3-light-grey w3-margin">' +
        '<p></p>' +
        '<center>' +
        '<table border="0" width="320px">' +
        '<tr>' +
        '<td align="left"><a href="#" id="delete_item" title="Ta bort post" style="font-size:30px;color:red;" onClick="deleteItem(\'' + event +'\')"><i class="fa fa-minus-square-o"></i></a></td>' +
        '<td align="center">';
    var buttonString2 =
        '</td>' +
        '<td align="right"><a href="#" id="new_item" title="Lägg till ny post" style="font-size:30px;color:green;" onClick="newItem(\'' + event +'\')"><i class="fa fa-plus-square-o"></i></a></td>' +
        '</tr>' +
        '</table>' +
        '</center>' +
        '<p></p>' +
        '</div>';

    // Get all matching items to display as buttons
    var resultCollection = db.results.where('event').equals(event);
    var number = 1;
    resultCollection.each(function(results) {
        if (results.id == id) {
            // console.log('{' + results.id + ', ' + results.name + ', active}');
            buttonString1 += '<strong>&nbsp;<input type="button" style="font-size:14px" title="' + results.name + '" onClick="setItem(\'' + results.id + '\',\'' + event +'\')" value="' + number + '"></strong>';
        }
        else {
            // console.log('{' + results.id + ', ' + results.name + '}');
            buttonString1 += '&nbsp;<input type="button" style="font-size:12px" title="' + results.name + '" onClick="setItem(\'' + results.id + '\',\'' + event +'\')" value="' + number + '">';
        }
        number++;
        $('#buttons').html(buttonString1 + buttonString2); 
    });

    // Get details about the active item to be displayed
    db.results.get(id, function (results) {
        $('#name').val(results.name);
        $('#competition').val(results.competition);
        var totalPoints = 0;
        var eventsArray = getSubEvents(results.event);
        for (var i = 0; i < eventsArray.length; i++) {
            var subEvent = eventsArray[i];
            if (subEvent == 'break') { continue; }
            var mark = results.resultObj[subEvent];
            $('#mark_' + subEvent).val(mark);
            var points = doCalculation(results.event.charAt(0), subEvent, mark);
            $('#points_' + subEvent).html(points);
            totalPoints += points;
            $('#points_total').html(totalPoints);
        }
    });
}

function populateData(event) {
    populateChartData(event);
    populateTableData(event);
}

function populateChartData(event) {
    var db = new Dexie("athletics-sweden-multi-dexie");
    db.version(2).stores({ results: 'id, event, name, competition, resultObj'});
    var chartData = new google.visualization.DataTable();

    // Generate the first chart data column with all names of the events
    var rowIndex = 0;
    var columnIndex = 0;
    chartData.addColumn('string', 'Gren');
    var eventsArray = getSubEvents(event);
    for (var i = 0; i < eventsArray.length; i++) {
        var subEvent = eventsArray[i];
        if (subEvent == 'break') {
            continue;
        }
        var subEventTitle = getSubEventShortTitle(subEvent);
        chartData.addRow();
        chartData.setCell(rowIndex, columnIndex, subEventTitle);
        rowIndex++;
    }
    chartData.addRow();
    chartData.setCell(rowIndex, columnIndex, 'Totalt');
    
    // Create a new column in the chart data table for each individual Name    
    var resultCollection = db.results.where('event').equals(event);
    resultCollection.each(function(results) {
        // Only display data sets that has a name
        if (results.name) {
            var totalPoints = 0;
            var formattedValue;
            chartData.addColumn('number', results.name);
            columnIndex++;
            rowIndex = 0;
            for (var i = 0; i < eventsArray.length; i++) {
                var subEvent = eventsArray[i];
                if (subEvent == 'break') {
                    continue;
                }
                var mark = results.resultObj[subEvent];
                var points = doCalculation(event.charAt(0), subEvent, mark);
                totalPoints += points;
                if (points) {
                    formattedValue = mark + ': ' + points + 'p';
                }
                else {
                    formattedValue = "";
                }
                chartData.setCell(rowIndex, columnIndex, totalPoints, formattedValue, {'className': 'right-text'});
                rowIndex++;
            }
            chartData.setCell(rowIndex, columnIndex, totalPoints, totalPoints + 'p', {'className': 'right-text'});
            drawChart(chartData);
        }
    });
}
    
function populateTableData(event) {
    var db = new Dexie("athletics-sweden-multi-dexie");
    db.version(2).stores({ results: 'id, event, name, competition, resultObj'});
    var tableData = new google.visualization.DataTable();

    // Generate the data columns with all names of the events
    tableData.addColumn('string', 'Namn');
    var eventsArray = getSubEvents(event);
    for (var i = 0; i < eventsArray.length; i++) {
        var subEvent = eventsArray[i];
        if (subEvent == 'break') {
            continue;
        }
        var subEventTitle = getSubEventShortTitle(subEvent);
        tableData.addColumn('number', subEventTitle);
    }
    tableData.addColumn('number', 'Totalt');

    var rowIndex = 0;

    // Create a new column in the chart data table for each individual Name    
    var resultCollection = db.results.where('event').equals(event);
    resultCollection.each(function(results) {
        // Only display data sets that has a name
        if (results.name) {
            var totalPoints = 0;
            var formattedValue;
            var columnIndex = 0;
            tableData.addRow();
            tableData.setCell(rowIndex, columnIndex, results.name, '<b>' + results.name + '</b><br><i>' + results.competition + '</i>', {'className': 'right-text'});
            columnIndex++;

            for (var i = 0; i < eventsArray.length; i++) {
                var subEvent = eventsArray[i];
                if (subEvent == 'break') {
                    continue;
                }
                var mark = results.resultObj[subEvent];
                var points = doCalculation(event.charAt(0), subEvent, mark);
                totalPoints += points;
                if (points) {
                    formattedValue = '<b>' + mark + '</b><br><i>' + points + 'p</i>';
                }
                else {
                    formattedValue = "";
                }
                tableData.setCell(rowIndex, columnIndex, totalPoints, formattedValue, {'className': 'center-text'});
                columnIndex++;
            }
            tableData.setCell(rowIndex, columnIndex, totalPoints, '<b>' + totalPoints + 'p</b>', {'className': 'center-text'});
            rowIndex++;
            drawTable(tableData);
        }
    });        
}

function drawChart(chartData) {
    // Set chart options
    var options = {
            legend: { position: 'top' },
            pointSize: 10,
            pointShape: 'diamond',
            backgroundColor: { strokeWidth: 1 },
            hAxis: { showTextEvery: '1', slantedText: true },
            vAxis: { baseline: 0 },
            width: '500',
            height: '320',
            chartArea:{
                left:50,
                top: 60,
                width:'430',
                height: '200'
            }
    };

    // Instantiate and draw our chart, passing in some options.
    chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(chartData, options);
}

function drawTable(tableData) {
    table = new google.visualization.Table(document.getElementById('table_div'));
    table.draw(tableData, { allowHtml: true, showRowNumber: false });
}

function getEvents() {
    return new Array('m_cast','m_10','m_7i','p17_10','p17_7i','p15_8','p15_7i','w_cast','w_7','w_5i','f17_5i','f15_6');
}

function getEventTitle(event) {
    switch (event)
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
        

function getSubEvents(event) {
    switch (event)
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
        case '60' :   return "60 meter [s]:";
        case '100' :  return "100 meter [s]:";
        case '200' :  return "200 meter [s]:";
        case '300' :  return "300 meter [s]:";
        case '400' :  return "400 meter [s]:";
        case '600' :  return "600 meter [s]:";
        case '800' :  return "800 meter [s]:";
        case '1000' : return "1.000 meter [s]:"; 
        case '1500' : return "1.500 meter [s]:";
        case '60H' :  return "60 m häck [s]:"; 
        case '80H' :  return "80 m häck [s]:";
        case '100H' : return "100 m häck [s]:"; 
        case '110H' : return "110 m häck [s]:"; 
        case 'HJ' :   return "Höjdhopp [m]:"; 
        case 'PV' :   return "Stavhopp [m]:"; 
        case 'LJ' :   return "Längdhopp [m]:";
        case 'SP' :   return "Kula [m]:";
        case 'DT' :   return "Diskus [m]:";
        case 'JT' :   return "Spjut [m]:";
        case 'HT' :   return "Slägga [m]:";
    }
}

function getSubEventShortTitle(subEvent) {
    switch (subEvent)
    {
        case '60' :   return "60m";
        case '100' :  return "100m";
        case '200' :  return "200m";
        case '300' :  return "300m";
        case '400' :  return "400m";
        case '600' :  return "600m";
        case '800' :  return "800m";
        case '1000' : return "1.000m"; 
        case '1500' : return "1.500m";
        case '60H' :  return "60mH"; 
        case '80H' :  return "80mH";
        case '100H' : return "100mH"; 
        case '110H' : return "110mH"; 
        case 'HJ' :   return "Höjd"; 
        case 'PV' :   return "Stav"; 
        case 'LJ' :   return "Längd";
        case 'SP' :   return "Kula";
        case 'DT' :   return "Diskus";
        case 'JT' :   return "Spjut";
        case 'HT' :   return "Slägga";
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
    if ( ! mark || isNaN(points) ) {
        points = 0;
    }
    return points;
}

function calculateField(mark, a, b, c) {
    var points = Math.floor(a * Math.pow(mark - b, c));
    if ( ! mark || isNaN(points) ) {
        points = 0;
    }
    return points;
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


