import { isObject } from '../helpers/util'
import { parseParamsByRules } from './rules'
import { getCallbackFns } from './callback'
import Exception from '../helpers/exception'

function render(options) {
  const html = [
    `<div class="ly-toast ` +
      (options.image || (options.icon && options.icon !== 'none')
        ? 'has--icon'
        : '') +
      `">`,
    options.mask ? `<div class="ly-toast_mask"></div>` : '',
    `<div class="ly-toast_box">`,
    options.image
      ? `<img class="ly-toast_icon" src="${options.image}" />`
      : options.icon === 'success'
      ? `<i class="ly-toast_icon">
        <svg class="icon" width="48px" height="48.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M887.904744 298.20852c-12.863647-12.063755-33.151673-11.487488-45.215428 1.408843L415.935493 753.983819 182.815858 524.287381c-12.607338-12.416396-32.8644-12.287381-45.280796 0.319957-12.416396 12.576374-12.256417 32.8644 0.352641 45.248112l256.479935 252.671415c0.096331 0.096331 0.223626 0.127295 0.319957 0.223626s0.127295 0.223626 0.223626 0.319957c2.016073 1.919742 4.448434 3.008628 6.784464 4.288456 1.152533 0.672598 2.143368 1.663432 3.359548 2.143368 3.775837 1.47249 7.775299 2.239699 11.743798 2.239699 4.192125 0 8.384249-0.832576 12.287381-2.496009 1.312512-0.543583 2.33603-1.663432 3.552211-2.368714 2.399677-1.408843 4.895686-2.59234 6.944443-4.67206 0.096331-0.096331 0.127295-0.25631 0.223626-0.352641 0.063647-0.096331 0.192662-0.127295 0.287273-0.223626L889.277463 343.420508C901.439269 330.591265 900.768391 310.335923 887.904744 298.20852z" /></svg>
      </i>`
      : options.icon === 'loading'
      ? `<i class="ly-toast_icon loading-icon"><svg class="icon" width="48px" height="48.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M515.698303 969.127499c-97.187972 0-191.279691-31.134554-270.406182-90.479422-96.67193-72.245926-159.45708-178.206619-176.658492-297.928439s13.245087-238.9276 85.663027-335.59953C304.120947 45.239711 588.288258 4.644381 787.99664 154.124643c83.770872 62.78515 143.459768 153.092558 168.2298 254.580884 4.300353 17.373425-6.364522 34.918864-23.737947 39.047203-17.373425 4.128339-34.918864-6.364522-39.047203-23.737947-21.157736-86.867126-72.417941-164.44549-144.147825-218.285906C578.139425 77.750378 334.395431 112.669242 206.244919 283.823282c-62.097094 82.910801-88.243239 185.087183-73.450025 287.607593s68.461616 193.34386 151.372417 255.440954c171.326054 128.322526 414.898035 93.403662 543.220561-77.922392 33.542752-44.895683 56.592642-95.123803 68.289602-149.308248 3.78431-17.373425 21.157736-28.554342 38.359147-24.770032 17.373425 3.78431 28.554342 20.985721 24.770032 38.359147-13.761129 63.473207-40.59533 122.130018-79.814547 174.422308-72.417941 96.67193-178.378633 159.45708-298.100454 176.658492C559.217873 967.579372 537.372081 969.127499 515.698303 969.127499z" /></svg>
        </i>`
      : '',
    `<div class="ly-toast_text">${options.title}</div>`,
    `</div>`,
    `</div>`
  ].join('')

  const $wrapper = document.createElement('div')

  $wrapper.innerHTML = html

  return $wrapper.firstChild
}

var timer = null
var $el = null

function show(object) {
  if (!isObject(object)) {
    object = {}
  }

  let options = {}

  const { success, fail, complete } = getCallbackFns(object)

  try {
    options = Object.assign(
      options,
      parseParamsByRules(object, object._apiName || 'showToast')
    )

    if (object.loading) {
      options.icon = 'loading'
      options.duration = 0
    }

    _hide()

    $el = render(options)
    $el._options = options
    $el._loading = !!object.loading
    document.body.appendChild($el)

    // 定时隐藏
    if (options.duration > 0) {
      timer = setTimeout(() => {
        _hide()
      }, options.duration)
    }

    success({})
  } catch (e) {
    fail(e)
  }
  complete()
}

function _hide() {
  clearTimeout(timer)

  if ($el) {
    document.body.removeChild($el)
    $el = null
  }
}

function hide(object) {
  clearTimeout(timer)

  if (!isObject(object)) {
    object = {}
  }

  const { success, fail, complete } = getCallbackFns(object)

  try {
    if ($el) {
      document.body.removeChild($el)
      $el = null
    }

    success()
  } catch (e) {
    fail(new Exception(e.message))
  }
  complete()
}

export const showToast = show
export const hideToast = hide
export const showLoading = function(object) {
  if (!isObject(object)) {
    object = {}
  }

  object.loading = true
  object._apiName = 'showLoading'
  return show(object)
}
export const hideLoading = function(object) {
  if ($el && $el._loading) {
    hide(object)
  } else if (isObject(object)) {
    const { success, complete } = getCallbackFns(object)
    success({})
    complete()
  }
}
