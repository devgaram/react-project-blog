---
title: 코딩인터뷰 완전분석 - 트리와 그래프 feat. 힙
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

# 2. 이진 힙(최소힙과 최대힙)
**우선 순위 큐(priority queue)**에서 각 노드들은 우선 순위를 가지고 있고 우선 순위가 높은 노드가 먼저 나가게 된다. 이는 배열, 연결 리스트 등 여러 가지 방법으로 구현이 가능한데, 가장 효율적인 구조는 **히프(heap)**다.

## 우선 순위 큐 구현 방법
**배열을 이용한 방법**
- 정렬이 안 된 배열
  - 삽입 : 맨 끝에 삽입 O(1)
  - 삭제 : 가장 우선 순위 높은 요소 찾기 O(n) + 삭제 후 뒤에 요소들 앞으로 이동 부담
- 정렬이 된 배열(우선 순위 낮은 순으로)
  - 삽입 : 탐색을 통해 삽입 위치를 결정해야 하며, 위치를 찾은 후에는 요소를 이동시켜서 빈 공간을 만들어야 한다. O(n)
  - 삭제 : 맨 끝 요소 삭제 O(1)

<br/>

**연결리스트를 이용한 방법**
  - 정렬이 안 된 리스트
    - 삽입 : 첫 번째 노드로 삽입 O(1)
    - 삭제 : 포인터 따라서 모든 노드를 뒤져보아야 한다. O(n)
  - 정렬이 된 리스트(우선 순위 높은 순으로)
    - 삽입 : 맨 끝에 삽입해야하므로 O(n)
    - 삭제 : 맨 앞 노드 삭제 O(1)
<br/>

**히프를 이용한 방법**
- 히프는 완전 이진 트리의 일종으로 우선 순위 큐를 위하여 만들어진 자료 구조이다.
- 반 정렬 상태를 유지한다.
- 삽입, 삭제 시간복잡도는 **O(log<sub>2</sub>n)**로 상당히 유리

## 히프란?
- 여러 개의 값들 중에서 가장 큰 값이나 가장 작은 값을 빠르게 찾아내도록 만들어진 자료구조다.
- **부모 노드의 키 값이 자식 노드의 키 값보다 항상 큰(작은)** 이진 트리다.
- 반 정렬 상태로, 큰 값이 상위 레벨에 있고 작은 값이 하위 레벨에 있다는 정도다.
- 히프 트리는 중복된 값을 허용한다.
- 히프는 <span class="clr-note">완전 이진 트리</span>다.
- 최대 힙 : 부모 노드의 키 값이 자식 노드의 키 값보다 크거나 같은 완전 이진 트리
- 최소 힙 : 부모 노드의 키 값이 자식 노드의 키 값보다 작거나 같은 완전 이진 트리

## 히프 구현 방법(최대 힙)
히프는 완전 이진 트리이기 때문에 표준적인 자료 구조는 배열이다. 완전 이진 트리 구현 방법은 위 트리의 표현 방법에서 이미 언급했다.

**최대 힙 표현 방법** 
<br/>

![히프](/assets/images/2020-01-03-img/3.png)

<br/>

- 삽입 연산
  - 1단계 - 히프의 끝(마지막 노드 다음)에 새로운 노드를 삽입한다. <span class="clr-grey">위 그림에서 키 값이 3인 말단 노드의 형제로 삽입한다.</span>
  - 2단계 - 삽입된 노드와 그 부모 노드의 키 값을 비교한다. 삽입된 노드의 키 값이 부모 노드의 키 값보다 크면 두 노드의 위치를 바꾼다.
  - 3단계 - 삽입된 노드의 키 값이 자신의 부모 노드 키 값보다 작아질 때까지 단계 2를 반복한다.

- 삭제 연산
  - 1단계 - 루트 노드가 삭제 된다. 빈자리에는 히프의 마지막 노드를 가져온다.
  - 2단계 - 새로운 루트 노드를 자식 노드들과 비교해보면서 자식 노드가 더 크면 두 노드의 위치를 바꾼다. 자식 노드 두 개 모두 값이 더 크다면 더 큰 값을 가진 노드와 교환한다.
  - 3단계 - 노드의 값이 자식보다 클 때까지 2단계를 반복한다.

