-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 23, 2025 at 04:05 AM
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
(42, 0, 'GENERAL TRIAS BRANCH', 'admin', 'c', 'gentri', '2024-11-27', 'undefined', 'NOVELETA', '09760202655', 'male', 'admin_gentri@gmail.com', 'sha1$b7233466$1$0c66a06f63b183bdff3c5ff13ed2d36f42e625cc', 'admin', 'default', NULL, NULL),
(46, 0, 'NAIC BRANCH', 'JS', 'RI', 'REYES', '2024-12-20', '#3 calamansi street', 'MENDEZ', '09760203882', 'male', 'admin_naic@gmail.com', 'sha1$db4309c7$1$a17c6fbf89ef96a995c517931dd6a37211878ff1', 'admin', '2a579c99-6', NULL, NULL),
(48, 1009, 'GENERAL TRIAS BRANCH', 'Rumar', 'capoquian', 'pamparo', 'undefined', '3calamansi', 'MARAGONDON', '09760202622', 'male', 'pamparor99@gmail.com', 'sha1$8383e853$1$5c01d4a159eced857972091af39a538ad6d2152f', 'guest', 'lxktmThX', NULL, NULL),
(49, 1010, 'GENERAL TRIAS BRANCH', 'dasd', 'reyes', 'asd', 'undefined', '3calamansi', 'MENDEZ', '09760202622', 'male', 'pamparor@gmail.com', 'sha1$d603c986$1$baab9d4aa4f86ac30a7551ccf73737d43aeb6163', 'guest', 'default', '56de181a7ada0a4328239422d8ea31f7a0e88c2fe028302787ae84033ac2f933', '2025-01-20 22:41:47');

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
(1, '12', '123-990', 'sample book', NULL, '123', 'classic', 'GENERAL TRIAS BRANCH', 11, '90', '10', '2025-01-01', NULL),
(2, '23123', '123-990', 'naic book', 'dasds', '231231', 'drama', 'NAIC BRANCH', 3, '222', '0', '2025-01-23', '2025-01-23'),
(3, '23123', '123-990', 'asdasd', 'asdasd', '2312312', 'drama', 'NAIC BRANCH', 1, '', '0', '2025-01-30', '2025-01-30'),
(4, '3123', '123-990', 'dasdsad', 'asdddd', '123', 'drama', 'NAIC BRANCH', 1, '', '0', '2025-01-16', '2025-02-04'),
(5, '3213', '123-990', 'asd', 'asd', '2312312', 'sample', 'NAIC BRANCH', 1, '', '0', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `borrow_books`
--

CREATE TABLE `borrow_books` (
  `id` int(11) NOT NULL,
  `book_id` varchar(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `author_name` varchar(50) NOT NULL,
  `branch` varchar(255) NOT NULL,
  `acct_id` int(11) NOT NULL,
  `acct_name` varchar(50) NOT NULL,
  `date` varchar(50) NOT NULL,
  `time` varchar(50) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `borrow_books`
--

INSERT INTO `borrow_books` (`id`, `book_id`, `title`, `author_name`, `branch`, `acct_id`, `acct_name`, `date`, `time`, `status`) VALUES
(17, '1', 'sample book', 'sample authr', 'GENERAL TRIAS BRANCH', 48, 'RUMAR PAMPARO', '2025-01-20', '10:50', 'returned'),
(18, '1', 'sample book', 'sample authr', 'GENERAL TRIAS BRANCH', 48, 'RUMAR PAMPARO', '2025-01-20', '11:21', 'approved'),
(19, '1', 'sample book', 'sample authr', 'GENERAL TRIAS BRANCH', 49, 'DASD ASD', '2025-01-20', '17:11', 'approved'),
(20, '1', 'sample book', 'sample authr', 'GENERAL TRIAS BRANCH', 49, 'DASD ASD', '2025-01-20', '17:01', 'returned'),
(21, '1', 'sample book', 'sample authr', 'NAIC BRANCH', 49, 'DASD ASD', '2025-01-20', '17:28', 'approved');

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
  `branch` varchar(255) NOT NULL,
  `message` longtext NOT NULL,
  `date` varchar(255) NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `username`, `branch`, `message`, `date`, `time`) VALUES
(1, 'anonymous', 'GENERAL TRIAS BRANCH', 'sample feedback', '2024-11-01', '12:55:00'),
(16, 'anonymous', 'GENERAL TRIAS BRANCH', 'dasdasdasdas', '2024-12-05', '14:20:00'),
(17, 'anonymous', 'GENERAL TRIAS BRANCH', 'dasdasdsa', '2024-12-05', '14:23:00'),
(18, 'ako to si mar', 'NAIC BRANCH', 'ganda ng ui nyo', '2024-12-05', '14:23:00'),
(19, 'sample gentri', '', 'sample comments', '2025-01-23', '11:00:00'),
(20, 'sample gentri', '', 'sadasdsa', '2025-01-23', '11:00:00'),
(21, 'sample gentri', '', 'asdasd', '2025-01-23', '11:00:00'),
(22, 'dasda', '', 'dasd', '2025-01-23', '11:00:00'),
(23, 'sample gentri', '', 'asdasd', '2025-01-23', '11:00:00'),
(24, 'sample gentri', 'GENERAL TRIAS BRANCH', 'asdasd', '2025-01-23', '11:00:00'),
(25, 'sample gentri1', 'GENERAL TRIAS BRANCH', 'dasda', '2025-01-23', '11:00:00');

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

-- --------------------------------------------------------

--
-- Table structure for table `transaction_history`
--

CREATE TABLE `transaction_history` (
  `id` int(11) NOT NULL,
  `book_id` int(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `transaction` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `branch` varchar(255) NOT NULL,
  `date` varchar(50) NOT NULL,
  `time` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaction_history`
--

INSERT INTO `transaction_history` (`id`, `book_id`, `title`, `transaction`, `name`, `branch`, `date`, `time`) VALUES
(3, 1, 'sample book', 'approved', 'RUMAR PAMPARO', 'GENERAL TRIAS BRANCH', '2025-01-20', '10:50:37'),
(4, 1, 'sample book', 'returned', 'RUMAR PAMPARO', 'GENERAL TRIAS BRANCH', '2025-01-20', '10:51:20'),
(5, 1, 'sample book', 'approved', 'RUMAR PAMPARO', 'GENERAL TRIAS BRANCH', '2025-01-20', '17:12:06'),
(6, 1, 'sample book', 'approved', 'DASD ASD', 'GENERAL TRIAS BRANCH', '2025-01-20', '17:12:10'),
(7, 1, 'sample book', 'approved', 'DASD ASD', 'GENERAL TRIAS BRANCH', '2025-01-20', '17:18:06'),
(8, 1, 'sample book', 'returned', 'DASD ASD', 'GENERAL TRIAS BRANCH', '2025-01-20', '17:18:33'),
(9, 1, 'sample book', 'approved', 'DASD ASD', 'GENERAL TRIAS BRANCH', '2025-01-20', '17:30:39');

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
-- Indexes for table `transaction_history`
--
ALTER TABLE `transaction_history`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `book_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `borrow_books`
--
ALTER TABLE `borrow_books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `branch`
--
ALTER TABLE `branch`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

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

--
-- AUTO_INCREMENT for table `transaction_history`
--
ALTER TABLE `transaction_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
