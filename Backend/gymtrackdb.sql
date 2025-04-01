CREATE DATABASE  IF NOT EXISTS `gymtrackdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `gymtrackdb`;
-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: gymtrackdb
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `exercisetypes`
--

DROP TABLE IF EXISTS `exercisetypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercisetypes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercisetypes`
--

LOCK TABLES `exercisetypes` WRITE;
/*!40000 ALTER TABLE `exercisetypes` DISABLE KEYS */;
INSERT INTO `exercisetypes` VALUES (1,'Kardio','Kardio trening'),(4,'Fleksibilnost','Neki opis za trening fleksibilnosti'),(5,'Trening snage','Novi opis treninga snage'),(7,'Vezba snage 2','');
/*!40000 ALTER TABLE `exercisetypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trainings`
--

DROP TABLE IF EXISTS `trainings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trainings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `exerciseTypeId` int NOT NULL,
  `trainingDate` datetime NOT NULL,
  `duration` int NOT NULL,
  `caloriesBurned` int NOT NULL,
  `workoutIntensity` int NOT NULL,
  `fatigue` int NOT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `fk_trainings_users_idx` (`userId`),
  KEY `fk_trainings_exerciseTypes1_idx` (`exerciseTypeId`),
  CONSTRAINT `fk_trainings_exerciseTypes1` FOREIGN KEY (`exerciseTypeId`) REFERENCES `exercisetypes` (`id`),
  CONSTRAINT `fk_trainings_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainings`
--

LOCK TABLES `trainings` WRITE;
/*!40000 ALTER TABLE `trainings` DISABLE KEYS */;
INSERT INTO `trainings` VALUES (1,1,1,'2025-04-03 18:57:04',30,500,7,7,'Umorio se'),(2,1,5,'2025-04-04 18:57:00',45,300,9,4,NULL),(3,2,1,'2025-03-28 18:30:00',45,700,7,6,'Trening'),(4,2,5,'2025-03-28 00:30:50',15,150,10,10,NULL),(6,2,5,'2025-03-28 00:50:50',15,300,9,5,NULL),(7,2,5,'2025-03-28 16:44:50',15,150,5,5,NULL),(8,2,5,'2025-03-28 08:20:50',15,150,5,9,NULL),(11,2,1,'2025-03-28 02:59:50',30,4,6,1,'Nema'),(17,1,5,'2025-03-06 22:02:00',30,30,6,6,'radi'),(18,2,5,'2025-02-12 14:53:03',45,1000,6,6,'Test1234'),(19,2,1,'2025-02-04 10:44:00',34,345,4,4,'Test1');
/*!40000 ALTER TABLE `trainings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `passwordHash` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `refreshToken` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `refreshTokenExpiryTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','AQAAAAIAAYagAAAAEPubNp6Mj9coUBuCGQE3bhKmT2gkEAm2pN1k/xazuXDMNCMj9okQ7AnKqm6my2CFuA==','Admin','2McC1jrkONMwT03Kp1tpUYocA4XINy96f+VsNhiBUh4=','2025-04-07 21:54:22'),(2,'test','AQAAAAIAAYagAAAAEOrTuk++Wvied/3mLTI5GEBJLN4HVg4GeHNxSee3STrahthi8BoWkSkJ1dffynhG+w==','User','D0qnEUY1BqBL1qNWpAAUM4zO9y1NLZXgKUSgZ33QNAs=','2025-04-07 22:05:45'),(3,'test2','AQAAAAIAAYagAAAAEA+1OXjyTT1DeC8ObKP205ONJpYnelWXinlmCzSGZkdMMH2q4P4qmYW/nZCqcm4c+g==','User','CQdWjsg4OL6l22hXKiaxFA/EsxshAhy+c5AId3SvfeA=','2025-04-05 19:26:53');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-01  0:25:30
