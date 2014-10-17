<?php
//require_once 'src/Google_Client.php';
//require_once 'src/contrib/Google_CalendarService.php';
require_once '../server/DatabaseUtil.php';
session_start();
error_reporting(E_ERROR | E_PARSE);

require_once "src/Google_Client.php";
require_once "src/contrib/Google_CalendarService.php";

$apiClient = new Google_Client();
$apiClient->setClientId('394202540627-eq1e2nc5vlvfv067sbhr34gmt9jhneor.apps.googleusercontent.com');
$apiClient->setClientSecret('AcDafhJOcbuyq5lrmm4YCo6m');
$apiClient->setRedirectUri('http://tvmuttenz.square7.ch/google-cal-test/simple.php');
$apiClient->setUseObjects(true);
$service = new Google_CalendarService($apiClient);

if (isset($_SESSION['oauth_access_token'])) {
  	$apiClient->setAccessToken($_SESSION['oauth_access_token']);
} else {
  $token = $apiClient->authenticate($_GET["code"]);
  $_SESSION['oauth_access_token'] = $apiClient->getAccessToken();
}


$events = $service->events->listEvents($_GET["calendar"]);

while(true) {
  foreach ($events->getItems() as $event) {
      var_dump($event->start->dateTime);
	  echo "<br>";
	  //echo $event->getSummary(). "<br>";
  }
  $pageToken = $events->getNextPageToken();
  if ($pageToken) {
    $optParams = array('pageToken' => $pageToken);
    $events = $service->events->listEvents('primary', $optParams);
  } else {
    break;
  }
}