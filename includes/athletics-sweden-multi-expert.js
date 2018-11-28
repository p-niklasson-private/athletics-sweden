function dbInfo() {
    var db = new Dexie("athletics-sweden-multi-dexie");
    var dbInfoString = '';
    db.open().then(function () {
        dbInfoString +=
            "var db = new Dexie('" + db.name + "');\n" +
            "db.version(" + db.verno + ").stores({";
        db.tables.forEach(function (table, i) {
            var primKeyAndIndexes = [table.schema.primKey].concat(table.schema.indexes);
            var schemaSyntax = primKeyAndIndexes.map(function (index) { return index.src; }).join(',');
            dbInfoString += " " + table.name + ": " + "'" + schemaSyntax + "'" + (i < db.tables.length - 1 ? "," : "");
        });
        dbInfoString += " });\n";
        $('textarea#db_info').val(dbInfoString);
    }).finally(function () {
        db.close();
    });  
}

function readDB() {
    var db = new Dexie("athletics-sweden-multi-dexie");
    var resultList = []; 
    db.open().then(function () {
        db.tables.forEach(function (table, i) {
            table.each(function (object) {
                resultList.push('\n    ' + JSON.stringify(object));
                var dbContentString = '{ "results": [' + resultList + '\n] }';
                $('textarea#db_content').val(dbContentString);
            });
        });
    }).finally(function () {
        db.close();
    });
}

function readResultFile(file_name) {
    console.log("Reading: " +file_name);
    // Get the json data result file from disk. Easiest to do in PHP...
    $.ajax({
        url: "readDataFile.php",
        dataType: "json",
        data: {file_name: file_name},
        async: true,
        success: function(jsonObj) {
            $('textarea#db_content').val(JSON.stringify(jsonObj));
        },
        error: function(xhr, status, error){
            var errorMessage = xhr.status + ': ' + xhr.statusText;
            console.log('Error - ' + errorMessage);
     }
    });
}

function writeDB() {
    // Read the DB content from the Textarea
    var dbContentString = $('textarea#db_content').val();
    
    // Parse the string to JSON and write the data to the database
    try { 
        var resultsJson = JSON.parse(dbContentString);
    } catch (e) {
        console.log (e);
    }
    var resultList = resultsJson.results;
    resultList.forEach(function(result) {
        dbStoreResults(result.id, result.event, result.name, result.competition, result.resultObj);
    });
}

function resetDB() {
    // If everything goes completely wrong, we might need to delete the whole DB and local data storage
    if (confirm("Do you really want to delete the database \'athletics-sweden-multi-dexie\' and all related data?")) {
        console.log("Delete indexedDB 'athletics-sweden-multi-dexie'");
        var db = new Dexie("athletics-sweden-multi-dexie");
        db.delete();
    
        // Also delete the localStorage data
        if (localStorage) {
            var eventsArray = getEvents();
            for (var i = 0; i < eventsArray.length; i++) {
                var event = eventsArray[i];
                if (localStorage.getItem(event)) {
                    console.log("Delete localStorage item '" + event + "'");
                    localStorage.removeItem(event);
                }
            }
        }
        
        // Recreate an empty DB
        var db = new Dexie("athletics-sweden-multi-dexie");
        db.version(2).stores({ results: 'id, event, name, competition, resultObj'});
        db.open().then(function () {
            // Rewrite the expert page
            dbInfo();
            $('textarea#db_content').val('{ "results": [] }');
        });
    }
}

function clearConsole() {
    $('textarea#console_output').val('');
}

function Console() {
    this.textarea = document.getElementById('console_output');
    this.log = function (txt, type) {
        if (type) {
            this.textarea.value += type + " ";
        }
        this.textarea.value += txt + "\n";
    }
    this.error = function (txt) {
        this.log(txt, "ERROR!");
    }
}

function expert() {
    var title = 'Mångkamp - Expert - DB Read/Write';
    header(title);
    menu('');
    var expertString = 
        '<div class="w3-container w3-round-large w3-light-grey w3-margin">' +
        '<p></p>' +
        '<center>' +
        '<table border="0" cellpadding="2" cellspacing="2" width="95%">';
        
    // Display info about the Database
    expertString +=
        '<tr>' +
        '<td align="right" valign="top"><b>DB Info:</b></td>' +
        '<td><textarea id="db_info" style="width: 1000px; height: 60px; font-size: 12px;" readonly></textarea></td>' +
        '</tr>';

    // Import and Export the Database
    expertString +=
        '<tr>' +
        '<td align="right" valign="top"><b><input type="button" style="font-size:12px" title="Read from DB" onClick="readDB()" value="Read DB >>"></b></td>' +
        '<td rowspan="2"><textarea id="db_content" style="width: 1000px; height: 200px; font-size: 12px;">{ "results": [] }</textarea></td>' +
        '</tr>' +
        '<tr>' +        
        '<td align="right" valign="top"><b><input type="button" style="font-size:12px" title="Write to DB" onClick="writeDB()" value="Write DB <<"></b></td>' +
        '</tr>';

    // Console output
    expertString +=
        '<tr>' +
        '<td align="right" valign="top"><b>Console:</b></td>' +
        '<td rowspan="2"><textarea id="console_output" style="width: 1000px; height: 120px; font-size: 12px;" readonly></textarea></td>' +
        '</tr>' +
        '<tr>' +
        '<td align="right"><input type="button" style="font-size:12px" title="Clear console" onClick="clearConsole()" value="Clear console"></td>' +
        '</tr>';

    // Reset DB
    expertString +=
        '<tr><td></td></tr>' +
        '<tr>' +        
        '<td align="right"><b><input type="button" style="font-size:12px" title="Reset DB" onClick="resetDB()" value="Reset DB"></b></td>' +
        '<td align="left"><b>Note!</b> This will delete you local database and all connected data!</td>' +
        '</tr>';
        
    expertString +=    
        '</table>' +
        '</center>' +
        '<p></p>' +
        '</div>';

    $('#expert').html(expertString);
    
    // Redirect console.log 
    window.console = new Console();

    dbInfo();
    readDB();
    footer();
    readResultFile("data/records.json");
}
