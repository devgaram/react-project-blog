---
title: 알고리즘 개념 잡자 2탄 - 트리
date: 2020-01-03
tags: [coding-interview, data-structure]
category: algorithm
---

> 참고 서적<br/>
> [코딩 인터뷰 완전분석](https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=115116545) 트리와 그래프<br/>
> [C언어로 쉽게 풀어쓴 자료구조](http://www.yes24.com/Product/Goods/69750539) 제 7장 트리, 제 8장 우선순위 큐

# 1. 트리(Tree)

- 트리는 노드(node)와 간선(edge)로 이루어진 자료구조이다.
- 트리는 하나의 루트 노드를 가진다.
- 루트 노드는 0개 이상의 자식 노드를 가진다.
- 그 자식 노드 또한 0개 이상의 자식 노드를 가진다.
- 그 자식의 자식 노드 또한..
- 노드들은 특정 순서대로 나열될 수도 있고 없을 수도 있다.
- 각 노드는 어떤 자료형으로도 표현이 가능하다.
- 각 노드는 부모 노드로의 연결이 있을 수도 있고 없을 수도 있다.

## 용어 정리

- 트리에는 **사이클(cycle)**이 존재할 수 없다.
- 자식이 없는 노드는 **말단 노드(leaf node)**라고 부른다.
- **차수(degree)**는 자식 노드의 개수로 자식 노드가 3개면 그 노드의 차수는 3이다. 트리의 차수는 트리가 가지고 있는 노드의 차수 중에서 가장 큰 차수이다.
- **레벨(level)**은 트리의 각 층에 번호를 매긴 것으로 루트의 레벨은 1이 되고 한 층씩 내려갈수록 1씩 증가한다
- 트리의 **높이(height)**는 트리가 가진 최대 레벨이다.

예시) 노드 클래스
```java
class Node {
  public String name;
  public Node[] children;
}
```
예시) 트리 클래스
```java
class Tree {
  public Node root;
}
```

## 이진 트리(Binary tree)와 이진 탐색 트리(Binary search tree)
- 이진트리
  - 이진 트리의 노드는 최대 2개까지의 자식 노드가 존재할 수 있고 모든 노드의 차수는 2 이하가 된다.
  - n개의 노드를 가진 이진 트리는 n-1개의 간선을 가진다. 루트 노드를 제외한 노드들은 부모와 정확히 하나의 간선으로 이어져있기 때문이다.
  - 높이가 h인 이진 트리는 최소 h개 노드를 가지고 최대 2<sup>h</sup>-1 노드를 가진다.
  - 레벨 i에서 노드의 개수는 2<sup>i-1</sup> 다.
  - n개의 노드를 가진 이진 트리의 최대 높이는 n이며 최소 높이는 log<sub>2</sub>(n+1) 이다.
- 이진 탐색 트리
  - 모든 노드 n은 <span class="clr-note">모든 왼쪽 자식들 <= n < 모든 오른쪽 자식들</span> 속성을 만족한다.
  - 이진 탐색 트리의 탐색, 삽입, 삭제 연산의 시간 복잡도는 트리의 높이를 h라고 했을 때 O(h)가 된다.
  - n개의 노드를 가진 균형 잡힌 이진 트리의 높이는 log<sub>2</sub>n 이므로 평균적인 시간 복잡도는 O(log<sub>2</sub>n)
  - 한쪽으로 치우친 이진 트리의 경우 트리의 높이가 노드의 개수 n과 같게 되어 시간복잡도는 선형 탐색과 같이 O(n)이 된다.

## 이진 트리 표현 방법
**1. 배열 이용** <br/><br/>
![배열 이용](/assets/images/2020-01-03-img/1.png)<br/>
- 주로 포화 이진 트리나 완전 이진 트리의 경우에 많이 쓰인다.
- 높이가 k인 완전 이진 트리로 가정하여 배열의 크기를 최대 노드 개수인 2<sup>k</sup>-1 로 할당한 다음 완전 이진 트리의 번호대로 노드를 저장한다.
- 편한 계산을 위해 인덱스는 1부터 시작한다.
- 오른쪽 그림처럼 일반 이진 트리의 경우 공간 낭비가 크다.

