-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 15, 2024 at 04:45 PM
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
(1, 0, 'GENERAL TRIAS BRANCH', 'MARK', 'HERERA', 'FERNANDEZ', 'Mon Jan 22 2024', '#3', 'NAIC', '09760202655', 'MALE', 'admin@gmail.com', 'sha1$893f4e91$1$008377225482295454a3298cd0070e8c1c9600f7', 'admin', 'default', '4617c4369e2e74938f42655fb96fce85cbe9c03b4172a479796c18d0f342c3cf', '0000-00-00 00:00:00'),
(36, 0, 'GENERAL TRIAS BRANCH', 'ROMAR', 'reyes', 'CENA', '2024-09-27', 'SAN GABRIEL', 'NAIC', '09760202622', 'male', 'admin1@gmail.com', 'sha1$893f4e91$1$008377225482295454a3298cd0070e8c1c9600f7', 'super', 'default', NULL, NULL),
(42, 0, 'GENERAL TRIAS BRANCH', 'pamparor', 'c', 'reyes', '2024-11-27', 'undefined', 'NOVELETA', '09760202655', 'male', 'pamparor1@gmail.com', 'sha1$b7233466$1$0c66a06f63b183bdff3c5ff13ed2d36f42e625cc', 'admin', 'default', NULL, NULL),
(43, 1006, 'GENERAL TRIAS BRANCH', 'Joshua', 'reyes', 'cabal', '2024-11-16', '#3 calamansi street', 'SILANG', '09760202622', 'male', 'pamparor@gmail.com', 'sha1$893f4e91$1$008377225482295454a3298cd0070e8c1c9600f7', 'guest', '2b94d49a-f', NULL, NULL),
(44, 1007, 'undefined', 'Ash', '', 'Ampart', 'undefined', '#3 calamansi', 'CAVITE-CITY', '09760202622', 'male', 'ash.ampart17@gmail.com', 'sha1$ad6a2cf5$1$cd0425783d83f78fff4365c495ce53695d4ec5fd', 'guest', 'default', NULL, NULL),
(46, 0, 'GENERAL TRIAS BRANCH', 'JS', 'RI', 'REYES', '2024-12-20', '#3 calamansi street', 'MENDEZ', '09760203882', 'male', 'ash.ampart179@gmail.com', 'sha1$db4309c7$1$a17c6fbf89ef96a995c517931dd6a37211878ff1', 'admin', '2a579c99-6', NULL, NULL),
(47, 1008, 'undefined', 'asd', 'asdasd', 'asdasd', 'undefined', 'dasda', 'MENDEZ', '09123334566', 'male', 'ash.ampart1710@gmail.com', 'sha1$1c182630$1$bd7a0a0dacd61561bde2de92c46f694a339b7bdd', 'guest', 'default', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `book_id` int(10) NOT NULL,
  `item_no` int(10) DEFAULT NULL,
  `ISBN` varchar(255) DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  `author_name` varchar(50) DEFAULT NULL,
  `access_no` varchar(50) DEFAULT NULL,
  `genre` varchar(50) NOT NULL,
  `branch` varchar(50) NOT NULL,
  `quantity` int(100) DEFAULT NULL,
  `amount` varchar(100) DEFAULT NULL,
  `call_no` varchar(100) DEFAULT NULL,
  `total_value` varchar(100) DEFAULT NULL,
  `date_acquired` varchar(100) DEFAULT NULL,
  `publication` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`book_id`, `item_no`, `ISBN`, `title`, `author_name`, `access_no`, `genre`, `branch`, `quantity`, `amount`, `call_no`, `total_value`, `date_acquired`, `publication`) VALUES
(2, 5002, '978 971 508 3396', 'Alamat ng sample', 'John Cruz', '8005pl', 'Classic Literature', 'GENERAL TRIAS BRANCH', 5, '5', '0', '0', '2024-10-30', '2024-10-30'),
(11, 265, '978 971 508 3393', 'The First Three Years Of Life', 'May Tobias - Papa', '8000pl', 'Horror', 'GENERAL TRIAS BRANCH', 9, '100', '9123554899', '65', '12/5/23', '12/5/23'),
(26, 265, '978 971 508 3393', 'The First Three Years Of Life', 'May Tobias - Papa', '8000pl', 'Horror', 'GENERAL TRIAS BRANCH', 10, '100', '9123554899', '65', '12/5/23', '12/5/23'),
(27, 222, '978 971 508 3393', 'sample', 'May Tobias - Papa', '8000pl', 'Horror', 'GENERAL TRIAS BRANCH', 10, '100', '9123554899', '65', '12/5/23', '12/5/23'),
(28, 1212, '978 971 508 3390', 'sample new', 'joshua', '8006pl', 'Children\'s Literature', 'GENERAL TRIAS BRANCH', 90, '90', '', '100', '2024-12-16', '2024-12-24');

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
(3, 'image_1734058942041.jpg', 'uploads\\image_1734058942041.jpg', '2a579c99-6');

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
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `book_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
