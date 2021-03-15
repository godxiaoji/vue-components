import Exception from '@/helpers/exception'

export interface ImageLoadedResource {
  naturalHeight: number
  naturalWidth: number
  src: string
  event: Event
}

export type ImageLoadObject = {
  uid: number
  src: string
  checkInView: () => boolean
  onLoad: (res: ImageLoadedResource) => void
  onError: (e: Exception) => void
}

const DEFAULT_EVENTS = [
  'scroll',
  'wheel',
  'mousewheel',
  'resize',
  'animationend',
  'transitionend',
  'touchmove'
]

export function loadNow(vm: ImageLoadObject) {
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

function loadImageAsync(
  item: ImageLoadObject,
  resolve: (res: ImageLoadedResource) => void,
  reject: (e: Exception) => void
) {
  const image = new Image()
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
    } as ImageLoadedResource)
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

const ListenerQueue: ImageLoadObject[] = []

function lazyCheck(vm: ImageLoadObject) {
  if (vm.checkInView()) {
    loadImageAsync(
      vm,
      res => {
        removeComponentFromLazy(vm.uid)
        vm.onLoad(res)
      },
      e => {
        removeComponentFromLazy(vm.uid)
        vm.onError(e)
      }
    )
  }
}

export function removeComponentFromLazy(uid: number) {
  const index = lazyQueueIndexOf(uid)

  if (index > -1) {
    ListenerQueue.splice(index, 1)
  }

  if (ListenerQueue.length === 0) {
    // 没有监听对队列了，在1秒后关闭监听
    clearTimeout(offTimer)
    offTimer = window.setTimeout(off, 1000)
  }
}

function lazyQueueIndexOf(uid: number) {
  for (let i = 0; i < ListenerQueue.length; i++) {
    if (ListenerQueue[i].uid === uid) {
      return i
    }
  }
  return -1
}

export function addLazyQueue(vm: ImageLoadObject) {
  const index = lazyQueueIndexOf(vm.uid)

  if (index === -1) {
    // 如果不存在，入监听队列
    ListenerQueue.push(vm)
  } else {
    // 覆盖一下
    ListenerQueue[index] = vm
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
let offTimer: number

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
