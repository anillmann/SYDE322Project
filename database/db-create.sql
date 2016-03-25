create table company (
	companyId integer not null auto_increment, 
    companyName varchar(45) not null, 
    marketCap numeric(15,2) null, 
    industryId integer not null, 
    primary key (companyId)
);

create table tickermaster (
	tickerId integer not null auto_increment, 
    symbol varchar(10) not null, 
    assetClassId integer not null, 
    countryId integer not null, 
    currencyId integer not null, 
    companyId integer not null, 
    primary key (tickerId)
);

create table prices (
	priceId integer not null auto_increment, 
    priceDate timestamp not null default now(), 
    tickerId integer not null, 
    price numeric(15,2) not null, 
    primary key(priceId)
);

create table user (
	userId integer not null auto_increment, 
    userName varchar(45) not null,
    passKey varchar(270), 
    primary key (userId)
);

create table account (
	accountId integer not null auto_increment, 
    userId integer not null,
    primary key (accountId)
);

create table transType (
	transTypeId integer not null auto_increment,
    transType varchar(45) not null, 
    primary key (transTypeId)
);

create table trans (
	transId integer not null auto_increment, 
    transTypeId integer not null, 
    transDate timestamp not null, 
    transPrice numeric(15,2) not null, 
    transAmt integer not null,
    accountId integer not null, 
    tickerId integer not null,
    primary key (transId)
);

create table position (
	positionId integer not null auto_increment, 
    positionDate timestamp not null default now(), 
    position integer not null,
    accountId integer not null, 
    tickerId integer not null, 
    primary key (positionId)
);