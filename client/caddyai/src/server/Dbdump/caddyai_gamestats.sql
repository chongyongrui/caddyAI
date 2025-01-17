-- MySQL dump 10.13  Distrib 8.0.38, for macos14 (arm64)
--
-- Host: localhost    Database: caddyai
-- ------------------------------------------------------
-- Server version	9.0.1

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gamestats`
--

LOCK TABLES `gamestats` WRITE;
/*!40000 ALTER TABLE `gamestats` DISABLE KEYS */;
INSERT INTO `gamestats` VALUES (1,'033c62cc-8dc6-46f5-befe-db5a86017932','2024-08-24 14:52:36',-1,'test@test.com',99,'Black','{\"1\":5,\"2\":6,\"3\":5,\"4\":6,\"5\":8,\"6\":6,\"7\":5,\"8\":4,\"9\":2,\"10\":4,\"11\":5,\"12\":6,\"13\":7,\"14\":6,\"15\":6,\"16\":6,\"17\":6,\"18\":6}','Seletar Country Club'),(2,'9dfee4c2-9c61-463d-a11f-8dfcbc1e6803','2024-09-02 06:41:10',-1,'',72,'Red','{\"1\":4,\"2\":4,\"3\":4,\"4\":4,\"5\":4,\"6\":4,\"7\":4,\"8\":4,\"9\":4,\"10\":4,\"11\":4,\"12\":4,\"13\":4,\"14\":4,\"15\":4,\"16\":4,\"17\":4,\"18\":4}','Seletar Country Club'),(3,'363d3e99-f22d-47dd-8aac-1fbf16433243','2024-09-03 06:04:19',-1,'yrchong2000@gmail.com',72,'White','{\"1\":4,\"2\":4,\"3\":4,\"4\":4,\"5\":4,\"6\":4,\"7\":4,\"8\":4,\"9\":4,\"10\":4,\"11\":4,\"12\":4,\"13\":4,\"14\":4,\"15\":4,\"16\":4,\"17\":4,\"18\":4}','Seletar Country Club'),(4,'55766b7b-4d1a-4e39-a558-f823ed365bd4','2024-09-04 04:34:26',-1,'yrchong2000@gmail.com',90,'Gold','{\"1\":5,\"2\":5,\"3\":5,\"4\":5,\"5\":5,\"6\":5,\"7\":5,\"8\":5,\"9\":5,\"10\":5,\"11\":5,\"12\":5,\"13\":5,\"14\":5,\"15\":5,\"16\":5,\"17\":5,\"18\":5}','Seletar Country Club');
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

-- Dump completed on 2024-09-25 14:42:26
