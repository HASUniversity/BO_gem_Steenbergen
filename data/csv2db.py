# Import external modules
import os       # Operating system interface
import psycopg2 # PostgreSQL interface

#Print working directory
wd = os.getcwd()

# Navigate to directory and list content
os.chdir('data')

# Inladen CSV bestand
csv_file = open('pilotgebied.csv','r')

# Openen database 
conn = psycopg2.connect("host=localhost dbname=BO_Steenbergen user=postgres password=postgres port=5432")
cur = conn.cursor()

# Ophalen rijen
lines = csv_file.readlines()
# print (lines)

# Verwerk lijn voor lijn
line_nr = 0
line_inserted = 0
for line in lines :
    #print(line)
    if line_nr > 0 :

        # Selecteer kolommen
        kolom_waardes = line.split(';')
        #print(kolom_waardes)

        # Ophalen waardes uit line
        wkt = kolom_waardes[0].rstrip()
        nummer = kolom_waardes[1]

        # printen
        print(wkt)
        print(nummer)

         # Opslaan in database
         # execute the INSERT statement
        sql_insert = 'insert into pilotgebiedtwee(wkt, nummer) values (%s, %s)'
        cur.execute(sql_insert, (wkt, nummer))
        
        line_inserted = line_inserted + 1

#     # Volgende rij
    line_nr = line_nr + 1

#Commit
conn.commit()