<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type");
header("Content-Type: application/json");
require '__common/request.php';
include_once '__common/blsapiset.php';

// OAuth2.0 Code
$code = $_POST["code"];

$res = curl_post($BLSAPI['root']."/oauth/token", array(
    "grant_type" => $BLSAPI['grant_type'],
    "client_id" => $BLSAPI['client_id'],
    "client_secret" => $BLSAPI['client_secret'],
    "redirect_uri" => $BLSAPI['redirect_uri'],
    "code" => $code
), array(
    "Accept" => "application/json"
));

//echo($res);
error_log($code);
error_log($res);

$json = array();

if (json_decode($res)->error == null) {
    $json["token"] = json_decode($res)->access_token;
    $json["status"] = true;
} else {
    $json["message"] = json_decode($res)->error . ": " . json_decode($res)->error_description;
    $json["status"] = false;
}

echo json_encode($json, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);
