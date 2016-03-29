CREATE DATABASE  IF NOT EXISTS `traderpro` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `traderpro`;
-- MySQL dump 10.13  Distrib 5.6.24, for osx10.8 (x86_64)
--
-- Host: 127.0.0.1    Database: traderpro
-- ------------------------------------------------------
-- Server version	5.5.47-0ubuntu0.14.04.1

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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account` (
  `accountId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `accountName` varchar(45) NOT NULL,
  PRIMARY KEY (`accountId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,1,'001-0101'),(2,1,'001-0202');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assetclass`
--

DROP TABLE IF EXISTS `assetclass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `assetclass` (
  `assetClassId` int(11) NOT NULL AUTO_INCREMENT,
  `assetClass` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`assetClassId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assetclass`
--

LOCK TABLES `assetclass` WRITE;
/*!40000 ALTER TABLE `assetclass` DISABLE KEYS */;
INSERT INTO `assetclass` VALUES (1,'Cash'),(2,'Common Stock');
/*!40000 ALTER TABLE `assetclass` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `calcs`
--

DROP TABLE IF EXISTS `calcs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `calcs` (
  `calcDate` date DEFAULT NULL,
  `accountId` int(11) DEFAULT NULL,
  `bookVal` decimal(15,2) DEFAULT NULL,
  `mtm` decimal(15,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calcs`
--

LOCK TABLES `calcs` WRITE;
/*!40000 ALTER TABLE `calcs` DISABLE KEYS */;
INSERT INTO `calcs` VALUES ('2016-03-24',1,5675.00,5833.50),('2016-03-24',2,9750.00,10217.00),('2016-03-02',2,6213.00,4302.00),('2016-03-07',2,12367.00,9122.00),('2016-03-21',2,15869.00,15105.00),('2016-03-09',1,0.00,0.00),('2016-03-09',2,6119.00,4664.00),('2016-03-10',2,6119.00,4615.00),('2016-03-17',2,5769.00,4567.00);
/*!40000 ALTER TABLE `calcs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `calcsdtl`
--

DROP TABLE IF EXISTS `calcsdtl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `calcsdtl` (
  `calcDate` date DEFAULT NULL,
  `accountId` int(11) DEFAULT NULL,
  `tickerId` int(11) DEFAULT NULL,
  `position` decimal(15,2) DEFAULT NULL,
  `bookVal` decimal(15,2) DEFAULT NULL,
  `mtm` decimal(15,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calcsdtl`
--

LOCK TABLES `calcsdtl` WRITE;
/*!40000 ALTER TABLE `calcsdtl` DISABLE KEYS */;
INSERT INTO `calcsdtl` VALUES ('2016-03-24',1,2,550.00,550.00,550.00),('2016-03-24',1,3,50.00,5125.00,5283.50),('2016-03-24',2,2,-350.00,-350.00,-350.00),('2016-03-24',2,3,100.00,10100.00,10567.00),('2016-03-02',2,2,0.00,0.00,0.00),('2016-03-02',2,3,0.00,0.00,0.00),('2016-03-02',2,6,100.00,6213.00,4302.00),('2016-03-07',2,2,0.00,0.00,0.00),('2016-03-07',2,3,0.00,0.00,0.00),('2016-03-07',2,6,200.00,12367.00,9122.00),('2016-03-21',2,2,-350.00,-350.00,-350.00),('2016-03-21',2,3,100.00,10100.00,10591.00),('2016-03-21',2,6,100.00,6119.00,4864.00),('2016-03-09',1,2,0.00,0.00,0.00),('2016-03-09',1,3,0.00,0.00,0.00),('2016-03-09',2,2,0.00,0.00,0.00),('2016-03-09',2,3,0.00,0.00,0.00),('2016-03-09',2,6,100.00,6119.00,4664.00),('2016-03-10',2,2,0.00,0.00,0.00),('2016-03-10',2,3,0.00,0.00,0.00),('2016-03-10',2,6,100.00,6119.00,4615.00),('2016-03-17',2,2,-350.00,-350.00,-350.00),('2016-03-17',2,3,0.00,0.00,0.00),('2016-03-17',2,6,100.00,6119.00,4917.00);
/*!40000 ALTER TABLE `calcsdtl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company` (
  `companyId` int(11) NOT NULL AUTO_INCREMENT,
  `companyName` varchar(45) NOT NULL,
  `marketCap` decimal(15,2) DEFAULT NULL,
  `industryId` int(11) NOT NULL,
  PRIMARY KEY (`companyId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (2,'Apple Inc.',583.37,21),(4,'Google',510.39,20),(5,'Amazon',280.08,13),(6,'Scotiabank',74.57,16),(10,'Fake Comp',300.00,4),(11,'PepsiCo Foods',154200000000.00,12);
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES (1,'CAN','Canada',1),(2,'USA','United States',1),(3,'GBR','United Kingdom',2);
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
  PRIMARY KEY (`currencyId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `currency`
--

LOCK TABLES `currency` WRITE;
/*!40000 ALTER TABLE `currency` DISABLE KEYS */;
INSERT INTO `currency` VALUES (1,'CAD','Canadian Dollar'),(2,'GBP','British Pound'),(3,'EUR','Euro'),(4,'USD','US Dollar');
/*!40000 ALTER TABLE `currency` ENABLE KEYS */;
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
  `sectorId` int(11) NOT NULL,
  PRIMARY KEY (`industryId`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `industry`
--

LOCK TABLES `industry` WRITE;
/*!40000 ALTER TABLE `industry` DISABLE KEYS */;
INSERT INTO `industry` VALUES (1,'Energy',1010,1),(2,'Materials',1510,2),(3,'Capital Goods',2010,3),(4,'Commercial & Professional Services',2020,3),(5,'Transportation',2030,3),(6,'Automobiles & Components',2510,4),(7,'Consumer Durables & Apparel',2520,4),(8,'Consumer Services',2530,4),(9,'Media',2540,4),(10,'Retailing',2550,4),(11,'Food & Staples Retailing',3010,5),(12,'Food, Beverage & Tobacco',3020,5),(13,'Household & Personal Products',3030,5),(14,'Health Care Equipment & Services',3510,6),(15,'Pharmaceuticals, Biotechnology & Life Sciences',3520,6),(16,'Banks',4010,7),(17,'Diversified Financials',4020,7),(18,'Insurance',4030,7),(19,'Real Estate',4040,7),(20,'Software & Services',4510,8),(21,'Technology Hardware & Equipment',4520,8),(22,'Semiconductors & Semiconductor Equipment',4530,8),(23,'Telecommunication Services',5010,9),(24,'Utilities',5510,10);
/*!40000 ALTER TABLE `industry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `position`
--

DROP TABLE IF EXISTS `position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `position` (
  `positionId` int(11) NOT NULL AUTO_INCREMENT,
  `positionDate` date DEFAULT NULL,
  `position` int(11) NOT NULL,
  `bookVal` decimal(15,2) DEFAULT NULL,
  `accountId` int(11) NOT NULL,
  `tickerId` int(11) NOT NULL,
  PRIMARY KEY (`positionId`)
) ENGINE=InnoDB AUTO_INCREMENT=1422 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `position`
--

LOCK TABLES `position` WRITE;
/*!40000 ALTER TABLE `position` DISABLE KEYS */;
INSERT INTO `position` VALUES (330,'2016-03-23',550,550.00,1,2),(331,'2016-03-23',50,5125.00,1,3),(332,'2016-03-23',-350,-350.00,2,2),(333,'2016-03-23',100,10100.00,2,3),(337,'2016-03-28',550,550.00,1,2),(338,'2016-03-28',50,5125.00,1,3),(339,'2016-03-28',-350,-350.00,2,2),(340,'2016-03-28',100,10100.00,2,3),(540,'2016-03-25',550,550.00,1,2),(541,'2016-03-25',50,5125.00,1,3),(542,'2016-03-25',-350,-350.00,2,2),(543,'2016-03-25',100,10100.00,2,3),(967,'2016-03-24',550,550.00,1,2),(968,'2016-03-24',50,5125.00,1,3),(969,'2016-03-24',-350,-350.00,2,2),(970,'2016-03-24',100,10100.00,2,3),(1254,'2016-03-05',0,0.00,1,2),(1255,'2016-03-05',0,0.00,1,3),(1256,'2016-03-05',0,0.00,2,2),(1257,'2016-03-05',0,0.00,2,3),(1258,'2016-03-05',200,12367.00,2,6),(1261,'2016-03-02',0,0.00,1,2),(1262,'2016-03-02',0,0.00,1,3),(1263,'2016-03-02',0,0.00,2,2),(1264,'2016-03-02',0,0.00,2,3),(1265,'2016-03-02',100,6213.00,2,6),(1268,'2016-03-07',0,0.00,1,2),(1269,'2016-03-07',0,0.00,1,3),(1270,'2016-03-07',0,0.00,2,2),(1271,'2016-03-07',0,0.00,2,3),(1272,'2016-03-07',200,12367.00,2,6),(1324,'2016-03-21',100,100.00,1,2),(1325,'2016-03-21',50,5125.00,1,3),(1326,'2016-03-21',-350,-350.00,2,2),(1327,'2016-03-21',100,10100.00,2,3),(1328,'2016-03-21',100,6119.00,2,6),(1366,'2016-03-20',100,100.00,1,2),(1367,'2016-03-20',50,5125.00,1,3),(1368,'2016-03-20',-350,-350.00,2,2),(1369,'2016-03-20',100,10100.00,2,3),(1370,'2016-03-20',100,6119.00,2,6),(1387,'2016-03-10',0,0.00,1,2),(1388,'2016-03-10',0,0.00,1,3),(1389,'2016-03-10',0,0.00,2,2),(1390,'2016-03-10',0,0.00,2,3),(1391,'2016-03-10',100,6119.00,2,6),(1408,'2016-03-17',100,100.00,1,2),(1409,'2016-03-17',50,5125.00,1,3),(1410,'2016-03-17',-350,-350.00,2,2),(1411,'2016-03-17',0,0.00,2,3),(1412,'2016-03-17',100,6119.00,2,6),(1415,'2016-03-09',200,198.00,1,2),(1416,'2016-03-09',50,5126.00,1,3),(1417,'2016-03-09',-3,-375.00,1,10),(1418,'2016-03-09',0,0.00,2,2),(1419,'2016-03-09',0,0.00,2,3),(1420,'2016-03-09',100,6119.00,2,6),(1421,'2016-03-09',-20,-2800.00,2,7);
/*!40000 ALTER TABLE `position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prices`
--

DROP TABLE IF EXISTS `prices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prices` (
  `priceId` int(11) NOT NULL AUTO_INCREMENT,
  `priceDate` date DEFAULT NULL,
  `tickerId` int(11) NOT NULL,
  `price` decimal(15,2) NOT NULL,
  PRIMARY KEY (`priceId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prices`
--

LOCK TABLES `prices` WRITE;
/*!40000 ALTER TABLE `prices` DISABLE KEYS */;
INSERT INTO `prices` VALUES (1,'2016-03-01',3,112.50),(2,'2016-03-05',3,111.56),(3,'2016-03-25',3,113.24),(4,'2016-03-21',3,115.43),(8,'2016-03-01',5,56.34),(9,'2016-03-24',5,54.23);
/*!40000 ALTER TABLE `prices` ENABLE KEYS */;
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
  `assetClassId` int(11) NOT NULL,
  `countryId` int(11) NOT NULL,
  `currencyId` int(11) NOT NULL,
  `companyId` int(11) DEFAULT NULL,
  PRIMARY KEY (`tickerId`),
  UNIQUE KEY `symbol` (`symbol`,`countryId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickermaster`
--

LOCK TABLES `tickermaster` WRITE;
/*!40000 ALTER TABLE `tickermaster` DISABLE KEYS */;
INSERT INTO `tickermaster` VALUES (2,'CAD',1,1,1,NULL),(3,'AAPL',2,2,4,2),(6,'BNS',2,1,1,6),(7,'GOOG',2,2,4,4),(8,'AMZN',2,2,4,5),(9,'PEP',2,2,4,11),(10,'LALALALALA',2,1,1,2);
/*!40000 ALTER TABLE `tickermaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trans`
--

DROP TABLE IF EXISTS `trans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trans` (
  `transId` int(11) NOT NULL AUTO_INCREMENT,
  `transTypeId` int(11) NOT NULL,
  `transDate` date DEFAULT NULL,
  `transPrice` decimal(15,2) NOT NULL,
  `transAmt` decimal(15,2) NOT NULL,
  `accountId` int(11) NOT NULL,
  `tickerId` int(11) NOT NULL,
  PRIMARY KEY (`transId`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trans`
--

LOCK TABLES `trans` WRITE;
/*!40000 ALTER TABLE `trans` DISABLE KEYS */;
INSERT INTO `trans` VALUES (3,3,'2016-03-16',1.00,100.00,1,2),(4,4,'2016-03-15',1.00,50.00,2,2),(5,1,'2016-03-19',101.00,100.00,2,3),(6,3,'2016-03-29',1.00,50.00,1,2),(7,4,'2016-03-22',1.00,50.00,1,2),(8,3,'2016-03-22',1.00,100.00,1,2),(9,4,'2016-03-15',1.00,300.00,2,2),(11,1,'0000-00-00',102.52,50.00,1,3),(13,1,'0000-00-00',0.99,200.00,1,2),(14,3,'2016-03-01',62.13,100.00,2,6),(15,3,'2016-03-05',61.54,100.00,2,6),(16,4,'2016-03-08',62.48,100.00,2,6),(17,2,'2016-03-01',125.00,3.00,1,10),(18,2,'2016-03-09',140.00,20.00,2,7),(19,1,'2016-03-25',190.00,4000.00,1,10);
/*!40000 ALTER TABLE `trans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transtype`
--

DROP TABLE IF EXISTS `transtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transtype` (
  `transTypeId` int(11) NOT NULL AUTO_INCREMENT,
  `transType` varchar(45) NOT NULL,
  PRIMARY KEY (`transTypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transtype`
--

LOCK TABLES `transtype` WRITE;
/*!40000 ALTER TABLE `transtype` DISABLE KEYS */;
INSERT INTO `transtype` VALUES (1,'BUY'),(2,'SELL'),(3,'CONTRIBUTE'),(4,'WITHDRAW');
/*!40000 ALTER TABLE `transtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(45) NOT NULL,
  `passKey` varchar(270) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'test1','test'),(2,'test2','test'),(5,'gogo','gogo'),(6,'testertest','test'),(7,'test8','test'),(8,'jokipakka','jokesmaster'),(9,'fsdfsd','fsdfsdf'),(10,'foo','bar'),(11,'test3','pbkdf2$10000$91672e091da9dd4c377efbc626047a6f7d0914a20c1d45f06ec9f9d06ff28ec0f68c7750b10e9384a8b1caa5953f4d70b2e8021ce27ed99b6df1ce8708b3c7c1$bbec584ba42139cea8f9546b147d10b360c97a87c24047210af04c3790a13b15f5af83a04a581f5b4e430add3ec7b15d75c63b84299c7a78f22f694f2f85aef6'),(12,'test6','pbkdf2$10000$14995b576d19939640a0ac0047343bf360a9a69ee040a94207ae34b4541c5ea4c564b8409f6ba034b5ada6e79514a4693d09c30fb5546c2757f91438d9dfed12$d30d182f47e19e6b8e1bce04fcfb0f1f633b9aebdc2d87d9e18b492a053c54b6c7fd2bb67a5ac37d713c4a43adda706af0998d8f703c7a22eea585796c92df0f'),(13,'test9','pbkdf2$10000$bb24ecfb1fb1e08f56da34e8bbbd4029af378ab961852ca32b2879362f1966ea6dc41f2c93f55b6445f702e0f258579c18c05d8d0f1f6207da99d5f76c46b349$5883f95c741a533ae6ef3a18eb1de2af0e67b353c4f1ca3e3186a2ac8e54f20bb49b843ec16c658e45f353f6a5cbd601ff38728ee92cab12b8d8e4f48fb885bc'),(14,'test69','pbkdf2$10000$6b37d2ed1635d53cb7b53d6ff2d9cefce1094a555d4173974e1d93d56485eadbd8e06ab36a8de026219c9a8ddc2557e7c14d9a93b580ea45ee321da9d008d7b6$6160f3ef22f238a9f176b8e9bc5438ee34c3b617b70a2079d4c7bebdef32c0b73f174d105d07cc24d6b85fffc94910919eff7b326c860207c86d19c22386d8e1'),(15,'joe','pbkdf2$10000$fc53bc8725299c1536f55a30b4fe9a5c531dfc8e5c754a2386432dbf78073927e03f838a72b93280625c01670f293f86f82fe176e304a6f12f558110eb02f789$67c7644e1c86dc73a8237606e589f493c339acd1d41efa0472cc1e0287083ab9f8e714613f0548470a2c25fc0b3fdeee5cf51fecd28a4b00788ac12afc1b7aec'),(16,'j','pbkdf2$10000$8e992c4ca8c9eb0fbc88cc4a9176771eedc7263c8887dfa8630e4b52d8d18cba159f0a9f5826e9891bd2915a20690fbc31f2d3f38c72157ed2e425fef4bbdc66$a9dc1c87333231d46d0c0a69084884328a853dab3d1d6c29200094dce2261e379738f387a30dca1e913d0ce3c59990d7d7010dd8302a0cbf1da9f3e4a3877016'),(17,'Q','pbkdf2$10000$2ae5259e70cfa3831213b98416eb0b1f862ab82f4c016a89dca2fb09d066b21d646ca5131c70fdce5d5ca49b11926f2480e61080ab82c18805de36975fa7df3c$e9ce7cc8a3c25256f7ffb4b05b87366178eddc5631542c59d5203fcfadc6ea50d7c83f6ce87eb810d313841055f932580fae82490ed60bf7695a08b9c734c51d');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `v_positions`
--

DROP TABLE IF EXISTS `v_positions`;
/*!50001 DROP VIEW IF EXISTS `v_positions`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_positions` AS SELECT 
 1 AS `accountId`,
 1 AS `assetClassId`,
 1 AS `tickerId`,
 1 AS `symbol`,
 1 AS `positionDate`,
 1 AS `position`,
 1 AS `bookVal`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_tickers`
--

DROP TABLE IF EXISTS `v_tickers`;
/*!50001 DROP VIEW IF EXISTS `v_tickers`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_tickers` AS SELECT 
 1 AS `tickerId`,
 1 AS `symbol`,
 1 AS `assetClassId`,
 1 AS `assetClass`,
 1 AS `countryId`,
 1 AS `countryCode`,
 1 AS `country`,
 1 AS `currencyId`,
 1 AS `currencyCode`,
 1 AS `companyId`,
 1 AS `companyName`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_transtypes`
--

DROP TABLE IF EXISTS `v_transtypes`;
/*!50001 DROP VIEW IF EXISTS `v_transtypes`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_transtypes` AS SELECT 
 1 AS `assetClassId`,
 1 AS `assetClass`,
 1 AS `transTypeId`,
 1 AS `transType`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `validtranstype`
--

DROP TABLE IF EXISTS `validtranstype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `validtranstype` (
  `assetClassId` int(11) NOT NULL,
  `transTypeId` int(11) NOT NULL,
  UNIQUE KEY `assetClassId` (`assetClassId`,`transTypeId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `validtranstype`
--

LOCK TABLES `validtranstype` WRITE;
/*!40000 ALTER TABLE `validtranstype` DISABLE KEYS */;
INSERT INTO `validtranstype` VALUES (1,3),(1,4),(2,1),(2,2);
/*!40000 ALTER TABLE `validtranstype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'traderpro'
--

--
-- Dumping routines for database 'traderpro'
--
/*!50003 DROP PROCEDURE IF EXISTS `add_company` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_company`(
	in vCompanyName varchar(45), 
    in vMarketCap decimal(15,2), 
    in vIndustryId int(11),
    out vSuccess integer 
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
        SELECT -1 into vSuccess;
    
    start transaction;
    
    select count(*) into @exist from company
    where companyName=vCompanyName;
    
    if @exist = 0 then
		insert into company (companyName, marketCap, industryId)
        values (vCompanyName, vMarketCap, vIndustryId);
		select 0 into vSuccess;
	else 
		select -2 into vSuccess;
	end if;
    
    if vSuccess >= 0 then 
		commit;
	else 
		rollback;
	end if;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_ticker` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_ticker`(
	in vSymbol varchar(45), 
    in vAssetClassId integer, 
    in vCountryId integer,
    in vCurrencyId integer, 
	in vCompanyId integer,
    out vSuccess integer 
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
        SELECT -1 into vSuccess;
    
    start transaction;
    
    select count(*) into @exist from tickermaster
    where symbol=vSymbol;
    
    if @exist = 0 then
		insert into tickermaster (symbol, assetClassId, countryId, currencyId, companyId)
        values (vSymbol, vAssetClassId, vCountryId, vCurrencyId, vCompanyId);
		select 0 into vSuccess;
	else 
		select -2 into vSuccess;
	end if;
    
    if vSuccess >= 0 then 
		commit;
	else 
		rollback;
	end if;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `calc_Positions` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `calc_Positions`(
	in vCalcDate date, 
    out vSuccess integer
)
BEGIN

    
		delete from position where positionDate=vCalcDate;
    
    	insert into position (accountId, tickerId,positionDate,position,bookVal)
		(
			select t.accountId, t.tickerId, vCalcDate as 'positionDate',
				ifnull(p.posAmt,0)+ifnull(n.negAmt,0) as 'position', ifnull(p.posBV,0)+ifnull(n.negBV,0) as 'bookVal'
			from trans t
			left join (
				select accountId, tickerId, sum(transAmt) as 'posAmt', sum(transAmt*transPrice) as 'posBV'
				from trans
				where transTypeId in (1,3) and transDate<=vCalcDate
				group by accountId, tickerId
			) p on t.accountId=p.accountId and t.tickerId=p.tickerId
			left join (
				select accountId, tickerId, sum(transAmt)*-1 as 'negAmt', sum(transAmt*transPrice)*-1 as 'negBV'
				from trans
				where transTypeId in (2,4) and transDate<=vCalcDate
				group by accountId, tickerId
			) n on t.accountId=n.accountId and t.tickerId=n.tickerId
			group by accountId, tickerId
		);

	select 0 into vSuccess;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_user`(
	in vUserName varchar(45), 
    in vPassKey varchar(270),
    out vSuccess integer, 
    out vUserId integer
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
        SELECT -1 into vSuccess;
    
    start transaction;	

	select count(*) into @exist from user
    where userName=vUserName;
    
    if @exist > 0 then 
		select -2 into vSuccess;
    else
		insert into user (userName, passKey)
        values (vUserName, vPassKey);
        select last_insert_id() into vUserId;
        select 0 into vSuccess;
    end if;

	if vSuccess >= 0 then 
		commit;
	else 
		rollback;
	end if;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `select_recentTrans` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `select_recentTrans`(
    in vUserId integer,
    out vSuccess integer 
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    
    start transaction;
    
SELECT trans.transId, transtype.transType,trans.transDate, trans.transPrice, trans.transAmt, account.accountName, tickermaster.symbol
FROM trans INNER JOIN transtype ON
	trans.transTypeId = transtype.transTypeId 
    INNER JOIN account ON
    trans.accountId = account.accountId
    INNER JOIN tickermaster ON
    trans.tickerId = tickermaster.tickerId

ORDER BY transId DESC;
    
	select 0 into vSuccess;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_company` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_company`(
	in vCompanyId integer, 
    in vCompanyName varchar(45), 
    in vMarketCap decimal(15,2),
    in vIndustryId integer,
    out vSuccess integer 
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
        SELECT -1 into vSuccess;
    
    start transaction;
    
    select count(*) into @exist from company
    where companyId = vCompanyId;
    
    if @exist > 0 then
		UPDATE company
		SET companyName=vCompanyName, marketCap = vMarketCap, industryId = vIndustryId 
		WHERE companyId=vCompanyId;
		select 0 into vSuccess;
	else 
		select -3 into vSuccess;
	end if;
    
    if vSuccess >= 0 then 
		commit;
	else 
		rollback;
	end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_ticker` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_ticker`(
	in vTickerId integer,
    in vSymbol varchar(45), 
    in vAssetClassId integer, 
    in vCountryId integer,
    in vCurrencyId integer, 
	in vCompanyId integer,
    out vSuccess integer 
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
        SELECT -1 into vSuccess;
    
    start transaction;
    
    select count(*) into @exist from tickermaster
    where tickerId = vTickerId;
    
    if @exist > 0 then
		UPDATE tickermaster
		SET symbol=vSymbol, assetClassId = vAssetClassId, countryId = vCountryId, currencyId = vCurrencyId, companyId = vCompanyId
		WHERE tickerId = vTickerId;
		select 0 into vSuccess;
	else 
		select -3 into vSuccess;
	end if;
    
    if vSuccess >= 0 then 
		commit;
	else 
		rollback;
	end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_trans` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_trans`(
	in vTransId integer,
    in vTransTypeId integer, 
    in vTransDate date, 
    in vTransPrice decimal(15,2),
    in vTransAmt decimal(15,2), 
	in vTickerId integer,
    out vSuccess integer 
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
        SELECT -1 into vSuccess;
    
    start transaction;
    
    select count(*) into @exist from trans
    where transId = vTransId;
    
    if @exist > 0 then
		UPDATE trans
		SET transTypeId=vTransTypeId, transDate = vTransDate, transPrice = vTransPrice, transAmt = vTransAmt, tickerId = vTickerId
		WHERE transId = vTransId;
		select 0 into vSuccess;
	else 
		select -3 into vSuccess;
	end if;
    
    if vSuccess >= 0 then 
		commit;
	else 
		rollback;
	end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `validate_login` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `validate_login`(
	in vUserName varchar(45), 
    out vSuccess integer, 
    out vPass varchar(270),
    out vUserId integer
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
        SELECT -1 into vSuccess;
    
    start transaction;
    
    select count(*) into @exist from user
    where userName=vUserName;
    
    if @exist > 0 then
		select userId,passKey into vUserId,vPass from user
        where userName=vUserName;
		select 0 into vSuccess;
	else 
		select -3 into vSuccess;
	end if;
    
    /*
		Error Codes:
			-1 - Unexpected Error
            -2 - invalid combination
    */
    
    if vSuccess >= 0 then 
		commit;
	else 
		rollback;
	end if;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `v_positions`
--

/*!50001 DROP VIEW IF EXISTS `v_positions`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_positions` AS select `p`.`accountId` AS `accountId`,`t`.`assetClassId` AS `assetClassId`,`p`.`tickerId` AS `tickerId`,`t`.`symbol` AS `symbol`,`p`.`positionDate` AS `positionDate`,`p`.`position` AS `position`,`p`.`bookVal` AS `bookVal` from (`position` `p` left join `tickermaster` `t` on((`p`.`tickerId` = `t`.`tickerId`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_tickers`
--

/*!50001 DROP VIEW IF EXISTS `v_tickers`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_tickers` AS select `t`.`tickerId` AS `tickerId`,`t`.`symbol` AS `symbol`,`t`.`assetClassId` AS `assetClassId`,`a`.`assetClass` AS `assetClass`,`t`.`countryId` AS `countryId`,`c`.`countryCode` AS `countryCode`,`c`.`country` AS `country`,`t`.`currencyId` AS `currencyId`,`cur`.`currencyCode` AS `currencyCode`,`t`.`companyId` AS `companyId`,`com`.`companyName` AS `companyName` from ((((`tickermaster` `t` left join `assetclass` `a` on((`t`.`assetClassId` = `a`.`assetClassId`))) left join `country` `c` on((`t`.`countryId` = `c`.`countryId`))) left join `currency` `cur` on((`t`.`currencyId` = `cur`.`currencyId`))) left join `company` `com` on((`t`.`companyId` = `com`.`companyId`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_transtypes`
--

/*!50001 DROP VIEW IF EXISTS `v_transtypes`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_transtypes` AS select `v`.`assetClassId` AS `assetClassId`,`a`.`assetClass` AS `assetClass`,`v`.`transTypeId` AS `transTypeId`,`t`.`transType` AS `transType` from ((`validtranstype` `v` left join `transtype` `t` on((`v`.`transTypeId` = `t`.`transTypeId`))) left join `assetclass` `a` on((`v`.`assetClassId` = `a`.`assetClassId`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-03-28 23:28:56
