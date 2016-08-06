<?php
/**
 * Created by PhpStorm.
 * User: Enman
 * Date: 06/07/2016
 * Time: 19:38
 */
header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json; charset=UTF-8");
include '../conectionData.php';

$conn = new mysqli($host, $user, $pass, $db);

$idPaper = $objData->id;
$anime = $objData->anime;
$name = $objData->name;
$status = $objData->status;
$style = $objData->style;
$parts = $objData->parts;
$image = $objData->image;
$model = $objData->model;
$download = $objData->download;
$order = $objData->order;

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "
    UPDATE
      papertoy p
    SET
      p.anime = '" . $anime . "',
      p.name = '" . $name . "',
      p.status = '" . $status . "',
      p.style = '" . $style . "',
      p.parts = '" . $parts . "',
      p.image = '" . $image . "',
      p.model = '" . $model . "',
      p.download = '" . $download . "',
      p.order = '" . $order . "'
    WHERE
      p.id = " . $idPaper;

$result = $conn->query($sql);
$rows = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $rows['papers'][] = $row;
    }
}

echo json_encode($rows);


$conn->close();