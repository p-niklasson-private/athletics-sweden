function initiateData() {
    dbGetJsonData();
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
    var option_1 = '';  // Hämta Resultat
    var option_2 = '';  // Sprintkalkylator

    var active = 'class="w3-red"';

    for (i = 0; i < arguments.length; i++) {
        if (arguments[i] == '1') { option_1 = active; }
        if (arguments[i] == '2') { option_2 = active; }
    }

    var menuString =
    '<ul class="w3-navbar w3-round-large w3-light-grey w3-medium w3-margin">' +
    '<li></li>' +
    '<li><a ' + option_1 + ' href="results.html"><i class="fa fa-list"></i> Hämta resultat</a></li>' +
    '<li><a ' + option_2 + ' href="SprintCalculator.html"><i class="fa fa-calculator"></i> Sprintkalkylator</a></li>' +
    '<li class="w3-dropdown-hover">' +
    '<a href="#"><i class="fa fa-link"></i> Länkar <i class="fa fa-caret-down"></i></a>' +
    '<div class="w3-dropdown-content w3-white w3-card-4">' +
    '<a href="https://hanvikenssk.myclub.se/friidrott" target="_blank"><i class="fa fa-link"></i> Hanviken SK friidrott</a>' +
    '<a href="http://friidrott.se" target="_blank"><i class="fa fa-link"></i> Friidrott.se</a>' +
    '</div>' +
    '</li>' +
    '</ul>';
    document.getElementById('menu').innerHTML = menuString;
}
