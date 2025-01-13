-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 13, 2025 at 12:04 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smart-library`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(8) NOT NULL,
  `card_number` int(255) DEFAULT NULL,
  `branch` varchar(20) DEFAULT NULL,
  `firstname` varchar(50) NOT NULL,
  `middlename` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `birthdate` varchar(50) DEFAULT NULL,
  `street_address` varchar(100) DEFAULT NULL,
  `city` varchar(50) NOT NULL,
  `contact` varchar(12) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` longtext NOT NULL,
  `acctype` varchar(10) NOT NULL,
  `imageID` varchar(10) NOT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expires` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `card_number`, `branch`, `firstname`, `middlename`, `lastname`, `birthdate`, `street_address`, `city`, `contact`, `gender`, `email`, `password`, `acctype`, `imageID`, `reset_token`, `reset_token_expires`) VALUES
(1, 0, 'GENERAL TRIAS BRANCH', 'MARK', 'HERERA', 'FERNANDEZ', '2024-11-27', '#3', 'NAIC', '09760202655', 'MALE', 'admin@gmail.com', 'sha1$893f4e91$1$008377225482295454a3298cd0070e8c1c9600f7', 'admin', 'default', '4617c4369e2e74938f42655fb96fce85cbe9c03b4172a479796c18d0f342c3cf', '0000-00-00 00:00:00'),
(36, 0, 'any', 'ROMARs', 'reyes', 'CENA', '2024-09-27', 'SAN GABRIEL', 'NAIC', '09760202622', 'male', 'admin1@gmail.com', 'sha1$893f4e91$1$008377225482295454a3298cd0070e8c1c9600f7', 'super', '2a579c99-6', NULL, NULL),
(42, 0, 'GENERAL TRIAS BRANCH', 'pamparor', 'c', 'reyes', '2024-11-27', 'undefined', 'NOVELETA', '09760202655', 'male', 'pamparor1@gmail.com', 'sha1$b7233466$1$0c66a06f63b183bdff3c5ff13ed2d36f42e625cc', 'admin', 'default', NULL, NULL),
(46, 0, 'GENERAL TRIAS BRANCH', 'JS', 'RI', 'REYES', '2024-12-20', '#3 calamansi street', 'MENDEZ', '09760203882', 'male', 'ash.ampart179@gmail.com', 'sha1$db4309c7$1$a17c6fbf89ef96a995c517931dd6a37211878ff1', 'admin', '2a579c99-6', NULL, NULL),
(48, 1009, 'undefined', 'Rumar', 'capoquian', 'pamparo', 'undefined', '3calamansi', 'MARAGONDON', '09760202622', 'male', 'pamparor99@gmail.com', 'sha1$8383e853$1$5c01d4a159eced857972091af39a538ad6d2152f', 'guest', 'lxktmThX', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `book_id` int(10) NOT NULL,
  `item_no` varchar(10) DEFAULT NULL,
  `ISBN` varchar(255) DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  `author_name` varchar(50) DEFAULT NULL,
  `access_no` varchar(50) DEFAULT NULL,
  `genre` varchar(50) NOT NULL,
  `branch` varchar(50) NOT NULL,
  `quantity` int(100) DEFAULT NULL,
  `amount` varchar(100) DEFAULT NULL,
  `total_value` varchar(100) DEFAULT NULL,
  `date_acquired` varchar(100) DEFAULT NULL,
  `publication` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`book_id`, `item_no`, `ISBN`, `title`, `author_name`, `access_no`, `genre`, `branch`, `quantity`, `amount`, `total_value`, `date_acquired`, `publication`) VALUES
(1, '3', 'Communication Engineering Black Book ( Engineering Reviewer)', '97192023-9-4', 'Christopher Jay R. Soon, ECE', NULL, 'Engineering', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(2, '4', '1001 Solved Problems in Engineering Mathematics', '97192023-9-4', '\'Excel Academic Council', NULL, 'Engineering', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(3, '6', 'Intermediate Accounting  V1', '978-621-416-087-7', 'Conrado T. Valix', NULL, 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(4, '7', 'Intermediate Accounting (2020 E) V2', '978-621-416-088-4', 'Conrado T. Valix', NULL, 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(5, '8', 'Auditing Theory', '978-971-9919-79-7', 'Gerardo S. Roque', NULL, 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(6, '9', 'AFAR Quick Notes 2019', '978-621-95505-7-4', 'Ivan Yannick S. Bagayao', NULL, 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(7, '10', 'RFBT MCQ CPA REVIEWER', '978-621-95242-3-0', 'Andrix D. Domingo CPA.MBA', NULL, 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(8, '11', 'Notes in Business Law', '978-971-9919-95-7', 'Fidelito Soriano', NULL, 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(9, '12', 'Business Finance and Philippine Business Firms', '971-12-0229-8', 'Nati C. San Gabriel', NULL, 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(10, '13', 'Pointers in Business Law', '978-621-416-085-3', 'Carlos B. Suares, Alerxander Suarez', NULL, 'Law', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(11, '14', 'Applied Auditing', '978-971-95940-2-4', 'Darrell Joe O. Asuncion CPA, MBA', NULL, 'Law', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(12, '15', 'Practical Financial Accounting V.1 2018', '978-621-416-053-2', 'Conrado T. Valix', NULL, 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(13, '16', 'CPA Reviewer in Taxation', '978-621-95229-9-1', 'Enrico Tabag', NULL, 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(14, '17', 'Auditing Theory', '978-971-9919-63-6', 'Jekell G. Salonga CPA', NULL, 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(15, '18', 'Practical Financial Accounting V.1 2019', '978-621-416-077-8', 'Conrado T. Valix', NULL, 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(16, '19', 'Conceptual Framework and Accounting Standards', '978-621-416-085-3', 'Conrado T. Valix', NULL, 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(17, '20', 'Practical Accounting', '978-621-416-081-5', 'Conrado T. Valix', NULL, 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(18, '21', 'Reviewer for ACET and UPCAt', '971-8740-32-5', 'Merle Alferez', NULL, 'Test Preparation', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(19, '22', 'Review Question 2 UPCAt ', '971-8740-32-5', 'Merle Alferez', NULL, 'Test Preparation', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(20, '24', 'Modern and Contemporary Philosophy', '971-08-6693-1', 'Maria Imelda Nabor-Nery', NULL, 'Philosophy and Humanities', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(21, '25', 'Keeping the Legacy: Reflections on Filipino Values', '971-581-145-0', 'Nestor C. Rilloma', NULL, 'Philosophy and Humanities', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(22, '26', 'A Guide to Understanding Climate Variability and Climate Change', '978-971-579-054-3', 'Pulhin, Lasco, Espaldon and Garcia', NULL, 'Science/Climate', 'GENERAL TRIAS BRANCH', 5, NULL, NULL, NULL, NULL),
(23, '27', 'Dictionary of Evidence Second Edition 2005', '971-08-6507-2', 'Oscar B. Bernardo', NULL, 'General Reference', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(24, '28', 'A Nation on Fire: The Unmaking of Joseph Ejercito Estrada and The Remaking of Democracy in the Philippines', '971-92555-1-X', 'Francisco S. Tatat', NULL, 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(25, '30', 'Bukidnon The Philippine Frontier', '978-971-94868-0-0', 'Rafael A. S. G. Ongpin', NULL, 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(26, '31', 'Mga Bugtong at Salawikain para sa Bagong Henerasyon', '971-27-1230-3', 'Nimrod and Vivian Tica', NULL, 'Language and Culture', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(27, '32', 'Sining ng Pakikipagtalastasang Panlipunan', '971-08-6318-5', 'Lorenzo, San Juan, De Leon, Mag Atas', NULL, 'Language and Culture', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(28, '34', 'Diccionario Chabacano Del Ciudad de Cavite', '971-91739-1-2', 'unknown author', NULL, 'Language and Culture', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(29, '35', 'Fundamentals Speech Communication for Filipinos', '971-08-6625-7', 'Manalo and Fermin', NULL, 'Language and Culture', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(30, '36', 'IL Nuovo Dizionario Filippino Italiano-Tagalog/ Tagalog Italiano', '971-08-6617-6', 'Dominador B. Limeta', NULL, 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(31, '37', 'Filipino Cooking and Entertaining Here & Abroad ', '971-08-6615-X', 'Eleanor R. Laquian', NULL, 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(32, '38', 'Jose Rizal: Buhay, Mga Ginawa at mga Sinulat ng Isang Henyo, Manunulat, Siyentipiko, at Pambansang Bayani', '971-642-044-7', 'Gregorio and Sonia Zaide', NULL, 'History and Political Studies', 'GENERAL TRIAS BRANCH', 2, NULL, NULL, NULL, NULL),
(33, '39', 'Saloobin Sagot ni Hen. Emilio Aguinaldo sa mga Paratang ng Dakilang Lumpo', '971-92590-0-0', 'Emmanuel Franco Calairo', NULL, 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(34, '40', 'Remembering the Cavite Matunity of 1872', '971-917-583-4', 'Dr. Celestina P. Boncan', NULL, 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(35, '41', 'Cavite Cultura e Historia', '971-91706-9-7', 'Teresita P. Unabia', NULL, 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(36, '44', 'Cavite\'s Turning Point: Political Will and Development at the Turn of the Century, 1979-1995', '978-971-92590-8-4', 'Emmanuel Franco Calairo', NULL, 'History and Political Studies', 'GENERAL TRIAS BRANCH', 8, NULL, NULL, NULL, NULL),
(37, '45', 'Sayaw: Philippine Dances', '971-27-1168-4', 'Alejandro and Santos-Gana', NULL, 'Arts and Performing Arts', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(38, '47', 'El Filibusterismo', '971-8957-03-0', 'Jose Rizal', NULL, 'Literature and Biographies', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(39, '48', 'Mga Dulang may Isang Yugto Batay sa Noli and Fili ni Dr. Jose Rizal ', '971-08-6592-7', 'Matute and Casanova', NULL, 'Literature and Biographies', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(40, '49', 'Sining sa Pagbigkas: Mga Tula, Balagtasan at Talumpati', '971-08-6591-9', 'Alfredo and Rosario Singh', NULL, 'Arts and Performing Arts', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(41, '50', 'Diaspora at iba pang kwento ni Genoveva Edroza Matute', '971-08-6622-2', 'Genoveva Edroza Matute', NULL, 'Literature and Biographies', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(42, '51', 'Samu\'t Saring Dulang Pambata', '971-08-6744-X', 'Arthur P. Casanova', NULL, 'Children\'s Literature', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(43, '52', 'Chino and His Time', '978-971-27-2395-7', 'Vergel O. Santos', NULL, 'Literature and Biographies', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(44, '53', 'Hangga\'t Alat ang Dagat at Isang Haliging Asin', '971-08-6755-5', 'Joey A. Arrogante ', NULL, 'Children\'s Literature', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(45, '54', 'Tuhug-Tuhog: 25 Maiikling Kuwento ng Pag-ibig at Pakikipagsapalaran ng mga OFWs', '971-08-6618-4', 'unknown author', NULL, 'Anthologies and Fiction', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(46, '55', 'Philippine Folk Stories Vol. 1', '971-08-6754-8', 'Frank G. Rivera', NULL, 'Anthologies and Fiction', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(47, '56', 'Ugat ng Panitikang Pilipino', '971-08-6543-9', 'Zenaida L. Cruz', NULL, 'Anthologies and Fiction', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(48, '58', 'Convention and Event Management', '971-08-6691-5', 'Zenaida L. Cruz', NULL, 'Business and Management', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(49, '59', 'Buhay Pinoy Overseas: O Jose, Can\'t You See?', '971-08-6749-0', 'Somera and Valente', NULL, 'OFW Narratives', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(50, '60', 'Kris of Valor', '971-8886-001', 'Margarita Delos Reyes Cojuangco', NULL, 'War and Valor', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(51, '61', 'Atlas of the Philippine and the World for Home and Office', '971-08-6726-1', 'unknown author', NULL, 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(52, '62', 'Atlas of the Philippine and the World for Elementary', '971-08-6715-6', 'unknown author', NULL, 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(53, '63', 'Atlas of the Philippine and The World for Highschool', '971-08-6716-4', 'unknown author', NULL, 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(54, '65', 'Movement of Miracles ( The Life and Times of Deogracias Banaban Custodio M.D.', '978-971-93789-2-1', 'Prof. Austine Kraig', NULL, 'Biographies', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(55, '66', 'The Life and Times of the Perdon Family', '978-0-9804827-3-7', 'Renato Perdon', NULL, 'Biographies', 'GENERAL TRIAS BRANCH', 2, NULL, NULL, NULL, NULL),
(56, '67', 'We Were There at the Battle for Bataan', 'LCC 57-5203', 'Benjamin Appel', NULL, 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(57, '68', 'The Great Raid on Cabanatuan Rescuing the Doomed Ghosts of Bataan and Corregidor', '0-471-03742-7', 'William B. Breuer', NULL, 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(58, '69', 'This is the Philippines', '1-85974-196-7', 'Nigel Hicks', NULL, 'Cultural and General Knowledge', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(59, '70', 'Burgos and the Cavite Community', '971-550-461-2', 'John N. Schumacher, S.J', NULL, 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(60, '71', 'Philippine History and Government Through the years', '971-08-6344-4', 'Zulueta and Nebres', NULL, 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(61, '72', 'History from the People: Kasaysayan mula sa Bayan Vol. 2', '971-538-124-3', 'Digna B. Apilado', NULL, 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(62, '74', 'History from the People: Kasaysayan mula sa Bayan Vol. 11', '971-538-133-2', 'Vergel O. Santos', NULL, 'History and Political Studies', 'GENERAL TRIAS BRANCH', 4, NULL, NULL, NULL, NULL),
(63, '75', 'Kasaysayan The Story of the Filipino People: The Philippine Archipelago Vol. 1', '962-258-224-9', 'unknown author', NULL, 'History and Political Studies', 'GENERAL TRIAS BRANCH', 4, NULL, NULL, NULL, NULL),
(64, '76', 'Kasaysayan The Story of the Filipino People: The Earliest Filipinos Vol. 2', '962-258-225-7', 'Casal, Dizon, Ronquillo, Salcedo', NULL, 'History and Political Studies', 'GENERAL TRIAS BRANCH', 4, NULL, NULL, NULL, NULL),
(65, '77', 'Kasaysayan The Story of the Filipino People: The Spanish Conquest Vol. 3', '962-258-226-5', 'Jose S. Arcilla Jr.', NULL, 'History and Political Studies', 'GENERAL TRIAS BRANCH', 4, NULL, NULL, NULL, NULL),
(66, '78', 'Kasaysayan The Story of the Filipino People: Life in the Colony Vol. 4', '962-258-227-3', 'Diokno and Villegas', NULL, 'History and Political Studies', 'GENERAL TRIAS BRANCH', 4, NULL, NULL, NULL, NULL),
(67, '79', 'Kasaysayan The Story of the Filipino People: Reform and Revolution Vol. 5', '962-258-228-1', 'Guerrero and Schumacher, S.J', NULL, 'History and Political Studies', 'GENERAL TRIAS BRANCH', 4, NULL, NULL, NULL, NULL),
(68, '80', 'Kasaysayan The Story of the Filipino People: Under the Stars and Stripes Vol. 6', '962-258-229-X', 'Milagros C. Guerrero', NULL, 'History and Political Studies', 'GENERAL TRIAS BRANCH', 4, NULL, NULL, NULL, NULL),
(69, '81', 'Kasaysayan The Story of the Filipino People: The Japanese Occupation Vol. 7 ', '962-258-230-3', 'Ricardo T. Jose', NULL, 'History and Political Studies', 'GENERAL TRIAS BRANCH', 4, NULL, NULL, NULL, NULL),
(70, '82', 'Kasaysayan The Story of the Filipino People: Up from the Ashes Vol. 8', '962-258-231-1', 'Ma. Serena I. Diokno', NULL, 'History and Political Studies', 'GENERAL TRIAS BRANCH', 4, NULL, NULL, NULL, NULL),
(71, '83', 'Kasaysayan The Story of the Filipino People: A Nation Reborn Vol. 9', '962-258-232-X', 'Alexander R. Magno', NULL, 'History and Political Studies', 'GENERAL TRIAS BRANCH', 4, NULL, NULL, NULL, NULL),
(72, '84', 'Kasaysayan The Story of the Filipino People: A Timeline of the Philippine History Vol. 10', '962-258-233-8', 'Henry S. Totanes', NULL, 'History and Political Studies', 'GENERAL TRIAS BRANCH', 2, NULL, NULL, NULL, NULL),
(73, '85', 'As I See It', '0-646-45381-5', 'Pura Santillan-Castrence', NULL, 'Essays ', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(74, '86', 'The Liberation of the Philippines Luzon,Mindanao,The Visayas 1944-1945', '0-7858-1314-4', 'Samuel Elliot Morison', NULL, 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(75, '87', 'Our Beloved Country A History of the Philippines', '978-971-27-2574-6', 'Havannah, Galbes, Aristol and Correa', NULL, 'Historical/Non-Fiction', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(76, '88', 'Hidden Lives, Concealed Narratives: A History of Leprosy in the Philippines', '978-971-538-277-9', 'unknown author', NULL, 'Historical/Non-Fiction', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(77, '89', 'Impossible dream: The Marcoses, The Aquinos and The Unfinished Revolution', '971-91353-2-8', 'Maria Serena I. Diokno', NULL, 'Historical/Non-Fiction', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(78, '90', 'Philippines 2000 A Vision for the Nations', '0-446-51398-9', 'Sandra Burton', NULL, 'Historical/Non-Fiction', 'GENERAL TRIAS BRANCH', 2, NULL, NULL, NULL, NULL),
(79, '91', 'ThePhilippines A Unique Nation', '971-642-071-4', 'Studio 5 Design Inc.', NULL, 'Historical/Non-Fiction', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(80, '92', 'Quingua: Mga Salaysay na may Kasaysayan tungkol SA Plaridel, Bulacan', '978-971-95131-4-8', 'Sonia M. Zaide', NULL, 'Historical/Non-Fiction', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(81, '93', 'Built on Dreams Grounded in Reality: Economic Policy Reform in the Philippines', '978-971-92445-7-8', 'Jaime B. Veneracion', NULL, 'Historical/Non-Fiction', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(82, '94', 'Room for Maneuver: Social Sector Policy Reform in the Philippines', '978-971-95652-1-5', 'Asia Foundation', NULL, 'Technical/Policy\r\n', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(83, '98', 'Mag Tek-Bok ka Bok!', '978-971-23-5033-7', 'Mag Tek-Bok ka Bok!', NULL, 'Educational/Instructional', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(84, '99', 'Ang Aklat Likhaan ng Tula at Maikling kwento 1996', '971-542-198-9', 'unknown author', NULL, 'Creative Fiction', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(85, '102', 'Ang El Filibusterismo ', '9-71-686154-0', 'Dr. Jose Rizal ', NULL, 'Literature/Classic Fiction', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(86, '103', 'Florante at Laura', '971-08-0749-8', 'Francisco Balagtas ', NULL, 'Literature/Classic Fiction', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(87, '104', 'Rizal: Life, Works and Ideals', '971-096-417-3', 'Francisco M. Zulueta', NULL, 'Educational/Instructional', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(88, '105', 'Pinagyamang Pluma Baitang 9 ', '978-971-06-3653-2', 'Baisa-Julian, Del Rosario at Lontoc', NULL, 'Textbook/Academic', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(89, '106', 'Obra Maestra ', '971-23-4081-3', 'Candelario at Cuano', NULL, 'Textbook/Academic', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(90, '107', 'Obra Maestra II ', '971-23-3407-4', 'Amog at Pagoso', NULL, 'Textbook/Academic', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(91, '108', 'Obra Maestra III', '971-23-3408-2', 'Miranda at Tulaylay', NULL, 'Textbook/Academic', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(92, '109', 'Obra Maestra IV', '971-23-3409-0', 'De Vera at Bucu ', NULL, 'Textbook/Academic', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(93, '110', 'Ibong Adarna', '971-761-004-5', 'Vivencio O. Espino ', NULL, 'Literature/Classic Fiction', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(94, '111', 'Panitikang Pilipino ( Pangalawang Edisyon)', '971-150-051-5', 'Vivencio O. Espino ', NULL, 'Textbook/Academic', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(95, '112', 'Mga Kwento ni Lola Basyang', '971-630-146-4', 'Severino Reyes', NULL, 'Children\'s Literature', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(96, '113', 'Mestra  Noli Me Tangere', '971-23-3408-2', 'Lourdes L. Miranda', NULL, 'Literature/Classic Fiction', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(97, '114', 'Mga Sala-Salawikain', '971-8970-52-5', 'Julio F. Silverio', NULL, 'Literature/Classic Fiction', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(98, '115', 'Pedro Penduko ( The Legend Begins)', '978-621-95432-7-9', 'Francisco V. Conching', NULL, 'Literature/Classic Fiction', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(99, '116', 'Cultural Icons of the Philippines', '971-191030-4-3', 'Visitacion \"Chit\" R. Dela Torre', NULL, 'Cultural/Artistic', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(100, '120', 'On Emotional Intelligence', '978-1-63369-019-6', 'unknown author', NULL, 'Self-Help', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(101, '121', 'On Managing Yourself', '978-142-215-7992', 'unknown author', NULL, 'Self-Help', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(102, '123', 'Training Reinforecement', '978-111942-5557', 'Anthonie Wurth', NULL, 'Educational/Instructional', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(103, '124', 'Marine Life of the Philippines', '978-971-0321-34-6', 'Lee Goldman', NULL, 'Science/Environment', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(104, '126', 'The Cycle (Awakening of the mind)', '978-971-9697-78-7', 'Lourdes Lim Wang', NULL, 'Motivational/Philosophical', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(105, '127', 'Letters to the President Benigno Aquino III', '978-60862-343-3', 'Patricio R. Mamot, Ph D.', NULL, 'Letters/Personal \r\n', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(106, '128', 'Supremely Partisan', '978-144266377', 'James D. Zirin', NULL, 'Non-Fiction/Inspirational:\r\n', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(107, '131', 'ANI (The Human Body Ang Katawan)', '978-1-4930-2485-8', 'Herminio S. Beltran Jr.', NULL, 'Scientific/Educational', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(108, '133', ' The Aquino Legacy An Enduring Narrative', '0116-4791', 'Efren Sicangco Cruz', NULL, 'Historical/Reports', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(109, '135', 'The Leap of your Life', '978-621-95368', 'Tommy Baker', NULL, 'Non-Fiction/Inspirational', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(110, '137', 'Metaphors of Love Mga Talinghaga ng Puso', '978-111-9552536', 'unknown author', NULL, 'Poetry/Creative', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(111, '138', 'ANI (Disaster and Survival)', '0116-4791', 'Herminio S. Beltran Jr.', NULL, 'Scientific/Educational', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(112, '139', 'ANI (Nature and Environment)', '0116-4791', 'Herminio S. Beltran Jr.', NULL, 'Scientific/Educational', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(113, '140', 'Overloaded and Underprepared', '978-1-119-02244-2', 'Denise Pope', NULL, 'Scientific/Educational', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(114, '141', 'Trust Agents', '978-1119666011', 'Chris Brogan', NULL, 'Non-Fiction/Inspirational', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(115, '142', 'The Growth Mindset', '978-119421979', 'Rick Capozzi', NULL, 'Non-Fiction/Inspirational', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(116, '144', '10.000 Nos', '978-1-11969182-2', 'Mathew Del Negro', NULL, 'Non-Fiction/Inspirational', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(117, '145', 'Readiness in Times of emergencies and disaster Handbook', '978-971-699-726-2', 'Dr. Ted Esguerra', NULL, 'Emergency Preparedness/Guide', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(118, '146', 'Cockfighting and other Stories', '978-971-9697-84-8', 'Lourdes Lim Wong', NULL, 'Fiction', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(119, '147', 'Frankeistein', '978-0-393-97293-1', 'Mary Shelley', NULL, 'Fiction', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(120, '154', 'Finding Shelter (portriats of love, healing & survival)', '978-1-4930-2509-1', 'Jesse Freidin', NULL, 'Advocacy/Personal Development', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(121, '155', 'SPSS Statistics for data analysis and visualization', '978-119-00355-7', 'Keith Mc. Cormick', NULL, 'Scientific/Educational', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(122, '156', 'World Geography', '978-0-02-145457-0', 'Richard Boehm Ph.D', NULL, 'Scientific/Educational', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(123, '157', 'Geometry', '978-0-07-673261-6', 'John A. Carter, Ph.D', NULL, 'Scientific/Educational', 'GENERAL TRIAS BRANCH', 1, NULL, NULL, NULL, NULL),
(124, '1', '3001 Questions in Communication Engineering', 'unknown', 'Excel Academic Council', 'unknown', 'Engineering', 'GENERAL TRIAS BRANCH', 1, '100', '65', NULL, NULL),
(125, '2', '3001 Questions in Electronics Engineering ', 'unknown', 'Excel Academic Council', 'unknown', 'Engineering', 'GENERAL TRIAS BRANCH', 1, '100', '65', NULL, NULL),
(126, '3', 'Communication Engineering Black Book ( Engineering Reviewer)', '97192023-9-4', 'Christopher Jay R. Soon, ECE', 'unknown', 'Engineering', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(127, '4', '1001 Solved Problems in Engineering Mathematics', '97192023-9-4', '\'Excel Academic Council', 'unknown', 'Engineering', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(128, '5', 'Electronics Systems and Technologies Summarized Yellow book', 'unknown', 'Randy O. Allado', 'unknown', 'Engineering', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(129, '6', 'Intermediate Accounting  V1', '978-621-416-087-7', 'Conrado T. Valix', 'unknown', 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(130, '7', 'Intermediate Accounting (2020 E) V2', '978-621-416-088-4', 'Conrado T. Valix', 'unknown', 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(131, '8', 'Auditing Theory', '978-971-9919-79-7', 'Gerardo S. Roque', 'unknown', 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(132, '9', 'AFAR Quick Notes 2019', '978-621-95505-7-4', 'Ivan Yannick S. Bagayao', 'unknown', 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(133, '10', 'RFBT MCQ CPA REVIEWER', '978-621-95242-3-0', 'Andrix D. Domingo CPA.MBA', 'unknown', 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(134, '11', 'Notes in Business Law', '978-971-9919-95-7', 'Fidelito Soriano', 'unknown', 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(135, '12', 'Business Finance and Philippine Business Firms', '971-12-0229-8', 'Nati C. San Gabriel', 'unknown', 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(136, '13', 'Pointers in Business Law', '978-621-416-085-3', 'Carlos B. Suares, Alerxander Suarez', 'unknown', 'Law', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(137, '14', 'Applied Auditing', '978-971-95940-2-4', 'Darrell Joe O. Asuncion CPA, MBA', 'unknown', 'Law', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(138, '15', 'Practical Financial Accounting V.1 2018', '978-621-416-053-2', 'Conrado T. Valix', 'unknown', 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(139, '16', 'CPA Reviewer in Taxation', '978-621-95229-9-1', 'Enrico Tabag', 'unknown', 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(140, '17', 'Auditing Theory', '978-971-9919-63-6', 'Jekell G. Salonga CPA', 'unknown', 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(141, '18', 'Practical Financial Accounting V.1 2019', '978-621-416-077-8', 'Conrado T. Valix', 'unknown', 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(142, '19', 'Conceptual Framework and Accounting Standards', '978-621-416-085-3', 'Conrado T. Valix', 'unknown', 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(143, '20', 'Practical Accounting', '978-621-416-081-5', 'Conrado T. Valix', 'unknown', 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(144, '21', 'Reviewer for ACET and UPCAt', '971-8740-32-5', 'Merle Alferez', 'unknown', 'Test Preparation', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(145, '22', 'Review Question 2 UPCAt ', '971-8740-32-5', 'Merle Alferez', 'unknown', 'Test Preparation', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(146, '23', 'Learning Chabacano A Handbook', 'unknown', 'Enrique R. Escalante, Ed. D', 'unknown', 'Language and Culture', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(147, '24', 'Modern and Contemporary Philosophy', '971-08-6693-1', 'Maria Imelda Nabor-Nery', 'unknown', 'Philosophy and Humanities', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(148, '25', 'Keeping the Legacy: Reflections on Filipino Values', '971-581-145-0', 'Nestor C. Rilloma', 'unknown', 'Philosophy and Humanities', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(149, '26', 'A Guide to Understanding Climate Variability and Climate Change', '978-971-579-054-3', 'Pulhin, Lasco, Espaldon and Garcia', 'unknown', 'Science/Climate', 'GENERAL TRIAS BRANCH', 5, '0', '0', NULL, NULL),
(150, '27', 'Dictionary of Evidence Second Edition 2005', '971-08-6507-2', 'Oscar B. Bernardo', 'unknown', 'General Reference', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(151, '28', 'A Nation on Fire: The Unmaking of Joseph Ejercito Estrada and The Remaking of Democracy in the Philippines', '971-92555-1-X', 'Francisco S. Tatat', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(152, '29', 'Supreme Court: Circulars, Orders, Resolutions', 'unknown', 'Puno and Soriano', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(153, '30', 'Bukidnon The Philippine Frontier', '978-971-94868-0-0', 'Rafael A. S. G. Ongpin', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(154, '31', 'Mga Bugtong at Salawikain para sa Bagong Henerasyon', '971-27-1230-3', 'Nimrod and Vivian Tica', 'unknown', 'Language and Culture', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(155, '32', 'Sining ng Pakikipagtalastasang Panlipunan', '971-08-6318-5', 'Lorenzo, San Juan, De Leon, Mag Atas', 'unknown', 'Language and Culture', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(156, '33', 'Chabacano for Everyone: A Guide to the Chabacano Language', 'unknown', 'Enrique R. Escalante, Ed. D', 'unknown', 'Language and Culture', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(157, '34', 'Diccionario Chabacano Del Ciudad de Cavite', '971-91739-1-2', 'unknown', 'unknown', 'Language and Culture', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(158, '35', 'Fundamentals Speech Communication for Filipinos', '971-08-6625-7', 'Manalo and Fermin', 'unknown', 'Language and Culture', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(159, '36', 'IL Nuovo Dizionario Filippino Italiano-Tagalog/ Tagalog Italiano', '971-08-6617-6', 'Dominador B. Limeta', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(160, '37', 'Filipino Cooking and Entertaining Here & Abroad ', '971-08-6615-X', 'Eleanor R. Laquian', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(161, '38', 'Jose Rizal: Buhay, Mga Ginawa at mga Sinulat ng Isang Henyo, Manunulat, Siyentipiko, at Pambansang Bayani', '971-642-044-7', 'Gregorio and Sonia Zaide', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 2, '0', '0', NULL, NULL),
(162, '39', 'Saloobin Sagot ni Hen. Emilio Aguinaldo sa mga Paratang ng Dakilang Lumpo', '971-92590-0-0', 'Emmanuel Franco Calairo', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(163, '40', 'Remembering the Cavite Matunity of 1872', '971-917-583-4', 'Dr. Celestina P. Boncan', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(164, '41', 'Cavite Cultura e Historia', '971-91706-9-7', 'Teresita P. Unabia', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(165, '42', 'Gen. Trias: The Story of General Mariano C. Trias First Vice President of the Philippine Republic', 'unknown', 'Emmanuel Franco Calairo', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 5, '0', '0', NULL, NULL),
(166, '43', 'Cavite: Glorious Chronicle of the Century', 'unknown', 'Roy C. Iglesias', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(167, '44', 'Cavite\'s Turning Point: Political Will and Development at the Turn of the Century, 1979-1995', '978-971-92590-8-4', 'Emmanuel Franco Calairo', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 8, '0', '0', NULL, NULL),
(168, '45', 'Sayaw: Philippine Dances', '971-27-1168-4', 'Alejandro and Santos-Gana', 'unknown', 'Arts and Performing Arts', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(169, '46', 'Ang Screenplay ng Jose Rizal ', 'unknown', 'Lee, Lana and Lim', 'unknown', 'Arts and Performing Arts', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(170, '47', 'El Filibusterismo', '971-8957-03-0', 'Jose Rizal', 'unknown', 'Literature and Biographies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(171, '48', 'Mga Dulang may Isang Yugto Batay sa Noli and Fili ni Dr. Jose Rizal ', '971-08-6592-7', 'Matute and Casanova', 'unknown', 'Literature and Biographies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(172, '49', 'Sining sa Pagbigkas: Mga Tula, Balagtasan at Talumpati', '971-08-6591-9', 'Alfredo and Rosario Singh', 'unknown', 'Arts and Performing Arts', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(173, '50', 'Diaspora at iba pang kwento ni Genoveva Edroza Matute', '971-08-6622-2', 'Genoveva Edroza Matute', 'unknown', 'Literature and Biographies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(174, '51', 'Samu\'t Saring Dulang Pambata', '971-08-6744-X', 'Arthur P. Casanova', 'unknown', 'Children\'s Literature', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(175, '52', 'Chino and His Time', '978-971-27-2395-7', 'Vergel O. Santos', 'unknown', 'Literature and Biographies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(176, '53', 'Hangga\'t Alat ang Dagat at Isang Haliging Asin', '971-08-6755-5', 'Joey A. Arrogante ', 'unknown', 'Children\'s Literature', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(177, '54', 'Tuhug-Tuhog: 25 Maiikling Kuwento ng Pag-ibig at Pakikipagsapalaran ng mga OFWs', '971-08-6618-4', 'unknown', 'unknown', 'Anthologies and Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(178, '55', 'Philippine Folk Stories Vol. 1', '971-08-6754-8', 'Frank G. Rivera', 'unknown', 'Anthologies and Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(179, '56', 'Ugat ng Panitikang Pilipino', '971-08-6543-9', 'Zenaida L. Cruz', 'unknown', 'Anthologies and Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(180, '57', 'Jose Rizal: Iba\'t Ibang Pananaw', 'unknown', 'Frank G. Rivera', 'unknown', 'Literature and Biographies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(181, '58', 'Convention and Event Management', '971-08-6691-5', 'Zenaida L. Cruz', 'unknown', 'Business and Management', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(182, '59', 'Buhay Pinoy Overseas: O Jose, Can\'t You See?', '971-08-6749-0', 'Somera and Valente', 'unknown', 'OFW Narratives', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(183, '60', 'Kris of Valor', '971-8886-001', 'Margarita Delos Reyes Cojuangco', 'unknown', 'War and Valor', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(184, '61', 'Atlas of the Philippine and the World for Home and Office', '971-08-6726-1', 'unknown', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(185, '62', 'Atlas of the Philippine and the World for Elementary', '971-08-6715-6', 'unknown', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(186, '63', 'Atlas of the Philippine and The World for Highschool', '971-08-6716-4', 'unknown', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(187, '64', 'Lineage Life and Labors of Jose Rizal Philippine Patriot', 'unknown', 'Prof. Austine Kraig', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(188, '65', 'Movement of Miracles ( The Life and Times of Deogracias Banaban Custodio M.D.', '978-971-93789-2-1', 'Prof. Austine Kraig', 'unknown', 'Biographies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(189, '66', 'The Life and Times of the Perdon Family', '978-0-9804827-3-7', 'Renato Perdon', 'unknown', 'Biographies', 'GENERAL TRIAS BRANCH', 2, '0', '0', NULL, NULL),
(190, '67', 'We Were There at the Battle for Bataan', 'LCC 57-5203', 'Benjamin Appel', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(191, '68', 'The Great Raid on Cabanatuan Rescuing the Doomed Ghosts of Bataan and Corregidor', '0-471-03742-7', 'William B. Breuer', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(192, '69', 'This is the Philippines', '1-85974-196-7', 'Nigel Hicks', 'unknown', 'Cultural and General Knowledge', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(193, '70', 'Burgos and the Cavite Community', '971-550-461-2', 'John N. Schumacher, S.J', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(194, '71', 'Philippine History and Government Through the years', '971-08-6344-4', 'Zulueta and Nebres', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(195, '72', 'History from the People: Kasaysayan mula sa Bayan Vol. 2', '971-538-124-3', 'Digna B. Apilado', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(196, '73', 'History from the People: Kasaysayan mula sa Bayan Vol. 5', 'unknown', 'Digna B. Apilado', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(197, '74', 'History from the People: Kasaysayan mula sa Bayan Vol. 11', '971-538-133-2', 'Vergel O. Santos', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 4, '0', '0', NULL, NULL),
(198, '75', 'Kasaysayan The Story of the Filipino People: The Philippine Archipelago Vol. 1', '962-258-224-9', 'unknown', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 4, '0', '0', NULL, NULL),
(199, '76', 'Kasaysayan The Story of the Filipino People: The Earliest Filipinos Vol. 2', '962-258-225-7', 'Casal, Dizon, Ronquillo, Salcedo', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 4, '0', '0', NULL, NULL),
(200, '77', 'Kasaysayan The Story of the Filipino People: The Spanish Conquest Vol. 3', '962-258-226-5', 'Jose S. Arcilla Jr.', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 4, '0', '0', NULL, NULL),
(201, '78', 'Kasaysayan The Story of the Filipino People: Life in the Colony Vol. 4', '962-258-227-3', 'Diokno and Villegas', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 4, '0', '0', NULL, NULL),
(202, '79', 'Kasaysayan The Story of the Filipino People: Reform and Revolution Vol. 5', '962-258-228-1', 'Guerrero and Schumacher, S.J', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 4, '0', '0', NULL, NULL),
(203, '80', 'Kasaysayan The Story of the Filipino People: Under the Stars and Stripes Vol. 6', '962-258-229-X', 'Milagros C. Guerrero', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 4, '0', '0', NULL, NULL),
(204, '81', 'Kasaysayan The Story of the Filipino People: The Japanese Occupation Vol. 7 ', '962-258-230-3', 'Ricardo T. Jose', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 4, '0', '0', NULL, NULL),
(205, '82', 'Kasaysayan The Story of the Filipino People: Up from the Ashes Vol. 8', '962-258-231-1', 'Ma. Serena I. Diokno', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 4, '0', '0', NULL, NULL),
(206, '83', 'Kasaysayan The Story of the Filipino People: A Nation Reborn Vol. 9', '962-258-232-X', 'Alexander R. Magno', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 4, '0', '0', NULL, NULL),
(207, '84', 'Kasaysayan The Story of the Filipino People: A Timeline of the Philippine History Vol. 10', '962-258-233-8', 'Henry S. Totanes', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 2, '0', '0', NULL, NULL),
(208, '85', 'As I See It', '0-646-45381-5', 'Pura Santillan-Castrence', 'unknown', 'Essays ', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(209, '86', 'The Liberation of the Philippines Luzon,Mindanao,The Visayas 1944-1945', '0-7858-1314-4', 'Samuel Elliot Morison', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(210, '87', 'Our Beloved Country A History of the Philippines', '978-971-27-2574-6', 'Havannah, Galbes, Aristol and Correa', 'unknown', 'Historical/Non-Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(211, '88', 'Hidden Lives, Concealed Narratives: A History of Leprosy in the Philippines', '978-971-538-277-9', 'unknown', 'unknown', 'Historical/Non-Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(212, '89', 'Impossible dream: The Marcoses, The Aquinos and The Unfinished Revolution', '971-91353-2-8', 'Maria Serena I. Diokno', 'unknown', 'Historical/Non-Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(213, '90', 'Philippines 2000 A Vision for the Nations', '0-446-51398-9', 'Sandra Burton', 'unknown', 'Historical/Non-Fiction', 'GENERAL TRIAS BRANCH', 2, '0', '0', NULL, NULL),
(214, '91', 'ThePhilippines A Unique Nation', '971-642-071-4', 'Studio 5 Design Inc.', 'unknown', 'Historical/Non-Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(215, '92', 'Quingua: Mga Salaysay na may Kasaysayan tungkol SA Plaridel, Bulacan', '978-971-95131-4-8', 'Sonia M. Zaide', 'unknown', 'Historical/Non-Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(216, '93', 'Built on Dreams Grounded in Reality: Economic Policy Reform in the Philippines', '978-971-92445-7-8', 'Jaime B. Veneracion', 'unknown', 'Historical/Non-Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(217, '94', 'Room for Maneuver: Social Sector Policy Reform in the Philippines', '978-971-95652-1-5', 'Asia Foundation', 'unknown', 'Technical/Policy\r\n', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(218, '95', 'The 2008 State of the Nation Address Technical Report', 'unknown', '\'Presidential Management Staff 2008', 'unknown', 'Technical/Policy', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(219, '98', 'Mag Tek-Bok ka Bok!', '978-971-23-5033-7', 'Mag Tek-Bok ka Bok!', 'unknown', 'Educational/Instructional', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(220, '99', 'Ang Aklat Likhaan ng Tula at Maikling kwento 1996', '971-542-198-9', 'unknown', 'unknown', 'Creative Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(221, '100', 'A Century of Philippine Legislature Vol. 1 1896-1954 ', 'unknown', 'Manuel D. Duldulao', 'unknown', 'Historical/Non-Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(222, '102', 'Ang El Filibusterismo ', '9-71-686154-0', 'Dr. Jose Rizal ', 'unknown', 'Literature/Classic Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(223, '103', 'Florante at Laura', '971-08-0749-8', 'Francisco Balagtas ', 'unknown', 'Literature/Classic Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(224, '104', 'Rizal: Life, Works and Ideals', '971-096-417-3', 'Francisco M. Zulueta', 'unknown', 'Educational/Instructional', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(225, '105', 'Pinagyamang Pluma Baitang 9 ', '978-971-06-3653-2', 'Baisa-Julian, Del Rosario at Lontoc', 'unknown', 'Textbook/Academic', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(226, '106', 'Obra Maestra ', '971-23-4081-3', 'Candelario at Cuano', 'unknown', 'Textbook/Academic', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(227, '107', 'Obra Maestra II ', '971-23-3407-4', 'Amog at Pagoso', 'unknown', 'Textbook/Academic', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(228, '108', 'Obra Maestra III', '971-23-3408-2', 'Miranda at Tulaylay', 'unknown', 'Textbook/Academic', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(229, '109', 'Obra Maestra IV', '971-23-3409-0', 'De Vera at Bucu ', 'unknown', 'Textbook/Academic', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(230, '110', 'Ibong Adarna', '971-761-004-5', 'Vivencio O. Espino ', 'unknown', 'Literature/Classic Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(231, '111', 'Panitikang Pilipino ( Pangalawang Edisyon)', '971-150-051-5', 'Vivencio O. Espino ', 'unknown', 'Textbook/Academic', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(232, '112', 'Mga Kwento ni Lola Basyang', '971-630-146-4', 'Severino Reyes', 'unknown', 'Children\'s Literature', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(233, '113', 'Mestra  Noli Me Tangere', '971-23-3408-2', 'Lourdes L. Miranda', 'unknown', 'Literature/Classic Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(234, '114', 'Mga Sala-Salawikain', '971-8970-52-5', 'Julio F. Silverio', 'unknown', 'Literature/Classic Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(235, '115', 'Pedro Penduko ( The Legend Begins)', '978-621-95432-7-9', 'Francisco V. Conching', 'unknown', 'Literature/Classic Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(236, '116', 'Cultural Icons of the Philippines', '971-191030-4-3', 'Visitacion \"Chit\" R. Dela Torre', 'unknown', 'Cultural/Artistic', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(237, '117', '1998 CCP Directory and guide', 'unknown', 'unknown', 'unknown', 'Cultural/Artistic', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(238, '120', 'On Emotional Intelligence', '978-1-63369-019-6', 'unknown', 'unknown', 'Self-Help', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(239, '121', 'On Managing Yourself', '978-142-215-7992', 'unknown', 'unknown', 'Self-Help', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(240, '122', 'Pag abuso sa Droga (Kontrolin at Iwasan)', 'unknown', 'unknown', 'unknown', 'Advocacy/Health\r\n', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(241, '123', 'Training Reinforecement', '978-111942-5557', 'Anthonie Wurth', 'unknown', 'Educational/Instructional', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(242, '124', 'Marine Life of the Philippines', '978-971-0321-34-6', 'Lee Goldman', 'unknown', 'Science/Environment', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(243, '126', 'The Cycle (Awakening of the mind)', '978-971-9697-78-7', 'Lourdes Lim Wang', 'unknown', 'Motivational/Philosophical', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(244, '127', 'Letters to the President Benigno Aquino III', '978-60862-343-3', 'Patricio R. Mamot, Ph D.', 'unknown', 'Letters/Personal \r\n', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(245, '128', 'Supremely Partisan', '978-144266377', 'James D. Zirin', 'unknown', 'Non-Fiction/Inspirational:\r\n', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(246, '131', 'ANI (The Human Body Ang Katawan)', '978-1-4930-2485-8', 'Herminio S. Beltran Jr.', 'unknown', 'Scientific/Educational', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(247, '132', 'ANI (The Animal Kingdom)', 'unknown', 'Herminio S. Beltran Jr.', 'unknown', 'Scientific/Educational', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(248, '133', ' The Aquino Legacy An Enduring Narrative', '0116-4791', 'Efren Sicangco Cruz', 'unknown', 'Historical/Reports', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(249, '135', 'The Leap of your Life', '978-621-95368', 'Tommy Baker', 'unknown', 'Non-Fiction/Inspirational', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(250, '137', 'Metaphors of Love Mga Talinghaga ng Puso', '978-111-9552536', 'unknown', 'unknown', 'Poetry/Creative', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(251, '138', 'ANI (Disaster and Survival)', '0116-4791', 'Herminio S. Beltran Jr.', 'unknown', 'Scientific/Educational', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(252, '139', 'ANI (Nature and Environment)', '0116-4791', 'Herminio S. Beltran Jr.', 'unknown', 'Scientific/Educational', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(253, '140', 'Overloaded and Underprepared', '978-1-119-02244-2', 'Denise Pope', 'unknown', 'Scientific/Educational', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(254, '141', 'Trust Agents', '978-1119666011', 'Chris Brogan', 'unknown', 'Non-Fiction/Inspirational', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(255, '142', 'The Growth Mindset', '978-119421979', 'Rick Capozzi', 'unknown', 'Non-Fiction/Inspirational', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(256, '144', '10.000 Nos', '978-1-11969182-2', 'Mathew Del Negro', 'unknown', 'Non-Fiction/Inspirational', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(257, '145', 'Readiness in Times of emergencies and disaster Handbook', '978-971-699-726-2', 'Dr. Ted Esguerra', 'unknown', 'Emergency Preparedness/Guide', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(258, '146', 'Cockfighting and other Stories', '978-971-9697-84-8', 'Lourdes Lim Wong', 'unknown', 'Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(259, '147', 'Frankeistein', '978-0-393-97293-1', 'Mary Shelley', 'unknown', 'Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(260, '148', '1998 Philippine International Dance Conference', 'unknown', 'Basilio Esteban    S. Villaruz', 'unknown', 'Historical/Reports', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(261, '149', 'National Library Annual Report 2022', 'unknown', 'unknown', 'unknown', 'Historical/Reports', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(262, '150', 'Sari Saring Kasarian: Pagmamahal, Carino Brutal. Atbp.', 'unknown', 'unknown', 'unknown', 'Social Issues', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(263, '151', 'Cultural Center of the Philippines ( The President\'s Report 1984)', 'unknown', 'unknown', 'unknown', 'Historical/Reports', 'GENERAL TRIAS BRANCH', 3, '0', '0', NULL, NULL),
(264, '152', 'Genesis', 'unknown', 'unknown', 'unknown', 'Religious/Spiritual', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(265, '154', 'Finding Shelter (portriats of love, healing & survival)', '978-1-4930-2509-1', 'Jesse Freidin', 'unknown', 'Advocacy/Personal Development', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(266, '155', 'SPSS Statistics for data analysis and visualization', '978-119-00355-7', 'Keith Mc. Cormick', 'unknown', 'Scientific/Educational', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(267, '156', 'World Geography', '978-0-02-145457-0', 'Richard Boehm Ph.D', 'unknown', 'Scientific/Educational', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(268, '157', 'Geometry', '978-0-07-673261-6', 'John A. Carter, Ph.D', 'unknown', 'Scientific/Educational', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(269, '158', 'Acta Non Verba  (Action not words )', 'unknown', 'Nelson A. Navarro', 'unknown', 'Artistic/Cultural', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(270, '159', 'Panitikan', 'unknown', 'Doreen Fernandez', 'unknown', 'Artistic/Cultural', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(271, '160', 'Pelikula', 'unknown', 'Bienvenido Lumbrera', 'unknown', 'Artistic/Cultural', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(272, '161', 'Sayaw', 'unknown', 'Basilio Esteban    S. Villaruz', 'unknown', 'Artistic/Cultural', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(273, '163', 'Arkitektura', 'unknown', 'Rodrigo D Perez', 'unknown', 'Artistic/Cultural', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(274, '164', 'Dulaan', 'unknown', 'Nicanor Tiongson', 'unknown', 'Artistic/Cultural', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(275, '165', 'Musika', 'unknown', 'Antonio C. Hila', 'unknown', 'Artistic/Cultural', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(276, '166', 'Maxie\'s Atudy-Sack Date', 'unknown', 'Sandra Schramn Cayetano', 'unknown', 'Poetry/Creative', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(277, '1', '3001 Questions in Communication Engineering', 'unknown', 'Excel Academic Council', 'unknown', 'Engineering', 'GENERAL TRIAS BRANCH', 1, '100', '65', NULL, NULL);
INSERT INTO `books` (`book_id`, `item_no`, `ISBN`, `title`, `author_name`, `access_no`, `genre`, `branch`, `quantity`, `amount`, `total_value`, `date_acquired`, `publication`) VALUES
(278, '2', '3001 Questions in Electronics Engineering ', 'unknown', 'Excel Academic Council', 'unknown', 'Engineering', 'GENERAL TRIAS BRANCH', 1, '100', '65', NULL, NULL),
(279, '3', 'Communication Engineering Black Book ( Engineering Reviewer)', '97192023-9-4', 'Christopher Jay R. Soon, ECE', 'unknown', 'Engineering', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(280, '4', '1001 Solved Problems in Engineering Mathematics', '97192023-9-4', '\'Excel Academic Council', 'unknown', 'Engineering', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(281, '5', 'Electronics Systems and Technologies Summarized Yellow book', 'unknown', 'Randy O. Allado', 'unknown', 'Engineering', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(282, '6', 'Intermediate Accounting  V1', '978-621-416-087-7', 'Conrado T. Valix', 'unknown', 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(283, '7', 'Intermediate Accounting (2020 E) V2', '978-621-416-088-4', 'Conrado T. Valix', 'unknown', 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(284, '8', 'Auditing Theory', '978-971-9919-79-7', 'Gerardo S. Roque', 'unknown', 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(285, '9', 'AFAR Quick Notes 2019', '978-621-95505-7-4', 'Ivan Yannick S. Bagayao', 'unknown', 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(286, '10', 'RFBT MCQ CPA REVIEWER', '978-621-95242-3-0', 'Andrix D. Domingo CPA.MBA', 'unknown', 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(287, '11', 'Notes in Business Law', '978-971-9919-95-7', 'Fidelito Soriano', 'unknown', 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(288, '12', 'Business Finance and Philippine Business Firms', '971-12-0229-8', 'Nati C. San Gabriel', 'unknown', 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(289, '13', 'Pointers in Business Law', '978-621-416-085-3', 'Carlos B. Suares, Alerxander Suarez', 'unknown', 'Law', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(290, '14', 'Applied Auditing', '978-971-95940-2-4', 'Darrell Joe O. Asuncion CPA, MBA', 'unknown', 'Law', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(291, '15', 'Practical Financial Accounting V.1 2018', '978-621-416-053-2', 'Conrado T. Valix', 'unknown', 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(292, '16', 'CPA Reviewer in Taxation', '978-621-95229-9-1', 'Enrico Tabag', 'unknown', 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(293, '17', 'Auditing Theory', '978-971-9919-63-6', 'Jekell G. Salonga CPA', 'unknown', 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(294, '18', 'Practical Financial Accounting V.1 2019', '978-621-416-077-8', 'Conrado T. Valix', 'unknown', 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(295, '19', 'Conceptual Framework and Accounting Standards', '978-621-416-085-3', 'Conrado T. Valix', 'unknown', 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(296, '20', 'Practical Accounting', '978-621-416-081-5', 'Conrado T. Valix', 'unknown', 'Accounting/Finance', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(297, '21', 'Reviewer for ACET and UPCAt', '971-8740-32-5', 'Merle Alferez', 'unknown', 'Test Preparation', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(298, '22', 'Review Question 2 UPCAt ', '971-8740-32-5', 'Merle Alferez', 'unknown', 'Test Preparation', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(299, '23', 'Learning Chabacano A Handbook', 'unknown', 'Enrique R. Escalante, Ed. D', 'unknown', 'Language and Culture', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(300, '24', 'Modern and Contemporary Philosophy', '971-08-6693-1', 'Maria Imelda Nabor-Nery', 'unknown', 'Philosophy and Humanities', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(301, '25', 'Keeping the Legacy: Reflections on Filipino Values', '971-581-145-0', 'Nestor C. Rilloma', 'unknown', 'Philosophy and Humanities', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(302, '26', 'A Guide to Understanding Climate Variability and Climate Change', '978-971-579-054-3', 'Pulhin, Lasco, Espaldon and Garcia', 'unknown', 'Science/Climate', 'GENERAL TRIAS BRANCH', 5, '0', '0', NULL, NULL),
(303, '27', 'Dictionary of Evidence Second Edition 2005', '971-08-6507-2', 'Oscar B. Bernardo', 'unknown', 'General Reference', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(304, '28', 'A Nation on Fire: The Unmaking of Joseph Ejercito Estrada and The Remaking of Democracy in the Philippines', '971-92555-1-X', 'Francisco S. Tatat', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(305, '29', 'Supreme Court: Circulars, Orders, Resolutions', 'unknown', 'Puno and Soriano', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(306, '30', 'Bukidnon The Philippine Frontier', '978-971-94868-0-0', 'Rafael A. S. G. Ongpin', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(307, '31', 'Mga Bugtong at Salawikain para sa Bagong Henerasyon', '971-27-1230-3', 'Nimrod and Vivian Tica', 'unknown', 'Language and Culture', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(308, '32', 'Sining ng Pakikipagtalastasang Panlipunan', '971-08-6318-5', 'Lorenzo, San Juan, De Leon, Mag Atas', 'unknown', 'Language and Culture', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(309, '33', 'Chabacano for Everyone: A Guide to the Chabacano Language', 'unknown', 'Enrique R. Escalante, Ed. D', 'unknown', 'Language and Culture', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(310, '34', 'Diccionario Chabacano Del Ciudad de Cavite', '971-91739-1-2', 'unknown', 'unknown', 'Language and Culture', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(311, '35', 'Fundamentals Speech Communication for Filipinos', '971-08-6625-7', 'Manalo and Fermin', 'unknown', 'Language and Culture', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(312, '36', 'IL Nuovo Dizionario Filippino Italiano-Tagalog/ Tagalog Italiano', '971-08-6617-6', 'Dominador B. Limeta', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(313, '37', 'Filipino Cooking and Entertaining Here & Abroad ', '971-08-6615-X', 'Eleanor R. Laquian', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(314, '38', 'Jose Rizal: Buhay, Mga Ginawa at mga Sinulat ng Isang Henyo, Manunulat, Siyentipiko, at Pambansang Bayani', '971-642-044-7', 'Gregorio and Sonia Zaide', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 2, '0', '0', NULL, NULL),
(315, '39', 'Saloobin Sagot ni Hen. Emilio Aguinaldo sa mga Paratang ng Dakilang Lumpo', '971-92590-0-0', 'Emmanuel Franco Calairo', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(316, '40', 'Remembering the Cavite Matunity of 1872', '971-917-583-4', 'Dr. Celestina P. Boncan', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(317, '41', 'Cavite Cultura e Historia', '971-91706-9-7', 'Teresita P. Unabia', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(318, '42', 'Gen. Trias: The Story of General Mariano C. Trias First Vice President of the Philippine Republic', 'unknown', 'Emmanuel Franco Calairo', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 5, '0', '0', NULL, NULL),
(319, '43', 'Cavite: Glorious Chronicle of the Century', 'unknown', 'Roy C. Iglesias', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(320, '44', 'Cavite\'s Turning Point: Political Will and Development at the Turn of the Century, 1979-1995', '978-971-92590-8-4', 'Emmanuel Franco Calairo', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 8, '0', '0', NULL, NULL),
(321, '45', 'Sayaw: Philippine Dances', '971-27-1168-4', 'Alejandro and Santos-Gana', 'unknown', 'Arts and Performing Arts', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(322, '46', 'Ang Screenplay ng Jose Rizal ', 'unknown', 'Lee, Lana and Lim', 'unknown', 'Arts and Performing Arts', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(323, '47', 'El Filibusterismo', '971-8957-03-0', 'Jose Rizal', 'unknown', 'Literature and Biographies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(324, '48', 'Mga Dulang may Isang Yugto Batay sa Noli and Fili ni Dr. Jose Rizal ', '971-08-6592-7', 'Matute and Casanova', 'unknown', 'Literature and Biographies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(325, '49', 'Sining sa Pagbigkas: Mga Tula, Balagtasan at Talumpati', '971-08-6591-9', 'Alfredo and Rosario Singh', 'unknown', 'Arts and Performing Arts', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(326, '50', 'Diaspora at iba pang kwento ni Genoveva Edroza Matute', '971-08-6622-2', 'Genoveva Edroza Matute', 'unknown', 'Literature and Biographies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(327, '51', 'Samu\'t Saring Dulang Pambata', '971-08-6744-X', 'Arthur P. Casanova', 'unknown', 'Children\'s Literature', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(328, '52', 'Chino and His Time', '978-971-27-2395-7', 'Vergel O. Santos', 'unknown', 'Literature and Biographies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(329, '53', 'Hangga\'t Alat ang Dagat at Isang Haliging Asin', '971-08-6755-5', 'Joey A. Arrogante ', 'unknown', 'Children\'s Literature', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(330, '54', 'Tuhug-Tuhog: 25 Maiikling Kuwento ng Pag-ibig at Pakikipagsapalaran ng mga OFWs', '971-08-6618-4', 'unknown', 'unknown', 'Anthologies and Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(331, '55', 'Philippine Folk Stories Vol. 1', '971-08-6754-8', 'Frank G. Rivera', 'unknown', 'Anthologies and Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(332, '56', 'Ugat ng Panitikang Pilipino', '971-08-6543-9', 'Zenaida L. Cruz', 'unknown', 'Anthologies and Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(333, '57', 'Jose Rizal: Iba\'t Ibang Pananaw', 'unknown', 'Frank G. Rivera', 'unknown', 'Literature and Biographies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(334, '58', 'Convention and Event Management', '971-08-6691-5', 'Zenaida L. Cruz', 'unknown', 'Business and Management', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(335, '59', 'Buhay Pinoy Overseas: O Jose, Can\'t You See?', '971-08-6749-0', 'Somera and Valente', 'unknown', 'OFW Narratives', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(336, '60', 'Kris of Valor', '971-8886-001', 'Margarita Delos Reyes Cojuangco', 'unknown', 'War and Valor', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(337, '61', 'Atlas of the Philippine and the World for Home and Office', '971-08-6726-1', 'unknown', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(338, '62', 'Atlas of the Philippine and the World for Elementary', '971-08-6715-6', 'unknown', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(339, '63', 'Atlas of the Philippine and The World for Highschool', '971-08-6716-4', 'unknown', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(340, '64', 'Lineage Life and Labors of Jose Rizal Philippine Patriot', 'unknown', 'Prof. Austine Kraig', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(341, '65', 'Movement of Miracles ( The Life and Times of Deogracias Banaban Custodio M.D.', '978-971-93789-2-1', 'Prof. Austine Kraig', 'unknown', 'Biographies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(342, '66', 'The Life and Times of the Perdon Family', '978-0-9804827-3-7', 'Renato Perdon', 'unknown', 'Biographies', 'GENERAL TRIAS BRANCH', 2, '0', '0', NULL, NULL),
(343, '67', 'We Were There at the Battle for Bataan', 'LCC 57-5203', 'Benjamin Appel', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(344, '68', 'The Great Raid on Cabanatuan Rescuing the Doomed Ghosts of Bataan and Corregidor', '0-471-03742-7', 'William B. Breuer', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(345, '69', 'This is the Philippines', '1-85974-196-7', 'Nigel Hicks', 'unknown', 'Cultural and General Knowledge', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(346, '70', 'Burgos and the Cavite Community', '971-550-461-2', 'John N. Schumacher, S.J', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(347, '71', 'Philippine History and Government Through the years', '971-08-6344-4', 'Zulueta and Nebres', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(348, '72', 'History from the People: Kasaysayan mula sa Bayan Vol. 2', '971-538-124-3', 'Digna B. Apilado', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(349, '73', 'History from the People: Kasaysayan mula sa Bayan Vol. 5', 'unknown', 'Digna B. Apilado', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(350, '74', 'History from the People: Kasaysayan mula sa Bayan Vol. 11', '971-538-133-2', 'Vergel O. Santos', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 4, '0', '0', NULL, NULL),
(351, '75', 'Kasaysayan The Story of the Filipino People: The Philippine Archipelago Vol. 1', '962-258-224-9', 'unknown', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 4, '0', '0', NULL, NULL),
(352, '76', 'Kasaysayan The Story of the Filipino People: The Earliest Filipinos Vol. 2', '962-258-225-7', 'Casal, Dizon, Ronquillo, Salcedo', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 4, '0', '0', NULL, NULL),
(353, '77', 'Kasaysayan The Story of the Filipino People: The Spanish Conquest Vol. 3', '962-258-226-5', 'Jose S. Arcilla Jr.', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 4, '0', '0', NULL, NULL),
(354, '78', 'Kasaysayan The Story of the Filipino People: Life in the Colony Vol. 4', '962-258-227-3', 'Diokno and Villegas', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 4, '0', '0', NULL, NULL),
(355, '79', 'Kasaysayan The Story of the Filipino People: Reform and Revolution Vol. 5', '962-258-228-1', 'Guerrero and Schumacher, S.J', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 4, '0', '0', NULL, NULL),
(356, '80', 'Kasaysayan The Story of the Filipino People: Under the Stars and Stripes Vol. 6', '962-258-229-X', 'Milagros C. Guerrero', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 4, '0', '0', NULL, NULL),
(357, '81', 'Kasaysayan The Story of the Filipino People: The Japanese Occupation Vol. 7 ', '962-258-230-3', 'Ricardo T. Jose', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 4, '0', '0', NULL, NULL),
(358, '82', 'Kasaysayan The Story of the Filipino People: Up from the Ashes Vol. 8', '962-258-231-1', 'Ma. Serena I. Diokno', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 4, '0', '0', NULL, NULL),
(359, '83', 'Kasaysayan The Story of the Filipino People: A Nation Reborn Vol. 9', '962-258-232-X', 'Alexander R. Magno', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 4, '0', '0', NULL, NULL),
(360, '84', 'Kasaysayan The Story of the Filipino People: A Timeline of the Philippine History Vol. 10', '962-258-233-8', 'Henry S. Totanes', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 2, '0', '0', NULL, NULL),
(361, '85', 'As I See It', '0-646-45381-5', 'Pura Santillan-Castrence', 'unknown', 'Essays ', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(362, '86', 'The Liberation of the Philippines Luzon,Mindanao,The Visayas 1944-1945', '0-7858-1314-4', 'Samuel Elliot Morison', 'unknown', 'History and Political Studies', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(363, '87', 'Our Beloved Country A History of the Philippines', '978-971-27-2574-6', 'Havannah, Galbes, Aristol and Correa', 'unknown', 'Historical/Non-Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(364, '88', 'Hidden Lives, Concealed Narratives: A History of Leprosy in the Philippines', '978-971-538-277-9', 'unknown', 'unknown', 'Historical/Non-Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(365, '89', 'Impossible dream: The Marcoses, The Aquinos and The Unfinished Revolution', '971-91353-2-8', 'Maria Serena I. Diokno', 'unknown', 'Historical/Non-Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(366, '90', 'Philippines 2000 A Vision for the Nations', '0-446-51398-9', 'Sandra Burton', 'unknown', 'Historical/Non-Fiction', 'GENERAL TRIAS BRANCH', 2, '0', '0', NULL, NULL),
(367, '91', 'ThePhilippines A Unique Nation', '971-642-071-4', 'Studio 5 Design Inc.', 'unknown', 'Historical/Non-Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(368, '92', 'Quingua: Mga Salaysay na may Kasaysayan tungkol SA Plaridel, Bulacan', '978-971-95131-4-8', 'Sonia M. Zaide', 'unknown', 'Historical/Non-Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(369, '93', 'Built on Dreams Grounded in Reality: Economic Policy Reform in the Philippines', '978-971-92445-7-8', 'Jaime B. Veneracion', 'unknown', 'Historical/Non-Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(370, '94', 'Room for Maneuver: Social Sector Policy Reform in the Philippines', '978-971-95652-1-5', 'Asia Foundation', 'unknown', 'Technical/Policy\r\n', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(371, '95', 'The 2008 State of the Nation Address Technical Report', 'unknown', '\'Presidential Management Staff 2008', 'unknown', 'Technical/Policy', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(372, '96', 'Daluyong ', '971-550-166-4', 'Lazaro Francisco', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(373, '97', 'A Guide to the Philippine Centennial Celebration', 'unknown', 'Philippine Centennial Celebration', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(374, '98', 'Mag Tek-Bok ka Bok!', '978-971-23-5033-7', 'Mag Tek-Bok ka Bok!', 'unknown', 'Educational/Instructional', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(375, '99', 'Ang Aklat Likhaan ng Tula at Maikling kwento 1996', '971-542-198-9', 'unknown', 'unknown', 'Creative Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(376, '100', 'A Century of Philippine Legislature Vol. 1 1896-1954 ', 'unknown', 'Manuel D. Duldulao', 'unknown', 'Historical/Non-Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(377, '101', 'The Ermita de San Nicolas de Tolentino', 'unknown', 'Dr. Jaime C. Laya', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 9, '0', '0', NULL, NULL),
(378, '102', 'Ang El Filibusterismo ', '9-71-686154-0', 'Dr. Jose Rizal ', 'unknown', 'Literature/Classic Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(379, '103', 'Florante at Laura', '971-08-0749-8', 'Francisco Balagtas ', 'unknown', 'Literature/Classic Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(380, '104', 'Rizal: Life, Works and Ideals', '971-096-417-3', 'Francisco M. Zulueta', 'unknown', 'Educational/Instructional', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(381, '105', 'Pinagyamang Pluma Baitang 9 ', '978-971-06-3653-2', 'Baisa-Julian, Del Rosario at Lontoc', 'unknown', 'Textbook/Academic', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(382, '106', 'Obra Maestra ', '971-23-4081-3', 'Candelario at Cuano', 'unknown', 'Textbook/Academic', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(383, '107', 'Obra Maestra II ', '971-23-3407-4', 'Amog at Pagoso', 'unknown', 'Textbook/Academic', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(384, '108', 'Obra Maestra III', '971-23-3408-2', 'Miranda at Tulaylay', 'unknown', 'Textbook/Academic', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(385, '109', 'Obra Maestra IV', '971-23-3409-0', 'De Vera at Bucu ', 'unknown', 'Textbook/Academic', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(386, '110', 'Ibong Adarna', '971-761-004-5', 'Vivencio O. Espino ', 'unknown', 'Literature/Classic Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(387, '111', 'Panitikang Pilipino ( Pangalawang Edisyon)', '971-150-051-5', 'Vivencio O. Espino ', 'unknown', 'Textbook/Academic', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(388, '112', 'Mga Kwento ni Lola Basyang', '971-630-146-4', 'Severino Reyes', 'unknown', 'Children\'s Literature', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(389, '113', 'Mestra  Noli Me Tangere', '971-23-3408-2', 'Lourdes L. Miranda', 'unknown', 'Literature/Classic Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(390, '114', 'Mga Sala-Salawikain', '971-8970-52-5', 'Julio F. Silverio', 'unknown', 'Literature/Classic Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(391, '115', 'Pedro Penduko ( The Legend Begins)', '978-621-95432-7-9', 'Francisco V. Conching', 'unknown', 'Literature/Classic Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(392, '116', 'Cultural Icons of the Philippines', '971-191030-4-3', 'Visitacion \"Chit\" R. Dela Torre', 'unknown', 'Cultural/Artistic', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(393, '117', '1998 CCP Directory and guide', 'unknown', 'unknown', 'unknown', 'Cultural/Artistic', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(394, '118', 'Kaalaman, Katatagan, Kahandaan ng mamamamayang Pilipino', '978-971-699-886-3', 'Esguerra ,MD', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(395, '119', 'The Forgotten Foundation of Fundraising', 'unknown', 'Jeremy Beer', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(396, '120', 'On Emotional Intelligence', '978-1-63369-019-6', 'unknown', 'unknown', 'Self-Help', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(397, '121', 'On Managing Yourself', '978-142-215-7992', 'unknown', 'unknown', 'Self-Help', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(398, '122', 'Pag abuso sa Droga (Kontrolin at Iwasan)', 'unknown', 'unknown', 'unknown', 'Advocacy/Health\r\n', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(399, '123', 'Training Reinforecement', '978-111942-5557', 'Anthonie Wurth', 'unknown', 'Educational/Instructional', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(400, '124', 'Marine Life of the Philippines', '978-971-0321-34-6', 'Lee Goldman', 'unknown', 'Science/Environment', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(401, '125', 'The Forgotten Foundation of Fundraising', 'unknown', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(402, '126', 'The Cycle (Awakening of the mind)', '978-971-9697-78-7', 'Lourdes Lim Wang', 'unknown', 'Motivational/Philosophical', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(403, '127', 'Letters to the President Benigno Aquino III', '978-60862-343-3', 'Patricio R. Mamot, Ph D.', 'unknown', 'Letters/Personal \r\n', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(404, '128', 'Supremely Partisan', '978-144266377', 'James D. Zirin', 'unknown', 'Non-Fiction/Inspirational:\r\n', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(405, '129', 'The Revenue Acceleration Rules', '978-1119371953', 'ShashiUpadhyah', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(406, '130', 'Women Who Surf', 'unknown', 'Ben Marcus', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(407, '131', 'ANI (The Human Body Ang Katawan)', '978-1-4930-2485-8', 'Herminio S. Beltran Jr.', 'unknown', 'Scientific/Educational', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(408, '132', 'ANI (The Animal Kingdom)', 'unknown', 'Herminio S. Beltran Jr.', 'unknown', 'Scientific/Educational', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(409, '133', ' The Aquino Legacy An Enduring Narrative', '0116-4791', 'Efren Sicangco Cruz', 'unknown', 'Historical/Reports', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(410, '134', 'ANI (Global Pinoy)', '0116-4791', 'Ben Marcus+D16+C16+D16', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(411, '135', 'The Leap of your Life', '978-621-95368', 'Tommy Baker', 'unknown', 'Non-Fiction/Inspirational', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(412, '136', 'ANI (The Pinoy as Asian)', '0116-4791', 'Herminio S. Beltran Jr.', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(413, '137', 'Metaphors of Love Mga Talinghaga ng Puso', '978-111-9552536', 'unknown', 'unknown', 'Poetry/Creative', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(414, '138', 'ANI (Disaster and Survival)', '0116-4791', 'Herminio S. Beltran Jr.', 'unknown', 'Scientific/Educational', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(415, '139', 'ANI (Nature and Environment)', '0116-4791', 'Herminio S. Beltran Jr.', 'unknown', 'Scientific/Educational', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(416, '140', 'Overloaded and Underprepared', '978-1-119-02244-2', 'Denise Pope', 'unknown', 'Scientific/Educational', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(417, '141', 'Trust Agents', '978-1119666011', 'Chris Brogan', 'unknown', 'Non-Fiction/Inspirational', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(418, '142', 'The Growth Mindset', '978-119421979', 'Rick Capozzi', 'unknown', 'Non-Fiction/Inspirational', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(419, '143', 'The Energy Equation', '978-1119638681', 'Greg Baker', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(420, '144', '10.000 Nos', '978-1-11969182-2', 'Mathew Del Negro', 'unknown', 'Non-Fiction/Inspirational', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(421, '145', 'Readiness in Times of emergencies and disaster Handbook', '978-971-699-726-2', 'Dr. Ted Esguerra', 'unknown', 'Emergency Preparedness/Guide', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(422, '146', 'Cockfighting and other Stories', '978-971-9697-84-8', 'Lourdes Lim Wong', 'unknown', 'Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(423, '147', 'Frankeistein', '978-0-393-97293-1', 'Mary Shelley', 'unknown', 'Fiction', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(424, '148', '1998 Philippine International Dance Conference', 'unknown', 'Basilio Esteban    S. Villaruz', 'unknown', 'Historical/Reports', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(425, '149', 'National Library Annual Report 2022', 'unknown', 'unknown', 'unknown', 'Historical/Reports', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(426, '150', 'Sari Saring Kasarian: Pagmamahal, Carino Brutal. Atbp.', 'unknown', 'unknown', 'unknown', 'Social Issues', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(427, '151', 'Cultural Center of the Philippines ( The President\'s Report 1984)', 'unknown', 'unknown', 'unknown', 'Historical/Reports', 'GENERAL TRIAS BRANCH', 3, '0', '0', NULL, NULL),
(428, '152', 'Genesis', 'unknown', 'unknown', 'unknown', 'Religious/Spiritual', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(429, '153', 'LibReal', 'unknown', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(430, '154', 'Finding Shelter (portriats of love, healing & survival)', '978-1-4930-2509-1', 'Jesse Freidin', 'unknown', 'Advocacy/Personal Development', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(431, '155', 'SPSS Statistics for data analysis and visualization', '978-119-00355-7', 'Keith Mc. Cormick', 'unknown', 'Scientific/Educational', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(432, '156', 'World Geography', '978-0-02-145457-0', 'Richard Boehm Ph.D', 'unknown', 'Scientific/Educational', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(433, '157', 'Geometry', '978-0-07-673261-6', 'John A. Carter, Ph.D', 'unknown', 'Scientific/Educational', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(434, '158', 'Acta Non Verba  (Action not words )', 'unknown', 'Nelson A. Navarro', 'unknown', 'Artistic/Cultural', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(435, '159', 'Panitikan', 'unknown', 'Doreen Fernandez', 'unknown', 'Artistic/Cultural', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(436, '160', 'Pelikula', 'unknown', 'Bienvenido Lumbrera', 'unknown', 'Artistic/Cultural', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(437, '161', 'Sayaw', 'unknown', 'Basilio Esteban    S. Villaruz', 'unknown', 'Artistic/Cultural', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(438, '162', 'They Say, I Say', '978-0-393-63167-8', 'Gerald Graft', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(439, '163', 'Arkitektura', 'unknown', 'Rodrigo D Perez', 'unknown', 'Artistic/Cultural', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(440, '164', 'Dulaan', 'unknown', 'Nicanor Tiongson', 'unknown', 'Artistic/Cultural', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(441, '165', 'Musika', 'unknown', 'Antonio C. Hila', 'unknown', 'Artistic/Cultural', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(442, '166', 'Maxie\'s Atudy-Sack Date', 'unknown', 'Sandra Schramn Cayetano', 'unknown', 'Poetry/Creative', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(443, '167', 'Gabriel\'s First Day', 'unknown', 'Sandra Schramn Cayetano', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(444, '168', 'After School', 'unknown', 'Sandra Schramn Cayetano', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(445, '169', 'Cultural Center of the Philippines ', 'unknown', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 3, '0', '0', NULL, NULL),
(446, '170', 'Sining Biswal', 'unknown', 'Alice P. Guillermo', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(447, '171', 'Onib Olmedo   ( Dimension of Depth )', 'unknown', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(448, '172', 'Cultural Center of the Philippines Crystal Year', 'unknown', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(449, '173', 'Youthful Hearts, Sunshine and Shattered Dreams', 'unknown', 'Br. Harold Reynolds FSC', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(450, '174', 'Prose Narratives ( Vol. 1)', '978-971-814-315-5', 'NCCA', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(451, '175', 'Everday Culture Antique', 'unknown', 'NCCA', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(452, '176', 'Fundamentals of criminology', '978-971-9617-50-1', 'Jesster P. Eduardo', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(453, '177', 'Agwat Hilom Book 2', '978-971-814-316-2', 'Oliver Lou Olivete', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(454, '178', '10,000 NOS', '978-1-119-69182-2', 'Matthew Del Negro', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(455, '179', 'The Morning Myth', '978-111-9537755', 'Frank J. Rumbauskas', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 0, '0', '0', NULL, NULL),
(456, '180', ' Integrated Chemistry and Physics', '978-0-07-898577-5', 'McGraw Hill ', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(457, '181', 'Medical Virology', '978-0-12-375156-0', 'Christopher J. Burrell', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(458, '182', 'The Norton Anthology (World Literature)', '978-0-393-91961-5', 'W.W  Norton', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(459, '183', 'The Matriarch Rules', '978-111-9572749', 'Randy Patterson', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(460, '184', 'Cockfighting and other stories', '978-111-9572749', 'Lourdes Lim Wang', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(461, '185', 'Web Development with jQuery', '978-1-118-86607-8', 'Richard York', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(462, '186', 'Rehumanize your Business', '978-1119576266', 'Ethan Beute', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(463, '187', 'An Assessment of the Status of Public Libraries in Luzon', '978-971-556-055-9', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(464, '188', 'Physical Education for Optimized Health', '978-621-8019-41-6', 'Alvin George C. Cobar', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(465, '189', 'The Leap of your Life', '978-111-9552536', 'Tommy Baker', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(466, '190', 'Everyday Culture', '978-971-814-290-5', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(467, '191', 'Marine Life of the Philippines', '978-971-0321-36-6', 'Lee Goldman', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(468, '192', 'Acta Non Verba  (Action not words )', 'unknown', 'Nelson A. Navarro', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(469, '193', 'Training Reinforcement', '978-111-942555-7', 'Anthonie Wurth', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(470, '194', 'Rebuilding Disaster-Affected Communities for a Sustainable Future', '978-971-742-117-9', 'Maria Ella L. Atienza', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(471, '195', 'The Cycle (Awakening of the mind)', '978-971-9697-78-7', 'Lourdes Lim Wang', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(472, '196', 'Trust Agents', '978-1119666011', 'Chris Brogan', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(473, '197', 'Everyday Culture', '978-621-432-010-3', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(474, '198', 'Kaagi Ug Kabilin', '978-971-91717-7-5', 'Vicente C. Villar', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(475, '199', 'Better Together', '978-111-9452188', 'Jonathan sposato', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(476, '200', 'Romancing Nature in Metal', '978-971-0579-26-6', 'Ann Tiukinhoy Pamintuan', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(477, '201', 'Clinical Chemistry', '978-1-4557-4214-1', 'Donna Larson', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(478, '202', 'The Public Manager in Shape Stewards of Success', 'unknown', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(479, '203', 'The Public Manager  Bar towards Resilient Leadership', 'unknown', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(480, '204', 'The Public Manager Greatful Leadership', 'unknown', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(481, '205', 'RDEDigest First 100 Days', 'unknown', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(482, '206', 'Brain Based Teaching and Learning', '978-621-8019-28-7', 'Dr. Marylendra Penetrante', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(483, '207', 'Research in Daily Life 1: Qualitative Research Method', '978-621-8019-02-7', 'Mark N. Abadiano Ph. D', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(484, '208', 'The Public Manager (mental Agility', 'unknown', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(485, '209', 'Key Issues in Instruction, Teacher Professional Development and', 'unknown', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(486, '210', '         ICT in basic Education', '978-971-742-125-4', 'Dina Ocampo', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(487, '211', 'Palaisgen', '978-971-742-125-4', 'Paul D. Jagnis Sr. Ph.D', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(488, '212', 'The Public Manager Gratitude in Action', 'unknown', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(489, '213', 'The Public Manager On the Frontlines', 'unknown', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(490, '214', 'The public Manager CESCON 2020', 'unknown', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(491, '215', 'Alim', '978-971-814-317-9', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(492, '216', 'Modules for K12', '978-971-814-265-3', 'Alicia P. Magos', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(493, '217', 'Basic Education and federalism', 'unknown', 'Vicente C. Villar', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(494, '218', 'Twent years of the Philippine Seatbelt Law', 'unknown', 'Yla Gloria Marie P. Paras', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(495, '219', 'Urban Farming and Urban Land Use Dilemmas in Metro Manila', 'unknown', 'Kristian Karlo C. Saguin', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(496, '220', 'Account of the Martydom of San F. Hernando de San Joseph in Japan', '978-971-814-265-3', 'NLP', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(497, '221', 'Sermon Preached in the Church of the Incarnatio of the Royal Field ', 'unknown', 'NLP', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(498, '222', 'Provincia de San Greogorio de Lo Descalsos of the Franciscan', '978-971-556-061-0', 'Antonio Cruz /NLP', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(499, '223', 'The Aquino Legacy', '978-621-95368-0-6', 'Efren Sicangco Cruz', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(500, '224', 'Constitutional Performance assesstment of the 1987 Philippine Constitution', '978-91-7671-299-3', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(501, '225', 'Heightened Development and Persistent Distress in Mindanao', '978-971-742-139-1', 'Eduardo C. Tadem', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(502, '226', 'Social Protection for all filipinos', '978-971-742-135-3', 'Reene E. Ofreneo', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(503, '227', 'The Future has an Ancient Heart: In Search of our Antiguas Buenas Calidades', '978-971-742-131-5', 'Floro Cayanan Quibuyen', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(504, '228', 'After School', 'unknown', 'Sandra Schramm Cayetano', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(505, '229', 'Library and Information Services researc Publication', '2984-7524 ISSN', 'Yap, Akmendra, Codilla', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(506, '230', 'The Public Manager NurturingGreat Fulness', 'unknown', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(507, '231', 'Hot Wheels Duel', '978-981-09-2326-6', 'Ace Landers', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(508, '232', 'Braking Brewster', '978-1-4075-8009-8', 'Sarah Ball', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(509, '233', 'Diggers and Dumpees', 'unknown', 'Michael Dunning', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(510, '234', 'Grolier\'s Story a Day (Jan, Feb, March)', '978-1-78209-757-0', 'Tig Thomas', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(511, '235', 'Grolier\'s Story a Day (April,May,June)', '978-1-78209-758-7', 'Tig Thomas', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(512, '236', 'Grolier\'s Story a Day (July,August,Sept)', '978-1-78209-759-4', 'Tig Thomas', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(513, '237', 'Grolier\'s Story a Day (Ocr,Nov,Dec)', '978-1-78209-760-0', 'Tig Thomas', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(514, '238', 'A Tale of Two Cities', 'unknown', 'Charles Dickens', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(515, '239', 'Captain Courageous', 'unknown', 'Rudyard Kipling', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(516, '240', 'The Time Machine', 'unknown', 'H. G. Wells', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(517, '241', 'A Connecticut Yankee in King Arthurs Court', 'unknown', 'Mark Twain', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(518, '242', 'Mother tasty dishes', 'unknown', 'Maria Fuentes', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(519, '243', 'Today\'s Best Cookbook', 'unknown', 'Rosario Acosta', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(520, '244', 'Intermediate Algebra', '0-534-23022-9', 'R. David Gustafson', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(521, '245', 'Muscles Testing and Function', '76-124433 LCC', 'Henry Otis Kendall, P.T.', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(522, '246', 'Revised & Updated Illustrated Oxford Dictionary', '1-4053-2029-X', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(523, '247', 'The Ties that Bind', '971-8686-05-3', 'Eric Gutierrez', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(524, '248', 'Thieves World Beyond the Evil', '0-671-55984-2', 'Janet Morris', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(525, '249', 'Temple of the Winds', '0-312-89053-2', 'Terry Goodkind', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(526, '250', 'Wings of Flame', '0-312-93932-9', 'Nancy Springer', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(527, '251', 'Mysteries of the Unexplained', '0-89577-146-2', 'The Reader\'s Digest Association Inc', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(528, '252', 'Tanganyika Cichlid in their Natural Habitat', '0-9668255-0-0', 'Ad Konings', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(529, '253', 'Cecil Textbook of Medicine', '971-103-455-7', 'James b. Wyngaarden M.D', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(530, '254', 'A Guide to Backyard Astronomy your guide to starhopping', '1-877019-33-X', 'Robert Burnham', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(531, '255', '               and exploring the Universe', 'unknown', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(532, '256', 'The Guide to owning a Red-Tailed Boa', '079380275-X', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(533, '257', 'A Fisk Keeper Guide to South American Cichlids', '1-56465-103-7', 'Dr. Wayne S. Leibel', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(534, '258', 'Tides of Darkness', '0-312-87615-7', 'Judith Tarr', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(535, '259', 'Hannibal', '0-385-29923-X', 'Thomas Harris', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(536, '260', 'The Ball Python Manual', '1-882770-28-5', 'David Barker/Tracy Barker', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(537, '261', 'Blood and Thunder ', '978-1-934506-31-8', 'Dan Abneit/Ian Edginton', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(538, '262', 'Holywood and the Supernatural', '0-312-05098-4', 'Brad Steiger/ Sherry Hansen-Steiger', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(539, '263', 'Age of Empires', '0-7615-1053-2', 'Lawrence T. Russell', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(540, '264', 'Ravens of Avalon', '978-0-670-03870-1', 'Diana L. Paxson', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(541, '265', 'For the Freshwater Aquarium African Cichlid of lake Tanganyika', '0-7938-8026-5', 'David E. Boruchowits', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(542, '266', 'The Children of men', '0-679-41873-3', 'P.D James', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(543, '267', 'Animals of the Worls', '1-40546-676-6', 'Martin Walter/ Jinny Johnson', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(544, '268', 'The Tanganyika Cichlid Aquarium ', '0-7641-1643-6', 'George Zurlo', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(545, '269', 'All About Iguanas', '0-86622-747-4', 'Mervin F. Roberts 7 Martha D. Roberts', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(546, '270', 'Cichlids from East Afica', '1-56465-167-3', 'Wolfgang Ataeck/ Horst Linke', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(547, '271', 'Exterminatus', '978-1934506-55-4', 'Ian Edginton', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(548, '272', 'Reptiles & Amphibians', '0-86101-212-7', 'David Alderton', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(549, '273', 'Fundamentals of Nursing (8th edition)', '978-981-06-9871-3', 'Barbara Kozier/ Glenora Erb\'s', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(550, '274', 'Fundamentals of Nursing ', '978-0-323-32740-4', 'Patricia A. Potter  Patricia Stockert', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(551, '275', 'Fundamentals of Nursing (9th edition) V.2', '978-0-323-32740-4', 'Patricia A. Potter  Patricia Stockert', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(552, '276', 'Fundamentals of nursing (8th edition) Vol.2', '978-981-06-9856-0', 'Audrey Berman, Shirlee J. Snyder', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(553, '277', 'Anatomy and Physiology (Lab Manual) 8th Edition', '978-1-259-07111-9', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(554, '278', 'Teaching Strategies for Nurse Educators', '978-981-06-9747-1', 'Sandra Deyoung', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(555, '279', 'Nursing Theorists and their works (9th edition)', '978-0-323-40224-8', 'Martha Raile Alligood', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(556, '280', 'Biochemistry(3rd edition)', '978-971-98-0878-7', 'H. Stephen Stoker', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(557, '281', 'The Millenium Wizard', '978-621-10-0325-2', 'Enchantress Rena', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(558, '282', 'Operation Love shot', 'unknown', 'Enchantress Rena', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(559, '283', 'The Lies that Binds', '978-1781259238', 'Kwame Anthony Appiah', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(560, '284', 'Into His Wonderful Light', 'unknown', 'Hong Y Yang', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(561, '285', 'A LA CARTE Food and Fiction', '978-971-27-1877-9', 'Cecilia Manguera Brainard', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(562, '286', 'Some More Stories of Life and Laughter', '978-971-510-193-6', 'Fr. Bel San Luis , DVD', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(563, '287', 'Seven Ages of Paris', '978-0-33048864-8', 'Alistair Horne', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(564, '288', '4 G marketing- A 90 year Journey of Creating Everlasting Brands', '979-98491-3-6', 'Hermawan Kartajaya', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(565, '289', 'Tongue Fu !', '0-31215227-2', 'Sam  Horn', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(566, '290', 'Dying to be me', '978-1-84850-783-8', 'Anita Moorjani', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(567, '291', 'The Next Generation Leader', '971-717-977-8', 'Andy Stanley', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(568, '292', 'Hands on Systematic Innovation', 'unknown', 'Darrell Mann', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(569, '293', 'Lunch in Paris', 'unknown', 'Elizabeth Bard', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(570, '294', 'The Light of Discovery', 'unknown', 'Toni Packer', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(571, '295', 'Misquoting Jesus', '978-0-06073817-4', 'Bart D. Ehrman', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(572, '296', 'The Leadership Secrets of Jesus', '971-834-029-7', 'Mike Murdock', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(573, '297', 'Time Traps', 'unknown', 'Todd Duncan', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(574, '298', 'Blue like Jazz', '978-0-7852-6370-8', 'Donald Miller', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(575, '299', 'Becoming A Great Teacher', '978-621-405-384-1', 'Cecilia B. Manikan, EdD', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL);
INSERT INTO `books` (`book_id`, `item_no`, `ISBN`, `title`, `author_name`, `access_no`, `genre`, `branch`, `quantity`, `amount`, `total_value`, `date_acquired`, `publication`) VALUES
(576, '300', 'The Storm', '978-0-399-16026-4', 'Clive Cussler', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(577, '301', 'Sacred Journey of the Peaceful Warrior', '1-932073-10-8', 'Dan Millman', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(578, '302', 'The Upside of Irrationality', '978-0-06-199503-3', 'Dan Ariely', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(579, '303', 'How to Make in Multi-Level Marketing', '0-13-417858-0', 'David Roller', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(580, '304', 'Laying off Employees', '978-1-4221-2968-5', 'Harvard School Publishing', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(581, '305', 'Men Without Women', '978-1784-7053-74', 'Murakami Haruki', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(582, '306', 'The Prodigal Church', '978-1-4335-4463-7', 'Jared C. Wilson', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(583, '307', 'Hard-Won Wisdom', '978-0814-43777-3', 'Jathan Janove', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(584, '308', 'The Elements of Style', '0-205-31342-6', 'William Strunk Jr.', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(585, '309', 'English  Conversation (Pelajaran Percakapan Bahasa Ingris 900', 'unknown', 'Pico Iyer', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(586, '310', 'The Stars Shine Down', '0-9-6888-08490-7', 'Elhans', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(587, '311', 'Kamus Lengkap Teknik', 'unknown', 'Sidney Sheldon', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(588, '312', 'Bag the Elephant ( How to Win & Keep Big Customers)', '1-885167-62-8', 'Steve Kaplan', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(589, '313', 'Here & There', '978-174270162-2', 'AA GILL', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(590, '314', 'Managing Projects', '1-4211-0187-8', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(591, '315', 'Coffee Break Devotion', '971-511-855-0', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(592, '316', 'Strategy Power Plays', '978-906821-17-3', 'Sun Tzu', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(593, '317', 'If the Pasta Wiggles, Don’t Eat It…', '0-89283-852-3', 'Martha Bolton', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(594, '318', 'Kamus Idion Lengkap', '978-82295-28-5', 'M. Anwar Abdullah', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(595, '319', 'Good News for a Change', '978-1-63146-856-8', 'Matt Mikalatos', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(596, '320', 'The Visionary\'s Handbook', '0-06-661988-2', 'Jim Taylor', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(597, '321', 'Fish Tales', '0-7868-6868-6', 'Stephen C. Lundin', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(598, '322', 'The Story of Old man Tiow', '978-85972-6-1', 'Suchitra Onkon', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(599, '323', 'Essay on Philippine Food and Culture', '978-971-27-3563-9', 'Doreen Fernandez', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(600, '324', 'Why is there a Man and He\'s not mine', '978-971-95793-0-4', 'Orpah Omega', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(601, '325', 'Dead Heat', '978-911-009-033-4', 'Joel C. Rosenberg', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(602, '326', 'The Extra One Percent', '978-0-330-51454-5', 'Rob Yeung', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(603, '327', 'The Ezekiel Option', '978-971-009-031-0', 'Joel C. Rosenberg', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(604, '328', 'The Last Jihad', '978-971-009-034-1', 'Joel C. Rosenberg', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(605, '329', 'Jesus Among Secular Gods', '978-971-009-871-2', 'Ravi Zacharias', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(606, '330', 'Winning in Service Markets', '978-1944659042', 'Jochen Wirtz', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(607, '331', '2600 Phrases foe Effective Performance Reviews', '0-8144-7282-6', 'Paul Falcone', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(608, '332', 'Why is my forever taking forever', '978-971-007-227-9', 'Marianne Madelaine Mencias', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(609, '333', 'The Ecology of Commerce', '978-0-88730-655-1', 'Paul Hawken', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(610, '334', 'The Scorpio Illusion', '0-553-56603-2', 'Robert Ludlum', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(611, '335', 'Kane & Abel', '0-312-99505-9', 'Jeffrey Archer', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(612, '336', 'Not A Penny More, Not A Penny Less', '0-06-100735-8', 'Jeffrey Archer', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(613, '337', 'Twelve Red Herrings', '0-06-109365-3', 'Jeffrey Archer', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(614, '338', 'The Immortal Life of Henrietta Lacks', '978-0-307-88844-0', 'Rebecca Skloot', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(615, '339', 'Nice Girls Don\'t Get The Corner Office', '978-0-446-57207-1', 'Lois P. Frankei, PhD', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(616, '340', 'Three Daughters of China Wild Swans', '978-0-7432-5429-7', 'Jung Chang', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(617, '341', 'The Lexus and the Olive Tree', '0-385-72015-7', 'Thomas Friedman', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(618, '342', 'The Careful Use Of Compliments', '978-0-30741-7', 'Alexander Mc Call Smith', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(619, '343', 'And Thereby Hangs a Tale', '978-0-320-52060', 'Jeffrey Archer', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(620, '344', 'A Twist in the Tale', '0-06-100717-X', 'Jeffrey Archer', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(621, '345', 'False Impression', '978-0-330-41882-9', 'Jeffrey Archer', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(622, '346', 'Leadership  Secret of Attila The Hun', '978-0-446-39106-1', 'Wess Robert Ph.D', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(623, '347', 'The Storyteller\'s Secret', '978-1-5098-1475-6', 'Carmine Gallo', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(624, '348', 'Bleaching Out The Devil', '978-0091927042', 'Mark Thomas', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(625, '349', 'Ecological Intelligence', '978-0-141-03909-1', 'Daniel Goleman', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(626, '350', 'Lone Eagle', '0-440-23666-5', 'Daniel Steel', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(627, '351', 'Safe Harbour', '0-440-23762-9', 'Daniel Steel', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(628, '352', 'Kamus  UmUm Lengkap', 'unknown', 'Danny R. Cyssco', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(629, '353', 'The Island of the Day Before', '0-7493-966-0', 'Umberto Co', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(630, '354', 'The Martian', '975-1-101-90555-5', 'Andy Weir', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(631, '355', 'Why Do Men Fall Asleep After Sex', '978-0-307-34597-4', 'Mark Leyner , Billy Goldberg M.D', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(632, '356', 'Why Do Men Have Nipples', '1-4000-8231-5', 'Mark Leyner , Billy Goldberg M.D', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(633, '357', 'Captivology', '978-0-06-241488-5', 'Ben Pars', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(634, '358', 'What in God\'s Name', '978-0-316-13373-9', 'Simon Rich', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(635, '359', 'The Mistress of Spices', '0-552-99670-x', 'Chitra Banerjee Divakaruni', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(636, '360', 'Greece', '1-57748-642-0', 'Melanie Panagiotopoulos', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(637, '361', 'Wellness Just A State of Mind?', '983-42757-0-6', 'Eldon Taylor Ph.D', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(638, '362', 'History of the Temple of the Emerald Buddha', 'unknown', 'Prof. M.C. Subhadradis Diskul', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(639, '363', 'Virtual Leadership', '0-446-67087-1', 'Jaclyn Kostner, Ph D', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(640, '364', 'Barbarians At The Gate', '0-09-946915-4', 'Bryan Burrough , John Helyar', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(641, '365', 'The Merchant Of Venice', '0-460-87180-3', 'William Shakespeare', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(642, '366', 'The Lost Continent (Travels in small-town America)', '978-0-552-99808-6', 'Bill Bryson', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(643, '367', 'Neither Here Nor There ( Travels in Europe)', '978-0-552-99806-2', 'Bill Bryson', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(644, '368', 'Strengthening the Soul of Your Leadership', '978-971-0455-42-3', 'Rith Haley Barton', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(645, '369', 'Rising Above a Toxic Workplace', '978-0-8024-0972-0', 'Gary Chapman', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(646, '370', 'Care for the Common Life', '978-0-8499-0008-2', 'Max Lucado', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(647, '371', 'Predictably Irrational', '978-0-00-725653-2', 'Dan Ariely ', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(648, '372', 'The Lean Six Sigma Pocket Toolbook', '0-07-144119-0', 'Michael L. George', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(649, '373', 'Bullet ( Users Guide and Recipe Book', 'unknown', 'Stephen Backhouse', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(650, '374', 'The Compact Guide to Christian History', '978-0-7459-5506-3', 'C.Y Lim-Sylianco', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(651, '375', 'Modern Biochemistry', 'unknown', 'C.Y Lim-Sylianco', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(652, '376', 'Life Lessons', '978-1-59684-790-3', 'Hong Yang Ed..,D. Min', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(653, '377', 'Growing in Gratitude', 'unknown', 'Mary K. Mohler', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(654, '378', 'Coffee Time for Manager', '978-979-1101-23-3', 'Leo & Millie', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(655, '379', 'Missions and You', '978-971-009-000-6', 'Larry W. Caldwell', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(656, '380', 'Great Men and Women of Asia', '978-971-27-1968-4', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(657, '381', 'Dim Sum Leadership', '978-981-4222-65-5', 'John Ng', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(658, '382', 'Working with Difficult People', '0-13-957382-8', 'Muriel Solomon', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(659, '383', 'Law and Order', 'unknown', 'ICA Surabaya', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(660, '384', 'The Calvary Road', '978-971-009-124-9', 'Roy Hession', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(661, '385', 'A Feast of Science', '978-1-77041-192-0', 'Dr. Joe Schwarcz', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(662, '386', 'Between Heaven and Mirth', '1-85788-144-3', 'James Martin SJ', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(663, '387', 'Megatrends Asia', '978-971-27-2092-5', 'John Naisbitt', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(664, '388', 'Great Men and Women of Asia', 'unknown', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(665, '389', 'The Risk Factor', '978-1-137-27928-6', 'Deborah Perry Piscione', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(666, '390', 'The Starfish and the Spider', '1-59184-143-7', 'Ori Brafman', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(667, '391', 'Trip to Quiapo', '978-971-94307-6-6', 'Ricky Lee', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(668, '392', 'The Economic Naturalist-Why economics explain almost everything', '978-0-7535-1338-5', 'Robert H. Frank', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(669, '393', 'Speaker\'s & Toastmaster\'s Handbook', '1-55958-038-0', 'Herbert V. Prochnow', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(670, '394', 'How they started in tough times', '983-3832-02-4', 'David lester', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(671, '395', 'Ben and Me', '978-0-399-53607-6', 'Cameron Gunn', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(672, '396', 'Walking from East to West', '978-0-310-28579-3', 'Ravi Zacharias', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(673, '397', 'Conversational Evangelism', '978-971-009-291-8', 'David Geisler', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(674, '398', 'Lovers and Dreamers', '0-425-20175-9', 'Nora Roberts', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(675, '399', 'Selling to the new elite', '978-0-8144-1653-2', 'Jim Taylor', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(676, '400', 'The Zero Marginal Cost Society', '978-1-137-28011-4', 'Jeremy Rifkin', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(677, '401', 'The Last Ten Percent', '978-0-7369-1480-2', 'Michelle McKinney Hammond', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(678, '402', 'The Assignment ( The Dream and the Destiny)', '1-56934-053-1', 'Mike Murdock', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(679, '403', 'No More Shame Purity of Sex Restored', 'unknown', 'Denie Heppner', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(680, '404', 'A New Experience (Annual Report 2001', 'unknown', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(681, '405', 'Sampoerna (Annual Report 1994)', 'unknown', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(682, '406', 'The Encyclopedia of Animal Predator', '9787-1-61212-699-9', 'Janet Vorwald Dohner', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(683, '407', 'My First Dictionary', 'unknown', 'Wonders of Learning', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(684, '408', 'Discover Big Cats', 'unknown', 'Wonders of Learning', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(685, '409', 'Saving Planet Earth, A Guide to Protecting our Planet', 'unknown', 'Wonders of Learning', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(686, '410', 'Disvover Botany ( A First Introduction to Science)', 'unknown', 'Wonders of Learning', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(687, '411', 'Discover the World of Snakes', 'unknown', 'Wonders of Learning', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(688, '412', 'Discover Electricity& Magnetism A First Introduction to Science', 'unknown', 'Wonders of Learning', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(689, '413', 'Discover The Earth', 'unknown', 'Wonders of Learning', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(690, '414', 'Discover Global Warming & Climate Change (A Guide to Environmental Changes)', 'unknown', 'Wonders of Learning', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(691, '415', 'Riding a Donkey Backwards', '978-1-91307-494-4', 'Sean Taylor/ Khayaal Theatre', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(692, '416', 'The Hackney Martian', '978-1-910851-01-2', 'Paul Brown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(693, '417', 'Leaping Lola', '978-1-912858-52-1', 'Tracey Hawkins/Anil Tortop', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(694, '418', 'Animal Kingdom ( Doodle Book)', 'unknown', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(695, '419', 'Little Red Riding Hood (Sticker Fun)', '978-1-83771-095-9', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(696, '420', 'Mr. Men Happy Fun', '978-4058-8268-0', 'Roger Hangneaves', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(697, '421', 'Disney Coco', 'unknown', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(698, '422', 'Disney Finding Dory', 'unknown', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(699, '423', 'Disney Cars 3', 'unknown', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(700, '424', 'Disney Monsters, Inc', 'unknown', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(701, '425', 'Disney Inside Out', 'unknown', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(702, '426', 'My Magical Story Collection     Incredibles 2', 'unknown', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 2, '0', '0', NULL, NULL),
(703, '427', 'My Magical Story Collection     Zootopia', 'unknown', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(704, '428', 'My Magical Story Collection     Finding Dory', 'unknown', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(705, '429', 'My Magical Story Collection     Alice in Wonderland', 'unknown', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(706, '430', 'My Magical Story Collection     Cinderella', 'unknown', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(707, '431', 'My Magical Story Collection     The Jungle Book', 'unknown', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 2, '0', '0', NULL, NULL),
(708, '432', 'My Magical Story Collection      UP', 'unknown', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(709, '433', 'My Magical Story Collection      Beauty ans the Beast', 'unknown', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(710, '434', 'Matias and the Cloud', 'unknown', 'Jorge Palomero/ Ana Sanfelippo', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(711, '435', 'A Day in the Life of Triceratops', '978-1-4058-8042-6', 'Susie Brooks/ Jonathan Woodward', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(712, '436', 'Marvel Fantastic Four', '978-1-40532-010-8', 'Neil Kelly', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(713, '437', 'Amazing  (Sticker Scenes)', '978-1-405294683', 'Isabel Munoz', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(714, '438', 'Lucky Bamboo', '978-1-84750-707-5', 'Katherine Sully', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(715, '439', 'Percy the Park Keeper 1,2,3', '978-0-00-786511-6', 'Nick Butterworth', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(716, '440', 'Percy the Park Keeper A,B.C', '978-0-00-786513-0', 'Nick Butterworth', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(717, '441', 'Spot\'s New Game', '978-0-241-32648-0', 'Erick Hill', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(718, '442', 'Daisy Learn to Dance', '978-184646-928-2', 'MarieBirkinshaw', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(719, '443', 'The Little Match Girl', '978-1-78175-026-1', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(720, '444', 'Happy Birthday Spot', '978-0-241-32645-9', 'Eric Hill', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(721, '445', 'Time for bed, Spot', '978-0-241-32646-6', 'Eric Hill', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(722, '446', 'The Princess and the Frog', '978-0-71819-341-6', 'Vera Southgate', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(723, '447', 'Spot\'s Show and Tell', '978-0-241-32647-3', 'Eric Hill', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(724, '448', 'The Pied Piper of Hamelin', '978-1-78175-027-8', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 2, '0', '0', NULL, NULL),
(725, '449', 'Number with Peter Rabbit', '978-0-241-25636-7', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(726, '450', 'Colours with Peter Rabbit', '978-0-241-25639-8', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(727, '451', 'Animals with Peter Rabbit', '978-0-241-32646-6', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(728, '452', 'Seek and find little unicorn', '978-0-71819-341-6', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(729, '453', 'Bobby the Bunny', '978-0-241-32647-3', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(730, '454', 'Phonics and First Stories (Helping your child to read)', '978-1-78175-027-8', 'Annemarie Young/ Kate Ruttle', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(731, '455', 'Drag joins an Orchestra', '978-0-241-25636-7', 'Keith Harvey', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(732, '456', 'Sage Cookson\'s (Ring of Truth)', '978-0-241-25639-8', 'Sally Murphy', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(733, '457', 'The Hundred and One Dalmatians', '978-0-241-25637-4', 'Dodie Smith', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(734, '458', 'The Adventure of Tintin (Danger at sea)', '978-1-80105-074-6', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 2, '0', '0', NULL, NULL),
(735, '459', 'Time Runners', 'unknown', 'Roderick Hunt', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(736, '460', 'Reference Atlas of the World', '978-0-19-273516-4', 'The Times', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(737, '461', '100 Women who made history', '1-902604-05-9', 'Stella Caldwell', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(738, '462', 'Oxford School Thesaurus', '978-1-912858-66-8', 'Andrew Delahunty', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(739, '463', 'Oxford School Dictionary', '978-0-6035-7740-6', 'Andrew Delahunty', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(740, '464', 'Webster\'s New Dictionary and Thesaurus', '978-0-316-18577-6', 'Michael Agnes', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(741, '465', 'Oxford Better Spelling', '978-0-19-273900-7', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(742, '466', 'Real Life Heroes', 'unknown', 'James Buckley Jr.', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(743, '467', 'Dictionary New Encyclopedia Edition', '978-1-4654-5688-5', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(744, '468', 'Oxford School Dictionary', '0-7696-3308-0', 'Andrew Delahunty', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(745, '469', 'Oxford School Spanish Dictionary', '13:978-19-274710-5', 'Valerie Grundy', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(746, '470', 'Oxford Illustrated Computing Dictionary', '978-0-19-275706-7', 'Alison Page', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(747, '471', 'Chocolate Treats', '978-0-19-277245-9', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(748, '472', 'Biscuits and Brownies', '2049-6338 ISSN', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(749, '473', 'Favourite Cakes', '2049-6338 ISSN', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(750, '474', 'Fix It, Clean It, and Make It Last', '2049-6338', 'FC7A Publishing', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(751, '475', 'American Entrepreneur', '978-1-932470-27-7', 'Willie Robertson/William Doyle', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(752, '476', 'Ransomed dreams', '978-1-4143-2785-3', 'Sally John', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(753, '477', 'The Gangbuster', '978-1-4143-2785-3', 'Peter Bleksley', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(754, '478', 'The Making of the Leader  (2nd Edition)', '978-1-78606-248-2', 'Dr. J.Robert Clinton', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(755, '479', 'The First Hostage', '978-1-61291-075-8', 'Joel C. Rosenberg', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(756, '480', 'The Big Book of Questions that will make you think again', '978-1-4964-0615-6', 'Sarah Herman', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(757, '481', 'Before I Wake', '978-1-64517-687-9', 'Dee Henderson', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(758, '482', 'Looking Up', '13:978-1-4143-0815-9', 'Michelle L. Sullivan', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(759, '483', 'Chosen People', '978-1-4002-1431-0', 'Robert Whitlow', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(760, '484', 'Dark Fall', '978-0718083045', 'Andrew & Wilson', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(761, '485', 'The Italian Kid Did It!', '978-1-4964-5144-6', 'Tom Golisano', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(762, '486', 'Everybody Wants to Rule the World', '978-1-4002-2989-5', 'R \"Ray Wang', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(763, '487', 'The Persian Gamble', '978-1-4002-2486-9', 'Joel C. Rosenberg', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(764, '488', 'The Guard', '978-149-640618-7', 'Dee Henderson', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(765, '489', 'Ben-Hur ', '1-57673-642-3', 'Carol Wallace', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(766, '490', 'Unleashing your Hero', '978-1496411051', 'Kevin D. Brown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(767, '491', 'Too Famous', '978-1-4002-2876-8', 'Michael Wolff', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(768, '492', 'Intangibles', '978-0-349-12852-8', 'Joan Ryan', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(769, '493', 'The Unspoken Truths for Career Success', '978-0-316-43493-5', 'Tessa White', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(770, '494', 'Possession', '978-1-4002-3600-8', 'Rene Gutteride', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(771, '495', 'High Treason', '978-1-4143-2434-0', 'Diann Mills', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(772, '496', 'Leadership is Language', '978-14964-10993', 'L. David Marquet', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(773, '497', 'Aids and You', '978-07352-17539', 'Dr. Patrick Dixon', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(774, '498', 'Sparked', '81-7362-470-4', 'Jontahan Fields', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(775, '499', 'The 4 Disciplines of Execution', '978-1-4002-2546-0', 'Chris McChesney', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(776, '500', 'Without Warning', '978-19821-5697-8', 'Joel Rosenberg', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(777, '501', 'Bratz Fashion Journal', '978-14964-06163', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 2, '0', '0', NULL, NULL),
(778, '502', 'My Encyclopedia of Very Important Things', '978-1-4075-1609-7', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(779, '503', 'Fantastic Facts', '978-1--4654-4968-9', 'Miles Kelly', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(780, '504', 'Curious Question & Answers about Incredible Journey', '978-1-78989-528-5', 'Miles Kelly', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(781, '505', 'Uh-Oh ! it’s the Unicorn', '978-1-78989-710-4', 'Stephanie Mass', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(782, '506', 'Frozen II', '978-1-80108-557-1', 'Andria Warmflash Rosenbaum', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(783, '507', '5 Minute Disney Pixar Stories', '978-1-368-04362-5', 'Disney', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(784, '508', 'Good Guys 5 Monute Stories', '978-1-4231-6520-0', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(785, '509', 'Crocodile Tears', '978-0-358-16179-0', 'Roger Mc Gough', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(786, '510', 'Cinderella The Strong Cinderella', '978-1-91307-497-5', 'Disney', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(787, '511', 'Beep Beep', '978-1-4847-6722-1', 'Max Low', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 2, '0', '0', NULL, NULL),
(788, '512', 'Big Book Vehicles 200 + Things that go', '978-1-91307-469-2', 'Miles Kelly', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(789, '513', 'Snow White and the Seven Dwarfs The Story of Snow White', '978-1-78989-823-1', 'Disney', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(790, '514', '5 Minute Palace Pets Stories', '978-1-4847-0463-9', 'Disney', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(791, '515', 'The Lion Book of Animal Tales', '978-0-7459-6131-6', 'Bob Hartman', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(792, '516', '5 Minute Disney Junior Stories', '978-0-4847-1327-3', 'Disney', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(793, '517', '5 Minute Sleepy Time Stories', '978-1-368-05538-3', 'Disney', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(794, '518', 'Super Bug', '978-0-2413-8572-2', 'John  Woodward', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(795, '519', 'Share A Story Bible', '978-0-7459-7886-4', 'Devorah Lock', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(796, '520', 'Frozen 5 Minute Stories', '978-1-4847-2330-2', 'Disney', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(797, '521', 'Great Book of Knowledge', 'unknown', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(798, '522', 'The Avengers Storybook Collection', '978-148475334-7', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(799, '523', 'Frozen Do You Want to Build a Snowman', '978-1-4847-1467-6', 'Calliope Glass', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(800, '524', '5 Minute Disney Junior Stories', '978--1-368-05337-6', 'Disney', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(801, '525', '500 Fantastic Facts', 'unknown', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(802, '526', 'Can You Find Busy Bees ?', '978-1-912076-30-7', 'Gordon Winch /Patric Shirvington', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(803, '527', '5 Minute Star Wars Stories', '978-1-8447-2820-8', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(804, '528', 'Bedtime Favorites', '978-1-368', 'Disney', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(805, '529', 'Frozen 5 Minute Stories', '978-368-04195-9', 'Disney', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(806, '530', '5 Minute Under the Sea Stories', '978-1-368-05552-9', 'Disney', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 2, '0', '0', NULL, NULL),
(807, '531', '5 Minute Minnie Tales', '978-1-4847-0452-3', 'Disney', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(808, '532', 'Disney Junior Storybook Collection', '978-1-4231-7875-0', 'Disney', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(809, '533', 'My Encyclopedia of Very Important Things', '978-1-4654-4968-9', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(810, '534', '5 Minute Marvel Stories', '978-1-4231-6766-2', 'Marvel', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(811, '535', 'Disney Storybook Collection', '978-1-4231-9414-9', 'Disney', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(812, '536', 'The Lion Wondrous Bible', '978-1-4231-3508-1', 'Disney', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(813, '537', 'Shawn The Sheep Movie Timmy in the City', '978-07459-7928-1', 'Disney', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(814, '538', 'Favourite Bible Stories', '978-1--4063-6111-7', 'Disney', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(815, '539', 'The Block Buster Bible', '978-0-7459-7924-3', 'Disney', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(816, '540', 'Winnie the Pooh Story Book Collection', '978-0-7459-7779-9', 'Devorah Lock', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(817, '541', 'My First Christmas Bedtime Storybook', '978-148475338-5', 'unknown', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(818, '542', 'Mr. Darcy', '978-0-368-05270-2', 'Brian Sybley', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(819, '543', 'Curious Question & Answer About Epic Explorer', '978-1-912076-56-7', 'Andrew Prichard', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(820, '544', 'Super Earth ', '978-1-78989-709-8', 'Disney', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(821, '545', 'Role Models, Wondrous Women who change the World', '978-0-2416-3332-8', 'Disney', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(822, '546', 'The Action Bible', '978-1-68412-951-5', 'Alex Field/ Peter Carnavas', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(823, '547', 'A History of Publishing in the Philippines', 'unknown', 'Atty. Dominador D. Buhain', '662434 pl', 'unknown', 'GENERAL TRIAS BRANCH', 2, '0', '0', NULL, NULL),
(824, '548', 'An Iloko Bibliography (Series No.2)', 'unknown', 'Foronda, M.', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(825, '549', 'Index to Periodical Articles on Filipino Women', 'unknown', 'NCC - Women Sector', '315422 e', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(826, '550', 'Philippine National Library Bibliography', 'unknown', 'National Library', '658210 pl', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(827, '551', 'Filway\'s Philippine Almanac', 'unknown', 'unknown', '649738 pl', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(828, '552', 'Consuming Passions: Philippine Collectibles', 'unknown', 'Jaime C. Laya', '780427 pl', 'unknown', 'GENERAL TRIAS BRANCH', 2, '0', '0', NULL, NULL),
(829, '553', 'Public Libraries in the Philippines', 'unknown', 'Jaime C. Laya', '728606 pl', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(830, '554', 'Recollections & Disgessions', 'unknown', 'Tayag, K.', '417396 e', 'unknown', 'GENERAL TRIAS BRANCH', 2, '0', '0', NULL, NULL),
(831, '555', 'A Calendar of Rizaliana in the Vault of the Phil. National Library', 'unknown', 'Ambeth R. Ocampo', 'unknown', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(832, '556', 'Philippine School Libraries: Their Organization and Management', 'unknown', 'Sanchez, Concordia', '496262 pl', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(833, '557', 'Effective Guide to Library and Refences', 'unknown', 'Natividad, Evelyn', '446574 pl', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(834, '558', 'The Management of Special Libraries and Information Center', 'unknown', 'Buenrostro, J.', '555758 pl', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(835, '559', 'How to Read A Book?', 'unknown', 'Adler, Mortimer J.', '298880 e', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(836, '560', 'Information Please! - Almanac, Atlas & Yearbook', 'unknown', 'Otto Johnson', '462503 pl', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(837, '561', 'The Newswriting Formula', 'unknown', 'Santos, Vergel O.', '458201 pl', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(838, '562', 'Cultural 400: A Directory of Awards and Prizes', 'unknown', 'E.M. San Jose, Florentino', '280834 e', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(839, '563', 'C.C.P. Encyclopedia of Philippine Arts', 'unknown', 'N.C.C.A.', '193 pl (cd)', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(840, '564', 'The Book of Knowledege - (The Children Encyclopedia)', 'unknown', 'Grolier Society, Inc.', '99001 m', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(841, '565', 'The Book of Knowledege - (The Children Encyclopedia)', 'unknown', 'Grolier Society, Inc.', '99041 m', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(842, '566', 'The Book of Knowledege - (The Children Encyclopedia)', 'unknown', 'Grolier Society, Inc.', '99061 m', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(843, '567', 'The Book of Knowledege - (The Children Encyclopedia)', 'unknown', 'Grolier Society, Inc.', '99121 m', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(844, '568', 'The Book of Knowledege - (The Children Encyclopedia)', 'unknown', 'Grolier Society, Inc.', '99141 m', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(845, '569', 'The Book of Knowledege - (The Children Encyclopedia)', 'unknown', 'Grolier Society, Inc.', '99161 m', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(846, '570', 'Children\'s Britannica Encyclopedia - (Vol. 1)', 'unknown', 'Encyclopedia Britannica, Inc.', '456759 pl', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(847, '571', 'Children\'s Britannica Encyclopedia - (Vol. 2)', 'unknown', 'Encyclopedia Britannica, Inc.', '456760 pl', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(848, '572', 'Children\'s Britannica Encyclopedia - (Vol. 3)', 'unknown', 'Encyclopedia Britannica, Inc.', '456761 pl', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(849, '573', 'Children\'s Britannica Encyclopedia - (Vol. 4)', 'unknown', 'Encyclopedia Britannica, Inc.', '456762 pl', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(850, '574', 'Children\'s Britannica Encyclopedia - (Vol. 5)', 'unknown', 'Encyclopedia Britannica, Inc.', '456763 pl', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(851, '575', 'Children\'s Britannica Encyclopedia - (Vol. 5)', 'unknown', 'Encyclopedia Britannica, Inc.', '456764 pl', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(852, '576', 'Children\'s Britannica Encyclopedia - (Vol. 7)', 'unknown', 'Encyclopedia Britannica, Inc.', '456765 pl', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(853, '577', 'Children\'s Britannica Encyclopedia - (Vol. 8)', 'unknown', 'Encyclopedia Britannica, Inc.', '456766 pl', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(854, '578', 'Children\'s Britannica Encyclopedia - (Vol. 9)', 'unknown', 'Encyclopedia Britannica, Inc.', '456767 pl', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(855, '579', 'Children\'s Britannica Encyclopedia - (Vol. 10)', 'unknown', 'Encyclopedia Britannica, Inc.', '456768 pl', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(856, '580', 'Children\'s Britannica Encyclopedia - (Vol. 11)', 'unknown', 'Encyclopedia Britannica, Inc.', '456769 pl', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(857, '581', 'Children\'s Britannica Encyclopedia - (Vol. 12)', 'unknown', 'Encyclopedia Britannica, Inc.', '456770 pl', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL),
(858, '582', 'Children\'s Britannica Encyclopedia - (Vol. 13)', 'unknown', 'Encyclopedia Britannica, Inc.', '456771 pl', 'unknown', 'GENERAL TRIAS BRANCH', 0, '0', '0', NULL, NULL),
(859, '583', 'Children\'s Britannica Encyclopedia - (Vol. 14)', 'unknown', 'Encyclopedia Britannica, Inc.', '456772 pl', 'unknown', 'GENERAL TRIAS BRANCH', 1, '0', '0', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `borrow_books`
--

CREATE TABLE `borrow_books` (
  `id` int(11) NOT NULL,
  `book_id` varchar(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `author_name` varchar(50) NOT NULL,
  `acct_id` int(11) NOT NULL,
  `acct_name` varchar(50) NOT NULL,
  `date` varchar(50) NOT NULL,
  `time` varchar(50) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `borrow_books`
--

INSERT INTO `borrow_books` (`id`, `book_id`, `title`, `author_name`, `acct_id`, `acct_name`, `date`, `time`, `status`) VALUES
(1, '1', 'Alamat ng saging', 'Juan Cruz', 35, 'JOSHUA B. MARCELINO', '2024-11-20', '16:25', 'returned'),
(2, '2', 'Alamat ng sample', 'John Cruz', 35, 'JOSHUA B. MARCELINO', '2024-11-20', '16:41', 'rejected'),
(3, '1', 'Alamat ng saging', 'Juan Cruz', 35, 'JOSHUA B. MARCELINO', '2024-11-20', '19:05', 'returned'),
(4, '1', 'Alamat ng saging', 'Juan Cruz', 35, 'JOSHUA B. MARCELINO', '2024-11-20', '21:23', 'rejected'),
(23, '1', 'Alamat ng saging', 'Juan Cruz', 34, 'MARK R. PAMPARO', '2024-11-27', '18:33', 'returned'),
(24, '2', 'Alamat ng sample', 'John Cruz', 34, 'MARK R. PAMPARO', '2024-11-27', '19:10', 'pending'),
(25, '2', 'Alamat ng sample', 'John Cruz', 34, 'MARK PAMPARO', '2024-12-03', '17:06', 'pending'),
(26, '2', 'Alamat ng sample', 'John Cruz', 43, 'JOSHUA CABAL', '2024-12-10', '11:01', 'pending'),
(27, '11', 'The First Three Years Of Life', 'May Tobias - Papa', 43, 'JOSHUA CABAL', '2024-12-14', '20:14', 'returned'),
(28, '2', 'Alamat ng sample', 'John Cruz', 36, 'ROMAR CENA', '2024-12-15', '10:42', 'returned'),
(29, '2', 'Alamat ng sample', 'John Cruz', 43, 'JOSHUA CABAL', '2024-12-15', '10:43', 'approved');

-- --------------------------------------------------------

--
-- Table structure for table `branch`
--

CREATE TABLE `branch` (
  `id` int(10) NOT NULL,
  `branch_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `branch`
