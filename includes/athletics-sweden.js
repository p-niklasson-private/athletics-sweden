function initiateData() {
    dbGetJsonData();
    //sessionGetJsonData();
}


function sessionStoreJsonData() {
    // Store the json data in local sessionStorage
    var today = new Date().toJSON().slice(0,10);
    if (sessionStorage) {
        console.log("Storing new data for '" + docs + "' in sessionStorage: " + today)
        sessionStorage.setItem(docs, data.toJSON());
        sessionStorage.setItem("date_" + docs, today);
    }
}

function sessionGetJsonData(){
    // Get json data from local sessionStorage
    record = {data: sessionStorage.getItem(docs), date: sessionStorage.getItem("date_" + docs)};
    getData(record);
}

function dbStoreJsonData() {
    // Store the json data in indexexedDB
    var today = new Date().toJSON().slice(0,10);
    console.log("Storing new data for '" + docs + "' in indexedDB Storage: " + today)
    var db = new ydn.db.Storage('athletics-stats');
    db.put('athletics-stats', {date: today, data: data.toJSON()}, docs);
}

function dbGetJsonData(){
    // Get json data from indexedDB
    var db = new ydn.db.Storage('athletics-stats');
    var req = db.get('athletics-stats', docs);
    req.done(function(record) {
        getData(record);
    });
    req.fail(function(e) {
        console.log(e.message);
    });
}

function fileStoreJsonData() {
    // Store the json data in an external file
    var jsonData = new FormData();
    jsonData.append("data" , data.toJSON());
    var xhr = new XMLHttpRequest();
    xhr.open( 'post', 'writeDataFile.php', true );
    xhr.send(jsonData);
}

function fileGetJsonData(file_name) {
    // Get the generated json data file from disc. easiest to do in PHP...
    var jsonData, result;
    $.ajax({
       url: "readDataFile.php",
       dataType: "json",
       data: {file_name: file_name},
       async: true,
       success: function(result) {
           jsonData = result;
           data = new google.visualization.DataTable(jsonData);
           finished();
       }
    });
}

function filter(container, column, name) {
    var filter = new google.visualization.ControlWrapper({
          'controlType': 'CategoryFilter',
          'containerId': container,
          'options': {
            'filterColumnIndex': column,
            'ui': {'selectedValuesLayout': 'belowStacked', 'label': ''}
          }
        });
    if (localStorage) {
        var value = localStorage.getItem(name);
        if (value) {
            filter.setState({'selectedValues': value.split(",")});
        }
    }
    return filter;
}

