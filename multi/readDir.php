<?php
if (isset($_GET['dir'])) {
    $dir = $_GET['dir'];

    // Open a directory, and read its contents
    if (is_dir($dir)){
        if ($dh = opendir($dir)){
            while (($file = readdir($dh)) !== false){
                if ( $file != '.' && $file != '..') {
                    echo $file . ",";
                }
            }
            closedir($dh);
        }
    }
}
?>
