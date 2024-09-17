-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 17, 2024 at 04:53 PM
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
  `card_number` varchar(100) DEFAULT NULL,
  `firstname` varchar(50) NOT NULL,
  `middlename` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `birthdate` varchar(50) NOT NULL,
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

INSERT INTO `accounts` (`id`, `card_number`, `firstname`, `middlename`, `lastname`, `birthdate`, `street_address`, `city`, `contact`, `gender`, `email`, `password`, `acctype`, `imageID`, `reset_token`, `reset_token_expires`) VALUES
(1, NULL, 'MARK', 'HERERA', 'FERNANDEZ', 'Mon Jan 22 2024', '#3', 'NAIC', '09760202655', 'MALE', 'pamparor@gmail.com', 'sha1$8ef2e43e$1$1a5fda612a5f8366b3d5c4640298f196e0fc5a31', 'admin', 'default', 'bff38d3c058b5a13eb68fa7786ffa8770ec0b2d605286a228051f60afa3b9f85', '0000-00-00 00:00:00'),
(34, 'dasdasdasds', 'MARK', 'REYES', 'PAMPARO', '2024-09-26', 'SAN GABRIEL', 'MENDEZ', '09760202622', 'male', 'pamparor1@gmail.com', 'sha1$d3fb7bb3$1$9f25d929b867c5cf736ddbd2162b6a7c333db605', 'student', 'default', NULL, NULL),
(35, 'asdasdasd', 'JOSH', 'BALIS', 'MARCELINO', '2024-09-11', 'SAN GABRIEL', 'MENDEZ', '09760202622', 'male', 'admin@gmail.com', 'sha1$85d7080e$1$58e9e0b85c5bc76caba4eb3b78f38334e0d3b852', 'student', 'default', NULL, NULL),
(36, 'adsadasds', 'ROMAR', 'reyes', 'CENA', '2024-09-27', 'SAN GABRIEL', 'NAIC', '09760202622', 'male', 'admin1@gmail.com', 'sha1$893f4e91$1$008377225482295454a3298cd0070e8c1c9600f7', 'admin', 'default', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `book_id` int(10) NOT NULL,
  `title` varchar(100) NOT NULL,
  `author_name` varchar(50) NOT NULL,
  `publication` varchar(50) NOT NULL,
  `genre` varchar(50) NOT NULL,
  `branch` varchar(50) NOT NULL,
  `total_copies` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`book_id`, `title`, `author_name`, `publication`, `genre`, `branch`, `total_copies`) VALUES
