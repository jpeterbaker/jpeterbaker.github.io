// Create pieces, connect functions

var i,j,k,stack,node;
var colors = ['red','yellow','green','blue'];
var sizes = ['small','medium','large'];
for(i=0;i<4;i++){
    for(j=0;j<3;j++){
        stack = document.getElementById('stack_'+(i+1)+'_'+(j+1));
        stack.setAttribute('onclick','stack_clicked(this)');
        for(k=0;k<3;k++){
            node = document.createElement('div');
            stack.appendChild(node);
            node.setAttribute('class','piece banked '+colors[i]+' '+sizes[j]);
            node.setAttribute('onclick','piece_clicked(this)');
        }
    }
}

var buttons = Array.from(document.querySelectorAll('.button'));
var stacks = Array.from(document.querySelectorAll('.stack'));

for(var button of buttons){
    button.setAttribute('onclick',button.id+'_clicked(this)');
}

enter_create_star();

