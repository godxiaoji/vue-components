import Exception from '../helpers/exception'

// import { inArray } from "../helpers/util";
const DEFAULT_EVENTS = [
  'scroll',
  'wheel',
  'mousewheel',
  'resize',
  'animationend',
  'transitionend',
  'touchmove'
]

export function loadNow(vm) {
  loadImageAsync(
    vm,
    res => {
      vm.onLoad(res)
    },
    e => {
      vm.onError(e)
    }
  )
}

function loadImageAsync(item, resolve, reject) {
  let image = new Image()
  if (!item || !item.src) {
    const err = new Exception(
      'src is required',
      Exception.TYPE.DEFAULT,
      'Image'
    )
    return reject(err)
  }

  image.src = item.src

  image.onload = function(e) {
    resolve({
      naturalHeight: image.naturalHeight,
      naturalWidth: image.naturalWidth,
      src: item.src,
      event: e
    })
  }

  image.onerror = function() {
    reject(
      new Exception(
        `src "${item.src}" not found`,
        Exception.TYPE.DEFAULT,
        'Image'
      )
    )
  }
}

const ListenerQueue = []

function lazyCheck(vm) {
  if (vm.checkInView()) {
    loadImageAsync(
      vm,
      res => {
        removeComponentFromLazy(vm)
        vm.onLoad(res)
      },
      e => {
        removeComponentFromLazy(vm)
        vm.onError(e)
      }
    )
  }
}

export function removeComponentFromLazy(vm) {
  const index = ListenerQueue.indexOf(vm)

  if (index >= 0) {
    ListenerQueue.splice(index, 1)
  }

  if (ListenerQueue.length === 0) {
    // 没有监听对队列了，在1秒后关闭监听
    clearTimeout(offTimer)
    offTimer = setTimeout(off, 1000)
  }
}

export function addLazyQueue(vm) {
  const index = ListenerQueue.indexOf(vm)

  if (index === -1) {
    // 如果不存在，入监听队列
    ListenerQueue.push(vm)
  }

  // 进来的时候优先测试一下
  lazyCheck(vm)

  on()
}

function checkQueue() {
  // 此时的this 指的是window
  ListenerQueue.forEach(vm => {
    lazyCheck(vm)
  })
}

// 性能优化
let isOn = false
let offTimer = null

function on() {
  clearTimeout(offTimer)
  if (!isOn) {
    // 没有开启才可以添加事件
    DEFAULT_EVENTS.forEach(eventName => {
      window.addEventListener(eventName, checkQueue, false)
    })
  }
}

function off() {
  if (ListenerQueue.length === 0) {
    // 确认真没有监听事件才关闭
    DEFAULT_EVENTS.forEach(eventName => {
      window.removeEventListener(eventName, checkQueue, false)
    })
    isOn = false
  }
}