(2, 'The Great Gatsby', 'F. Scott Fitzgerald', 'Scribner', 'Fiction', 'NAIC BRANCH', 5),
(3, 'To Kill a Mockingbird', 'Harper Lee', 'J.B. Lippincott & Co.', 'Fiction', 'GENERAL TRIAS BRANCH', 7),
(4, '1984', 'George Orwell', 'Secker & Warburg', 'Dystopian', 'NAIC BRANCH', 8),
(5, 'Moby Dick', 'Herman Melville', 'Harper & Brothers', 'Adventure', 'GENERAL TRIAS BRANCH', 4),
(6, 'Pride and Prejudice', 'Jane Austen', 'T. Egerton', 'Romance', 'NAIC BRANCH', 6),
(7, 'The Catcher in the Rye', 'J.D. Salinger', 'Little, Brown and Company', 'Classic', 'GENERAL TRIAS BRANCH', 3),
(8, 'The Hobbit', 'J.R.R. Tolkien', 'George Allen & Unwin', 'Fantasy', 'NAIC BRANCH', 9),
(9, 'Brave New World', 'Aldous Huxley', 'Chatto & Windus', 'Dystopian', 'GENERAL TRIAS BRANCH', 5),
(10, 'The Odyssey', 'Homer', 'Ancient Greece', 'Classic', 'NAIC BRANCH', 2),
(11, 'The Da Vinci Code', 'Dan Brown', 'DoubleDay', 'Mystery', 'GENERAL TRIAS BRANCH', 11),
(12, 'Jane Eyre', 'Charlotte Brontë', 'Smith, Elder & Co.', 'Romance', 'NAIC BRANCH', 4),
(13, 'War and Peace', 'Leo Tolstoy', 'The Russian Messenger', 'Historical', 'GENERAL TRIAS BRANCH', 6),
(14, 'The Shining', 'Stephen King', 'DoubleDay', 'Horror', 'NAIC BRANCH', 7),
(15, 'The Great Expectations', 'Charles Dickens', 'Chapman & Hall', 'Classic', 'GENERAL TRIAS BRANCH', 8),
(16, 'Animal Farm', 'George Orwell', 'Secker & Warburg', 'Political', 'NAIC BRANCH', 5),
(17, 'The Catcher in the Rye', 'J.D. Salinger', 'Little, Brown and Company', 'Classic', 'GENERAL TRIAS BRANCH', 2),
(18, 'Little Women', 'Louisa May Alcott', 'Roberts Brothers', 'Classic', 'NAIC BRANCH', 6),
(19, 'The Chronicles of Narnia', 'C.S. Lewis', 'Geoffrey Bles', 'Fantasy', 'GENERAL TRIAS BRANCH', 9),
(20, 'The Road', 'Cormac McCarthy', 'Alfred A. Knopf', 'Dystopian', 'NAIC BRANCH', 3),
(21, 'The Girl with the Dragon Tattoo', 'Stieg Larsson', 'Norstedts Förlag', 'Mystery', 'GENERAL TRIAS BRANCH', 10),
(22, 'dasds', 'asdas', 'asds', 'Graphic Novels', 'NAIC BRANCH', 1),
(23, 'SAMPLE BOOK NAME', 'SAMPLE AUTHOR NAME', 'SAMPLE PUBLICATION', 'Crime', 'NAIC BRANCH', 2);

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
(5, 'iIfYHD6H', 'Pride and Prejudice', 'Jane Austen', 35, 'RUMAR C. PAMPARO', 'Sun Sep 15 2024', '09:15 PM', 'approved'),
(6, 'UC7nhXGG', 'To Kill a Mockingbird', 'Harper Lee', 35, 'RUMAR C. PAMPARO', 'Mon Sep 16 2024', '11:45 AM', 'pending'),
(7, 'iCvkiW0x', '1984', 'George Orwell', 35, 'RUMAR C. PAMPARO', 'Mon Sep 16 2024', '11:47 AM', 'pending'),
(8, 'WWmD6eQE', 'Moby Dick', 'Herman Melville', 35, 'RUMAR C. PAMPARO', 'Tue Sep 17 2024', '03:04 PM', 'pending'),
(9, 'XQDt7Wr2', 'The Great Gatsby', 'F. Scott Fitzgerald', 35, 'RUMAR C. PAMPARO', 'Tue Sep 17 2024', '03:38 PM', 'pending');

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
(1, 'NAIC BRANCH'),
(2, 'GENERAL TRIAS BRANCH');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(10) NOT NULL,
  `message` longtext NOT NULL,
  `date` varchar(50) NOT NULL,
  `time` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `message`, `date`, `time`) VALUES
(1, 'sample feedback', 'Tue Sep 17 2024', '03:04 PM');

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
(5, 'Historical Fiction'),
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
(28, 'Educational / Textbooks');

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
(9, 'file_1725548446479.jpg', 'uploads\\file_1725548446479.jpg', 'k4SSzC8a'),
(10, 'file_1725630561941.jpg', 'uploads\\file_1725630561941.jpg', 'kn89NYjl');

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
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `book_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `borrow_books`
--
ALTER TABLE `borrow_books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `branch`
--
ALTER TABLE `branch`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `genre`
--
ALTER TABLE `genre`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
