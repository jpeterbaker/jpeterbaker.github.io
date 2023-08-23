
var i,j,k,stack,node;
var colors = ['red','yellow','green','blue'];
var sizes = ['small','medium','large'];
for(i=0;i<4;i++){
    for(j=0;j<3;j++){
        stack = document.getElementById('HWstack_'+(i+1)+'_'+(j+1));
        for(k=0;k<3;k++){
            node = document.createElement('div');
            stack.appendChild(node);
            node.setAttribute('class','HWpiece HWbanked HW'+colors[i]+' HW'+sizes[j]);
            node.setAttribute('onclick','piece_clicked(this)');
        }
    }
}
