<?php
header("Content-Type: application/json");

$json = array(
    "status" => true,
    "message" => "Hello! ╭映水╯守护进程 (EnShii-Daemon) Running!"
);

echo json_encode($json, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);