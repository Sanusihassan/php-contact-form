<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $req = json_decode(file_get_contents('php://input'), true);
    $patterns = [
        "/.{3,}/",
        "/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/",
        "/^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/",
        "/.{10,}/"
    ];
    $errorMessages = [
        "your name must be more than 3 characters",
        "this must be a valid email address",
        "must be a valid phone number",
        "your message cannot be less than 10 characters"
    ];
    $i = 0;
    $err_res = [];
    foreach ($req as $key => $val) {
        if (!preg_match($patterns[$i], $val)) {
            $err_res[$key . "Error"] = $errorMessages[$i];
        }
        $i += 1;
    }
    header('Content-Type: application/json; charset=utf-8');
    if (!empty($err_res)) {
        header("HTTP/1.1 400");
        echo json_encode($err_res);
    } else {
        $m = $req['email'];
        $headers = "From $m \r\n";
        mail("sanusihassan122@gmail.com", "PHP Cntact Form", $req['message'], $headers);
        header("HTTP/1.1 200");
        echo json_encode($req);
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    echo "<h1>Welcome</h1>";
}
