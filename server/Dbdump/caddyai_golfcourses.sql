-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: caddyai
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `golfcourses`
--

DROP TABLE IF EXISTS `golfcourses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `golfcourses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `course_name` varchar(255) NOT NULL,
  `hole1_description` varchar(255) DEFAULT NULL,
  `hole1_par` int DEFAULT NULL,
  `hole2_description` varchar(255) DEFAULT NULL,
  `hole2_par` int DEFAULT NULL,
  `hole3_description` varchar(255) DEFAULT NULL,
  `hole3_par` int DEFAULT NULL,
  `hole4_description` varchar(255) DEFAULT NULL,
  `hole4_par` int DEFAULT NULL,
  `hole5_description` varchar(255) DEFAULT NULL,
  `hole5_par` int DEFAULT NULL,
  `hole6_description` varchar(255) DEFAULT NULL,
  `hole6_par` int DEFAULT NULL,
  `hole7_description` varchar(255) DEFAULT NULL,
  `hole7_par` int DEFAULT NULL,
  `hole8_description` varchar(255) DEFAULT NULL,
  `hole8_par` int DEFAULT NULL,
  `hole9_description` varchar(255) DEFAULT NULL,
  `hole9_par` int DEFAULT NULL,
  `hole10_description` varchar(255) DEFAULT NULL,
  `hole10_par` int DEFAULT NULL,
  `hole11_description` varchar(255) DEFAULT NULL,
  `hole11_par` int DEFAULT NULL,
  `hole12_description` varchar(255) DEFAULT NULL,
  `hole12_par` int DEFAULT NULL,
  `hole13_description` varchar(255) DEFAULT NULL,
  `hole13_par` int DEFAULT NULL,
  `hole14_description` varchar(255) DEFAULT NULL,
  `hole14_par` int DEFAULT NULL,
  `hole15_description` varchar(255) DEFAULT NULL,
  `hole15_par` int DEFAULT NULL,
  `hole16_description` varchar(255) DEFAULT NULL,
  `hole16_par` int DEFAULT NULL,
  `hole17_description` varchar(255) DEFAULT NULL,
  `hole17_par` int DEFAULT NULL,
  `hole18_description` varchar(255) DEFAULT NULL,
  `hole18_par` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uc_course` (`course_name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `golfcourses`
--

LOCK TABLES `golfcourses` WRITE;
/*!40000 ALTER TABLE `golfcourses` DISABLE KEYS */;
INSERT INTO `golfcourses` VALUES (1,'Seletar Country Club',NULL,4,NULL,3,NULL,4,NULL,5,NULL,4,NULL,3,NULL,5,NULL,4,NULL,4,NULL,5,NULL,3,NULL,4,NULL,3,NULL,5,NULL,4,NULL,4,NULL,4,NULL,4);
/*!40000 ALTER TABLE `golfcourses` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-25 21:45:58
