type status = typeof APP_STATUS[keyof typeof APP_STATUS]
type key = keyof typeof key
const scoreHTML = document.querySelector<HTMLSpanElement>("#puntos")
const speedHTML = document.querySelector<HTMLInputElement>("#speed")
const speedNumberHTML = document.querySelector<HTMLInputElement>("#speedNumber")
const APP_STATUS = {
  STOP: "stop",
  PLAY: "play",
  PAUSE: "pause",
  LOSE: "lose",
  WIN: "win",
} as const
const key = {
  ArrowUp:0,
  ArrowRight:1,
  ArrowDown:2,
  ArrowLeft:3,
} as const
const food:food = {
  x:0,
  y:0
}
const colorText = "white"
const apple = new Image()
const head = new Image()
const tail = new Image()
const grass = new Image()
const eat = new Audio()
const speedMin = 40
const speedMax = 200
const widthBoard = 600
const heightBoard = 400
const size = 10
const minimumLength = 3
const snake:snake[] = []

let direction:number = key.ArrowLeft
let interval:number = 0
let state:status = APP_STATUS.STOP
let eating:boolean = false
let score:number = 0
let speed:number = 100
let blockChangeDirection:boolean = false

function drawBoard(ctx:CanvasRenderingContext2D | null){
  if(ctx){
    ctx.canvas.width = widthBoard
    ctx.canvas.height = heightBoard
    ctx.clearRect(0,0,widthBoard, heightBoard)
    grass.onload = () => {
      const ptrn = ctx.createPattern(grass, "repeat")
      ctx.fillStyle = ptrn as CanvasPattern;
      ctx.fillRect(0,0,widthBoard, heightBoard)
      ctx.fillStyle = colorText
      ctx.font = "Bold 1.5rem Arial"
      ctx.fillText("Presione enter para Iniciar", (widthBoard/2)-140, heightBoard/2)
    }
  }
}

function randomNumber(base:number, _size:number):number {
  const max = (base / _size) - 1
  const numRandom = Math.random() * max
  const numRound = Math.round(numRandom);
  const newPosition = numRound * _size
  return newPosition
}

function validatesPositions():boolean{
  const contentX = snake.some(s=> s.x === food.x)
  const contentY = snake.some(s=> s.y === food.y)
  return contentX && contentY
}

function getFood(ctx:CanvasRenderingContext2D | null){
  if(ctx){
    do {
      food.x = randomNumber(widthBoard, size)
      food.y = randomNumber(heightBoard, size)
    } while (validatesPositions());
    ctx.drawImage(apple, food.x, food.y, size, size)
  }
}

function createPlayer(){
  snake.length = 0
  for (let index = 0; index <= minimumLength; index++) {
    snake.push({
      x:(widthBoard/2) + (index * size),
      y:heightBoard/2,
      old_x:0,
      old_y:0,
    })
  }
}

function play(ctx:CanvasRenderingContext2D | null) {
  if(ctx){
    updateScore()
    createPlayer()
    speed = Number(speedHTML?.value) || speed
    ctx.canvas.width = widthBoard
  }
}

function show(ctx:CanvasRenderingContext2D | null) {
  if(ctx){
    ctx.clearRect(0,0,widthBoard, heightBoard)
    const ptrn = ctx.createPattern(grass, "repeat")
    ctx.fillStyle = ptrn as CanvasPattern;
    ctx.fillRect(0,0,widthBoard, heightBoard)
    snake.forEach( (e,i) => {
      if(i===0){
        ctx.drawImage(head, e.x, e.y)
      }else{
        ctx.drawImage(tail, e.x, e.y)
      }
    });
    ctx.drawImage(apple, food.x, food.y, size, size)
    blockChangeDirection = false
  }
}

const updatePlayer = [
  (i:number) => {snake[i].y -= size},
  (i:number) => {snake[i].x += size},
  (i:number) => {snake[i].y += size},
  (i:number) => {snake[i].x -= size},
]

function next() {
  snake.forEach((s,i,_s) => {
    if(i === 0){
      _s[i].old_x = s.x
      _s[i].old_y = s.y
      updatePlayer[direction](i)
    }
    else{
      _s[i].old_x = s.x
      _s[i].old_y = s.y
      _s[i].x = _s[i-1].old_x
      _s[i].y = _s[i-1].old_y
    }
  });
}

