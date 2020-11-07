import { isFunction } from './util'

const Easing = {
  linear: function(p) {
    return p
  },
  swing: function(p) {
    return 0.5 - Math.cos(p * Math.PI) / 2
  }
}

class AnimationFrameTask {
  constructor(ref) {
    this.stop = function() {
      if (ref.idle) {
        cancelAnimationFrame(ref.idle)
        ref.idle = null
      }
    }
  }
}

/**
 * 变化解帧
 * @param options
 */
export function frameTo(options) {
  const { from, to, duration, progress, complete } = options

  const start = Date.now()
  const end = start + duration

  const ref = { idle: null }
  let frameIndex = 0

  function step() {
    ref.idle = requestAnimationFrame(function() {
      const t = Date.now()
      let current

      if (t >= end) {
        current = to

        if (isFunction(progress)) {
          progress({
            current,
            frameIndex: frameIndex++
          })
        }

        if (isFunction(complete)) {
          complete({ current })
        }
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
  }

  return new AnimationFrameTask(ref)
}
