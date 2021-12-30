<?php
if ($token != "4a64b0b49c105e994c28fb8d5927b6a3") {
    header("Location: ../../");
    exit;
}
if ($tableHeadings == "") {
    $tableHeadings = $columnsToDisplay;
}
if ($columnsToDisplay == "") {
    echo "$columnsToDisplay must be set.";
    exit;
}
?>
<style>
table#dataTable td, 
table#dataTable th {
    border: 1px solid;
    padding: 2px 8px;
}

table#dataTable {
    border: 1px solid;
    border-collapse: collapse;
}

#main-content > div {
    margin: 0 auto;
    -moz-width: fit-content;
    width: fit-content;
}

#main-content > div h1 {
    text-align: center;
}
</style>
<div class="container">
<?php
echo "<h1>" . $title . " (" . $schoolName . ")</h1>";
//Database connection
$conn = new mysqli('localhost', 'scheplqs_localuser', 'localpassword', $db);
$outputString = "";
if ($conn -> connect_error) {
	die('Connection Failed : ' . $conn -> connect_error);
} else {
    $result = $conn -> query("SELECT " . implode(", ", $columnsToDisplay) . " FROM `puzzle`");
    if ($result -> num_rows > 0) {
        $outputString += "<table id=\"dataTable\"><thead><tr>";
        forEach ($tableHeadings as $colName) {
            $outputString += ("<th>" . $colName . "</th>");
        }
        $outputString += "</tr></thead><tbody>";
        while ($row = $result -> fetch_assoc()) {
            $outputString += "<tr>";
            forEach ($columnsToDisplay as $colName) {
                $outputString += ("<td>" . $row["$colName"] . "</td>");
            }
            $outputString += "</tr>";
        }
        $outputString += "</tbody></table>";
        echo $outputString;
    }
}
?>
</div>