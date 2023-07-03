# Visual Studio Code mit GitLab verbinden 🦊

### SSH-Schlüssel generieren und in GitLab ablegen

1. Installiere Git auf deinem Rechner. [Git](https://git-scm.com/)
2. Öffne anschließend die *CMD*.
3. **Erstelle einen 2048-bit RSA Schlüssel** um damit eine ssh-Verbindung zum Git-OTH Server aufzubauen.
    1. Befehl (im CMD): `ssh-keygen -t rsa -b 2048 -C "Git-OTH"`
4. Hier kann man sich einfach mit "Enter" durchklicken.
5. Der Schlüssel sollte sich nun z.B. in _C:\User\Name/.ssh_ befinden 
    1. Die Datei kann z.B. _id_ed25519.pub_  heißen.
6. Nun öffne Git Bash
7. gib nun `cat ~/.ssh/id_ed25519.pub | clip` ein um den Schlüssel zu kopieren.
8. Gehe nun auf deinen GitLab Account &#8594; Einstellungen &#8594; SSH Keys.
9. Füge nun dort den Schlüssel ein und klicke unten auf _Add Key_

### Klonen des Repositories

1. Gehe nun auf unsere Repositoy &#8594; klick auf Clone &#8594; Visual Studio Code (SSH)
2. Lege ein Speicherort für das Projekt ab, anschließend wird das Projekt geöffnet.

Fertig 🎉🎉
