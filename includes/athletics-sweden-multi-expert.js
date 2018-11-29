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
                console.log("Reading from db, id: " + object.id );
                resultList.push('\n    ' + JSON.stringify(object));
                var dbContentString = '{ "results": [' + resultList + '\n] }';
                $('textarea#db_area').val(dbContentString);
                $('#write_db').prop('disabled', false);
            });
        });
    }).finally(function () {
        db.close();
    });
}

function populateFileList() {
    $.ajax({
        url: "readDir.php",
        dataType: "text",
        data: {dir: "data"},
        async: true,
        success: function(string) {
            // Populate dropdown menu
            var selectFileString = '<select id="file_options" onchange="checkSelector()"><option value="">-- Select file... --</option>';
            var files = string.split(',');
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                if ( file ) {
                    selectFileString += '<option value="data/' + file +'">' + file + '</option>';
                }
            }
            selectFileString += '</select>';
            $('#file_selector').html(selectFileString);
        },
        error: function(xhr, status, error){
            var errorMessage = xhr.status + ': ' + xhr.statusText;
            console.log('Error - ' + errorMessage);
        }
    });    
}

function checkSelector() {
    // check to see if the file selector is a file
    if ($('#file_options').val()) {
        $('#read_file').prop('disabled', false);
    }
    else {
        $('#read_file').prop('disabled', true);        
    }
}

function readResultFile() {
    //Read the file name from the drop down list
    var file_name = $('#file_options').val();
    console.log("Reading: " + file_name);
    // Get the json data result file from disk. Easiest to do in PHP...
    $.ajax({
        url: "readDataFile.php",
        dataType: "json",
        data: {file_name: file_name},
        async: true,
        success: function(jsonObj) {
            $('textarea#db_area').val(JSON.stringify(jsonObj));
            $('#write_db').prop('disabled', false);
        },
        error: function(xhr, status, error){
            var errorMessage = xhr.status + ': ' + xhr.statusText;
            console.log('Error - ' + errorMessage);
        }
    });
}

function writeDB() {
    // Read the DB content from the Textarea
    var dbContentString = $('textarea#db_area').val();
    
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
        db.delete().then(function () {
            db = new Dexie("athletics-sweden-multi-dexie");
            db.version(2).stores({ results: 'id, event, name, competition, resultObj'});
            db.open().then(function () {
                dbInfo();
                clearDbArea();
            });
        });
            
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
    }
}

function clearConsole() {
    $('textarea#console_output').val('');
}

function clearDbArea() {
    $('textarea#db_area').val('');
    $('#write_db').prop('disabled', true);
}


function Console() {
    this.textarea = document.getElementById('console_output');
    this.log = function (txt, type) {
        if (type) {
            this.textarea.value += type + " ";
        }
        this.textarea.value += txt + "\n";
    }
    this.warn = function (txt) {
        // this.log(txt, "WARNING!");
    }
    this.error = function (txt) {
        this.log(txt, "ERROR!");
    }
}

function expert() {
    var title = 'Mångkamp - Expert - DB Read/Write';
    header(title);
    menu('');

    // Display info about the Database
    var expertString = 
        '<div class="w3-container w3-round-large w3-light-grey w3-margin">' +
        '<p></p>' +
        '<center>' +
        '<table border="0" cellpadding="2" cellspacing="2" width="1000px">' +
        '<tr><td align="left" valign="top"><b>DB Info:</b></td></tr>' +
        '<tr><td><textarea id="db_info" style="width: 1000px; height: 60px; font-size: 12px;" readonly></textarea></td></tr>' +
        '</table>' +
        '</center>' +
        '<p></p>' +
        '</div>';

    // Import and Export the Database
    expertString +=
        '<div class="w3-container w3-round-large w3-light-grey w3-margin">' +
        '<p></p>' +
        '<center>' +
        '<table border="0" cellpadding="2" cellspacing="2" width="1000px">' +
        '<tr><td align="left" valign="top"><b>DB Export and Import area:</b></td></tr>' +
        '<tr>' +
        '<td align="left"><button style="font-size:12px" title="Read from DB" onClick="readDB()"><b>Read from DB</b></button></td>' +
        '<td align="right"><i id="file_selector"></i>&nbsp;&nbsp;' +
        '<button id="read_file" style="font-size:12px" title="Read from File" onClick="readResultFile()" disabled><b>Read from file</b></button>' +
        '</td>' +        
        '</tr>' +
        '<tr>' +
        '<td colspan="2"><textarea id="db_area" style="width: 1000px; height: 200px; font-size: 12px;" placeholder="DB Export/Import area"></textarea></td>' +
        '</tr>' +        
        '<td align="left"><button id="write_db" style="font-size:12px title="Write to DB" onClick="writeDB()" disabled><b>Write to DB</b></button></td>' +
        '<td align="right"><button style="font-size:12px" title="Clear Export/Import area" onClick="clearDbArea()">Clear</button></td>' +
        '</tr>' +
        '</table>' +
        '</center>' +
        '<p></p>' +
        '</div>';

    // Console output
    expertString +=
        '<div class="w3-container w3-round-large w3-light-grey w3-margin">' +
        '<p></p>' +
        '<center>' +
        '<table border="0" cellpadding="2" cellspacing="2" width="1000px">' +
        '<tr><td align="left"><b>Console:</b></td></tr>' +
        '<tr><td><textarea id="console_output" style="width: 1000px; height: 200px; font-size: 12px;" readonly></textarea></td></tr>' +
        '<tr><td align="right"><button style="font-size:12px" title="Clear console" onClick="clearConsole()">Clear</button></td></tr>' +
        '</table>' +
        '</center>' +
        '<p></p>' +
        '</div>';
        
    // Advanced
    expertString +=
        '<div class="w3-container w3-round-large w3-light-grey w3-margin">' +
        '<p></p>' +
        '<center>' +
        '<table border="0" cellpadding="2" cellspacing="2" width="1000px">' +
        '<tr><td align="left" valign="top"><b>Advanced:</b></td></tr>' +
        '<tr>' +        
        '<td align="left"><button style="font-size:12px" title="Reset DB" onClick="resetDB()"><b>Reset DB</b></button></td>' +
        '<td align="left"><b>Note!</b> This will delete you local database and all connected data!</td>' +
        '</tr>' +
        '</table>' +
        '</center>' +
        '<p></p>' +
        '</div>';

    $('#expert').html(expertString);
    
    // Redirect console.log 
    window.console = new Console();

    populateFileList();
    dbInfo();
    footer();
}