> 부모 & 자식 노드 찾는 법 <br/><br/>
> 현재 노드 i를 기준으로, <br/>
> 부모 노드의 인덱스 =  **i/2** <br/>
> 왼쪽 자식 노드의 인덱스 =  **i*2** <br/>
> 오른쪽 자식 노드의 인덱스 = **i*2 + 1** <br/>

<br/>

**2. 연결리스트 이용** <br/><br/>
- 노드가 자바에서는 클래스, C에서는 구조체로 표현되고 각 노드가 포인터를 가지고 있어서 이 포인터를 이용하여 노드와 노드를 연결하는 방법이다.
- 하나의 노드가 왼쪽 자식 노드, 오른쪽 자식 노드를 필드로 가진다.

## 트리가 '균형' 트리인지 아닌지 확인하는 방법
<span class="clr-note">O(log N)</span> 시간에 insert와 find를 할 수 있는 정도로 균형이 잘 잡혀있는 지 확인하면 된다. 꼭 완전 이진 트리처럼 완벽하게 균형 잡혀 있을 필요는 없다.

> 예) 레드-블랙 트리와 AVL 트리

## 이진 트리의 종류
- 완전 이진 트리(complete binary tree) : 트리의 모든 높이에서 노드가 꽉 차 있다. 마지막 단계(level)은 꽉 차 있지 않아도 되지만 노드가 왼쪽에서 오른쪽으로 채워져야 한다.
- 전 이진 트리(full binary tree) : 자식노드가 0개 또는 2개인 경우다.
- 포화 이진 트리(perfect binary tree) : 전 이진 트리면서 완전 이진 트리인 경우다. 모든 말단 노드는 같은 레벨에 있으며 마지막 레벨에서 노드의 개수가 최대가 되어야 한다. 노드의 개수는 정확히 2<sup>k-1</sup>(k는 트리의 레벨)

## 이진 트리 순회 방법

**중위 순회(in-order traversal)**는 <span class="clr-note">왼쪽 가지(branch) - 현재 노드 - 오른쪽 가지</span> 순서로 노드를 방문하고 출력하는 방법이다.
> 이진 탐색 트리를 이 방법으로 순회한다면? <span class="is-has-danger">오름차순</span>으로 방문!
```java
void inOrderTraversal(TreeNode node) {
  if (node != null) {
    inOrderTraversal(node.left);
    visit(node);
    inOrderTraversal(node.right);
  }
}
```
<br/>

**전위 순회(pre-order traversal)**는 <span class="clr-note">현재 노드 - 왼쪽 가지(branch) - 오른쪽 가지</span> 순서로 노드를 방문하고 출력하는 방법이다.
> 가장 먼저 방문할 노드는? 루트 노드!
```java
void preOrderTraversal(TreeNode node) {
  if (node != null) {
    visit(node);
    preOrderTraversal(node.left);    
    preOrderTraversal(node.right);
  }
}
```
<br/>

**후위 순회(post-order traversal)**는 <span class="clr-note">왼쪽 가지(branch) - 오른쪽 가지 - 현재 노드</span> 순서로 노드를 방문하고 출력하는 방법이다. 예) 현재 디렉토리 용량 계산
> 맨 마지막에 방문할 노드는? 루트 노드!
```java
void postOrderTraversal(TreeNode node) {
  if (node != null) {    
    postOrderTraversal(node.left);    
    postOrderTraversal(node.right);
    visit(node);
  }
}
```
<br/>

**레벨 순회(level traversal)**는 각 노드를 레벨 순으로 순회하는 방법이다. 레벨 1에서 시작하며 동일한 레벨의 경우에는 왼쪽에서 오른쪽으로 순으로 방문한다.
> 중위, 전위, 후위는 스택을 사용하며 레벨 순회는 **큐**를 이용한다.

## 이진 트리 순회의 응용
**수식 트리(expression tree)**를 처리하는 데 사용
<br/>

![수식 트리 예제](/assets/images/2020-01-03-img/2.png)<br/>

- 루트 노드는 연산자이고 서브 트리가 피연산자이므로 서브 트리를 계산하면 전체 수식을 계산할 수 있다.
- 위 표에 나와있듯이 가장 적합한 순회 방식은 **후위 순회**다. 

