# Einen Login mit AWS Cognito und Auth.js erstellen

### Schritt 1: AWS Cognito Benutzerpool erstellen

Zuerst erstellen wir einen Benutzerpool.

![User Pool](aws_cognito_img/User pools.png)

*Die Benutzeroberfäche kann leicht unerschiedlich aussehen, sofern noch kein anderer Benutzerpool erstellt worden ist.*

Hier können wir auch auswählen, ob wir uns auch durch drittanbieter einloggen wollen.
Da wir das aber nicht wollen benutzen wir den "Cognito user pool".

Die Anmeldeoption kann man beliebig festlegen. Hier wählen wir als Demo nur "Email".

![Sign in](aws_cognito_img/sign_in.png)

Anschließend gehen wir einen Schritt weiter.

Nun können wir die Sicherheitseinstellungen vornehmen.

Hier belassen wir es bei den "Cognito defaults". (Kann aber auch nach Belieben abgeändert werden.)

![Password policy](aws_cognito_img/password_policy.png)

Im Bereich __Multi-factor authentication__ sollte bei privaten Projekten immer MFA eingestalten werden.
Da wir hier aber nur ein Demoprojekt machen werden wir dies auf Optional setzen und setzen einen Haken bei "Authenticato Apps".

*ACHTUNG:* SMS erzeugt kosten!

![Multi-factor Authentication](aws_cognito_img/MFA.png)

Im letzen Abschnitt dieses Schrittes belassen wir alles auf den Standardeinstellungen.

![Self recovery](aws_cognito_img/recovery.png)

<u>Einstellungen für den E-Mail versand vornehmen:</u>

Wähle hier "Send email with Cognito" aus.

*ACHTUNG:* Amazon SES erzeugt kosten! \
(*Beachte die SES Region!*)

![Email delivery](aws_cognito_img/message_delivery.png)


<u>Kapitel: *Integrate your app*</u>

Hier legen wir den Namen unseres Benutzerpools fest und wählen auch, ob wir die gehostete Login-/Registrierungsseite von Cognito benutzen wollen.

Legen Sie Ihren Namen fest und setzten Sie einen Haken bei "Use the Cognito Hosted UI".

![Email delivery](aws_cognito_img/app_integration_part1.png)  

Nun werden wir auch aufgefordert eine Subdomain anzugeben.
Hier werde ich die Subdomain genauso nennen wir meinen Pool. Dies ist aber nicht notwendig.\
*Es ist auch möglich eine eigene Domain zu verwenden, jedoch muss dafür ein DNS Record geschrieben werden und die benötigten Zertifikate von AWS Certificate Manager besorgt werden.*
              
![Email delivery](aws_cognito_img/app_integration_part2.png)          

Nun erstellen wir uns einen App-Client. Dies ist __zwingend__ notwendig. Denn dieser ist sozusagen für das Login-/Registrierungspanel verantwortlich.
(Man kann diesen aber auch im Nachhinein erstellen ;) )

Nun wollen wir, das unser Client auch ein Secret besitzt, damit wir später die API mit Auth.js ansprechen können.

Wähle also "Generate a client secret" aus!

Anschließend soll man eine Callback URL festlegen. Dort werden wir weitergeleitet, nachdem wir uns erfolgreich eingeloggt haben.
Da aber zu diesem Zeitpunkt der Entpunkt wahrscheinlich noch nicht besteht, tragen wir hier "myapp://." ein.  \
*Dies muss später - sobald die Main-Page besteht - nachgetragen werden.*

![Email delivery](aws_cognito_img/app_integration_part3.png)          

Im letzten Schritt bekommen wir noch einen Überblick über all unsere Einstellungen.
Nachdem wir dies alles überprüft haben erstellen wir unseren User Pool mit "Create user pool".

__*Fertig*__

### Schritt 2: AuthJS mit Cognito verbinden
                                                  
//TODO