

function removeByValue(arr, val) {
    for(var i=0; i<arr.length; i++) {
        if(arr[i] == val) {
            arr.splice(i, 1);
            break;
        }
    }
}

let arrA=["1","2","3","4","5"];
let arrB=["1","2","3"];
if(arrA.length>arrB.length){
   arrB.map(a=>removeByValue(arrA,a))
}


console.log(arrA)