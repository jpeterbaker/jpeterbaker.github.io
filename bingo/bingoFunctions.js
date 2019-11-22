var colorSelect = "BBBBBB"
var colorHilite = "BBBBFF"
var colorWin = "#BBFFBB"
var colorBlank = "white"
var colorText = "black"

// 0: unchecked, 1: checked, 2: part of win
var states = new Array(5)

var totalWeight = 0;
function setTotalWeight(){
    var k;
    for(k=0;k<allsayings.length;k+=2){
        totalWeight += allsayings[k];
    }
}

function clearStates(){
    var i,j;
    for(i=0 ; i<5 ; i++){
        states[i] = [0,0,0,0,0]
    }
    states[2][2] = 1

    for(i=0 ; i<5 ; i++){
        for(j=0 ; j<5 ; j++){
            div = document.getElementById(ids[i][j]);
            div.bgColor = colorBlank
            
        }
    }
    div = document.getElementById('FREE');
    div.bgColor = colorSelect
}

var lines = [[[0,0],[0,1],[0,2],[0,3],[0,4]],//0 horizontal
             [[1,0],[1,1],[1,2],[1,3],[1,4]],//1
             [[2,0],[2,1],[2,2],[2,3],[2,4]],//2
             [[3,0],[3,1],[3,2],[3,3],[3,4]],//3
             [[4,0],[4,1],[4,2],[4,3],[4,4]],//4
             [[0,0],[1,0],[2,0],[3,0],[4,0]],//5 vertical
             [[0,1],[1,1],[2,1],[3,1],[4,1]],//6
             [[0,2],[1,2],[2,2],[3,2],[4,2]],//7
             [[0,3],[1,3],[2,3],[3,3],[4,3]],//8
             [[0,4],[1,4],[2,4],[3,4],[4,4]],//9
             [[0,0],[1,1],[2,2],[3,3],[4,4]],//10 diagonal
             [[0,4],[1,3],[2,2],[3,1],[4,0]]]//11

var lineVictory

// box2lines[i][j] is a list of indices of the lines to which box i,j belongs
var box2lines = [[[0,5,10],[0,6   ],[0,7      ],[0,8   ],[0,9,11]],
                 [[1,5   ],[1,6,10],[1,7      ],[1,8,11],[1,9   ]],
                 [[2,5   ],[2,6   ],[2,7,10,11],[2,8   ],[2,9   ]],
                 [[3,5   ],[3,6,11],[3,7      ],[3,8,10],[3,9   ]],
                 [[4,5,11],[4,6   ],[4,7      ],[4,8   ],[4,9,10]]]

var ids = [['B0','I0','N0'  ,'G0','O0'],
           ['B1','I1','N1'  ,'G1','O1'],
           ['B2','I2','FREE','G2','O2'],
           ['B3','I3','N3'  ,'G3','O3'],
           ['B4','I4','N4'  ,'G4','O4']]

document.getElementById('FREE').bgColor = colorSelect

function getIndex(id){
    // Get the index in [0,24] for the box with given id e.g. B4
    col = -1
    switch(id.charAt(0)){
        case 'B':
            col = 0
            break;
        case 'I':
            col = 1
            break;
        case 'N':
            col = 2
            break;
        case 'G':
            col = 3
            break;
        case 'O':
            col = 4
            break;
    }
    row = parseInt(id.charAt(1))
    return [row,col]
}
function hilite(id){
    var rowcol = getIndex(id)
    var i = rowcol[0]
    var j = rowcol[1]
    if(states[i][j]){
        return
    }
    var div = document.getElementById(id)
    div.bgColor = colorHilite
}
function nohilite(id){
    var rowcol = getIndex(id)
    var i = rowcol[0]
    var j = rowcol[1]
    if(states[i][j]){
        return
    }
    var div = document.getElementById(id)
    div.bgColor=colorBlank
}
function boxtap(id){
    var rowcol = getIndex(id)
    var i = rowcol[0]
    var j = rowcol[1]
    var newColor
    if(states[i][j] == 0){
        states[i][j] = 1
        newColor = colorSelect
    }
    else{
        states[i][j] = 0
        newColor = colorBlank
    }

    var div = document.getElementById(id)
    div.bgColor = newColor
    
    checkwin()
    checkblackout()
}

// Global variables: Set to 1 when a win/blackout occurs
var victory;
var blackout;

setTotalWeight();
setup();

