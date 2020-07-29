---
title: 数据结构-二叉树
date: 2020/2/15
description: 二叉树概念性质及遍历操作
tag: data-structure
use: [mermaid, latex]
    

---



# 数据结构-二叉树

## 基本概念

### 常见术语

1. 结点： 包含一个数据元素及若干指向子树的分支 

2. 结点的度：含有孩子结点的个数
3. 结点的层次：由根结点开始，根结点层次为 0
4. 树的深度：由根结点开始，根结点深度为 0
5. 树的高度：由叶子结点向根结点，取最大值，叶子结点高度为 0
6. 叶子结点（终端结点）：没有孩子结点
7. 分支结点（非终端结点）：有孩子结点
8. 根结点：没有父亲结点
9. 子树：一个分支结点及其后辈组成子树
10. 父亲结点、孩子结点、兄弟结点
11. 前辈、后辈

### 链表、树和图

>链表是特殊的树，树是特殊的图

1. 单链表结点有两个 next 指针，称为树
2. 树的结点指向了其前辈结点，称为图

## 二叉树

> 一个树满足：
>
> 1. 每个结点的孩子结点数不大于 2
> 2. 每个结点的孩子次序不能任意颠倒
>
> 则称为二叉树，其左边孩子结点称为左孩子，右边孩子结点称为右孩子

### 数学性质

1. 高度为 h（>=0）的二叉树，至少有 h+1 个结点，至多有 $2^{h+1}-1$ 个结点
2. 含有 n（n>=1）个结点的二叉树，高度至多为 n-1；至少为 $logn$

### 满二叉树

 除了叶结点外每一个结点都有左右子叶且叶结点都处在最底层的二叉树，即每一层结点树都达到最大

### 完全二叉树

1. 除了最下面一层，其他层结点数达到最大，并且最下面一层的结点都在该层最左边的二叉树
2. 在满叉树的基础上，在最底层从右往左删去若干结点，得到的都是完全二叉树

### 平衡二叉树

1.  树的左右子树的高度差不超过1的数，空树也是平衡二叉树的一种 

2.  具有下列性质的二叉树
    - 它的左子树和右子树都是平衡二叉树
    - 左子树和右子树的高度之差不超过 1 

## 二叉树操作

### 创建二叉树

```java
public class TreeNode {
    TreeNode left;
    TreeNode right;
    Object value;
}
```

### 遍历二叉树

> 前序、中序、后序遍历每个结点最多被访问两次，时间复杂度为 O(n)
>
> 层序遍历每个结点被访问一次，时间复杂度为 O(n)

1. 前序遍历

   ```java
   public List<Integer> preOrder( ) {
       List<Integer> values = new ArrayList<>( );
       values.add((int) value);
       if (left != null) values.addAll(left.preOrder( ));
       if (right != null) values.addAll(right.preOrder( ));
       return values;
   }
   ```

2. 中序

   ```java
   public List<Integer> inOrder( ) {
       List<Integer> values = new ArrayList<>( );
       if (left != null) values.addAll(left.inOrder( ));
       values.add((int) value);
       if (right != null) values.addAll(right.inOrder( ));
       return values;
   }
   ```

3. 后序遍历

   ```java
   public List<Integer> postOrder( ) {
       List<Integer> values = new ArrayList<>( );
       if (left != null) values.addAll(left.postOrder( ));
       if (right != null) values.addAll(right.postOrder( ));
       values.add((int) value);
       return values;
   }
   ```

4. 层序遍历

   ```java
   public List<TreeNode> layerOrder( ) {
       List<TreeNode> values = new ArrayList<>( );
       values.add(this);
       for (int i = 0; i < values.size( ); i++) {
           TreeNode node = values.get(i);
           if (node.left != null) values.add(node.left);
           if (node.right != null) values.add(node.right);
       }
       return values;
   }
   ```

### 结点数目

```java
public int nodeNum( ) {
    int count = 0;
    if (value != null) count = 1;
    if (left != null) {
        count += left.nodeNum( );
    }
    if (right != null) {
        count += right.nodeNum( );
    }
    return count;
}
```

