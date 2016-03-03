-- MySQL dump 10.13  Distrib 5.6.27, for osx10.8 (x86_64)
--
-- Host: localhost    Database: traderPRO
-- ------------------------------------------------------
-- Server version	5.6.27-enterprise-commercial-advanced

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `traderPRO`
--

/*!40000 DROP DATABASE IF EXISTS `traderPRO`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `traderPRO` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `traderPRO`;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `country` (
  `countryId` int(11) NOT NULL AUTO_INCREMENT,
  `countryCode` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `regionId` int(11) NOT NULL,
  PRIMARY KEY (`countryId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `currency`
--

DROP TABLE IF EXISTS `currency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `currency` (
  `currencyId` int(11) NOT NULL AUTO_INCREMENT,
  `currencyCode` varchar(10) NOT NULL,
  `currencyName` varchar(255) NOT NULL,
  `countryId` int(11) DEFAULT NULL,
  PRIMARY KEY (`currencyId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `currency`
--

LOCK TABLES `currency` WRITE;
/*!40000 ALTER TABLE `currency` DISABLE KEYS */;
/*!40000 ALTER TABLE `currency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exchange`
--

DROP TABLE IF EXISTS `exchange`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exchange` (
  `exchangeId` int(11) NOT NULL AUTO_INCREMENT,
  `exchangeSymbol` varchar(10) NOT NULL,
  `exchangeName` varchar(255) NOT NULL,
  `defaultCurrency` int(11) NOT NULL,
  `countryId` int(11) NOT NULL,
  PRIMARY KEY (`exchangeId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exchange`
--

LOCK TABLES `exchange` WRITE;
/*!40000 ALTER TABLE `exchange` DISABLE KEYS */;
/*!40000 ALTER TABLE `exchange` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `industry`
--

DROP TABLE IF EXISTS `industry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `industry` (
  `industryId` int(11) NOT NULL AUTO_INCREMENT,
  `industry` varchar(255) NOT NULL,
  `industryCode` int(11) NOT NULL,
  PRIMARY KEY (`industryId`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `industry`
--

LOCK TABLES `industry` WRITE;
/*!40000 ALTER TABLE `industry` DISABLE KEYS */;
INSERT INTO `industry` VALUES (1,'Energy',1010),(2,'Materials',1510),(3,'Capital Goods',2010),(4,'Commercial & Professional Services',2020),(5,'Transportation',2030),(6,'Automobiles & Components',2510),(7,'Consumer Durables & Apparel',2520),(8,'Consumer Services',2530),(9,'Media',2540),(10,'Retailing',2550),(11,'Food & Staples Retailing',3010),(12,'Food, Beverage & Tobacco',3020),(13,'Household & Personal Products',3030),(14,'Health Care Equipment & Services',3510),(15,'Pharmaceuticals, Biotechnology & Life Sciences',3520),(16,'Banks',4010),(17,'Diversified Financials',4020),(18,'Insurance',4030),(19,'Real Estate',4040),(20,'Software & Services',4510),(21,'Technology Hardware & Equipment',4520),(22,'Semiconductors & Semiconductor Equipment',4530),(23,'Telecommunication Services',5010),(24,'Utilities',5510);
/*!40000 ALTER TABLE `industry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `region`
--

DROP TABLE IF EXISTS `region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `region` (
  `regionId` int(11) NOT NULL AUTO_INCREMENT,
  `region` varchar(255) NOT NULL,
  PRIMARY KEY (`regionId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `region`
--

LOCK TABLES `region` WRITE;
/*!40000 ALTER TABLE `region` DISABLE KEYS */;
INSERT INTO `region` VALUES (1,'North America'),(2,'Europe'),(3,'Asia'),(4,'Emerging Markets');
/*!40000 ALTER TABLE `region` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sector`
--

DROP TABLE IF EXISTS `sector`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sector` (
  `sectorId` int(11) NOT NULL AUTO_INCREMENT,
  `sector` varchar(255) NOT NULL,
  `sectorCode` int(11) NOT NULL,
  PRIMARY KEY (`sectorId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sector`
--

LOCK TABLES `sector` WRITE;
/*!40000 ALTER TABLE `sector` DISABLE KEYS */;
INSERT INTO `sector` VALUES (1,'Energy',10),(2,'Materials',15),(3,'Industrials',20),(4,'Consumer Discretionary',25),(5,'Consumer Staples',30),(6,'Health Care',35),(7,'Financials',40),(8,'Information Technology',45),(9,'Telecommunication Services',50),(10,'Utilities',55);
/*!40000 ALTER TABLE `sector` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tickermaster`
--

DROP TABLE IF EXISTS `tickermaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tickermaster` (
  `tickerId` int(11) NOT NULL AUTO_INCREMENT,
  `symbol` varchar(10) NOT NULL,
  `companyName` varchar(255) DEFAULT NULL,
  `defaultExchange` int(11) NOT NULL,
  `currency` int(11) NOT NULL,
  `sector` int(11) NOT NULL,
  `industry` int(11) DEFAULT NULL,
  PRIMARY KEY (`tickerId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickermaster`
--

LOCK TABLES `tickermaster` WRITE;
/*!40000 ALTER TABLE `tickermaster` DISABLE KEYS */;
/*!40000 ALTER TABLE `tickermaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'traderPRO'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-03-03 15:31:23
