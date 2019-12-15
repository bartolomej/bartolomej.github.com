window.onload = startAnimation;
window.onresize = startAnimation;

let insertionCtx = getCanvasContext('insertion-sort-canvas');
let selectionCtx = getCanvasContext('selection-sort-canvas');
let bubbleCtx = getCanvasContext('bubble-sort-canvas');

let insertionInterval;
let selectionInterval;
let bubbleInterval;

function startAnimation () {
  startInsertionSort();
  startSelectionSort();
  startBubbleSort();
}

function startInsertionSort () {
  clearInterval(insertionInterval);
  insertionInterval = animate(insertionCtx, insertionSortAscending);
}

function startSelectionSort () {
  clearInterval(selectionInterval);
  selectionInterval = animate(selectionCtx, selectionSortAscending);
}

function startBubbleSort () {
  clearInterval(bubbleInterval);
  bubbleInterval = animate(bubbleCtx, bubbleSortAscending);
}

function animate (ctx, func, array) {
  let g = func(randArray(100, 100));
  let interval = setInterval(() => {
    let nextValue = g.next().value;
    if (!nextValue) return clearInterval(interval);
    drawArray(ctx, nextValue)
  }, 50);
  return interval;
}

function randArray (size, max) {
  return new Array(size)
    .fill(0)
    .map(_ => Math.round(Math.random() * max));
}

function getCanvasContext (id, width, height) {
  const canvas = document.getElementById(id);
  canvas.height = 200;
  canvas.width = document.getElementsByTagName('article')[0].clientWidth;
  return canvas.getContext('2d');
}

function drawArray (ctx, array) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.moveTo(0, ctx.canvas.height);
  let stepX = Math.round(ctx.canvas.width / array.length);
  ctx.beginPath();
  for (let i = 0; i < array.length; i++) {
    ctx.moveTo(i * stepX, ctx.canvas.height);
    ctx.lineTo(i * stepX, ctx.canvas.height - array[i]);
  }
  ctx.stroke();
}

function* insertionSortAscending (array) {
  let cloned = Array.from(array);
  for (let i = 1; i < cloned.length; i++) {
    let j = i;
    while (j >= 0 && cloned[j - 1] > cloned[j]) {
      let s = cloned[j - 1];
      cloned[j - 1] = cloned[j];
      cloned[j] = s;
      j--;
    }
    yield cloned;
  }
  return cloned;
}

function* selectionSortAscending (array) {
  let cloned = Array.from(array);
  for (let i = 0; i < cloned.length - 1; i++) {
    let minIndex = i;
    for (let j = i; j < cloned.length; j++) {
      if (cloned[j] > cloned[minIndex]) {
        minIndex = j;
      }
    }
    let current = cloned[i];
    cloned[i] = cloned[minIndex];
    cloned[minIndex] = current;
    yield cloned;
  }
  return cloned;
}

function* bubbleSortAscending (array) {
  let cloned = Array.from(array);
  let swapped = true;
  while (swapped) {
    yield cloned;
    swapped = false;
    for (let i = 1; i < cloned.length; i++) {
      if (cloned[i] < cloned[i - 1]) {
        let element = cloned[i];
        cloned[i] = cloned[i - 1];
        cloned[i - 1] = element;
        swapped = true;
      }
    }
  }
  return cloned;
}