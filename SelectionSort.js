function selectionSort(arr){
    for(let i = 0; i<arr.length; i++){
      //find min number in subarray 
      //and place it at ith position
        let minptr = i;
        for(let j = i+1; j<arr.length; j++){
            if(arr[minptr] > arr[j]){
                minptr = j;
            }
        }
