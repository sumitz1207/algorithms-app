function heapSort(arr){
    var sorted = [];
    var heap1 = new MaxHeap();
    
    for(let i=0; i<arr.length; i++){
        heap1.insert(arr[i]);
    }
    
    for(let i=0; i<arr.length; i++){
        sorted.push(heap1.delete());
    }
    return sorted;
}
