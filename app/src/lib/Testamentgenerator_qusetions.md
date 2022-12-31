<!-- use alt + z to deactivate word wrap in vs code editor -->


```mermaid
    flowchart TD;
        %%Template
    %%__0xxxx();
        %%typ 'regular'
        %%frage ''
        %%option0 ''
        %%option1 ''
        %%info ''

    %%Questions
    __00100(verheiratet?) 
        %%typ 'regular'
        %%frage 'Wie ist Ihr Familienstand?'
        %%option0 'Verheiratet'
        %%option1 'Nicht (mehr) verheiratet'
        %%info 'Hier ist Ihr offizieller Familienstand maßgeblich. Das bedeutet, dass selbst wenn Sie in fester Partnerschaft leben, nur eine Ehe oder eingetragene Lebenspartnerschaft für Ihr Testament entscheidend sind. (ninebarc)'

    __00110(gemeinsames T.?)
        %%typ 'regular'
        %%frage 'Wie wollen Sie Ihr Testament erstellen?'
        %%option0 'Mit meinem Ehepartner'
        %%option1 'Alleine'
        %%info 'Wenn Sie verheiratet sind oder in einer eingetragenen Lebenspartnerschaft leben können Sie mit Ihrem Partner ein gemeinschaftliches Testament aufsetzen. Damit bezweckt man vor allem die möglichst umfassende Absicherung des längerlebenden Ehegatten. Dieser wird zunächst Erbe. Die Ehepartner können zudem bestimmen, wer nach dem Tod des längerlebenden Ehepartners ihr Erbe werden soll. Bei einem Einzeltestament hingegen können Sie allein Ihre Erben innerhalb des gesetzlichen Rahmens frei wählen.'

    __00120(Verfügung)
        %%typ 'regular'
        %%frage 'Wie darf der längerlebende Partner über das Erbe verfügen?'
        %%option0 'Mit gewissen Einschränkungen'
        %%option1 'In vollem Umfang'
        %%info 'Wenn der Längerlebende Partner nach dem Tod des Zuerstversterbenden  vollumfänglich über das Vermögen verfügen kann, wird er als Vollerbe bezeichnet.Das gemeindschaftliche Erbe kann mit einigen Einschränkungen einhergehen. So soll verhindert werden, dass der längerlebende Ehepartner das Erbe komplett ausgeben darf, damit der Nachlass beim Tod des Längerlebenden möglichst ungeschmälert an die Nacherben übergeht." (ninebarc)'

    __00130(not available)
        %%typ 'not available'
        %%frage 'Diese Option ist bei Beyond aktuell noch nicht verfügbar.'
        %%option0 ''
        %%option1 ''
        %%info ''

     __00200(Erben definieren)
        %%typ 'Erben'
        %%frage 'Erben definieren'
        %%option0 ''
        %%option1 ''
        %%info ''
        
    __00300(Verteilung)
        %%typ 'verteilung'
        %%frage 'verteilung'
        %%option0 ''
        %%option1 ''
        %%info ''

    __00400(Vermächtnis?)
        %%typ 'regular'
        %%frage 'Möchten Sie persönliche Gegenstände vermachen?'
        %%option0 'Ja'
        %%option1 'Nein'
        %%info 'Das Übertragen persönlicher Gegenstände an Nahestehende oder Organissationen für den Fall des eigenen Ablebens, nennt man auch Vermächtnis. Soll einem Erben einen Wertgegenstand vermacht werden, so kann dieser auf den jeweiligen Erbanteil angerechnet werden, oder aber auch nicht.'

    __00450(Vermächtnis!)
        %%typ 'vermächtnis'
        %%frage 'Vermächtnis!'
        %%option0 ''
        %%option1 ''
        %%info ''

    __00500(Testamentvollstreckung)
        %%typ 'regular'
        %%frage 'Testamentvollstreckung'
        %%option0 'Ja'
        %%option1 'Nein'
        %%info ''

    __00510(Wer vollstreckt)
        %%typ 'regular'
        %%frage 'Wer soll das Testament vollstrecken?'
        %%option0 'Vertrauensperson'
        %%option1 'Nachlassgericht'
        %%info 'Unter Testamentsvollstreckung versteht man die Aufgaben rund um die Verwaltung und Auseinandersetzung des Nachlasses. Das beinhaltet beispielsweise die korrekte Erfüllung von Vermächtnissen und dem Vorbeugen von Konflikten in der ordnungsgemäßen Verteilung der Erbanteile. Eine Testamentsvollstreckung ist nicht immer notwendig, kann aber dabei helfen, die Erben zu entlasten und eine vermittelnde Rolle einzunehmen.'

    __00520(Vertrauensperson hinzufügen) 
        %%typ 'vertrauensperson'
        %%frage 'vertrauensperson'
        %%option0 ''
        %%option1 ''
        %%info ''

    __00600(Schlichtung)
        %%typ 'regular'
        %%frage 'Schlichtung'
        %%option0 'Ja'
        %%option1 'Nein'
        %%info ''

    __00900(abschließende Klauseln)
        %%typ 'abschließendeKlauseln'
        %%frage 'abschließende Klauseln'
        %%option0 ''
        %%option1 ''
        %%info ''
    
    __01000(Ende)
        %%typ 'ende'
        %%frage 'Ende'
        %%option0 ''
        %%option1 ''
        %%info ''

    

    %%Transitions
    __00100--ja-->__00110
    __00100--nein-->__00200
    __00110--gemeinsam-->__00120
    __00110--alleine-->__00200
    __00120-->__00130
    __00200-->__00300
    __00300-->__00400
    __00400--ja-->__00450
    __00400--nein-->__00500
    __00450-->__00500
    __00500--ja-->__00510
    __00500--nein-->__00600
    __00510--Vertrauensperson-->__00520
    __00510--Nachlassgericht-->__00600
    __00520-->__00600
    __00600-->__00900
    __00900-->__01000
    %%End
```