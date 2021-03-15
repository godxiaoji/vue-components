import { isFunction } from '@/helpers/util'

type TaskRef = {
  idle: number | null
}

const Easing = {
  linear(p: number) {
    return p
  },
  swing(p: number) {
    return 0.5 - Math.cos(p * Math.PI) / 2
  }
}

export class AnimationFrameTask {
  stop: () => void

  constructor(ref: TaskRef) {
    this.stop = function() {
      if (ref.idle) {
        cancelAnimationFrame(ref.idle)
        ref.idle = null
      }
    }
  }
}

interface FrameOptionsComplete {
  (res: { current: number }): void
}

/**
 * 变化解帧
 * @param options 设置项
 */
export function frameTo(options: {
  from: number
  to: number
  duration: number
  progress: (res: { current: number; frameIndex: number }) => void
  complete?: FrameOptionsComplete
}) {
  const { from, to, duration, progress, complete } = options

  const start = Date.now()
  const end = start + duration

  const ref: TaskRef = { idle: null }
  let frameIndex = 0

  function step() {
    ref.idle = requestAnimationFrame(function() {
      const t = Date.now()
      let current

      if (t >= end) {
        current = to

        progress({
          current,
          frameIndex: frameIndex++
        })

        isFunction(complete) && (complete as FrameOptionsComplete)({ current })
      } else {
        const p = Easing['swing']((t - start) / duration)
        current = from + (to - from) * p

        if (isFunction(progress)) {
          progress({
            current,
            frameIndex: frameIndex++
          })
        }

        step()
      }
    })
  }

  if (from !== to) {
    step()
  } else {
    isFunction(complete) && (complete as FrameOptionsComplete)({ current: to })
  }

  return new AnimationFrameTask(ref)
}

export function getStretchOffset(offset: number) {
  return Math.ceil(offset / Math.log(Math.abs(offset)))
}