**자바스크립트 구현 코드** 

<br/>

```javascript
class MaxHeap {
  constructor(elements) {
    this.heap = [,...elements]
  }

  insert(key) {
    this.heap.push(key)
    let current = this.heap.length - 1
    let parent = parseInt(current / 2)
    while (parent >= 1) {
      if (key > this.heap[parent]) [this.heap[current], this.heap[parent]] = [this.heap[parent], this.heap[current]]
      else break
      current = parent
      parent = parseInt(current / 2)
    }
  }

  delete() {
    if (this.heap.length === 1) {
      return "heap is empty"
    }
    [this.heap[1], this.heap[this.heap.length - 1]] = [this.heap[this.heap.length - 1], this.heap[1]]
    let maxValue = this.heap.pop()
    let current = 1
    let leftChild = current * 2
    while (leftChild < this.heap.length) {
      let largest = leftChild
      if (leftChild + 1 < this.heap.length) largest = this.heap[leftChild] < this.heap[leftChild + 1] ? leftChild + 1 : leftChild
      if (this.heap[largest] > this.heap[current]) [this.heap[largest], this.heap[current]] = [this.heap[current], this.heap[largest]]
      else break
      current = largest
      leftChild = current * 2
    }

    return maxValue
  }
}

const maxHeap = new MaxHeap([9,7,6,5,4,3,2,2,1,3])
console.log(maxHeap.heap);
maxHeap.insert(8);
console.log(maxHeap.heap);
let maxValue = maxHeap.delete();
console.log(maxValue);
console.log(maxHeap.heap);

```

## 히프의 시간 복잡도
- 삽입 연산
  - 최악의 경우는 루트 노드까지 올라간 경우이므로 트리의 높이에 해당하는 비교 연산과 이동 연산이 필요하다. 히프는 완전 이진 탐색이므로 히프의 높이는 log<sub>2</sub>n이 되고 시간 복잡도도 O(log<sub>2</sub>n)
- 삭제 연산
  - 삽입 연산과 같다.

## 히프의 응용

- 히프 정렬
  - 최대 히프를 이용하여 정렬할 수 있다.
  - 요소가 n개일 때, 시간 복잡도는 **O(nlog<sub>2</sub>n)**이다.
  - 전체 자료 정렬이 아닌 가장 큰 값 몇 개만 정렬하고 싶을 때 사용하면 좋다.

```javascript
const heapSort = (elements, num) => {
  const sortedElements = []
  const maxHeap = new MaxHeap([])
  elements.forEach(element => {
    maxHeap.insert(element)
  });
  for (let i=0; i<num; i++) {
    sortedElements.push(maxHeap.delete())
  }
  return sortedElements
}

console.log(heapSort([2,4,1,9,5,7,6,5,2,8], 5))
```

- 허프만 코드 (Huffman Coding) <span class="clr-grey">나중에 추가할 예정..</span>

# 3. 트라이(접두사 트리, prefix tree)
> 참조 링크 [wikipedia](https://en.wikipedia.org/wiki/Trie)

![트라이](/assets/images/2020-01-03-img/4.png)

- n-차 트리의 변종으로 각 노드에 문자를 저장하는 자료구조이다.
- 문자열 탐색에 효율적인 자료구조이다.
- 트리를 아래쪽으로 순회하면 단어 하나가 나온다.
- TerminatingTrieNode로 널 노드를 표현한 경우, 트라이에서 각 노드는 1개 ~ 문자열 길이 + 1개 까지 자식을 가질 수 있다.
- 널 노드 대신 불린 플래그로 표현한 경우, 각 노드는 0개 ~ 문자열 길이개까지 자식을 가질 수 있다.

> **널 노드(* 노드)**
> - 단어의 끝을 나타낸다.
> - 예) MANY 이후에 널 노드가 나오면 MANY라는 단어가 완성되었다는 의미다.
>
> **널 노드 구현 방법**
> - TrieNode를 상속한 TerminatingTrieNode로 표현하기
> - 널 노드의 부모 노드 안에 불린 플래그를 새로 정의함으로써 표현하기

