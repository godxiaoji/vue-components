import Exception from '../helpers/exception'
import { isObject, inArray, cloneData } from '../helpers/util'
import {
  notNullValidator,
  stringArrayValidator,
  getType,
  elementValidator
} from '../helpers/validator'

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
      default: null
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
  previewImage: {
    urls: {
      validator: stringArrayValidator,
      required: true
    },
    current: {
      type: String,
      default: ''
    },
    showClose: {
      type: Boolean,
      default: false
    }
  },
  showToast: {
    title: {
      type: String,
      required: true
    },
    type: {
      enums: ['default', 'success', 'loading', 'fail'],
      default: 'default'
    },
    icon: {
      type: String,
      default: null
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
    type: {
      enums: ['loading'],
      default: 'loading'
    },
    duration: {
      type: Number,
      default: 1500
    }
  },
  hideLoading: {},
  showNotify: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: null
    },
    type: {
      enums: ['primary', 'success', 'warning', 'danger'],
      default: 'primary'
    },
    duration: {
      type: Number,
      default: 1500
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
  },
  pageScrollTo: {
    scrollTop: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 300
    }
  },
  elementScrollTo: {
    element: {
      validator: elementValidator,
      required: true
    },
    scrollTop: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 300
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
      ret[k] = cloneData(rule.default)
    }
  }

  return ret
}