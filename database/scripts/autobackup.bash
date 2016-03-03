echo "creating backup of current dump ..."
fname=sqlbak-`date +%Y%m%d-%H%M%S`.sql
mysqldump -u root -p --add-drop-database --routines --databases traderPRO > ../$fname 
cp ../$fname ../currentdb.sql