function finished(ctx:CanvasRenderingContext2D | null) {
  if(ctx){
    if(state == APP_STATUS.LOSE){
      ctx.fillStyle = colorText
      ctx.font = "Bold 1.5rem Arial"
      ctx.fillText("Has Perdido, presione enter para reiniciar", (widthBoard/2)-230, heightBoard/2)
    }
  }
}

function updateScore() {
  if(eating){
    score++
  }else{
    score = 0
    direction = 3
  }
  if (scoreHTML) scoreHTML.innerText = score.toString()
}

function colition() {
  // valida colicion con la manzana
  if(snake[0].x === food.x && snake[0].y === food.y ){
    eat.play()
    eating = true
    updateScore()
  }
  // valida colision con los bordes
  if(snake[0].x < 0 || snake[0].x >= widthBoard || snake[0].y < 0 || snake[0].y >= heightBoard){
    clearInterval(interval)
    state = APP_STATUS.LOSE
  }
  // valida colicion con la cola
  for (let i = 1; i < snake.length; i++) {
    if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
      clearInterval(interval)
      state = APP_STATUS.LOSE
      break
    }
  }
}

function move(ctx:CanvasRenderingContext2D | null){
  next()
  show(ctx)
  colition()
  finished(ctx)
  if(eating){
    eating = false
    getFood(ctx)
    snake.push({
      x:snake[snake.length-1].old_x,
      y:snake[snake.length-1].old_y,
      old_x:0,
      old_y:0
    })
  }
}

function validToChangeKey(d:number):boolean {
  return state === APP_STATUS.PLAY && !blockChangeDirection && direction != d
}

function changeDirection(k:key) {
  direction = key[k]
  blockChangeDirection=true
}

function time() {
  return speedMax - speed + speedMin
}

function pause(ctx:CanvasRenderingContext2D | null) {
  if(ctx){
    ctx.fillStyle = colorText
    ctx.font = "Bold 1.5rem Arial"
    ctx.fillText("PAUSADO", (widthBoard/2)-50, heightBoard/2)
  }
}

function initialGame(ctx:CanvasRenderingContext2D | null) {
  play(ctx)
  getFood(ctx)
  interval = setInterval(()=>move(ctx), time()) // 40 - 200
  state = APP_STATUS.PLAY
}

function eventKeyPress(ctx:CanvasRenderingContext2D | null){
  document.addEventListener("keydown", e => {
    switch (e.key) {
      case 'Enter':
        if(state === APP_STATUS.STOP || state === APP_STATUS.LOSE){
          initialGame(ctx)
        }else if(state === APP_STATUS.PAUSE){
          interval = setInterval(()=>move(ctx), time()) // 40 - 200
          state = APP_STATUS.PLAY
        }else if(state === APP_STATUS.PLAY){
          clearInterval(interval)
          state = APP_STATUS.PAUSE
          pause(ctx)
        }
        break
      case 'ArrowUp':
        if (validToChangeKey(2)) changeDirection(e.key)
        break;
      case 'ArrowRight':
        if (validToChangeKey(3)) changeDirection(e.key)
        break;
      case 'ArrowDown':
        if (validToChangeKey(0)) changeDirection(e.key)
        break;
      case 'ArrowLeft':
        if (validToChangeKey(1)) changeDirection(e.key)
        break;
      case 'r':
        if(state === APP_STATUS.LOSE || state === APP_STATUS.PAUSE) initialGame(ctx)
        break;
    }
  })
}

function characterLoad(){
  apple.src = "src/assets/apple.png"
  head.src = "src/assets/head.png"
  tail.src = "src/assets/tail.png"
  grass.src = "src/assets/background.jpg"
  eat.src = "src/assets/eating-sound-effect-36186.mp3"
}

function changeValue(e:Event, ele:HTMLInputElement | null) {
  const value = (e.target as HTMLInputElement).value
  if(ele) ele.value = value
}

export function initial(element: HTMLCanvasElement){
  speedNumberHTML?.addEventListener("input", (e) => { changeValue(e, speedHTML) })
  speedHTML?.addEventListener("input", (e) => { changeValue(e, speedNumberHTML) })
  speedNumberHTML!.value = speed.toString()
  speedHTML!.value = speed.toString()
  const ctx = element.getContext("2d")
  drawBoard(ctx)
  characterLoad()
  eventKeyPress(ctx)
}