--

INSERT INTO `branch` (`id`, `branch_name`) VALUES
(2, 'GENERAL TRIAS BRANCH'),
(5, 'NAIC BRANCH'),
(7, 'AMADEO BRANCH');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(10) NOT NULL,
  `username` varchar(255) NOT NULL,
  `message` longtext NOT NULL,
  `date` varchar(255) NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `username`, `message`, `date`, `time`) VALUES
(1, 'anonymous', 'sample feedback', '2024-11-01', '12:55:00'),
(16, 'anonymous', 'dasdasdasdas', '2024-12-05', '14:20:00'),
(17, 'anonymous', 'dasdasdsa', '2024-12-05', '14:23:00'),
(18, 'ako to si mar', 'ganda ng ui nyo', '2024-12-05', '14:23:00');

-- --------------------------------------------------------

--
-- Table structure for table `genre`
--

CREATE TABLE `genre` (
  `id` int(10) NOT NULL,
  `genre_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `genre`
--

INSERT INTO `genre` (`id`, `genre_name`) VALUES
(1, 'Mystery'),
(2, 'Thriller'),
(3, 'Fantasy'),
(4, 'Science Fiction'),
(5, 'Historical'),
(6, 'Romance'),
(7, 'Horror'),
(8, 'Biography'),
(9, 'Memoir'),
(10, 'Self-Help'),
(11, 'Adventure'),
(12, 'Children\'s Literature'),
(13, 'Young Adult (YA)'),
(14, 'Crime'),
(15, 'Dystopian'),
(16, 'Classic Literature'),
(17, 'Poetry'),
(18, 'Graphic Novels'),
(19, 'Drama'),
(20, 'Paranormal'),
(21, 'Satire'),
(22, 'Humor'),
(23, 'Travel'),
(24, 'Spirituality'),
(25, 'Western'),
(26, 'Essays'),
(27, 'Cookbooks'),
(28, 'Educational / Textbooks'),
(29, 'Fiction'),
(30, 'Political');

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE `image` (
  `id` int(11) NOT NULL,
  `filename` varchar(50) NOT NULL,
  `path` varchar(50) NOT NULL,
  `imageID` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `image`
--

INSERT INTO `image` (`id`, `filename`, `path`, `imageID`) VALUES
(1, 'image_1732760124866.JPG', 'uploads\\image_1732760124866.JPG', '2b94d49a-f'),
(2, 'image_1734056777748.jpg', 'uploads\\image_1734056777748.jpg', 'e26e8ba4-4'),
(3, 'image_1734058942041.jpg', 'uploads\\image_1734058942041.jpg', '2a579c99-6'),
(4, 'image_1736402121381.png', 'uploads\\image_1736402121381.png', 'c7c40443-3'),
(5, 'file_1736403304961.jpg', 'uploads\\file_1736403304961.jpg', 'lxktmThX');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`book_id`);

--
-- Indexes for table `borrow_books`
--
ALTER TABLE `borrow_books`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `branch`
--
ALTER TABLE `branch`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `book_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=860;

--
-- AUTO_INCREMENT for table `borrow_books`
--
ALTER TABLE `borrow_books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `branch`
--
ALTER TABLE `branch`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `genre`
--
ALTER TABLE `genre`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
