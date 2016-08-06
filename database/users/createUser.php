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

$name = $objData->name;
$lastName = $objData->lastName;
$email = $objData->email;
$age = $objData->age;
$birthDate = $objData->birthDate;
$nickName = $objData->nickName;
$password = $objData->password;
$twitter = $objData->twitter;
$facebook = $objData->facebook;
$myAnimeList = $objData->myAnimeList;
$youtube = $objData->youtube;
$avatar = $objData->avatar;

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "
    INSERT INTO
      user (name, lastName, email, age, birthDate, nickName, password, twitter, facebook, myAnimeList, youtube, avatar)
    VALUES
      ('" . $name . "', '" . $lastName . "', '" . $email . "', '" . $age . "', '" . $birthDate . "', '" . $nickName . "',
      '" . $password . "', '" . $twitter . "', '" . $facebook . "', '" . $myAnimeList . "', '" . $youtube . "', '" . $avatar . "' )
 ";

$result = $conn->query($sql);
$rows = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $rows['users'][] = $row;
    }
}

echo json_encode($rows);

$conn->close();