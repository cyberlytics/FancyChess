Beim erstmaligen Senden (nachdem das Board angefordert worden ist), muss in der URL id=1 mitgesendet werden.
Erst dann wird der Datenbankeintrag erstellt.
<br>
Beispiel: http://localhost:3000/api/game/receive?id=1 <br>
Die Daten werden im Body übertragen: <br>
Es werden folgende Parameter erwartet:<br>

| Key | Value |
| ---  |---------|
| ID | 000000  |
| von  |b2|
| nach | b3  |

Die "Values" sind nur Platzhalter.
