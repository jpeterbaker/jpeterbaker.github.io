/*
Jonathan Baker made this.
Yes, this is the best I can do, thank you very much.
*/

document.write("\
<head>\
<meta charset=\"UTF-8\">\
</head> \
\
\
<title>\
" + TITLE + "\
</title>\
\
<table border=\"1\" style=\"height:100% ; width:100% ; font-size:20\">\
    <tr>\
    <td colspan=\"5\" height=\"10%\" align=\"center\" onclick=\"setup()\" >\
    <h3>" + BOARDTOP + "</h3>\
    Click here or refresh for new board\
    </td></tr>\
    <tr>\
    <td onclick=\"boxtap('B0');\"\
        height=\"18%\"\
        width=\"20%\"\
        id=\"B0\"\
        align=\"center\"\
        onMouseOver=\"hilite('B0')\"\
        onMouseOut=\"nohilite('B0')\">\
        B0</td>\
    <td onclick=\"boxtap('I0');\"\
        height=\"18%\"\
        width=\"20%\"\
        id=\"I0\"\
        align=\"center\"\
        onMouseOver=\"hilite('I0')\"\
        onMouseOut=\"nohilite('I0')\">\
        I0</td>\
    <td onclick=\"boxtap('N0');\"\
        height=\"18%\"\
        width=\"20%\"\
        id=\"N0\"\
        align=\"center\"\
        onMouseOver=\"hilite('N0')\"\
        onMouseOut=\"nohilite('N0')\">\
        N0</td>\
    <td onclick=\"boxtap('G0');\"\
        height=\"18%\"\
        width=\"20%\"\
        id=\"G0\"\
        align=\"center\"\
        onMouseOver=\"hilite('G0')\"\
        onMouseOut=\"nohilite('G0')\">\
        G0</td>\
    <td onclick=\"boxtap('O0');\"\
        height=\"18%\"\
        width=\"20%\"\
        id=\"O0\"\
        align=\"center\"\
        onMouseOver=\"hilite('O0')\"\
        onMouseOut=\"nohilite('O0')\">\
        O0</td>\
    </tr>\
    <tr>\
    <td onclick=\"boxtap('B1');\"\
        height=\"18%\"\
        width=\"20%\"\
        id=\"B1\"\
        align=\"center\"\
        onMouseOver=\"hilite('B1')\"\
        onMouseOut=\"nohilite('B1')\">\
        B1</td>\
    <td onclick=\"boxtap('I1');\"\
        height=\"18%\"\
        width=\"20%\"\
        id=\"I1\"\
        align=\"center\"\
        onMouseOver=\"hilite('I1')\"\
        onMouseOut=\"nohilite('I1')\">\
        I1</td>\
    <td onclick=\"boxtap('N1');\"\
        height=\"18%\"\
        width=\"20%\"\
        id=\"N1\"\
        align=\"center\"\
        onMouseOver=\"hilite('N1')\"\
        onMouseOut=\"nohilite('N1')\">\
        N1</td>\
    <td onclick=\"boxtap('G1');\"\
        height=\"18%\"\
        width=\"20%\"\
        id=\"G1\"\
        align=\"center\"\
        onMouseOver=\"hilite('G1')\"\
        onMouseOut=\"nohilite('G1')\">\
        G1</td>\
    <td onclick=\"boxtap('O1');\"\
        height=\"18%\"\
        width=\"20%\"\
        id=\"O1\"\
        align=\"center\"\
        onMouseOver=\"hilite('O1')\"\
        onMouseOut=\"nohilite('O1')\">\
        O1</td>\
    </tr>\
    <tr>\
    <td onclick=\"boxtap('B2');\"\
        height=\"18%\"\
        width=\"20%\"\
        id=\"B2\"\
        align=\"center\"\
        onMouseOver=\"hilite('B2')\"\
        onMouseOut=\"nohilite('B2')\">\
        B2</td>\
    <td onclick=\"boxtap('I2');\"\
        height=\"18%\"\
        width=\"20%\"\
        id=\"I2\"\
        align=\"center\"\
        onMouseOver=\"hilite('I2')\"\
        onMouseOut=\"nohilite('I2')\">\
        I2</td>\
    <td onclick=\"boxtap('N2');\"\
        height=\"18%\"\
        width=\"20%\"\
        id=\"N2\"\
        align=\"center\"\
        onMouseOver=\"hilite('N2')\"\
        onMouseOut=\"nohilite('N2')\">\
        " + FREE + "</td>\
    <td onclick=\"boxtap('G2');\"\
        height=\"18%\"\
        width=\"20%\"\
        id=\"G2\"\
        align=\"center\"\
        onMouseOver=\"hilite('G2')\"\
        onMouseOut=\"nohilite('G2')\">\
        G2</td>\
    <td onclick=\"boxtap('O2');\"\
        height=\"18%\"\
        width=\"20%\"\
        id=\"O2\"\
        align=\"center\"\
        onMouseOver=\"hilite('O2')\"\
        onMouseOut=\"nohilite('O2')\">\
        O2</td>\
    </tr>\
    <tr>\
    <td onclick=\"boxtap('B3');\"\
        height=\"18%\"\
        width=\"20%\"\
        id=\"B3\"\
        align=\"center\"\
        onMouseOver=\"hilite('B3')\"\
        onMouseOut=\"nohilite('B3')\">\
        B3</td>\
    <td onclick=\"boxtap('I3');\"\
        height=\"18%\"\
        width=\"20%\"\
        id=\"I3\"\
        align=\"center\"\
        onMouseOver=\"hilite('I3')\"\
        onMouseOut=\"nohilite('I3')\">\
        I3</td>\
    <td onclick=\"boxtap('N3');\"\
        height=\"18%\"\
        width=\"20%\"\
        id=\"N3\"\
        align=\"center\"\
        onMouseOver=\"hilite('N3')\"\
        onMouseOut=\"nohilite('N3')\">\
        N3</td>\
    <td onclick=\"boxtap('G3');\"\
        height=\"18%\"\
        width=\"20%\"\
        id=\"G3\"\
        align=\"center\"\
        onMouseOver=\"hilite('G3')\"\
        onMouseOut=\"nohilite('G3')\">\
        G3</td>\
    <td onclick=\"boxtap('O3');\"\
        height=\"18%\"\
        width=\"20%\"\
        id=\"O3\"\
        align=\"center\"\
        onMouseOver=\"hilite('O3')\"\
        onMouseOut=\"nohilite('O3')\">\
        O3</td>\
    </tr>\
    <tr>\
    <td onclick=\"boxtap('B4');\"\
        height=\"18%\"\
        width=\"20%\"\
        id=\"B4\"\
        align=\"center\"\
        onMouseOver=\"hilite('B4')\"\
        onMouseOut=\"nohilite('B4')\">\
        B4</td>\
    <td onclick=\"boxtap('I4');\"\
        height=\"18%\"\
        width=\"20%\"\
        id=\"I4\"\
        align=\"center\"\
        onMouseOver=\"hilite('I4')\"\
        onMouseOut=\"nohilite('I4')\">\
        I4</td>\
    <td onclick=\"boxtap('N4');\"\
        height=\"18%\"\
        width=\"20%\"\
        id=\"N4\"\
        align=\"center\"\
        onMouseOver=\"hilite('N4')\"\
        onMouseOut=\"nohilite('N4')\">\
        N4</td>\
    <td onclick=\"boxtap('G4');\"\
        height=\"18%\"\
        width=\"20%\"\
        id=\"G4\"\
        align=\"center\"\
        align=\"center\"\
        onMouseOver=\"hilite('G4')\"\
        onMouseOut=\"nohilite('G4')\">\
        G4</td>\
    <td onclick=\"boxtap('O4');\"\
        height=\"18%\"\
        width=\"20%\"\
        id=\"O4\"\
        align=\"center\"\
        onMouseOver=\"hilite('O4')\"\
        onMouseOut=\"nohilite('O4')\">\
        O4</td>\
    </tr>\
</table>"
);

