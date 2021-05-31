# Import external modules
import os       # Operating system interface
import psycopg2 # PostgreSQL interface

#Print working directory
wd = os.getcwd()

# Navigate to directory and list content
os.chdir('data')

# Inladen CSV bestand
csv_file = open('grondsoorten.csv','r')

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
        wkt = kolom_waardes[0].rstrip("'")
        objectid = kolom_waardes[1]
        area = kolom_waardes[2]
        perimeter = kolom_waardes[3]
        grondsrt_2 = kolom_waardes[4]
        grondsrt_3 = kolom_waardes[5]
        gronds = kolom_waardes[6]
        omschrijvi = kolom_waardes[7]
        shape_area = kolom_waardes[8]
        shape_len = kolom_waardes[9]

        # printen
        print(wkt)
        print(objectid)
        print(area)
        print(perimeter)
        print(grondsrt_2)
        print(grondsrt_3)
        print(gronds)
        print(omschrijvi)
        print(shape_area)
        print(shape_len)

         # Opslaan in database
         # execute the INSERT statement
        sql_insert = 'insert into grondsoorten(wkt, objectid, area, perimeter, grondsrt_2, grondsrt_3, gronds, omschrijvi, shape_area, shape_len) values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'
        cur.execute(sql_insert, (wkt, objectid, area, perimeter, grondsrt_2, grondsrt_3, gronds, omschrijvi, shape_area, shape_len))
        
        line_inserted = line_inserted + 1

#     # Volgende rij
    line_nr = line_nr + 1

#Commit
conn.commit()