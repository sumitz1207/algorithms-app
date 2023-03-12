
const dfsIterativePostorder3 = (root) => {
    const stack = [root],
    traversed = [];
    let prev = null,
    current;
    
    while (stack.length){
        current = stack[stack.length-1];
        if (!prev || prev.left == current ||prev.right == current){
            if (current.left) stack.push(current.left);
            else if (current.right) stack.push(current.right);
            else {
                stack.pop();
                traversed.push(current.val);
            }
        }
        else if (current.left == prev){
            if (current.right) stack.push(current.right);
            else {
                stack.pop();
                traversed.push(current.val);
            }
        }
        else if (current.right == prev){
            stack.pop();
            traversed.push(current.val);
        }
        prev = current;
    }
    return traversed;
}
