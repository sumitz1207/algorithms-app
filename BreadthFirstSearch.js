
const breadthFirstTraversal = (root) => {
  if (root === null) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const current = queue.shift();
    result.push(current.data);
    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);
  }
  return result;
};
