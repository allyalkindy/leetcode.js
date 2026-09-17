# JavaScript LeetCode Cheat Sheet

Quick-reference syntax for solving the 50-question interview list. Organized by data structure/topic — use Ctrl+F to jump to what you need.

---

## Table of Contents
1. [Arrays](#arrays)
2. [Strings](#strings)
3. [Objects (Hash Maps)](#objects-hash-maps)
4. [Map & Set (built-in)](#map--set-built-in)
5. [Numbers & Math](#numbers--math)
6. [Sorting & Comparators](#sorting--comparators)
7. [Two Pointers / Sliding Window Templates](#two-pointers--sliding-window-templates)
8. [Linked Lists](#linked-lists)
9. [Stacks & Queues](#stacks--queues)
10. [Trees (Binary Tree / BST)](#trees-binary-tree--bst)
11. [Graphs (BFS/DFS)](#graphs-bfsdfs)
12. [Heap / Priority Queue (no built-in!)](#heap--priority-queue-no-built-in)
13. [Binary Search Template](#binary-search-template)
14. [Backtracking Template](#backtracking-template)
15. [Dynamic Programming Patterns](#dynamic-programming-patterns)
16. [Common Gotchas](#common-gotchas)

---

## Arrays

```javascript
const arr = [5, 3, 8, 1];

// --- Access / basics ---
arr.length                     // size
arr[0]                         // first element
arr[arr.length - 1]            // last element
arr.at(-1)                     // last element (cleaner)

// --- Add / remove ---
arr.push(9)                    // add to end        -> O(1)
arr.pop()                      // remove from end    -> O(1)
arr.unshift(0)                 // add to front       -> O(n)
arr.shift()                    // remove from front  -> O(n)
arr.splice(2, 1)               // remove 1 item at index 2
arr.splice(2, 0, 99)           // insert 99 at index 2 (no removal)
arr.splice(1, 2, 'a', 'b')     // remove 2 items at index 1, insert 'a','b'

// --- Copy / slice ---
arr.slice(1, 3)                 // shallow copy from index 1 to 2 (end exclusive)
arr.slice()                     // full shallow copy
[...arr]                        // full shallow copy (spread)

// --- Search ---
arr.indexOf(8)                  // first index of value, -1 if not found
arr.includes(8)                 // true/false
arr.find(x => x > 5)            // first element matching condition
arr.findIndex(x => x > 5)       // first index matching condition
arr.findLast(x => x > 5)        // last element matching (ES2023)
arr.findLastIndex(x => x > 5)

// --- Iteration / transform ---
arr.map(x => x * 2)             // new array, transformed
arr.filter(x => x > 2)          // new array, filtered
arr.reduce((acc, x) => acc + x, 0)   // fold to single value, 0 = initial acc
arr.forEach(x => console.log(x))     // side effects, no return
arr.some(x => x > 5)            // true if ANY match
arr.every(x => x > 5)           // true if ALL match

// --- Reordering ---
arr.reverse()                   // reverses IN PLACE
arr.sort()                      // sorts IN PLACE (see Sorting section!)
arr.flat()                      // flattens one level of nested arrays
arr.flat(Infinity)              // flattens all levels
arr.flatMap(x => [x, x * 2])    // map then flat(1)

// --- Fill / create ---
new Array(5).fill(0)            // [0,0,0,0,0]
Array(5).fill(0).map(() => [])  // 5 empty arrays (avoid fill([]) - shares reference!)
Array.from({length: 5}, (_, i) => i)   // [0,1,2,3,4]
Array.from({length: n}, () => new Array(m).fill(0))  // n x m 2D grid of 0s

// --- Join / convert ---
arr.join(',')                   // array -> string: "5,3,8,1"
"5,3,8,1".split(',')            // string -> array

// --- Destructuring / swap ---
const [first, second, ...rest] = arr;
[arr[0], arr[1]] = [arr[1], arr[0]];   // swap without temp variable
```

### 2D Arrays / Matrices
```javascript
// Create m x n grid filled with 0
const grid = Array.from({length: m}, () => new Array(n).fill(0));

// Iterate
for (let r = 0; r < grid.length; r++) {
  for (let c = 0; c < grid[0].length; c++) {
    // grid[r][c]
  }
}

// 4-directional neighbors (common in Number of Islands, Pacific Atlantic, etc.)
const directions = [[1,0],[-1,0],[0,1],[0,-1]];
for (const [dr, dc] of directions) {
  const nr = r + dr, nc = c + dc;
  if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length) {
    // valid neighbor
  }
}
```

---

## Strings

```javascript
const s = "hello world";

// --- Basics ---
s.length
s[0]                            // 'h' (strings are indexable but immutable)
s.charAt(0)                     // same as s[0]
s.charCodeAt(0)                 // ASCII/Unicode code of char
String.fromCharCode(104)        // 'h' from code

// --- Search ---
s.indexOf('world')              // index or -1
s.includes('wor')                // true/false
s.startsWith('hel')
s.endsWith('rld')

// --- Transform ---
s.toUpperCase()
s.toLowerCase()
s.trim()                         // remove leading/trailing whitespace
s.replace('world', 'there')      // replaces FIRST match
s.replaceAll('l', 'L')           // replaces ALL matches
s.repeat(3)                      // 'hellohellohello'... (repeats whole string)
s.padStart(15, '0')              // pad left to length 15
s.padEnd(15, '0')                // pad right to length 15

// --- Slice / substring ---
s.slice(0, 5)                    // "hello" (end exclusive, supports negative index)
s.substring(0, 5)                // similar, no negative index support

// --- Split / join ---
s.split(' ')                     // ["hello", "world"]
s.split('')                      // ['h','e','l','l','o',' ','w'...] - char array!
[...s]                           // also splits into char array (handles unicode better)
["h","e","l","l","o"].join('')   // back to string "hello"

// --- Comparison ---
s === "hello world"              // use === always, not ==
s.localeCompare("hello world")   // -1, 0, or 1 (for sorting strings)

// --- Building strings efficiently ---
// Strings are immutable -> avoid `str += char` in a tight loop for huge inputs.
// Prefer collecting into an array then joining:
const parts = [];
parts.push('a'); parts.push('b');
parts.join('');                  // 'ab'
```

### Char checks (no built-in isDigit/isAlpha in JS)
```javascript
const isDigit = c => c >= '0' && c <= '9';
const isAlpha = c => /[a-zA-Z]/.test(c);
const isAlphaNumeric = c => /[a-zA-Z0-9]/.test(c);
const isLower = c => c === c.toLowerCase() && c !== c.toUpperCase();
```

---

## Objects (Hash Maps)

Plain objects work as basic hash maps but keys are coerced to strings — prefer `Map` when keys aren't simple strings (see next section). Still very common for quick frequency counters.

```javascript
const obj = {};

// --- Set / get / check ---
obj['a'] = 1;
obj.a = 1;                        // same thing (dot notation)
obj['a'] += 1;                    // increment
obj['b'] = (obj['b'] || 0) + 1;   // safe increment pattern (frequency counter)

'a' in obj                        // true/false - key existence check
obj.hasOwnProperty('a')           // true/false
obj['z'] === undefined            // check missing key

delete obj['a'];                  // remove key

// --- Iterate ---
Object.keys(obj)                  // ['a', 'b']
Object.values(obj)                // [1, 2]
Object.entries(obj)               // [['a',1], ['b',2]]

for (const key in obj) { }        // iterate keys
for (const [k, v] of Object.entries(obj)) { }  // iterate key-value pairs
```

### Frequency counter pattern (extremely common)
```javascript
function countFreq(arr) {
  const freq = {};
  for (const x of arr) {
    freq[x] = (freq[x] || 0) + 1;
  }
  return freq;
}
```

### Grouping pattern (e.g. Group Anagrams)
```javascript
function groupBy(arr, keyFn) {
  const groups = {};
  for (const item of arr) {
    const key = keyFn(item);
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  }
  return groups;
}
// usage for Group Anagrams: keyFn = word => [...word].sort().join('')
```

---

## Map & Set (built-in)

`Map` and `Set` are preferred over plain objects when: keys aren't strings, you need guaranteed insertion order, or you need `.size` and easy iteration.

```javascript
// --- Map ---
const map = new Map();
map.set('a', 1);
map.get('a');                  // 1, or undefined if missing
map.has('a');                  // true/false
map.delete('a');
map.size;                      // number of entries

for (const [k, v] of map) { }         // iterate entries, insertion order
for (const k of map.keys()) { }
for (const v of map.values()) { }

// safe increment (cleaner than objects)
map.set(x, (map.get(x) || 0) + 1);

// --- Set ---
const set = new Set([1, 2, 3]);
set.add(4);
set.has(2);                    // true
set.delete(2);
set.size;

[...set]                       // convert to array
new Set(arr).size === arr.length   // classic "has duplicates" check

// Set intersection / union / difference (manual - no built-ins)
const intersection = new Set([...setA].filter(x => setB.has(x)));
const union = new Set([...setA, ...setB]);
const difference = new Set([...setA].filter(x => !setB.has(x)));
```

---

## Numbers & Math

```javascript
Math.max(1, 5, 3)                // 5
Math.min(1, 5, 3)                // 1
Math.max(...arr)                 // max of array (spread)
Math.abs(-5)                     // 5
Math.floor(4.7)                  // 4
Math.ceil(4.2)                   // 5
Math.round(4.5)                  // 5
Math.pow(2, 10)                  // 1024
2 ** 10                          // 1024 (exponent operator)
Math.sqrt(16)                    // 4

Number.MAX_SAFE_INTEGER          // 9007199254740991
Number.MIN_SAFE_INTEGER          // -9007199254740991
Infinity                         // useful as initial min/max sentinel
-Infinity

// integer division / modulo
Math.floor(7 / 2)                // 3  (integer division)
7 % 2                            // 1  (modulo, careful with negatives!)
-7 % 2                           // -1 in JS (NOT 1 like Python)

// parsing
parseInt("42")                   // 42
Number("42")                     // 42
parseFloat("3.14")               // 3.14

// bit manipulation
5 & 1                            // AND
5 | 1                            // OR
5 ^ 1                            // XOR
~5                                // NOT
5 << 1                            // left shift (multiply by 2)
5 >> 1                            // right shift (divide by 2)
5 >>> 1                           // unsigned right shift
```

---

## Sorting & Comparators

⚠️ **`arr.sort()` with no comparator sorts as STRINGS by default** — `[10, 2, 1].sort()` gives `[1, 10, 2]`, not `[1, 2, 10]`. Always pass a comparator for numbers.

```javascript
arr.sort((a, b) => a - b);        // ascending numeric
arr.sort((a, b) => b - a);        // descending numeric

// sort array of objects/pairs by a field
people.sort((a, b) => a.age - b.age);

// sort strings
words.sort();                     // lexicographic (default works fine for strings)
words.sort((a, b) => a.localeCompare(b));  // locale-aware

// sort by multiple criteria (e.g. by freq desc, then alpha asc)
items.sort((a, b) => b.freq - a.freq || a.word.localeCompare(b.word));

// custom key sort (e.g. sort by string length)
arr.sort((a, b) => a.length - b.length);
```

---

## Two Pointers / Sliding Window Templates

```javascript
// --- Two pointers (converging, e.g. sorted array / palindrome) ---
let left = 0, right = arr.length - 1;
while (left < right) {
  // check/process arr[left], arr[right]
  left++;
  right--;
}

// --- Sliding window (variable size, e.g. longest substring w/o repeat) ---
let left = 0;
let windowSet = new Set(); // or Map for counts
let maxLen = 0;

for (let right = 0; right < s.length; right++) {
  while (windowSet.has(s[right])) {
    windowSet.delete(s[left]);
    left++;
  }
  windowSet.add(s[right]);
  maxLen = Math.max(maxLen, right - left + 1);
}
```

---

## Linked Lists

```javascript
// Node definition (given in most LeetCode linked list problems)
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Build a list manually (for testing)
const head = new ListNode(1, new ListNode(2, new ListNode(3)));

// Traverse
let curr = head;
while (curr !== null) {
  // process curr.val
  curr = curr.next;
}

// Reverse a linked list
function reverseList(head) {
  let prev = null, curr = head;
  while (curr !== null) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev; // new head
}

// Fast/slow pointer (cycle detection, find middle)
let slow = head, fast = head;
while (fast !== null && fast.next !== null) {
  slow = slow.next;
  fast = fast.next.next;
  if (slow === fast) { /* cycle detected */ }
}

// Dummy head pattern (simplifies edge cases in merge/remove problems)
const dummy = new ListNode(0);
dummy.next = head;
let tail = dummy;
// ... build/modify list from tail ...
return dummy.next; // real head
```

---

## Stacks & Queues

JS has no built-in Stack/Queue class — arrays fill both roles.

```javascript
// --- Stack (LIFO) — use push/pop, both O(1) ---
const stack = [];
stack.push(1);
stack.pop();                    // removes & returns last item
stack[stack.length - 1];        // peek top without removing
stack.length === 0;             // isEmpty check

// --- Queue (FIFO) ---
// ⚠️ arr.shift() is O(n) — fine for small inputs, but avoid in hot loops
// for BFS on large graphs, this is usually still acceptable in interviews.
const queue = [];
queue.push(1);                  // enqueue
queue.shift();                  // dequeue (removes from front)

// For performance-critical BFS, use an index pointer instead of shift():
let queue = [start];
let i = 0;
while (i < queue.length) {
  const curr = queue[i++];
  // process curr, then queue.push(neighbor)
}
```

---

## Trees (Binary Tree / BST)

```javascript
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// --- Recursive DFS traversals ---
function inorder(node, result = []) {
  if (!node) return result;
  inorder(node.left, result);
  result.push(node.val);
  inorder(node.right, result);
  return result;
}
// preorder: push before recursing left/right
// postorder: push after recursing left/right

// --- Recursive depth/height ---
function maxDepth(node) {
  if (!node) return 0;
  return 1 + Math.max(maxDepth(node.left), maxDepth(node.right));
}

// --- BFS / level order (uses a queue) ---
function levelOrder(root) {
  if (!root) return [];
  const result = [];
  let queue = [root];
  while (queue.length > 0) {
    const level = [];
    const next = [];
    for (const node of queue) {
      level.push(node.val);
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    result.push(level);
    queue = next;
  }
  return result;
}

// --- Iterative DFS with explicit stack (alternative to recursion) ---
function preorderIterative(root) {
  if (!root) return [];
  const result = [];
  const stack = [root];
  while (stack.length > 0) {
    const node = stack.pop();
    result.push(node.val);
    if (node.right) stack.push(node.right);  // push right first
    if (node.left) stack.push(node.left);    // so left is processed first
  }
  return result;
}
```

---

## Graphs (BFS/DFS)

```javascript
// Build adjacency list from edge list
const graph = new Map();
for (const [u, v] of edges) {
  if (!graph.has(u)) graph.set(u, []);
  if (!graph.has(v)) graph.set(v, []);
  graph.get(u).push(v);
  graph.get(v).push(u);          // omit this line for directed graphs
}

// --- DFS (recursive) ---
function dfs(node, visited = new Set()) {
  if (visited.has(node)) return;
  visited.add(node);
  for (const neighbor of graph.get(node) || []) {
    dfs(neighbor, visited);
  }
}

// --- BFS ---
function bfs(start) {
  const visited = new Set([start]);
  const queue = [start];
  let i = 0;
  while (i < queue.length) {
    const node = queue[i++];
    for (const neighbor of graph.get(node) || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}

// --- Grid DFS (e.g. Number of Islands) ---
function dfsGrid(grid, r, c, visited) {
  if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length) return;
  if (visited.has(`${r},${c}`) || grid[r][c] === '0') return;
  visited.add(`${r},${c}`);
  dfsGrid(grid, r + 1, c, visited);
  dfsGrid(grid, r - 1, c, visited);
  dfsGrid(grid, r, c + 1, visited);
  dfsGrid(grid, r, c - 1, visited);
}
```

---

## Heap / Priority Queue (no built-in!)

JS has **no built-in heap/PriorityQueue**. Two options in an interview:

**Option A — mention it, then fake it with sort (fine for most interview-sized inputs):**
```javascript
const minHeapLike = [];
minHeapLike.push(x);
minHeapLike.sort((a, b) => a - b);   // O(n log n) each time - say this out loud as a tradeoff
const smallest = minHeapLike.shift();
```

**Option B — implement a real binary min-heap (better, shows depth):**
```javascript
class MinHeap {
  constructor() { this.heap = []; }

  peek() { return this.heap[0]; }
  size() { return this.heap.length; }

  push(val) {
    this.heap.push(val);
    this._bubbleUp(this.heap.length - 1);
  }

  pop() {
    const top = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this._bubbleDown(0);
    }
    return top;
  }

  _bubbleUp(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.heap[parent] <= this.heap[i]) break;
      [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
      i = parent;
    }
  }

  _bubbleDown(i) {
    const n = this.heap.length;
    while (true) {
      let smallest = i;
      const left = 2 * i + 1, right = 2 * i + 2;
      if (left < n && this.heap[left] < this.heap[smallest]) smallest = left;
      if (right < n && this.heap[right] < this.heap[smallest]) smallest = right;
      if (smallest === i) break;
      [this.heap[smallest], this.heap[i]] = [this.heap[i], this.heap[smallest]];
      i = smallest;
    }
  }
}
// For a max-heap: flip comparisons (>=, >) in bubbleUp/bubbleDown
```

---

## Binary Search Template

```javascript
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);  // avoids overflow (habit from other langs)
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1; // not found
}

// Binary search on rotated array / "find boundary" variant:
// keep the same skeleton, just change the condition inside the loop
// to decide which half is "sorted" / which half to discard.
```

---

## Backtracking Template

```javascript
function backtrack(path, choices, result) {
  if (/* base case: path is complete */) {
    result.push([...path]);   // ⚠️ copy the array! pushing `path` itself stores a reference
    return;
  }
  for (const choice of choices) {
    path.push(choice);          // make choice
    backtrack(path, remainingChoices, result);  // explore
    path.pop();                 // undo choice (backtrack)
  }
}

// Example skeleton for Subsets:
function subsets(nums) {
  const result = [];
  function backtrack(start, path) {
    result.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  }
  backtrack(0, []);
  return result;
}
```

---

## Dynamic Programming Patterns

```javascript
// --- 1D memoization (top-down) ---
function fib(n, memo = new Map()) {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n);
  const result = fib(n - 1, memo) + fib(n - 2, memo);
  memo.set(n, result);
  return result;
}

// --- 1D tabulation (bottom-up) ---
function climbStairs(n) {
  if (n <= 2) return n;
  const dp = new Array(n + 1).fill(0);
  dp[1] = 1; dp[2] = 2;
  for (let i = 3; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
  return dp[n];
}

// --- 2D DP table (e.g. Longest Common Subsequence) ---
function lcs(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = Array.from({length: m + 1}, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}
```

---

## Common Gotchas

- `arr.sort()` defaults to **string** comparison — always pass `(a,b) => a - b` for numbers.
- `==` vs `===`: always use `===`/`!==` to avoid type coercion bugs.
- `arr.fill([])` / `fill({})` shares the **same reference** across all slots — use `Array.from` with a callback instead when filling with objects/arrays.
- Object keys are always coerced to strings — use `Map` if you need number/object keys to stay distinct.
- `-7 % 2` is `-1` in JS, not `1` — be careful with modulo on negative numbers.
- `NaN === NaN` is `false` — use `Number.isNaN(x)` to check for NaN.
- `undefined` vs `null`: `arr[999]` (out of bounds) gives `undefined`, not an error.
- Default parameters with mutable defaults (e.g. `memo = new Map()`) are re-created on every call — safe in JS (unlike Python's mutable default argument trap).
- `const` for arrays/objects still allows mutating contents (`push`, property assignment) — `const` only locks the variable binding, not the value.
- Deep copy: `structuredClone(obj)` (modern) or `JSON.parse(JSON.stringify(obj))` (works for plain data, breaks on functions/undefined/Dates).
