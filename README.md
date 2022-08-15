[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=8197476&assignment_repo_type=AssignmentRepo)
# Introduction

Voor deze tweede examenkans maken jullie een werkstuk rond een API die de metingen van een citizen science project weergeven. 

Je kan de opdracht en je start repository op deze URL (https://classroom.github.com/a/mzzcSrFe) (Koppelingen naar een externe site.)

## Features

* haal de metingen op van de endpoint (https://thecrew.cc/herexamen/measurements.json)
* Zorg dat deze in een klasse worden opgeslagen (met volgende properties)
  * value 
  * unit
  * timestamp
* Implementeer de volgende functies in de klasse
  * get unit (geeft de unit terug)
  * get value (geeft de waarde van de meting weer)
  * get time (geeft de tijd terug, converteerd de timestamp naar een tijdsstring via `.toLocaleString("nl-BE")`)
  * get date (geeft de date terug, converteerd de timestamp naar een datumstring via `.toLocaleDateString("nl-BE")`)
  * get htmlString (geeft de html string terug)
* Geef de waarden weer in de tabel
* Geef de geselecteerde waarde weer in de grafiek
* Zorg dat de dropdown de metingen weergeeft die overeenkomen met de geselecteerde unit
* zorg dat een aanpassing van de dropdown de grafiek opnieuw aanmaakt, alsook de tabel

## Mogelijke errors
Indien je een error krijgt, probeer dan eerst de volledige error uit te lezen. Console.log is je vriend om te controleren of een array effectief iets bevat, om te checken of een functie uitgevoerd wordt, etc.

## Indienen
Indienen doe je via GIT en canvas. Zorg er echter voor dat je repository op publiek staat, en dien de URL van je repository in via canvas, op deze opdracht.