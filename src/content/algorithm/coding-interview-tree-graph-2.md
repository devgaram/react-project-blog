---
title: 알고리즘 개념 잡자 3탄 - 이진힙
date: 2020-01-03
tags: [coding-interview, data-structure]
category: algorithm
---

> 참고 서적<br/>
> [코딩 인터뷰 완전분석](https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=115116545) 트리와 그래프<br/>
> [C언어로 쉽게 풀어쓴 자료구조](http://www.yes24.com/Product/Goods/69750539) 제 7장 트리, 제 8장 우선순위 큐

# 1. 이진 힙(최소힙과 최대힙)
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

