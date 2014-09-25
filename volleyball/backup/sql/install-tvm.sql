-- phpMyAdmin SQL Dump
-- version 3.4.11.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 13, 2013 at 11:30 PM
-- Server version: 5.5.32
-- PHP Version: 5.4.9-4ubuntu2.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `tvmuttenz`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE IF NOT EXISTS `address` (
  `aid` int(11) NOT NULL AUTO_INCREMENT,
  `street` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `street_number` int(4) NOT NULL,
  `city` varchar(255) CHARACTER SET latin1 NOT NULL,
  `zip` int(4) NOT NULL,
  PRIMARY KEY (`aid`),
  KEY `aid` (`aid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=10 ;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`aid`, `street`, `street_number`, `city`, `zip`) VALUES
(7, 'Strassburgerallee', 15, 'Basel', 4055),
(8, 'blabla', 2, 'blablabla', 4000),
(9, 'Musterstrasse', 2, 'Test', 1000);

-- --------------------------------------------------------

--
-- Table structure for table `checkout`
--

CREATE TABLE IF NOT EXISTS `checkout` (
  `username` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `trainingsid` int(8) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reason` text COLLATE utf8_unicode_ci NOT NULL,
  `type` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=89 ;

--
-- Dumping data for table `checkout`
--

INSERT INTO `checkout` (`username`, `trainingsid`, `id`, `reason`, `type`) VALUES
('camel', 32, 4, 'Kann nicht', 'training'),
('camel', 31, 5, 'Nur einmal pro Woche Training', 'training'),
('Fabian', 32, 6, 'Inter A Spiel in Laufen', 'training'),
('kevin', 35, 7, '', 'spiel'),
('Florian', 46, 8, 'Weihnachtsessen', 'training'),
('Cedi', 47, 9, 'SamichlausapÃ©ro', 'training'),
('kevin', 43, 10, '', 'training'),
('kevin', 37, 11, 'dieses spiel findet bekanntlich nicht statt, oder?', 'spiel'),
('Cedi', 48, 12, 'Gmeindversammlig, sorry.', 'training'),
('Florian', 50, 13, 'Konzert', 'training'),
('Luki', 49, 14, 'Weihnachtsessen', 'training'),
('Fabian', 50, 15, 'Konzert', 'training'),
('Fabian', 38, 16, 'U15 / U17 Spiel mit SmAP (vs. Gym Leo)', 'spiel'),
('RolandW', 48, 17, 'Krank', 'training'),
('RolandW', 49, 18, 'Immer noch krank', 'training'),
('Dicke', 50, 19, 'Haha', 'training'),
('markus.mandel', 59, 20, 'Mi borat-kostÃ¼m muess usgfÃ¼hrt wÃ¤rde', 'training'),
('cedy', 50, 21, 'Test', 'training'),
('Cedi', 60, 22, 'Wer angemeldet ist, darf den Match der Seniorinnen schreiben. Danke, Cedy!', 'training'),
('Dicke', 72, 23, '', 'training'),
('Dicke', 71, 24, '', 'training'),
('Dicke', 38, 25, '', 'spiel'),
('markus.mandel', 73, 28, '', 'training'),
('markus.mandel', 75, 29, '', 'training'),
('kevin', 58, 30, 'AGS-Freizeit-Sport', 'spiel'),
('Luki', 73, 31, 'Uni', 'training'),
('Luki', 74, 32, 'Theaterprobe', 'training'),
('stohli', 74, 33, 'Damen 4 coachen (in Muttenz^^)', 'training'),
('camel', 75, 34, 'Krank', 'training'),
('Florian', 79, 35, 'WK', 'training'),
('cedy', 76, 36, 'Isch zu viel mit muschtertescht...', 'training'),
('Fabian', 79, 37, 'Chronisches Desinteresse', 'training'),
('RolandW', 76, 38, 'durchfall', 'training'),
('RolandW', 77, 39, '', 'training'),
('Cedi', 79, 40, '[Provisorische Abmeldung] SchaffÃ¤', 'training'),
('Luki', 79, 41, 'krank', 'training'),
('Cedi', 80, 42, 'evtl. nid drbi', 'training'),
('cedy', 80, 43, 'VKU', 'training'),
('cedy', 81, 44, 'VKU', 'training'),
('Dicke', 80, 45, 'DÃ¶rf an infoobe vom frauespital;-).....', 'training'),
('Cedi', 81, 46, 'Noni fit :(', 'training'),
('camel', 81, 47, 'GeschÃ¤ftlich unterwegs', 'training'),
('volero', 41, 48, 'bin in zÃ¼rich', 'spiel'),
('markus.mandel', 87, 50, '', 'training'),
('markus.mandel', 89, 51, '', 'training'),
('Dicke', 86, 52, '', 'training'),
('markus.mandel', 90, 53, '', 'training'),
('kevin', 89, 54, 'fcb', 'training'),
('Fabian', 89, 55, 'Europa-Cup', 'training'),
('Fabian', 91, 56, 'KÃ¸benhavn', 'training'),
('camel', 89, 57, 'Komme nicht von Arbeit los.', 'training'),
('camel', 90, 58, '', 'training'),
('camel', 91, 59, 'Urlaub', 'training'),
('camel', 92, 60, 'Urlaub', 'training'),
('Cedi', 90, 61, 'VSB GV. Nid sicher, wiÃ¤ langs goht...', 'training'),
('CHRISI', 90, 62, '', 'training'),
('CHRISI', 91, 63, '', 'training'),
('CHRISI', 93, 64, '', 'training'),
('CHRISI', 94, 65, '', 'training'),
('camel', 93, 66, 'Urlaub', 'training'),
('camel', 95, 67, 'Urlaub', 'spiel'),
('Cedi', 92, 68, 'Gemeindeversammlung', 'training'),
('markus.mandel', 93, 69, '', 'training'),
('markus.mandel', 96, 70, '', 'training'),
('Florian', 92, 71, 'Krank', 'training'),
('Cedi', 100, 72, 'Biozentrum Symposium inkl. Abendessen', 'training'),
('kevin', 99, 73, '', 'training'),
('kevin', 100, 74, 'fcb', 'training'),
('Fabian', 100, 75, 'Europapokaaaaaaaaaaaaaaaaal', 'training'),
('kevin', 102, 76, '', 'training'),
('kevin', 104, 77, '', 'training'),
('CHRISI', 104, 78, '', 'training'),
('Florian', 104, 79, 'FCB-Match und Verbrennung 2. Grad am Arm...', 'training'),
('markus.mandel', 104, 80, '', 'training'),
('markus.mandel', 106, 81, '', 'training'),
('Fabian', 104, 82, 'Europapokaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaal', 'training'),
('camel', 104, 83, 'Sorry, sitze auf Arbeit fest...', 'training'),
('Florian', 105, 84, 'Verletzt', 'training'),
('Florian', 106, 85, 'Verletzt', 'training'),
('markus.mandel', 108, 86, '', 'training'),
('camel', 106, 87, 'komme heute schon (Dienstag)', 'training'),
('kevin', 106, 88, 'fcb', 'training');

-- --------------------------------------------------------

--
-- Table structure for table `default_training`
--

CREATE TABLE IF NOT EXISTS `default_training` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` text COLLATE utf8_unicode_ci NOT NULL,
  `day` text COLLATE utf8_unicode_ci NOT NULL,
  `time_start` text COLLATE utf8_unicode_ci NOT NULL,
  `time_end` text COLLATE utf8_unicode_ci NOT NULL,
  `location` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=3 ;

--
-- Dumping data for table `default_training`
--

INSERT INTO `default_training` (`id`, `type`, `day`, `time_start`, `time_end`, `location`) VALUES
(1, 'training', 'Tuesday', '20:30', '22:00', 'Muttenz - Kriegacker'),
(2, 'training', 'Thursday', '20:30', '22:00', 'Muttenz - Kriegacker');

-- --------------------------------------------------------

--
-- Table structure for table `drop_out`
--

CREATE TABLE IF NOT EXISTS `drop_out` (
  `id` int(8) NOT NULL,
  `date` date NOT NULL,
  `time_start` text COLLATE utf8_unicode_ci NOT NULL,
  `time_end` text COLLATE utf8_unicode_ci NOT NULL,
  `location` text COLLATE utf8_unicode_ci NOT NULL,
  `type` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `drop_out`
--

INSERT INTO `drop_out` (`id`, `date`, `time_start`, `time_end`, `location`, `type`) VALUES
(119, '2013-06-05', '01:00', '', 'KKKOOO', 'game');

-- --------------------------------------------------------

--
-- Table structure for table `has_address`
--

CREATE TABLE IF NOT EXISTS `has_address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `aid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `aid` (`aid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=4 ;

--
-- Dumping data for table `has_address`
--

INSERT INTO `has_address` (`id`, `username`, `aid`) VALUES
(1, 'cedy', 7),
(2, 'bla', 8),
(3, 'test', 9);

-- --------------------------------------------------------

--
-- Table structure for table `subscribed_for_training`
--

CREATE TABLE IF NOT EXISTS `subscribed_for_training` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `subscribe_type` tinyint(1) NOT NULL,
  `trainingsID` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=195 ;

--
-- Dumping data for table `subscribed_for_training`
--

INSERT INTO `subscribed_for_training` (`id`, `username`, `subscribe_type`, `trainingsID`) VALUES
(52, 'cedy', 0, 111),
(53, 'cedy', 1, 113),
(54, 'cedy', 0, 112),
(55, 'cedy', 1, 114),
(56, 'Florian', 0, 111),
(57, 'Florian', 1, 113),
(58, 'Florian', 1, 112),
(59, 'Florian', 1, 114),
(60, 'Cedi', 0, 111),
(61, 'Cedi', 1, 113),
(62, 'Cedi', 1, 112),
(63, 'Cedi', 1, 114),
(68, 'RolandW', 0, 111),
(69, 'RolandW', 1, 113),
(70, 'RolandW', 1, 112),
(71, 'RolandW', 1, 114),
(72, 'camel', 0, 111),
(73, 'camel', 1, 113),
(74, 'camel', 1, 112),
(75, 'camel', 1, 114),
(76, 'Fabian', 0, 111),
(77, 'Fabian', 1, 113),
(78, 'Fabian', 1, 112),
(79, 'Fabian', 1, 114),
(80, 'stohli', 0, 111),
(81, 'stohli', 1, 113),
(82, 'stohli', 1, 112),
(83, 'stohli', 1, 114),
(84, 'cedy', 1, 115),
(85, 'cedy', 1, 122),
(86, 'cedy', 0, 120),
(87, 'cedy', 1, 123),
(88, 'cedy', 1, 121),
(89, 'cedy', 1, 124),
(90, 'Florian', 1, 120),
(91, 'Florian', 1, 123),
(92, 'Florian', 1, 121),
(93, 'Florian', 1, 124),
(94, 'Cedi', 1, 120),
(95, 'Cedi', 1, 123),
(96, 'Cedi', 1, 121),
(97, 'Cedi', 1, 124),
(102, 'RolandW', 1, 120),
(103, 'RolandW', 1, 123),
(104, 'RolandW', 1, 121),
(105, 'RolandW', 1, 124),
(106, 'camel', 1, 120),
(107, 'camel', 1, 123),
(108, 'camel', 1, 121),
(109, 'camel', 1, 124),
(110, 'Fabian', 1, 120),
(111, 'Fabian', 1, 123),
(112, 'Fabian', 1, 121),
(113, 'Fabian', 1, 124),
(114, 'stohli', 1, 120),
(115, 'stohli', 1, 123),
(116, 'stohli', 1, 121),
(117, 'stohli', 1, 124),
(118, 'cedy', 1, 125),
(119, 'cedy', 1, 126),
(120, 'Florian', 1, 125),
(121, 'Florian', 1, 126),
(122, 'Cedi', 1, 125),
(123, 'Cedi', 1, 126),
(126, 'RolandW', 1, 125),
(127, 'RolandW', 1, 126),
(128, 'camel', 1, 125),
(129, 'camel', 1, 126),
(130, 'Fabian', 1, 125),
(131, 'Fabian', 1, 126),
(132, 'stohli', 1, 125),
(133, 'stohli', 1, 126),
(134, 'cedy', 1, 127),
(135, 'Florian', 1, 127),
(136, 'Cedi', 1, 127),
(138, 'RolandW', 1, 127),
(139, 'Fabian', 1, 127),
(140, 'stohli', 1, 127),
(142, 'camel', 1, 127),
(147, 'Dicke', 1, 125),
(148, 'Dicke', 1, 127),
(149, 'Dicke', 0, 124),
(150, 'Dicke', 0, 126),
(154, 'Array', 1, 0),
(155, 'Array', 1, 124),
(156, 'cedy', 1, 128),
(157, 'Florian', 1, 128),
(158, 'Cedi', 1, 128),
(159, 'Dicke', 0, 128),
(161, 'camel', 1, 128),
(162, 'Fabian', 1, 128),
(163, 'stohli', 1, 128),
(164, 'RolandW', 0, 128),
(165, 'cedy', 1, 129),
(166, 'cedy', 1, 130),
(167, 'cedy', 1, 131),
(168, 'cedy', 1, 132),
(169, 'Florian', 1, 129),
(170, 'Florian', 1, 130),
(171, 'Florian', 1, 131),
(172, 'Florian', 1, 132),
(173, 'Cedi', 1, 129),
(174, 'Cedi', 1, 130),
(175, 'Cedi', 1, 131),
(176, 'Cedi', 1, 132),
(177, 'Dicke', 1, 129),
(178, 'Dicke', 1, 130),
(179, 'Dicke', 0, 131),
(180, 'Dicke', 0, 132),
(181, 'RolandW', 1, 129),
(182, 'RolandW', 1, 130),
(183, 'RolandW', 0, 131),
(184, 'RolandW', 0, 132),
(185, 'camel', 1, 131),
(186, 'camel', 1, 132),
(187, 'Fabian', 1, 129),
(188, 'Fabian', 1, 130),
(189, 'Fabian', 1, 131),
(190, 'Fabian', 1, 132),
(191, 'stohli', 1, 129),
(192, 'stohli', 1, 130),
(193, 'stohli', 1, 131),
(194, 'stohli', 1, 132);

-- --------------------------------------------------------

--
-- Table structure for table `training`
--

CREATE TABLE IF NOT EXISTS `training` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `present` text COLLATE utf8_unicode_ci NOT NULL,
  `away` text COLLATE utf8_unicode_ci NOT NULL,
  `location` text COLLATE utf8_unicode_ci NOT NULL,
  `time_start` text COLLATE utf8_unicode_ci NOT NULL,
  `time_end` text COLLATE utf8_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `day` text COLLATE utf8_unicode_ci NOT NULL,
  `type` text COLLATE utf8_unicode_ci NOT NULL,
  `meeting_point` text COLLATE utf8_unicode_ci NOT NULL,
  `enemy` text COLLATE utf8_unicode_ci NOT NULL,
  `trainingsID` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=133 ;

--
-- Dumping data for table `training`
--

INSERT INTO `training` (`id`, `present`, `away`, `location`, `time_start`, `time_end`, `date`, `day`, `type`, `meeting_point`, `enemy`, `trainingsID`) VALUES
(30, 'cedy&camel&kevin&Florian&Luki&', '', 'Muttenz - Kriegacker', '20:30', '22:00', '2012-11-20', 'Dienstag', 'training', '', '', 0),
(31, 'cedy&Cedi&kevin&Luki&', 'camel&', 'Muttenz - Kriegacker', '20:30', '22:00', '2012-11-27', 'Dienstag', 'training', '', '', 0),
(34, 'cedy&kevin&Florian&Fabian&Cedi&', '', 'Gelterkinden - Hoffmatt', '20:30', '', '2012-11-21', '', 'spiel', '19:30 - Gelterkinden - Hoffmatt', 'VBC Gelterkinden H3', 0),
(35, 'cedy&Cedi&Luki&Florian&Fabian&', 'kevin&', 'Arlesheim - Gehrenmatten 2', '19:30', '', '2012-11-30', '', 'spiel', '18:30 - Arlesheim - Gehrenmatten 2', 'TV Arlesheim H3', 0),
(36, 'cedy&Cedi&kevin&Luki&Florian&Fabian&', '', 'Muttenz - Kriegacker', '16:00', '', '2012-12-01', '', 'spiel', '15:00 - Muttenz - Kriegacker', 'VBC Tecknau', 0),
(38, 'cedy&Cedi&markus.mandel&Florian&kevin&Luki&', 'Fabian&Dicke&', 'Muttenz - Margelacker', '16:00', '', '2013-01-12', '', 'spiel', '15:00 - Muttenz - Margelacker', 'VBC Bubendorf H2', 0),
(39, 'cedy&Cedi&Florian&markus.mandel&kevin&Luki&Fabian&', '', 'Teknau - Turnhalle', '16:00', '', '2013-01-19', '', 'spiel', '15:00 - Teknau - Turnhalle', 'VBC Tecknau', 0),
(40, 'cedy&Cedi&markus.mandel&Florian&Luki&kevin&Fabian&Dicke&', '', 'Muttenz - Kriegacker', '20:30', '', '2013-01-29', '', 'spiel', '19:30 - Muttenz - Kriegacker', 'TV Arlesheim H3', 0),
(41, 'cedy&Cedi&markus.mandel&Florian&Fabian&Luki&kevin&', 'volero&', 'MÃ¼nchenstein - Kuspo', '20:30', '', '2013-02-27', '', 'spiel', '19:30 - MÃ¼nchenstein - Kuspo', 'TV Neue Welt', 0),
(42, 'cedy&Cedi&markus.mandel&Florian&Fabian&Luki&volero&kevin&Dicke&', '', 'Muttenz - Kriegacker', '20:30', '', '2013-03-05', '', 'spiel', '19:30 - Muttenz - Kriegacker', 'VBC Gelterkinden H3', 0),
(43, 'cedy&Cedi&', 'kevin&', 'Muttenz - Kriegacker', '20:30', '22:00', '2012-12-04', 'Dienstag', 'training', '', '', 0),
(46, 'cedy&Cedi&Luki&kevin&Fabian&', 'Florian&', 'Muttenz - Kriegacker', '20:30', '22:00', '2012-11-29', 'Donnerstag', 'training', '', '', 0),
(47, 'cedy&', 'Cedi&', 'Muttenz - Kriegacker', '20:30', '22:00', '2012-12-06', 'Donnerstag', 'training', '', '', 0),
(48, 'cedy&Florian&Luki&Fabian&', 'Cedi&RolandW&', 'Muttenz - Kriegacker', '20:30', '22:00', '2012-12-11', 'Dienstag', 'training', '', '', 0),
(49, 'cedy&Cedi&Florian&Fabian&', 'Luki&RolandW&', 'Muttenz - Kriegacker', '20:30', '22:00', '2012-12-13', 'Donnerstag', 'training', '', '', 0),
(50, 'Cedi&RolandW&markus.mandel&', 'Florian&Fabian&Dicke&cedy&', 'Muttenz - Kriegacker', '20:30', '22:00', '2012-12-18', 'Dienstag', 'training', '', '', 0),
(60, 'cedy&markus.mandel&', 'Cedi&', 'Muttenz - Kriegacker', '20:30', '22:00', '2012-12-20', 'Donnerstag', 'training', '', '', 0),
(71, 'cedy&Cedi&Florian&RolandW&markus.mandel&kevin&', 'Dicke&', 'Muttenz - Kriegacker', '20:30', '22:00', '2013-01-08', 'Dienstag', 'training', '', '', 1),
(72, 'cedy&Cedi&Florian&Fabian&', 'Dicke&', 'Muttenz - Kriegacker', '20:30', '22:00', '2013-01-03', 'Donnerstag', 'training', '', '', 2),
(73, 'cedy&Cedi&Florian&', 'Dicke&RolandW&markus.mandel&Luki&', 'Muttenz - Kriegacker', '20:30', '22:00', '2013-01-10', 'Donnerstag', 'training', '', '', 2),
(74, 'cedy&Florian&Cedi&Dicke&RolandW&markus.mandel&kevin&Fabian&', 'Luki&stohli&', 'Muttenz - Kriegacker', '20:30', '22:00', '2013-01-15', 'Dienstag', 'training', '', '', 1),
(75, 'cedy&Florian&Cedi&Luki&Fabian&stohli&', 'Dicke&RolandW&markus.mandel&camel&', 'Muttenz - Kriegacker', '20:30', '22:00', '2013-01-17', 'Donnerstag', 'training', '', '', 2),
(76, 'Florian&Cedi&Dicke&Fabian&stohli&', 'cedy&RolandW&', 'Muttenz - Kriegacker', '20:30', '22:00', '2013-01-22', 'Dienstag', 'training', '', '', 1),
(77, 'cedy&Florian&Cedi&camel&Fabian&stohli&', 'Dicke&RolandW&', 'Muttenz - Kriegacker', '20:30', '22:00', '2013-01-24', 'Donnerstag', 'training', '', '', 2),
(79, 'cedy&camel&stohli&kevin&', 'Dicke&RolandW&Florian&Fabian&Cedi&Luki&', 'Muttenz - Kriegacker', '20:30', '22:00', '2013-01-31', 'Donnerstag', 'training', '', '', 2),
(80, 'Florian&RolandW&Fabian&stohli&kevin&', 'Cedi&cedy&Dicke&', 'Muttenz - Kriegacker', '20:30', '22:00', '2013-02-05', 'Dienstag', 'training', '', '', 1),
(81, 'Florian&Fabian&stohli&', 'Dicke&RolandW&cedy&Cedi&camel&', 'Muttenz - Kriegacker', '20:30', '22:00', '2013-02-07', 'Donnerstag', 'training', '', '', 2),
(86, 'cedy&Florian&Cedi&RolandW&Fabian&stohli&volero&markus.mandel&kevin&drenggli&', 'Dicke&', 'Muttenz - Kriegacker', '20:30', '22:00', '2013-02-26', 'Dienstag', 'training', '', '', 1),
(87, 'cedy&Florian&Cedi&camel&Fabian&stohli&CHRISI&', 'Dicke&RolandW&markus.mandel&', 'Muttenz - Kriegacker', '20:30', '22:00', '2013-02-28', 'Donnerstag', 'training', '', '', 2),
(89, 'cedy&Florian&Cedi&stohli&CHRISI&drenggli&', 'Dicke&RolandW&markus.mandel&kevin&Fabian&camel&', 'Muttenz - Kriegacker', '20:30', '22:00', '2013-03-07', 'Donnerstag', 'training', '', '', 2),
(90, 'cedy&Florian&Dicke&RolandW&Fabian&stohli&kevin&', 'markus.mandel&camel&Cedi&CHRISI&', 'Muttenz - Kriegacker', '20:30', '22:00', '2013-03-12', 'Dienstag', 'training', '', '', 1),
(91, 'cedy&Florian&Cedi&stohli&markus.mandel&', 'Dicke&RolandW&Fabian&camel&CHRISI&', 'Muttenz - Kriegacker', '20:30', '22:00', '2013-03-14', 'Donnerstag', 'training', '', '', 2),
(92, 'cedy&Dicke&RolandW&Fabian&stohli&markus.mandel&Beat&kevin&', 'camel&Cedi&Florian&', 'Muttenz - Kriegacker', '20:30', '22:00', '2013-03-19', 'Dienstag', 'training', '', '', 1),
(93, 'cedy&Florian&Cedi&Fabian&stohli&Beat&', 'Dicke&RolandW&CHRISI&camel&markus.mandel&', 'Muttenz - Kriegacker', '20:30', '22:00', '2013-03-21', 'Donnerstag', 'training', '', '', 2),
(95, 'cedy&kevin&Cedi&Dicke&stohli&Florian&Beat&', 'camel&', 'Muttenz - Margelacker', '16:00', '', '2013-03-16', '', 'spiel', '15:00 Muttenz - Margelacker', 'TVM Senioren', 0),
(99, 'cedy&Florian&Cedi&Dicke&RolandW&Fabian&stohli&Beat&', 'kevin&', 'Muttenz - Kriegacker', '20:30', '22:00', '2013-04-09', 'Dienstag', 'training', '', '', 1),
(100, 'cedy&Florian&camel&stohli&Beat&', 'Dicke&RolandW&Cedi&kevin&Fabian&', 'Muttenz - Kriegacker', '20:30', '22:00', '2013-04-11', 'Donnerstag', 'training', '', '', 2),
(101, 'cedy&Florian&Cedi&Dicke&RolandW&Fabian&stohli&', '', 'Muttenz - Kriegacker', '20:30', '22:00', '2013-04-16', 'Dienstag', 'training', '', '', 1),
(102, 'cedy&Florian&Cedi&camel&Fabian&stohli&Beat&', 'Dicke&RolandW&kevin&', 'Muttenz - Kriegacker', '20:30', '22:00', '2013-04-18', 'Donnerstag', 'training', '', '', 2),
(104, 'cedy&Cedi&stohli&Beat&', 'Dicke&RolandW&kevin&CHRISI&Florian&markus.mandel&Fabian&camel&', 'Muttenz - Kriegacker', '20:30', '22:00', '2013-04-25', 'Donnerstag', 'training', '', '', 2),
(105, 'cedy&Cedi&Dicke&RolandW&Fabian&stohli&CHRISI&markus.mandel&Beat&kevin&camel&', 'Florian&', 'Muttenz - Kriegacker', '20:30', '22:00', '2013-04-30', 'Dienstag', 'training', '', '', 1),
(106, 'cedy&Cedi&Fabian&stohli&CHRISI&Beat&drenggli&', 'Dicke&RolandW&markus.mandel&Florian&camel&kevin&', 'Muttenz - Kriegacker', '20:30', '22:00', '2013-05-02', 'Donnerstag', 'tournament', '', '', 2),
(107, 'cedy&Florian&Cedi&Dicke&RolandW&Fabian&stohli&markus.mandel&Beat&', '', 'Muttenz - Kriegacker', '20:30', '22:00', '2013-05-07', 'Dienstag', 'game', '', '', 1),
(109, 'cedy&Florian&Cedi&Dicke&RolandW&Fabian&stohli&', '', 'Muttenz - Kriegacker', '20:30', '22:00', '2013-05-14', 'Dienstag', 'game', '', '', 1),
(111, '', '', 'Muttenz - Kriegacker', '', '', '2013-05-14', 'Tuesday', 'training', '', '', 1),
(116, '', '', '111', '01:01', '', '2013-01-01', '', '', '111', '111', 0),
(117, '', '', 'ddd', '01:00', '', '2013-01-01', '', '', 'ttt', 'fff', 0),
(118, '', '', '111', '01:01', '', '2013-01-01', '', 'sessionStorage.type', '1111', '111', 0),
(120, '', '', 'Muttenz - Kriegacker', '', '', '2013-05-21', 'Tuesday', 'training', '', '', 1),
(121, '', '', 'Muttenz - Kriegacker', '', '', '2013-05-28', 'Tuesday', 'training', '', '', 1),
(122, '', '', 'Muttenz - Kriegacker', '', '', '2013-05-16', 'Thursday', 'training', '', '', 2),
(123, '', '', 'Muttenz - Kriegacker', '', '', '2013-05-23', 'Thursday', 'training', '', '', 2),
(124, '', '', 'Muttenz - Kriegacker', '', '', '2013-05-30', 'Thursday', 'training', '', '', 2),
(125, '', '', 'Muttenz - Kriegacker', '', '', '2013-06-04', 'Tuesday', 'training', '', '', 1),
(126, '', '', 'Muttenz - Kriegacker', '', '', '2013-06-06', 'Thursday', 'training', '', '', 2),
(127, '', '', 'Muttenz - Kriegacker', '', '', '2013-06-11', 'Tuesday', 'training', '', '', 1),
(128, '', '', 'Muttenz - Kriegacker', '', '', '2013-06-13', 'Thursday', 'training', '', '', 2),
(129, '', '', 'Muttenz - Kriegacker', '', '', '2013-06-25', 'Tuesday', 'training', '', '', 1),
(130, '', '', 'Muttenz - Kriegacker', '', '', '2013-07-02', 'Tuesday', 'training', '', '', 1),
(131, '', '', 'Muttenz - Kriegacker', '', '', '2013-06-27', 'Thursday', 'training', '', '', 2),
(132, '', '', 'Muttenz - Kriegacker', '', '', '2013-07-04', 'Thursday', 'training', '', '', 2);

-- --------------------------------------------------------

--
-- Table structure for table `trainings_plan`
--

CREATE TABLE IF NOT EXISTS `trainings_plan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `trainingsID` int(11) NOT NULL,
  `title` text COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `time_start` text COLLATE utf8_unicode_ci NOT NULL,
  `time_end` text COLLATE utf8_unicode_ci NOT NULL,
  `duration` int(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=26 ;

--
-- Dumping data for table `trainings_plan`
--

INSERT INTO `trainings_plan` (`id`, `trainingsID`, `title`, `description`, `time_start`, `time_end`, `duration`) VALUES
(23, 72, 'KrÃ¤ftigen', 'Normales KrÃ¤ftigen zu Begin, fÃ¼r Rumpf und Schultern, mit Stabilisation fÃ¼r die FÃ¼sse.\n\nPlus Sauhund.', '20:30', '20:45', 15),
(24, 72, 'Sprungkraft', 'Sprungparkours mit PrellsprÃ¼ngen und StabilisationssprÃ¼ngen.', '20:45', '20:50', 5),
(25, 72, 'Einspielen', 'Zu zweit oder dritt einen Ball. Normales einspielen mit zuerst Ball werfen, dann Spielen. Beim Dreierteam mit Nachlaufen.', '20:50', '21:05', 15);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `firstname` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(32) CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL,
  `last` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `trainer` tinyint(1) NOT NULL,
  `admin` tinyint(1) NOT NULL,
  `activate` tinyint(1) NOT NULL,
  `mail` text COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(16) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`username`),
  KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`name`, `firstname`, `username`, `password`, `last`, `trainer`, `admin`, `activate`, `mail`, `phone`) VALUES
('Bürgler', 'Beat', 'Beat', '91111fb1f8b088438d80367df81cb6cf', '2013-05-31 17:25:39', 0, 0, 1, 'beat.buergler@web.de', ''),
('Melcher', 'Carsten', 'camel', 'c469204fb0318aa75c0db670f23a0dc1', '2013-05-30 14:26:04', 0, 0, 1, '', ''),
('Leu', 'Cedric', 'Cedi', '00175734b6e4cacd0f01ce89de9374fb', '2013-05-02 18:00:38', 1, 1, 1, '', ''),
('Geissmann', 'Cedric', 'cedy', '82387aa6447e3305abd1e4ade5fde659', '2013-05-31 12:56:46', 1, 1, 1, 'cedric.geissmann@gmail.com', '+41 79 721 92 71'),
('Rapold', 'Samuel', 'CHRISI', '4a4ebcbc7d8a3d2e207632ab85dab458', '2013-04-25 11:42:45', 0, 0, 1, '', ''),
('Glaser', 'Jerome', 'Dicke', 'dea041c26bd4f50870f988a9116e53e3', '2013-04-23 05:46:21', 0, 0, 1, '', ''),
('Renggli', 'Dominic', 'drenggli', 'a4055ed24c741361e786a37d6b7ef68a', '2013-05-02 09:30:44', 0, 0, 1, '', ''),
('Wehrle', 'Fabian', 'Fabian', 'c0ea01000a6be7408a50dae8d890af25', '2013-05-01 09:18:43', 1, 0, 1, '', ''),
('Rosebrock', 'Florian', 'Florian', '4a4748665aa60ab54edaae727801a624', '2013-04-30 14:26:48', 0, 0, 1, '', ''),
('volkart', 'kevin', 'kevin', '2faa7402073b168e0bd02d07a17e7d64', '2013-05-02 05:09:41', 0, 0, 1, '', ''),
('Forlin', 'Lukas', 'Luki', 'd88493f6cd79f13156120b00cf209c8e', '2013-05-31 12:34:59', 0, 0, 1, '', ''),
('Mandel', 'Markus', 'markus.mandel', '48d2748d148783841e6316858fa2c946', '2013-04-29 07:28:55', 0, 0, 1, '', ''),
('WÃ¤lti', 'Roland', 'RolandW', '8711e40611b7ac7864d34e6e8c6d7f21', '2013-01-24 16:16:04', 0, 0, 1, '', ''),
('Stohler', 'Dominique', 'stohli', 'd0ecbf8a399bba46598dada1879323a6', '2013-03-15 06:04:03', 0, 0, 1, '', ''),
('test', 'test', 'test', '81dc9bdb52d04dc20036dbd8313ed055', '2013-05-31 12:25:20', 0, 0, 1, 'test@test.com', '+41 77 777 77 77'),
('lÃ¼din', 'krishna', 'volero', 'ea2063dd054bea612928fd3cf3999953', '2013-02-21 11:44:33', 0, 0, 1, '', '');

-- --------------------------------------------------------

--
-- Table structure for table `user_defaults`
--

CREATE TABLE IF NOT EXISTS `user_defaults` (
  `username` text COLLATE utf8_unicode_ci NOT NULL,
  `trainingsID` int(11) NOT NULL,
  `subscribe_type` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user_defaults`
--

INSERT INTO `user_defaults` (`username`, `trainingsID`, `subscribe_type`) VALUES
('cedy', 1, 1),
('cedy', 2, 1),
('Florian', 1, 1),
('Florian', 2, 1),
('Cedi', 1, 1),
('Cedi', 2, 1),
('Dicke', 1, 1),
('Dicke', 2, 0),
('RolandW', 1, 1),
('RolandW', 2, 0),
('camel', 2, 1),
('Fabian', 1, 1),
('Fabian', 2, 1),
('stohli', 1, 1),
('stohli', 2, 1);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `has_address`
--
ALTER TABLE `has_address`
  ADD CONSTRAINT `has_address_ibfk_1` FOREIGN KEY (`aid`) REFERENCES `address` (`aid`) ON DELETE CASCADE ON UPDATE CASCADE;
