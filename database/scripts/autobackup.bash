echo "creating backup of current dump ..."
mysqldump -u root -p --verbose --add-drop-database --add-drop-table --add-drop-trigger --routines --triggers --databases traderPRO > ../currentdb.sql