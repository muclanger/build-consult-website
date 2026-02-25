<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Parse JSON body
$body = file_get_contents('php://input');
$data = json_decode($body, true);

// Validate required fields
$name    = isset($data['name'])    ? trim(strip_tags($data['name']))    : '';
$email   = isset($data['email'])   ? trim(strip_tags($data['email']))   : '';
$message = isset($data['message']) ? trim(strip_tags($data['message'])) : '';

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit;
}

// Prevent header injection
$name    = str_replace(["\r", "\n"], '', $name);
$email   = str_replace(["\r", "\n"], '', $email);

// Mail settings
$to      = 'info@buildconsult-realestate.ch';
$subject = 'Kontaktanfrage von ' . $name . ' – buildconsult-realestate.ch';
$body    = "Name: {$name}\nE-Mail: {$email}\n\nNachricht:\n{$message}";

$headers  = 'From: noreply@buildconsult-realestate.ch' . "\r\n";
$headers .= 'Reply-To: ' . $email . "\r\n";
$headers .= 'X-Mailer: PHP/' . phpversion();

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Mail could not be sent']);
}