### 输出叶结点

```java
public List leafNode( ) {// 前序
    List<Integer> values = new ArrayList<>( );
    if (left == null && right == null) values.add((int) value);
    if (left != null) values.addAll(left.leafNode( ));
    if (right != null) values.addAll(right.leafNode( ));
    return values;
}
```

### 叶结点数目

```java
public int leafNodeNum( ) {// 前序
    int count = 0;
    if (left == null && right == null) count++;
    if (left != null) count += left.leafNodeNum( );
    if (right != null) count += right.leafNodeNum( );
    return count;
}
```

### 输出高度

```java
public int getHeight( ) {
    int l = 0, r = 0;
    if (left != null) l = left.getHeight( );// 左子树高度
    if (right != null) r = right.getHeight( );// 右子树高度
    return (Math.max(l, r));
}
```

### 打印二叉树

1. 横向打印

   ```java
   public void printTree(int layer) {
       if (right != null) right.printTree(layer + 1);
       for (int i = 0; i < layer; i++)
           System.out.print("-|-");
       System.out.println(value);
       if (left != null) left.printTree(layer + 1);
   }
   ```



## 二叉搜索树

> 也叫二叉排序树、二叉查找树

### 性质

1. 二叉搜索树，要么是一颗空树，要么具有以下性质
   - 若任意结点的左子树不空，则左子树上所有结点的值均小于它的根结点的值
   - 若任意结点的右子树不空，则右子树上所有结点的值均大于它的根结点的值
   - 任意结点的左、右子树也分别为二叉查找树
   - 没有键值相等的结点

2. 中序遍历得到有序数列

### 创建

```java
public class TreeNode {
    TreeNode left;
    TreeNode right;
    Object value;// 默认 null
}
```

### 验证

> 判断二叉树是不是二叉搜索树

1. 中序遍历，判断是否得到有序数列

   ```java
   public boolean isValid( ) {
       List<Integer> list = inOrder( );// 中序遍历结果
       for (int i = 0; i < list.size( ) - 1; i++) {
           if (list.get(i) >= list.get(i + 1)) return false;
       }
       return true;
   }
   ```

2. 递归判断大小关系是否合理

   ```java
   public boolean isValid( ) {
       boolean l = true, r = true;
       if (left != null && (int) value <= (int) left.value) return false;
       if (right != null && (int) value >= (int) right.value) return false;
       if (right != null) r = right.isValid( );
       if (left != null) l = left.isValid( );
       return r && l;
   }
   ```


### 插入结点

```java
public void add(Object o) {
    if (value == null) value = o;
    else if ((int) value - (int) o > 0) {// 小的放左边
        left = (null == left) ? new TreeNode( ) : left;
        left.add(o);// 递归
    } else if ((int) value - (int) o < 0) {// 大的放右边
        right = (null == right) ? new TreeNode( ) : right;
        right.add(o);// 递归
    }
}
```

### 查找结点

1. 递归方式

   ```java
   public TreeNode find(int i) {
       if (value == null) return null;
       if ((int) value == i) return this;
       if (left != null && i < (int) value) return left.find(i);
       if (right != null && i > (int) value) return right.find(i);
       return null;
   }
   ```

2. 循环方式

   ```java
   public TreeNode findByLoop(int i) {
       TreeNode node = this;
       while (node != null) {
           if (i > (int) node.value) node = node.right;
           else if (i < (int) node.value) node = node.left;
           else return node;
       }
       return null;
   }
   ```

### 删除结点

1. 要删除的结点没有子结点，则直接将父亲结点指向该结点的指针置为 null
2. 要删除的结点有一个子结点，则直接将父亲结点的指针指向其子结点
3. 要删除的结点有两个子结点，找到该结点右子树最小结点，替换该结点，并删除该最小结点

