-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 01, 2024 at 03:45 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `summoner_info`
--
CREATE DATABASE IF NOT EXISTS `summoner_info` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `summoner_info`;

-- --------------------------------------------------------

--
-- Table structure for table `banning`
--

CREATE TABLE `banning` (
  `ingame` varchar(100) NOT NULL,
  `bantime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `banning`
--

INSERT INTO `banning` (`ingame`, `bantime`) VALUES
('danypro_5', '0000-00-00 00:00:00'),
('try', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `ewan`
--

CREATE TABLE `ewan` (
  `joiner` varchar(255) NOT NULL,
  `id` int(11) NOT NULL,
  `riot_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `duration` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ewan`
--

INSERT INTO `ewan` (`joiner`, `id`, `riot_id`, `name`, `duration`) VALUES
('danypro_5', 1, 'QWERT2ASD', 'dan', '2024-03-02 11:57:24'),
('try', 2, 'QWERT3ASD', '', '2024-01-02 13:58:54');

-- --------------------------------------------------------

--
-- Table structure for table `summoner`
--

CREATE TABLE `summoner` (
  `ign` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `nationality` varchar(100) NOT NULL,
  `age` date NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `summoner`
--

INSERT INTO `summoner` (`ign`, `email`, `password`, `nationality`, `age`, `role`) VALUES
('admin', 'admin@yahoo.com', '123', 'Philippines', '0000-00-00', 'admin'),
('danypro_5', 'danypro5555@gmail.com', '123', 'Philippines', '2003-01-05', 'player'),
('try', 'try@gmail.com', '123', 'Philippines', '2003-01-05', 'player');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ewan`
--
ALTER TABLE `ewan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `summoner`
--
ALTER TABLE `summoner`
  ADD PRIMARY KEY (`ign`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ewan`
--
ALTER TABLE `ewan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
