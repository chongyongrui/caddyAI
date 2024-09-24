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
-- Table structure for table `gamestats`
--

DROP TABLE IF EXISTS `gamestats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gamestats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `gameid` varchar(255) NOT NULL,
  `datetime` datetime NOT NULL,
  `userid` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `total_score` int NOT NULL,
  `teebox` varchar(255) NOT NULL,
  `scores` text NOT NULL,
  `course` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gamestats`
--

LOCK TABLES `gamestats` WRITE;
/*!40000 ALTER TABLE `gamestats` DISABLE KEYS */;
INSERT INTO `gamestats` VALUES (1,'033c62cc-8dc6-46f5-befe-db5a86017932','2024-08-24 14:52:36',-1,'test@test.com',99,'Black','{\"1\":5,\"2\":6,\"3\":5,\"4\":6,\"5\":8,\"6\":6,\"7\":5,\"8\":4,\"9\":2,\"10\":4,\"11\":5,\"12\":6,\"13\":7,\"14\":6,\"15\":6,\"16\":6,\"17\":6,\"18\":6}','Seletar Country Club'),(2,'bdb12f0b-ccae-4714-8f79-df74afb1207f','2024-08-26 15:36:15',-1,'yrchong2000@gmail.com',91,'Blue','{\"1\":6,\"2\":5,\"3\":6,\"4\":7,\"5\":4,\"6\":3,\"7\":6,\"8\":5,\"9\":4,\"10\":6,\"11\":3,\"12\":5,\"13\":4,\"14\":6,\"15\":4,\"16\":6,\"17\":6,\"18\":5}','Seletar Country Club');
/*!40000 ALTER TABLE `gamestats` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-24 21:02:55
