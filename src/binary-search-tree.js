const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/*
(*) root — возвращает корневой узел дерева 
(*) add(data) — добавляет узел с data к дереву
(*) has(data) — возвращает true, если узел с data имеется в дереве и false, если нет
(*) find(data) — возвращает узел с data, если узел с data имеется в дереве и null, если нет
(*) remove(data) — удаляет узел с data из дерева, если узел с data имеется в дереве
(*) min — возвращает минимальное значение, хранящееся в дереве (или null, если у дерева нет узлов)
(*) max — возвращает максимальное значение, хранящееся в дереве (или null, если у дерева нет узлов)
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = addNode(this.rootNode, data);

    function addNode(node, data) {
      if (node === null) {
        return new Node(data);
      }

      if (node.data === data) {
        return node;
      }

      if (data < node.data) {
        node.left = addNode(node.left, data);
      } else {
        node.right = addNode(node.right, data);
      }

      return node;
    }
  }

  has(data) {
    return hasNode(this.rootNode, data);

    function hasNode(node, data) {
      if (node === null) {
        return false;
      }

      if (node.data === data) {
        return true;
      }

      return data < node.data
        ? hasNode(node.left, data)
        : hasNode(node.right, data);
    }
  }

  find(data) {
    return searchNode(this.rootNode, data);

    function searchNode(node, data) {
      if (node === null) {
        return null;
      }

      if (node.data === data) {
        return node;
      }

      return data < node.data
        ? searchNode(node.left, data)
        : searchNode(node.right, data);
    }
  }

  remove(data) {
    this.rootNode = removeNode(this.rootNode, data);

    function removeNode(node, data) {
      if (node === null) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (node.left === null && node.right === null) {
          return null;
        }

        if (node.left === null) {
          node = node.right;
          return node;
        }

        if (node.right === null) {
          node = node.left;
          return node;
        }

        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;

        node.right = removeNode(node.right, minFromRight.data);

        return node;
      }
    }
  }

  min() {
    if (this.rootNode === null) {
      return;
    }

    let minNode = this.rootNode;
    while (minNode.left) {
      minNode = minNode.left;
    }

    return minNode.data;
  }

  max() {
    if (this.rootNode === null) {
      return;
    }

    let maxNode = this.rootNode;
    while (maxNode.right) {
      maxNode = maxNode.right;
    }

    return maxNode.data;
  }
};

module.exports = {
  BinarySearchTree
};