<?php
include_once '__common/header.php';

$json = array(
    "status" => true,
    "info" => array(
        "name" => "XiaMoHuaHuo_CN",
        "mail" => "mail@huahuo-cn.tk",
    ),
);

echo json_encode($json, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);