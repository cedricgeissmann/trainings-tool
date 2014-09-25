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


$calendarName = "Trainingtool";
//createCalendarForTrainingsTool($service);
//Now Autentificatet, can make operations on google calendar now.


$calendarList = $service->calendarList->listCalendarList();

echo "Select calendar to sync:<br>";

while(true) {
  foreach ($calendarList->getItems() as $calendarListEntry) {
	echo "<a href='syncCalendar.php?calendar=".$calendarListEntry->getId()."' >".$calendarListEntry->getSummary()."</a>";
	echo "<br>";
  }
  $pageToken = $calendarList->getNextPageToken();
  if ($pageToken) {
    $optParams = array('pageToken' => $pageToken);
    $calendarList = $service->calendarList->listCalendarList($optParams);
  } else {
    break;
  }
}

echo "<br><br><br>";


$events = $service->events->listEvents('primary');

while(true) {
  foreach ($events->getItems() as $event) {
      var_dump($event->start->date);
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




/*$client = new Google_Client();
$client->setApplicationName("Google Calendar PHP Starter Application");

// Visit https://code.google.com/apis/console?api=calendar to generate your
// client id, client secret, and to register your redirect uri.
$client->setClientId('394202540627-eq1e2nc5vlvfv067sbhr34gmt9jhneor.apps.googleusercontent.com');
$client->setClientSecret('AcDafhJOcbuyq5lrmm4YCo6m');
$client->setRedirectUri('http://tvmuttenz.square7.ch/google-cal-test/simple.php');
//$client->setDeveloperKey('4/xty9YtKjruW2e8eo8ncQ3jQWYY5-.kmeF0curbKwbOl05ti8ZT3at1yyZjQI');
$cal = new Google_CalendarService($client);
if (isset($_GET['logout'])) {
  unset($_SESSION['token']);
}

if (isset($_GET['code'])) {
  $client->authenticate($_GET['code']);
  $_SESSION['token'] = $client->getAccessToken();
  header('Location: http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF']);
}

if (isset($_SESSION['token'])) {
  $client->setAccessToken($_SESSION['token']);
}

if ($client->getAccessToken()) {
  //$calList = $cal->calendarList->listCalendarList();
  //print "<h1>Calendar List</h1><pre>" . print_r($calList, true) . "</pre>";
  //$res = DatabaseUtil::executeQuery("SELECT * FROM training")
	$event = new Google_Event();
  $event->setSummary('Halloween');
  $event->setLocation('The Neighbourhood');
  $start = new Google_EventDateTime();
  $start->setDateTime('2014-07-01T10:00:00.000-05:00');
  $event->setStart($start);
  $end = new Google_EventDateTime();
  $end->setDateTime('2014-07-01T10:25:00.000-05:00');
  $event->setEnd($end);
  //$createdEvent = $cal->events->insert('394202540627-eq1e2nc5vlvfv067sbhr34gmt9jhneor.apps.googleusercontent.com', $event);

	//$createdEvent = $cal->events->insert('primary', $event);

	//echo $createdEvent->getId();


	$calendarList = $cal->calendarList->listCalendarList();

while(true) {
  foreach ($calendarList->getItems() as $calendarListEntry) {
    echo $calendarListEntry->getSummary();
  }
  $pageToken = $calendarList->getNextPageToken();
  if ($pageToken) {
    $optParams = array('pageToken' => $pageToken);
    $calendarList = $cal->calendarList->listCalendarList($optParams);
  } else {
    break;
  }
}
	
	
	//echo eventlist
	$events = $cal->events->listEvents('primary');

	while(true) {
  		foreach ($events->getItems() as $event) {
    		echo $event->getSummary();
  		}
  		$pageToken = $events->getNextPageToken();
  		if ($pageToken) {
    		$optParams = array('pageToken' => $pageToken);
    		$events = $cal->events->listEvents('primary', $optParams);
  		} else {
    		break;
  		}
	}
	
	
	$_SESSION['token'] = $client->getAccessToken();
} else {
  $authUrl = $client->createAuthUrl();
  print "<a class='login' href='$authUrl'>Connect Me!</a>";
}*/