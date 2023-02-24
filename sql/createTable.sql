-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 08, 2023 at 12:50 PM
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
-- Database: `project`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `ID_admin` int(11) NOT NULL COMMENT 'เลขประจำตัวแอดมิน',
  `name_admin` varchar(255) NOT NULL COMMENT 'ชื่อแอดมิน',
  `password` varchar(255) NOT NULL COMMENT 'รหัสผ่านแอดมิน'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

CREATE TABLE `authors` (
  `ID_author` int(11) NOT NULL,
  `name_ author` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `core_skill`
--

CREATE TABLE `core_skill` (
  `ID_coreskill` int(11) NOT NULL,
  `name_coreskill` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `join_authors`
--

CREATE TABLE `join_authors` (
  `ID_Join_authors` int(11) NOT NULL,
  `ID_author` int(11) NOT NULL,
  `ID_research` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Table structure for table `professor`
--

CREATE TABLE `professor` (
  `ID_ professor` int(11) NOT NULL,
  `name_professor` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Phone_number` varchar(25) NOT NULL,
  `Position` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `research`
--

CREATE TABLE `research` (
  `ID_research` int(11) NOT NULL,
  `name_ research` varchar(255) NOT NULL,
  `Publication_date` date NOT NULL,
  `conference` text NOT NULL,
  `Description` text NOT NULL,
  `article` varchar(255) NOT NULL,
  `ID_ professor` int(11) NOT NULL,
  `ID_Type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

 --------------------------------------------------------

--
-- Table structure for table `skill`
--

CREATE TABLE `skill` (
  `ID_skill` int(11) NOT NULL,
  `ID_coreskill` int(11) NOT NULL,
  `ID_ professor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- --------------------------------------------------------

--
-- Table structure for table `type_research`
--

CREATE TABLE `type_research` (
  `ID_Type` int(11) NOT NULL,
  `name_Type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`ID_admin`);

--
-- Indexes for table `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`ID_author`);

--
-- Indexes for table `core_skill`
--
ALTER TABLE `core_skill`
  ADD PRIMARY KEY (`ID_coreskill`);

--
-- Indexes for table `join_authors`
--
ALTER TABLE `join_authors`
  ADD PRIMARY KEY (`ID_Join_authors`);

--
-- Indexes for table `professor`
--
ALTER TABLE `professor`
  ADD PRIMARY KEY (`ID_ professor`);

--
-- Indexes for table `research`
--
ALTER TABLE `research`
  ADD PRIMARY KEY (`ID_research`);

--
-- Indexes for table `skill`
--
ALTER TABLE `skill`
  ADD PRIMARY KEY (`ID_skill`);

--
-- Indexes for table `type_research`
--
ALTER TABLE `type_research`
  ADD PRIMARY KEY (`ID_Type`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `ID_admin` int(11) NOT NULL AUTO_INCREMENT COMMENT 'เลขประจำตัวแอดมิน', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `authors`
--
ALTER TABLE `authors`
  MODIFY `ID_author` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `core_skill`
--
ALTER TABLE `core_skill`
  MODIFY `ID_coreskill` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `join_authors`
--
ALTER TABLE `join_authors`
  MODIFY `ID_Join_authors` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `professor`
--
ALTER TABLE `professor`
  MODIFY `ID_ professor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `research`
--
ALTER TABLE `research`
  MODIFY `ID_research` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `skill`
--
ALTER TABLE `skill`
  MODIFY `ID_skill` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `type_research`
--
ALTER TABLE `type_research`
  MODIFY `ID_Type` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
