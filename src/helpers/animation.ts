import { isFunction } from '@/helpers/util'
import { EasingType } from './types'

type TaskRef = {
  idle: number | null
  id: number
  done: () => void
}

const Easing = {
  linear(p: number) {
    return p
  },
  swing(p: number) {
    return 0.5 - Math.cos(p * Math.PI) / 2
  }
}

let uid = 0

export class AnimationFrameTask {
  stop: () => boolean
  id: number

  constructor(ref: TaskRef, id: number) {
    this.stop = function() {
      if (ref.idle) {
        cancelAnimationFrame(ref.idle)
        ref.idle = null
        ref.done()
        return true
      }

      return false
    }

    this.id = id
  }
}

interface OptionsProgress {
  (res: { current: number; frameIndex: number; id: number }): void
}

interface OptionsComplete {
  (res: { current: number; id: number }): void
}

interface Options {
  from: number
  to: number
  duration: number
  progress: OptionsProgress
  complete?: OptionsComplete
  easing?: EasingType
}

/**
 * 变化解帧
 * @param options 设置项
 */
export function frameTo(options: Options) {
  const { from, to, duration, progress, complete, easing } = options

  const start = Date.now()
  const end = start + duration
  const id = ++uid

  function done() {
    complete && complete({ current, id })
  }

  const ref: TaskRef = { idle: null, id, done }
  let frameIndex = 0
  let current = from

  function step() {
    ref.idle = requestAnimationFrame(function() {
      const t = Date.now()

      if (t >= end) {
        current = to

        progress({
          current,
          frameIndex: ++frameIndex,
          id
        })

        done()
      } else {
        const p = Easing[easing || 'swing']((t - start) / duration)
        current = from + (to - from) * p

        progress({
          current,
          frameIndex: ++frameIndex,
          id
        })

        step()
      }
    })
  }

  progress({
    current,
    frameIndex,
    id
  })

  step()

  return new AnimationFrameTask(ref, id)
}

export function getStretchOffset(offset: number) {
  return Math.ceil(offset / Math.log(Math.abs(offset)))
}
