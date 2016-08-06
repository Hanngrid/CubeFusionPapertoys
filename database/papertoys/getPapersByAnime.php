<?php
/**
 * Created by PhpStorm.
 * User: Enman
 * Date: 06/07/2016
 * Time: 19:38
 */
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include '../conectionData.php';

$conn = new mysqli($host, $user, $pass, $db);

$idAnime = $objData->idAnime;

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "
  SELECT
    *
  FROM
    papertoy
  WHERE
    anime = " . $idAnime;

$result = $conn->query($sql);
$rows = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $rows['papertoys'][] = $row;
    }
}

echo json_encode($rows);

$conn->close();