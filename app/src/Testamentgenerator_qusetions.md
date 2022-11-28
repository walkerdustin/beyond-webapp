<!-- use alt + z to deactivate word wrap in vs code editor -->
```mermaid
    flowchart TD;

    00100(verheiratet?); 
        %%frage "Wie ist Ihr Familienstand?"
        %%option0 "Verheiratet"
        %%option1 "Nicht (mehr) verheiratet"
        %%mehr_info "Hier ist Ihr offizieller Familienstand maßgeblich. Das bedeutet, dass selbst wenn Sie in fester Partnerschaft leben, nur eine Ehe oder eingetragene Lebenspartnerschaft für Ihr Testament entscheidend sind. (ninebarc)"

    00110(gemeinsames T.?);

    00200(Erben definieren);

    00120(Verfügung);

    00130(not available);

    00300(Verteilung);

    00400(Vermächtnis);

    00500(Testamentvollstreckung)

    00510(Wer vollstreckt)

    00600(Schlichtung)
    01000(Testament Fertig)

    00100-- ja -->00110;
    00100-- nein -->00200;
    00110--gemeinsam -->00120;
    00110--alleine -->00200;
    00120-->00130;
    00200-->00300;
    00300-->00400;
    00400-->00500;
    00500--ja-->00510;
    00500--nein-->00600;
    00510-->00600;
    00600-->01000

```