
(function (exports) {
  'use strict';
  var Colors = {
    RED: 0,
    BLACK: 1
  };
  exports.Colors = Colors;

  function Node(key, value, left, right, color) {
    this._key = key;
    this._left = left;
    this._right = right;
    this._value = value;
    this._color = color;
  }

  Node.prototype.isRed = function () {
    return this._color === Colors.RED;
  };

  Node.prototype.flipColor = function () {
    if (this._color === Colors.RED) {
      this._color = Colors.BLACK;
    } else {
      this._color = Colors.RED;
    }
  };

  'key value left right color'
  .split(' ')
  .forEach(function (key) {
    var valueName = key.substr(0, 1).toUpperCase() + key.substr(1, key.length);
    Node.prototype['get' + valueName] = function () {
      return this['_' + key];
    };
    Node.prototype['set' + valueName] = function (val) {
      this['_' + key] = val;
    };
  });
  exports.Node = Node;

  exports.RBTree = function () {
    this._root = null;
  };

  exports.RBTree.prototype.put = function (key, value) {
    this._root = this._put(key, value, this._root);
    this._root.setColor(Colors.BLACK);
  };

  exports.RBTree.prototype.isRed = function (node) {
    if (!node) {
      return false;
    }
    return node.isRed();
  };

  exports.RBTree.prototype._put = function (key, value, node) {
    var newRoot = node;
    if (node === null) {
      return new Node(key, value, null, null, Colors.RED);
    }
    if (node.getKey() > key) {
      node.setLeft(this._put(key, value, node.getLeft()));
    } else if (node.getKey() < key) {
      node.setRight(this._put(key, value, node.getRight()));
    } else {
      node.setValue(value);
    }
    if (this.isRed(node.getRight()) && !this.isRed(node.getLeft())) {
      newRoot = this._rotateLeft(node);
    }
    if (this.isRed(node.getLeft()) && this.isRed(node.getLeft().getLeft())) {
      newRoot = this._rotateRight(node);
    }
    if (this.isRed(node.getLeft()) && this.isRed(node.getRight())) {
      this._flipColors(node);
    }
    return newRoot;
  };

  exports.RBTree.prototype._flipColors = function (node) {
    node.getLeft().flipColor();
    node.getRight().flipColor();
  };

  exports.RBTree.prototype._rotateLeft = function (node) {
    var x = node.getRight();
    if (x !== null) {
      var temp = x.getLeft();
      node.setRight(temp);
      x.setLeft(node);
      x.setColor(node.getColor());
      node.setColor(Colors.RED);
    }
    return x;
  };

  exports.RBTree.prototype._rotateRight = function (node) {
    var x = node.getLeft();
    if (x !== null) {
      var temp = x.getRight();
      node.setLeft(temp);
      x.setRight(node);
      x.setColor(node.getColor());
      node.setColor(Colors.RED);
    }
    return x;
  };

  exports.RBTree.prototype.get = function (key) {
    return this._get(this._root, key);
  };

  exports.RBTree.prototype._get = function (node, key) {
    if (node === null) {
      return undefined;
    }
    if (node.getKey() === key) {
      return node.getValue();
    }
    if (node.getKey() > key) {
      return this._get(node.getLeft(), key);
    } else {
      return this._get(node.getRight(), key);
    }
  };

  exports.RBTree.prototype.levelOrderTraversal = function () {
    var queue = [];
    var levelOrderString = '';
    if (this._root){
      queue.push(this._root);
    } else {
      levelOrderString = ' Tree is empty';
    }
    while (queue.length !== 0){
      var tempNode = queue.shift();
      levelOrderString += ' ' + tempNode.getKey();
      if (tempNode.getLeft() !== null){
        queue.push(tempNode.getLeft());
      }
      if (tempNode.getRight() !== null){
        queue.push(tempNode.getRight());
      }
    }
    return 'Level Order Traversal -:' + levelOrderString;
  };
})(typeof window === 'undefined' ? module.exports : window);
