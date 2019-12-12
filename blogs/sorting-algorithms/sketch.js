window.onload = startAnimation;
window.onresize = startAnimation;

let insertionCtx = getCanvasContext('insertion-sort-canvas');
let selectionCtx = getCanvasContext('selection-sort-canvas');
let bubbleCtx = getCanvasContext('bubble-sort-canvas');

function startAnimation () {
  startInsertion();
}

function startInsertion () {
  let g = selectionSortAscending([50,40,30,20,10]);
  setInterval(() => {
    let nextValue = g.next().value;
    console.log(nextValue);
    drawArray(insertionCtx, nextValue)
  }, 2000)
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

function animateSort ({ ctx, generator }) {
  return window.requestAnimationFrame(draw);

  function draw () {
    window.requestAnimationFrame(draw);

    let nextResult = generator.next();
    if (nextResult.done) return;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.moveTo(0, ctx.canvas.height);
    let array = nextResult.value;
    let stepX = ctx.canvas.width / array.length;
    for (let i = 0; i < array.length; i++) {
      ctx.moveTo(i * stepX, ctx.canvas.height);
      ctx.lineTo(i * stepX, array[i]);
    }
    ctx.stroke();
  }
}

function drawArray (ctx, array) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.moveTo(0, ctx.canvas.height);
  let stepX = Math.round(ctx.canvas.width / array.length);
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
    let k = i;
    for (let j = i; j < cloned.length; j++) {
      if (cloned[j] < cloned[i]) {
        k = j;
      }
    }
    let current = cloned[i];
    cloned[i] = cloned[k];
    cloned[k] = current;
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