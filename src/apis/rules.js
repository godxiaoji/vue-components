import Exception from '../helpers/exception'
import { isObject, inArray } from '../helpers/util'
import { notNullValidator, getType } from '../helpers/validator'

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
      validator: notNullValidator,
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
  showDialog: {
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
      enums: ['none', 'success', 'loading'],
      default: 'none'
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
    },
    icon: {
      enums: ['loading'],
      default: 'loading'
    },
    duration: {
      type: Number,
      default: 0
    }
  },
  hideLoading: {},
  showNotify: {
    title: {
      type: String,
      required: true
    },
    type: {
      enums: ['primary', 'success', 'warning', 'danger'],
      default: 'primary'
    },
    duration: {
      type: Number,
      default: 0
    },
    backgroundColor: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: null
    }
  },
  hideNotify: {},
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

export const parseParamsByRules = function(options, apiName) {
  if (!isObject(options)) {
    options = {}
  }

  const rules = apiRules[apiName]
  const ret = {}
  const PARAM_ERROR = Exception.TYPE.PARAM_ERROR

  for (const k in rules) {
    const rule = rules[k]
    const option = options[k]

    if (rule.required && !notNullValidator(option)) {
      throw new Exception(
        `param0.${k} should be ${getType(
          rule.validator || rule.type()
        )} instead of ${getType(option)}`,
        PARAM_ERROR,
        apiName
      )
    } else if (option != null) {
      if (rule.validator) {
        if (!rule.validator(option)) {
          throw new Exception(
            `param0.${k} should be ${getType(rule.validator)}`,
            PARAM_ERROR,
            apiName
          )
        } else {
          ret[k] = option
        }
      } else if (rule.enums) {
        if (!inArray(option, rule.enums)) {
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
          ret[k] = option
        }
      } else if (rule.type(option) !== option) {
        throw new Exception(
          `param0.${k} should be ${getType(rule.type())} instead of ${getType(
            option
          )}`,
          PARAM_ERROR,
          apiName
        )
      } else {
        // 类型匹配正确
        ret[k] = option
      }
    } else if (rule.default) {
      ret[k] = rule.default
    }
  }

  return ret
}