**어디에 사용할까?**
- 자동 완성
- 문자열이 어떤 문자열의 접두사인지 확인하고 싶을 때 <span class="clr-grey">cf) 단순 삽입/조회만 한다면 해시테이블 사용을 권장</span>
- 예: 'a', 'axe'로 시작하는 단어를 찾고 싶을 때

> 예시, M, MA, MAN, MANY를 차례대로 살펴보는 경우 트리의 현재 노드를 참조값으로 넘김으로써 루트 노드에서 시작할 필요가 없고 단순히 Y가 MAN의 자식인지만 확인해보면 된다.

## 트라이 VS 해시테이블

- 최악의 경우, 시간복잡도는?
  - 트라이 : O(K) (K: 가장 긴 문자열)
  - 해시테이블 : 충돌이 자주 발생되었다면 O(N)의 시간복잡도를 가진다. (N: 키의 개수) 또한 입력 문자열을 기반으로 해시 계산을 하므로 O(K)의 시간이 걸린다.
  -  cf) 탐색할 문자열이 트라이에 없는 경우에는 문자열 길이 K보다 시간이 덜 걸린다.

> **트라이와 해시의 시간복잡도가 비슷하다..?** <br/>
> 길이가 K인 무자열이 주어졌을 때 트라이는 O(K) 시간에 해당 문자열이 유효한 접두사인지 확인할 수 있다. 이 시간은 해시테이블 사용했을 때와 정확히 같은 수행 시간이다. 우리가 종종 해시테이블을 검색하는 시간이 O(1)이라고 하지만 완전히 맞는 말은 아니다. 해시테이블도 입력 문자열은 전부 읽어야 하므로 길이가 K인 단어를 검색하는 데 걸리는 시간은 O(K)가 된다.

- 알파벳 정렬?
  - 일반적으로 자료구조에 문자열을 저장한다면 각 문자열의 순서가 중요하기도 하다. 트라이는 노드를 저장할 때 왼쪽에서 오른쪽으로 사전 순으로 저장한다면 쉽게 정렬이 가능하다.

- 기타
  - 트라이는 삭제가 직관적이며 해시 함수가 필요 없으나 해시 테이블 보다는 많은 공간을 차지한다.

## 트라이 구현

```javascript
class Trie {
  constructor(key) {
    this.is_terminal = false
    this.key = key
    this.trie_child = Array(26).fill(null)    
  }

  char_to_index(key) {
    return key.charCodeAt(0) - 'a'.charCodeAt(0)
  }

  // 새로운 문자열을 트라이에 추가
  insert (key) {
    let current_trie = this
    for (let i=0; i<key.length; i++) {      
      let index = this.char_to_index(key[i])
      if (current_trie.trie_child[index] === null) current_trie.trie_child[index] = new Trie(key.slice(0, i+1))
      current_trie = current_trie.trie_child[index]   
    }
    current_trie.is_terminal = true
  }

  // 트라이 출력
  print (trie, dep) {
    console.log(dep, trie.key)
    if (trie.is_terminal) return
    for (let i=0; i<26; i++) {
      if (trie.trie_child[i] !== null) this.print(trie.trie_child[i], dep + 1)
    }
  }

  // key를 접두어로 가지고 있는지, 가지고 있으면 해당 접두어가 끝나는 부분의 위치를 반환
  find (key) {
    let current_trie = this
    for (let i=0; i<key.length; i++) {      
      let index = this.char_to_index(key[i])
      if (current_trie.trie_child[index] === null) return false
      else current_trie = current_trie.trie_child[index]   
    }
    return current_trie
  }

  // key를 포함하는 지, 포함하면 true
  exist (key) {
    let current_trie = this
    for (let i=0; i<key.length; i++) {      
      let index = this.char_to_index(key[i])
      if (current_trie.trie_child[index] === null) return false
      else current_trie = current_trie.trie_child[index]   
    }
    return current_trie.is_terminal
  }
  

}

var trie = new Trie(null)
var arr = ['to','tea', 'ted', 'ten', 'a', 'inn']
arr.forEach(str => trie.insert(str))
// trie.print(trie, 0)
console.log(trie.exist('tea')) // true
console.log(trie.exist('aaa')) // false
console.log(trie.exist('a')) // true
console.log(trie.find('te')) // Trie {is_terminal: false, key: "te", trie_child: Array(26)}

```

# 4. 그래프(Graph)