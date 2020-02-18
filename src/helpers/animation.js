import {
  isFunction
} from './util'

const Easing = {
  linear: function (p) {
    return p
  },
  swing: function (p) {
    return 0.5 - Math.cos(p * Math.PI) / 2
  }
}

class AnimationFrameTask {
  constructor(idle) {
    this.stop = function () {
      if (idle) {
        cancelAnimationFrame(idle)
      }
    }
  }
}

/**
 * 变化解帧
 * @param options
 */
export function frameTo (options) {
  const {
    from,
    to,
    duration,
    progress,
    complete
  } = options

  const start = Date.now()
  const end = start + duration

  let idle

  function step () {
    idle = requestAnimationFrame(function () {
      const t = Date.now()
      let current

      if (t >= end) {
        current = to

        if (isFunction(progress)) {
          progress({
            current
          })
        }

        if (isFunction(complete)) {
          complete()
        }
      } else {
        const p = Easing['swing']((t - start) / duration)
        current = from + (to - from) * p

        if (isFunction(progress)) {
          progress({
            current
          })
        }

        step()
      }
    })
  }

  if (from !== to) {
    step()
  }

  return new AnimationFrameTask(idle)
}
