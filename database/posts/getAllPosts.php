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

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "
    SELECT
        p.id,
        p.title,
        p.shortTitle,
        p.category as categoryId,
        c.name as category,
        p.tags,
        p.text,
        p.author,
        p.creationDate
    FROM
        post p,
        post_category c
    WHERE
        p.category = c.id
 ";

$result = $conn->query($sql);
$rows = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $rows['posts'][] = $row;
    }
}

echo json_encode($rows);

$conn->close();