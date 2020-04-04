import re

xpat = re.compile('"x":"?([-0-9]+)')
ypat = re.compile('"y":"?([-0-9]+)')
wpat = re.compile('"face_width":"?([-0-9]+)')

pats = [xpat,ypat,wpat]

replace = '{}{}{}'

def divide(s):
    # Divide all proper numbers in str s by 2
    for pat in pats:
        m = pat.search(s)
        if m is None:
            continue
        start = m.start(1)
        end = m.end(1)
        # Halve the int in group 1
        s = replace.format(
            s[:start],
            str(int(s[start:end])*2//3),
            s[end:]
        )
    return s

#test = 'blah blah blah "x":400,"y":15,"z":27,"face_width":150}, and more blah'
#print(divide(test))

fnames = ['EWfull.abg','NSfull.abg']

for fname in fnames:
    with open(fname,'r') as fin:
        with open(fname+'2','w') as fout:
            for line in fin:
                line = divide(line)
                fout.write(line)

