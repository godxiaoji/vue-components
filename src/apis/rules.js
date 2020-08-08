import Exception from '../helpers/exception'
import { isObject, NotNull, inArray, isString } from '../helpers/util'

export const apiRules = {
  /**
   * 数据存储
   */
  getStorage: {
    key: {
      type: String,
      required: true
    }
  },
  setStorage: {
    key: {
      type: String,
      required: true
    },
    data: {
      type: NotNull,
      required: true
    }
  },
  removeStorage: {
    key: {
      type: String,
      required: true
    }
  },
  clearStorage: {},
  getStorageInfo: {},
  /**
   * 界面
   */
  showModal: {
    title: {
      type: String,
      default: '提示'
    },
    content: {
      type: String,
      required: true
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: false
    }
  },
  showToast: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      enums: ['none', 'success', 'loading']
    },
    image: {
      type: String
    },
    duration: {
      type: Number,
      default: 1500
    },
    mask: {
      type: Boolean,
      default: false
    }
  },
  hideToast: {},
  showLoading: {
    title: {
      type: String,
      required: true
    },
    mask: {
      type: Boolean,
      default: false
    }
  },
  hideLoading: {},
  /**
   * 路由
   */
  switchTab: {
    url: {
      type: String,
      required: true
    }
  },
  navigateTo: {
    url: {
      type: String,
      required: true
    }
  },
  redirectTo: {
    url: {
      type: String,
      required: true
    }
  },
  navigateBack: {
    delta: {
      type: Number,
      default: 1
    }
  },
  reLaunch: {
    url: {
      type: String,
      required: true
    }
  }
}

const PARAM_ERROR = Exception.TYPE.PARAM_ERROR

const emptys = ['null', 'undefined', 'NaN']

function getType(obj) {
  if (obj === null) {
    return 'null'
  }
  if (typeof obj === 'number' && isNaN(obj)) {
    return 'NaN'
  }
  if (isString(obj) && inArray(obj, emptys)) {
    return `any(not in [${emptys
      .map(v => {
        return `"${v}"`
      })
      .join(', ')}])`
  }
  return typeof obj
}

export const parseParamsByRules = function(options, apiName) {
  if (!isObject(options)) {
    options = {}
  }

  const rules = apiRules[apiName]
  const params = {}

  for (const k in rules) {
    const rule = rules[k]
    if (rule.required && options[k] == null) {
      throw new Exception(
        `param0.${k} should be ${getType(rule.type())} instead of ${getType(
          options[k]
        )}`,
        PARAM_ERROR,
        apiName
      )
    } else if (options[k] != null) {
      if (rule.type(options[k]) !== options[k]) {
        throw new Exception(
          `param0.${k} should be ${getType(rule.type())} instead of ${getType(
            options[k]
          )}`,
          PARAM_ERROR,
          apiName
        )
      } else if (rule.enums && !inArray(options[k], rule.enums)) {
        throw new Exception(
          `param0.${k} should be in [${rule.enums
            .map(v => {
              return `"${v}"`
            })
            .join(', ')}]`,
          PARAM_ERROR,
          apiName
        )
      } else {
        // 类型匹配正确
        params[k] = options[k]
      }
    } else if (rule.default) {
      params[k] = rule.default
    }
  }

  return params
}