function storeFilter(filter, name) {
    if (localStorage) {
        var values = filter.getState()['selectedValues'];
        localStorage.setItem(name, values);
        console.log("Stored values: " + name + ":" + values);
    }
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

function menu() {
    var option_1 = '';  // Resultat
    var option_2 = '';  // Personbästa
    var option_3 = '';  // Statistik
    var option_31 = ''; // Trender
    var option_32 = ''; // Födelseår
    var option_33 = ''; // Grenar
    var option_34 = ''; // Tävlingar
    var option_35 = ''; // Könsfördelning
    var option_4 = '';  // Kartor
    var option_41 = ''; // Inomhus 2016-2017
    var option_42 = ''; // Utomhus 2016
    var option_43 = ''; // Utomhus 2017
    var option_44 = ''; // Inomhus 2017-2018
    var option_5 = ''; // Namnlista
    var option_6 = ''; // Klubbrekord
    var option_7 = ''; // Utrustning
    var option_8 = ''; // Årsbästa Sverige
    var active = 'class="w3-red"';
    
    for (i = 0; i < arguments.length; i++) {
        if (arguments[i] == '1') { option_1 = active; }
        if (arguments[i] == '2') { option_2 = active; }
        if (arguments[i] == '3') { option_3 = active; }
        if (arguments[i] == '31') { option_31 = active; }
        if (arguments[i] == '32') { option_32 = active; }
        if (arguments[i] == '33') { option_33 = active; }
        if (arguments[i] == '34') { option_34 = active; }
        if (arguments[i] == '35') { option_35 = active; }
        if (arguments[i] == '4') { option_4 = active; }
        if (arguments[i] == '41') { option_41 = active; }
        if (arguments[i] == '42') { option_42 = active; }
        if (arguments[i] == '43') { option_43 = active; }
        if (arguments[i] == '44') { option_44 = active; }
        if (arguments[i] == '5') { option_5 = active; }
        if (arguments[i] == '6') { option_6 = active; }
        if (arguments[i] == '7') { option_7 = active; }
        if (arguments[i] == '8') { option_8 = active; }
    }  
      
    var menuString = 
        '<ul class="w3-navbar w3-round-large w3-light-grey w3-medium w3-margin">' +
        '<li></li>' +
        '<li><a ' + option_1 + 'href="index.html"><i class="fa fa-list"></i> Alla resultat</a></li>' +
        '<li><a ' + option_2 + 'href="pb.html?badges=true"><i class="fa fa-trophy"></i> Personbästa</a></li>' +
        '<li><a ' + option_6 + 'href="records.html"><i class="fa fa-trophy"></i> Klubbrekord</a></li>' +
        '<li><a ' + option_8 + 'href="year-best.html"><i class="fa fa-trophy"></i> Årsbästa Sverige</a></li>' +
        '<li class="w3-dropdown-hover">' +
          '<a ' + option_3 + ' href="#"><i class="fa fa-bar-chart"></i> Statistik <i class="fa fa-caret-down"></i></a>' +
          '<div class="w3-dropdown-content w3-white w3-card-4">' +
            '<a ' + option_31 + 'href="trends.html"><i class="fa fa-line-chart"></i> Resultat, trender per tävlande och gren</a>' +
            '<a ' + option_32 + 'href="stats.html?graph=1"><i class="fa fa-pie-chart"></i> Födelseår</a>' +
            '<a ' + option_33 + 'href="stats.html?graph=2"><i class="fa fa-pie-chart"></i> Populära grenar</a>' +
            '<a ' + option_34 + 'href="stats.html?graph=3"><i class="fa fa-pie-chart"></i> Populära tävlingar</a>' +
            '<a ' + option_35 + 'href="stats.html?graph=4"><i class="fa fa-pie-chart"></i> Könsfördelning</a>' +
          '</div>' +
        '</li>' +    
        '<li class="w3-dropdown-hover">' +
          '<a ' + option_4 + 'href="#"><i class="fa fa-map-o"></i> Kartor <i class="fa fa-caret-down"></i></a>' +
          '<div class="w3-dropdown-content w3-white w3-card-4">' +
            '<a ' + option_44 + 'href="map.html?map=4"><i class="fa fa-map-marker"></i> Inomhustävlingar 2017-2018</a>' +
            '<a ' + option_43 + 'href="map.html?map=3"><i class="fa fa-map-marker"></i> Utomhustävlingar 2017</a>' +
            '<a ' + option_41 + 'href="map.html?map=1"><i class="fa fa-map-marker"></i> Inomhustävlingar 2016-2017</a>' +
            '<a ' + option_42 + 'href="map.html?map=2"><i class="fa fa-map-marker"></i> Utomhustävlingar 2016</a>' +
          '</div>' +
        '</li>' +
        '<li><a ' + option_5 + 'href="names.html"><i class="fa fa-user"></i> Namnlista</a></li>' +
        '<li><a ' + option_7 + 'href="gear.html"><i class="fa fa-circle"></i> Utrustning</a></li>' +
        '<li class="w3-dropdown-hover">' +
          '<a href="#"><i class="fa fa-link"></i> Länkar <i class="fa fa-caret-down"></i></a>' +
          '<div class="w3-dropdown-content w3-white w3-card-4">' +
            '<a href="m"><i class="fa fa-link"></i> Mobilversion</a>' +
            '<a href="https://hanvikenssk.myclub.se/friidrott" target="_blank"><i class="fa fa-link"></i> Hanviken SK friidrott</a>' +
            '<a href="http://friidrott.se" target="_blank"><i class="fa fa-link"></i> Friidrott.se</a>' +
            '<a href="http://www.friidrott.se/getattachment/Regler/nytt14/nyaregler2014.pdf.aspx" target="_blank"><i class="fa fa-link"></i> Friidrottsregler, redskap och grenprogram</a>' +
            '<a href="http://www.friidrott.se/Regler/umangkpoang.aspx" target="_blank"><i class="fa fa-link"></i> Poängtabeller mångkamp</a>' +
          '</div>' +
        '</li>' +
      '</ul>';
    document.getElementById('menu').innerHTML = menuString;
}

