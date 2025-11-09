const { NotImplementedError } = require('../lib/errors');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    this._root = addNode(this._root, data);
    function addNode(node, value) {
      if (!node) return new Node(value);

      if (node.data === value) return node;

      if (value < node.data)
        node.left = addNode(node.left, value);
      else
        node.right = addNode(node.right, value);

      return node;
    }
  }

  has(data) {
    let current = this._root;
    while (current) {
      if (data === current.data) {
        return true;
      }
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  find(data) {
    let current = this._root;
    while (current) {
      if (data === current.data) {
        return current;
      }
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  }

  remove(data) {
    this._root = removeNode(this._root, data);
    function removeNode(node, value) {
      if (!node) return null;

      if (value < node.data) {
        node.left = removeNode(node.left, value);
        return node;
      } else if (value > node.data) {
        node.right = removeNode(node.right, value);
        return node;
      }

      else {
        if (!node.left && !node.right) return null;
      }
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      let minRight = node.right;
      while (minRight.left !== null) {
        minRight = minRight.left;
      }
      node.data = minRight.data;
      node.right = removeNode(node.right, minRight.data);
      return node;
    }
  }

  min() {
    if (!this._root) return null;

    let current = this._root;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    if (!this._root) return null;

    let current = this._root;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  }
}

module.exports = {
  BinarySearchTree
};