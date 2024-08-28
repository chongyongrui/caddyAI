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
-- Table structure for table `golfstats`
--

DROP TABLE IF EXISTS `golfstats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `golfstats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `fairwayHit` tinyint(1) NOT NULL,
  `fairwayReason` varchar(255) DEFAULT NULL,
  `gir` tinyint(1) NOT NULL,
  `girReason` varchar(255) DEFAULT NULL,
  `putts` int NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `course` varchar(255) DEFAULT NULL,
  `hole` int DEFAULT NULL,
  `dateTime` timestamp NULL DEFAULT NULL,
  `gameid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=231 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `golfstats`
--

LOCK TABLES `golfstats` WRITE;
/*!40000 ALTER TABLE `golfstats` DISABLE KEYS */;
INSERT INTO `golfstats` VALUES (1,-1,1,'',1,'',2,'yrchong2000@gmail.com','Seletar Country Club',1,'2024-08-23 08:31:57',NULL),(2,-1,1,'',1,'',2,'yrchong2000@gmail.com','Seletar Country Club',2,'2024-08-23 08:32:09',NULL),(3,-1,1,'',0,'Left',2,'yrchong2000@gmail.com','Seletar Country Club',3,'2024-08-23 08:32:20',NULL),(4,-1,1,'',0,'',2,'yrchong2000@gmail.com','Seletar Country Club',4,'2024-08-23 08:32:41',NULL),(5,-1,1,'',0,'',2,'yrchong2000@gmail.com','Seletar Country Club',5,'2024-08-23 08:33:22',NULL),(6,-1,0,'',0,'Left',2,'yrchong2000@gmail.com','Seletar Country Club',6,'2024-08-23 08:33:34',NULL),(7,-1,0,'Right',0,'Left',2,'yrchong2000@gmail.com','Seletar Country Club',7,'2024-08-23 08:33:48',NULL),(8,-1,1,'Right',0,'Right',2,'yrchong2000@gmail.com','Seletar Country Club',8,'2024-08-23 08:34:01',NULL),(9,-1,0,'Right',0,'Right',2,'yrchong2000@gmail.com','Seletar Country Club',9,'2024-08-23 08:34:15',NULL),(10,-1,1,'Right',0,'Short',1,'yrchong2000@gmail.com','Seletar Country Club',10,'2024-08-23 08:34:40',NULL),(11,-1,0,'Left',0,'Short',3,'yrchong2000@gmail.com','Seletar Country Club',11,'2024-08-23 08:35:01',NULL),(12,-1,1,'Left',0,'Long',2,'yrchong2000@gmail.com','Seletar Country Club',12,'2024-08-23 08:35:16',NULL),(13,-1,1,'Left',1,'Long',2,'yrchong2000@gmail.com','Seletar Country Club',13,'2024-08-23 08:35:23',NULL),(14,-1,0,'Right',0,'',1,'yrchong2000@gmail.com','Seletar Country Club',14,'2024-08-23 08:35:41',NULL),(15,-1,1,'Right',0,'Right',1,'yrchong2000@gmail.com','Seletar Country Club',15,'2024-08-23 08:36:10',NULL),(16,-1,1,'Right',1,'Right',3,'yrchong2000@gmail.com','Seletar Country Club',16,'2024-08-23 08:36:15',NULL),(17,-1,0,'Left',0,'',2,'yrchong2000@gmail.com','Seletar Country Club',17,'2024-08-23 08:36:26',NULL),(18,-1,0,'Right',0,'',1,'yrchong2000@gmail.com','Seletar Country Club',18,'2024-08-23 08:36:38',NULL),(19,-1,1,'',1,'',1,'yrchong2000@gmail.com','Seletar Country Club',1,'2024-08-24 00:40:49',NULL),(20,-1,1,'',1,'',2,'yrchong2000@gmail.com','Seletar Country Club',2,'2024-08-24 00:40:58',NULL),(21,-1,0,'Right',0,'',1,'yrchong2000@gmail.com','Seletar Country Club',3,'2024-08-24 00:41:12',NULL),(22,-1,1,'Right',0,'',1,'yrchong2000@gmail.com','Seletar Country Club',4,'2024-08-24 00:41:31',NULL),(23,-1,1,'Right',0,'',2,'yrchong2000@gmail.com','Seletar Country Club',5,'2024-08-24 00:41:47',NULL),(24,-1,1,'Right',0,'',1,'yrchong2000@gmail.com','Seletar Country Club',6,'2024-08-24 00:41:53',NULL),(25,-1,1,'Right',0,'',1,'yrchong2000@gmail.com','Seletar Country Club',7,'2024-08-24 00:41:58',NULL),(26,-1,0,'Right',0,'Left',2,'yrchong2000@gmail.com','Seletar Country Club',8,'2024-08-24 00:42:13',NULL),(27,-1,0,'Right',0,'Left',2,'yrchong2000@gmail.com','Seletar Country Club',9,'2024-08-24 00:42:18',NULL),(28,-1,0,'Bunker',0,'Short',2,'yrchong2000@gmail.com','Seletar Country Club',10,'2024-08-24 00:42:32',NULL),(29,-1,0,'',0,'Short',2,'yrchong2000@gmail.com','Seletar Country Club',11,'2024-08-24 00:42:45',NULL),(30,-1,0,'Right',0,'Short',2,'yrchong2000@gmail.com','Seletar Country Club',12,'2024-08-24 00:42:55',NULL),(31,-1,1,'Right',1,'Short',2,'yrchong2000@gmail.com','Seletar Country Club',13,'2024-08-24 00:43:03',NULL),(32,-1,1,'Right',0,'Short',1,'yrchong2000@gmail.com','Seletar Country Club',14,'2024-08-24 00:43:12',NULL),(33,-1,1,'Right',0,'Left',2,'yrchong2000@gmail.com','Seletar Country Club',15,'2024-08-24 00:43:21',NULL),(34,-1,1,'Right',0,'Short',2,'yrchong2000@gmail.com','Seletar Country Club',16,'2024-08-24 00:43:24',NULL),(35,-1,1,'Right',0,'Right',2,'yrchong2000@gmail.com','Seletar Country Club',17,'2024-08-24 00:43:27',NULL),(36,-1,1,'Right',0,'Short',1,'yrchong2000@gmail.com','Seletar Country Club',18,'2024-08-24 00:43:32',NULL),(195,-1,1,'',1,'',2,'test@test.com','Seletar Country Club',1,'2024-08-24 06:49:46','11faa07c-ad31-4698-8326-0b54b4df5b2f'),(196,-1,1,'',1,'',2,'test@test.com','Seletar Country Club',2,'2024-08-24 06:49:47','11faa07c-ad31-4698-8326-0b54b4df5b2f'),(197,-1,1,'',1,'',2,'test@test.com','Seletar Country Club',3,'2024-08-24 06:49:48','11faa07c-ad31-4698-8326-0b54b4df5b2f'),(198,-1,1,'',1,'',2,'test@test.com','Seletar Country Club',4,'2024-08-24 06:49:48','11faa07c-ad31-4698-8326-0b54b4df5b2f'),(199,-1,1,'',1,'',2,'test@test.com','Seletar Country Club',5,'2024-08-24 06:49:49','11faa07c-ad31-4698-8326-0b54b4df5b2f'),(200,-1,1,'',1,'',2,'test@test.com','Seletar Country Club',6,'2024-08-24 06:49:51','11faa07c-ad31-4698-8326-0b54b4df5b2f'),(201,-1,1,'',1,'',2,'test@test.com','Seletar Country Club',7,'2024-08-24 06:49:52','11faa07c-ad31-4698-8326-0b54b4df5b2f'),(202,-1,1,'',1,'',2,'test@test.com','Seletar Country Club',8,'2024-08-24 06:49:53','11faa07c-ad31-4698-8326-0b54b4df5b2f'),(203,-1,1,'',1,'',2,'test@test.com','Seletar Country Club',9,'2024-08-24 06:49:54','11faa07c-ad31-4698-8326-0b54b4df5b2f'),(204,-1,1,'',1,'',3,'test@test.com','Seletar Country Club',10,'2024-08-24 06:49:55','11faa07c-ad31-4698-8326-0b54b4df5b2f'),(205,-1,1,'',1,'',2,'test@test.com','Seletar Country Club',11,'2024-08-24 06:49:56','11faa07c-ad31-4698-8326-0b54b4df5b2f'),(206,-1,1,'',1,'',2,'test@test.com','Seletar Country Club',12,'2024-08-24 06:49:57','11faa07c-ad31-4698-8326-0b54b4df5b2f'),(207,-1,1,'',1,'',2,'test@test.com','Seletar Country Club',13,'2024-08-24 06:49:57','11faa07c-ad31-4698-8326-0b54b4df5b2f'),(208,-1,1,'',1,'',2,'test@test.com','Seletar Country Club',14,'2024-08-24 06:49:58','11faa07c-ad31-4698-8326-0b54b4df5b2f'),(209,-1,1,'',1,'',2,'test@test.com','Seletar Country Club',15,'2024-08-24 06:49:58','11faa07c-ad31-4698-8326-0b54b4df5b2f'),(210,-1,1,'',1,'',2,'test@test.com','Seletar Country Club',16,'2024-08-24 06:49:58','11faa07c-ad31-4698-8326-0b54b4df5b2f'),(211,-1,1,'',1,'',2,'test@test.com','Seletar Country Club',17,'2024-08-24 06:49:59','11faa07c-ad31-4698-8326-0b54b4df5b2f'),(212,-1,1,'',1,'',2,'test@test.com','Seletar Country Club',18,'2024-08-24 06:49:59','11faa07c-ad31-4698-8326-0b54b4df5b2f'),(213,-1,1,'',1,'',2,'test@test.com','Seletar Country Club',1,'2024-08-24 06:52:21',NULL),(214,-1,1,'',1,'',2,'test@test.com','Seletar Country Club',2,'2024-08-24 06:52:22',NULL),(215,-1,1,'',1,'',2,'test@test.com','Seletar Country Club',3,'2024-08-24 06:52:23',NULL),(216,-1,1,'',1,'',2,'test@test.com','Seletar Country Club',4,'2024-08-24 06:52:24',NULL),(217,-1,1,'',1,'',2,'test@test.com','Seletar Country Club',5,'2024-08-24 06:52:25',NULL),(218,-1,1,'',1,'',2,'test@test.com','Seletar Country Club',6,'2024-08-24 06:52:26',NULL),(219,-1,1,'',1,'',2,'test@test.com','Seletar Country Club',7,'2024-08-24 06:52:27',NULL),(220,-1,1,'',1,'',2,'test@test.com','Seletar Country Club',8,'2024-08-24 06:52:27',NULL),(221,-1,1,'',1,'',2,'test@test.com','Seletar Country Club',9,'2024-08-24 06:52:28',NULL),(222,-1,1,'',1,'',2,'test@test.com','Seletar Country Club',10,'2024-08-24 06:52:29',NULL),(223,-1,1,'',1,'',2,'test@test.com','Seletar Country Club',11,'2024-08-24 06:52:30',NULL),(224,-1,1,'',1,'',2,'test@test.com','Seletar Country Club',12,'2024-08-24 06:52:31',NULL),(225,-1,1,'',1,'',2,'test@test.com','Seletar Country Club',13,'2024-08-24 06:52:32',NULL),(226,-1,1,'',1,'',2,'test@test.com','Seletar Country Club',14,'2024-08-24 06:52:33',NULL),(227,-1,1,'',1,'',2,'test@test.com','Seletar Country Club',15,'2024-08-24 06:52:34',NULL),(228,-1,1,'',1,'',2,'test@test.com','Seletar Country Club',16,'2024-08-24 06:52:34',NULL),(229,-1,1,'',1,'',2,'test@test.com','Seletar Country Club',17,'2024-08-24 06:52:34',NULL),(230,-1,1,'',1,'',2,'test@test.com','Seletar Country Club',18,'2024-08-24 06:52:35',NULL);
/*!40000 ALTER TABLE `golfstats` ENABLE KEYS */;
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