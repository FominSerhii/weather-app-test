## Weather app - variant na doma

Aplikacia momentalne podla zadaneho retazca vyhlada a zobrazi aktualne pocasie v meste.
Vyuziva pri tom open api "openweathermap".

Je vsak mozne vyhladat len jedno mesto naraz.
Rozsirime aplikaciu tak, ze bude mozne zadat viacej miest oddelenych ciarkou.
Pre zobrazenie pocasia pre mesto doimplementujte pripraveny konponent.

V aktualnej implementacii konponent Weather drzi data volanim useState (React-hook). Kedze funkcionalny
React komponent by v idealnom pripade mal byt "pure" funkciou. Momentalne drzi stav a obsahuje volanie sluzby.
Pridajte do projektu Redux a extrahujte co najviac funkcionality z komponentov.

-----

## Weather app - home variant

The application currently searches and displays the current weather in the city based on the provided string.
It utilizes the open API "openweathermap" for this.

However, only one city can be searched at a time.
We will expand the application so that it will be possible to enter multiple cities separated by commas.
To display the weather for a city, implement the prepared component.

In the current implementation, the Weather component holds data by calling useState (React-hook).
Ideally, a functional React component should be a "pure" function. Right now, it holds state andcontains a service call.
Add Redux to the project and extract as much functionality as possible from components.