```java
public void delete(int i) {
    TreeNode pre = null;// 父亲结点
    TreeNode node = this;
    while (node != null && (int) node.value != i) {
        pre = node;
        if (i > (int) node.value) node = node.right;
        else if (i < (int) node.value) node = node.left;
    }
    if (node == null) return;// 没找到要删除的结点

    if (pre != null) {
        // 要删除的结点无子结点
        if (node.right == null && node.left == null) {
            if (pre.left == node) pre.left = null;
            else pre.right = null;
            return;
        }
        // 要删除的结点有一个子结点
        if (node.right == null && node.left != null) {
            if (pre.left == node) pre.left = node.left;
            else pre.right = node.left;
            return;
        } else if (node.right != null && node.left == null) {
            if (pre.left == node) pre.left = node.right;
            else pre.right = node.right;
            return;
        }
        // 要删除的结点有两个或以上的结点
        if (node.right != null && node.left != null) {
            TreeNode rightMin = node.right;
            while (rightMin.left != null) rightMin = rightMin.left;
            delete((int) rightMin.value);
            if (pre.left == node) pre.left = rightMin;
            else pre.right = rightMin;
            rightMin.left = node.left;
            rightMin.right = node.right;
            return;
        }
    } else {
        // 要删除的是根节点
        TreeNode rightMin = node.right;
        while (rightMin.left != null) rightMin = rightMin.left;
        delete((int) rightMin.value);
        this.value=rightMin.value;
        return;
    }
}
```

### 性能分析

1. 二叉树操作时间复杂度与高度成正比，平衡二叉树的高度近似 $long_2n$
2. 极度不平衡的二叉搜索树，退化成链表，查找复杂度为 $O(n)$
3. 平衡二叉搜索树查找、插入、删除时间复杂度为 $O(logn)$

## 红黑树

### 概念

1. 红黑树，也叫 Red-Black Tree，R-B Tree
2. 并不完全符合平衡二叉树定义，是一种不严格的平衡二叉树
3. 要满足以下要求
   -  根节点是黑色的，每个叶子节点都是黑色的空节点（NIL），也就是说，叶子节点不存储数据
   -  任何相邻的节点都不能同时为红色，也就是说，红色节点是被黑色节点隔开的
   -  每个节点，从该节点到达其可达叶子节点的所有路径，都包含相同数目的黑色节点

### 性能分析

>平衡二叉树的初衷是为了解决二叉搜索树动态更新导致的性能退化
>
>红黑树是一种近似平衡的二叉树，可以让性能退化不会太严重

1. 红黑树的高度

   ```mermaid
   graph TB
   	root((黑))-->b11((黑))
   	root((黑))-->b12((黑))
   	b11((黑))-->r21((红))
   	b11((黑))-->r22((红))
   	b12((黑))-->b23((黑))
   	b12((黑))-->b24((黑))
   	r21((红))-->b31((黑))
   	r21((红))-->b32((黑))
   	r22((红))-->b33((黑))
   	r22((红))-->b34((黑))
   	
   	Root((黑))-->B11((黑))
   	Root((黑))-->B12((黑))
   	B11((黑))-->B21((黑))
   	B11((黑))-->B22((黑))
   	B11((黑))-->B23((黑))
   	B11((黑))-->B24((黑))
   	B12((黑))-->B25((黑))
       B12((黑))-->B26((黑))
   ```

   1. 如果将红黑树中所有红结点去掉，其子结点沦为其父节点的孩子
   2. 二叉树变成四叉树，同等结点个数，四叉树高度比二叉树小，也就是小于 $log_2n$
   3. 当把红色结点添加回去，由于规定红色结点不能相邻，有一个红结点就要有一个黑结点将它隔开，红黑树中包含最多黑结点的路径长度不超过 $log_2n$，因此加入红结点后，高度不超过 $2log_2n$

   > 红黑树高度近似为 $2long_2n$

2. 红黑树的高度只比高度平衡的 AVL 树的高度 $log_2n$ 大了一倍

   在性能上，下降得并不多，实际上红黑树的性能更好

   查找、插入、删除时间复杂度都为 $O(logn)$， 很多编程语言中的 Map 类型都是通过红黑树来实现的 

   > AVL 树是一种高度平衡的二叉树，查找效率非常高，但是为了维持高度平衡,每次插入、删除都要做调整，比较耗时。对于有频繁的插入、删除操作的数据集合，不适合使用 AVL 树 