function setup() {
    clearBlackout();
    lineVictory = [0,0,0,0,0,0,0,0,0,0,0,0];
    clearStates();
    victory = 0;
    populateGrid();
}

function populateGrid(){
    // Make a copy of the list so removing choices doesn't destroy only copy
    var sayings = allsayings.slice();
    var weight = totalWeight;

    var i,j,k,div;

    var ran;
    var sample = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    // Pick a sample of 24 random sayings
    for(i=0 ; i<24 ; ++i){
        // Pick an unused saying
        ran = Math.floor(Math.random()*weight);
        for(k=0;k<sayings.length;k+=2){
            ran -= sayings[k];
            if(ran < 0)
                break
        }
        weight -= sayings[k];
        sample[i] = sayings[k+1];

        // Remove the saying being added to the board and its weight
        sayings.splice(k,2);
    }
    // Now, add sample to the board in a random order
    // this second randomization is necessary to prevent
    // heavily weighted options from being placed preferentially in
    // the squares filled first
    for(i=0 ; i<5 ; ++i){
        for(j=0 ; j<5 ; ++j){
            if(i==2 && j==2){
                // The FREE square always says "FREE"
                continue;
            }
            div = document.getElementById(ids[i][j]);
            // Choose a random saying from the sample
            ran = Math.floor(Math.random()*sample.length);
            // Set the cell to hold the saying
            div.innerHTML = sample[ran];
            // Remove that saying from the sample
            sample.splice(ran,1);

         }
    }
}

function lineWins(i){
    var x,y,j;
    var div;
    for(j=0 ; j<5 ; j++){
        y = lines[i][j][0];
        x = lines[i][j][1];
        div = document.getElementById(ids[y][x]);
        div.bgColor = colorWin;
    }
    if(victory == 0){
        alert("BINGO!");
    }
    victory = 1;
}

function findBoxWins(){
// for each box, determine whether it is involved in a Bingo
    var i,j,div;
    for(i=0 ; i<5 ; m++){
        for(j=0 ; j<5 ; n++){
            
        }
    }
}

function setBlackout(){
    var i,j,div;
    for(i=0 ; i<5 ; i++){
        for(j=0 ; j<5 ; j++){
            div = document.getElementById(ids[i][j]);
            div.bgColor = colorText
            div.style.color = colorBlank
        }
    }
    if( blackout == 0){
        alert("BLACKOUT!")
    }
    blackout = 1; //set the global blackout variable
}

function clearBlackout(){
    if(blackout == 0){
        return
    }
    var i,j,div;
    for(i=0 ; i<5 ; i++){
        for(j=0 ; j<5 ; j++){
            div = document.getElementById(ids[i][j])
            div.style.color = colorText
        }
    }
    blackout = 0; //set the global blackout variable
}

function checkLineWin(i){
    var j,y,x,div;
    linewin = 1; // Assume win until proven otherwise
    for(j=0 ; j<5 ; j++){
        y = lines[i][j][0];
        x = lines[i][j][1];
        if( !states[y][x] ){
            linewin = 0;
            break;
        }
    }
    lineVictory[i] = linewin;
    if(linewin == 1){
        lineWins(i);
    }
}

function checkwin(){
    var div;
    var i,j,k;
    var linesOFbox;

    var won = 0; 
    
    for(i=0 ; i<12 ; i++){
        checkLineWin(i);
        if(lineVictory[i]){
            won = 1;
        }
    }

    if(won == 0){
        victory = 0;
    }

    for(i=0 ; i<5 ; i++){
        for(j=0 ; j<5 ; j++){
            linesOFbox = box2lines[i][j]
            for(k=0 ; k<linesOFbox.length ; k++){
                if(lineVictory[linesOFbox[k]]){
                    // This box is on a winning line
                    div = document.getElementById(ids[i][j]);
                    div.bgColor = colorWin
                    break;
                }
            }
            if(k==linesOFbox.length){
            // This box does not have a win
                div = document.getElementById(ids[i][j]);
                if(states[i][j] == 1){
                    div.bgColor = colorSelect;
                }
                
            }
        }
    }
}

function checkblackout(){
    var i;
    for(i=0 ; i<5 ; i++){
        if(!lineVictory[i]){
            break;
        }
    }
    if(i==5){
        //blackout achieved
        setBlackout();
    }
    else{
        clearBlackout();
    }
}

