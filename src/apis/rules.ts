import Exception from '@/helpers/exception'
import { isObject, inArray, isFunction } from '@/helpers/util'
import {
  notNullValidator,
  stringArrayValidator,
  getType,
  calendarValueValidator,
  createEnumsValidator,
  stringNumberArrayMixValidator,
  selectorValidator
} from '@/helpers/validator'
import { TYPE_NAMES as CALENDAR_TYPE_NAMES } from '@/Calendar/util'
import { PLACEMENT_TYPES } from '@/hooks/constants'
import { DataObject, Validator } from '../helpers/types'
import { ApiOptions } from '../apis/types'
import dayjs from '@/helpers/day'

const placementValidator = createEnumsValidator(PLACEMENT_TYPES)

interface ApiRule {
  type?:
    | StringConstructor
    | NumberConstructor
    | BooleanConstructor
    | ArrayConstructor
    | DateConstructor
    | ObjectConstructor
    | FunctionConstructor
  default?: number | boolean | string | Function | null
  validator?: Validator
  required?: boolean
  enums?: string[]
}

type ApiRules = DataObject<DataObject<ApiRule>>

export const apiRules: ApiRules = {
  /**
   * 数据存储
   */
  createStorage: {
    areaName: {
      type: String,
      required: true
    },
    perLimitSize: {
      type: Number,
      default: 1024
    },
    limitSize: {
      type: Number,
      default: 2560
    }
  },
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
  showDatePicker: {
    title: {
      type: String
    },
    mode: {
      type: String
    },
    value: {
      type: Date
    },
    // 最小日期
    minDate: {
      type: Date
    },
    // 最大日期
    maxDate: {
      type: Date
    },
    filter: {
      type: Function
    }
  },
  showPicker: {
    title: {
      type: String
    },
    options: {
      type: Array,
      required: true
    },
    value: {
      validator: stringNumberArrayMixValidator,
      default() {
        return []
      }
    },
    fieldNames: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  showCascader: {
    title: {
      type: String
    },
    options: {
      type: Array,
      required: true
    },
    value: {
      validator: stringNumberArrayMixValidator,
      default() {
        return []
      }
    },
    fieldNames: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  showCalendar: {
    title: {
      type: String,
      default: '选择日期'
    },
    showConfirm: {
      type: Boolean
    },
    showClose: {
      type: Boolean
    },
    value: {
      validator: calendarValueValidator
    },
    minDate: {
      type: Date
    },
    maxDate: {
      type: Date
    },
    type: {
      enums: CALENDAR_TYPE_NAMES,
      default: CALENDAR_TYPE_NAMES[0]
    },
    allowSameDay: {
      type: Boolean,
      default: false
    },
    maxRange: {
      type: Number
    },
    dayHandler: {
      type: Function
    }
  },
  showActionSheet: {
    title: {
      type: String,
      default: null
    },
    showCancel: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String
    },
    options: {
      type: Array,
      default() {
        return []
      }
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
    },
    navigationButtons: {
      type: Boolean,
      default: false
    },
    imageHighRendering: {
      type: Boolean,
      default: true
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
    },
    closable: {
      type: Boolean,
      default: false
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
  scrollTo: {
    selector: {
      validator: selectorValidator,
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
  },
  showPopover: {
    selector: {
      validator: selectorValidator,
      required: true
    },
    content: {
      type: String,
      default: ''
    },
    placement: {
      validator: placementValidator
    }
  },
  showPopDialog: {
    selector: {
      validator: selectorValidator,
      required: true
    },
    content: {
      type: String,
      default: '',
      required: true
    },
    placement: {
      validator: placementValidator
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    }
  },
  showPopMenu: {
    selector: {
      validator: selectorValidator,
      required: true
    },
    placement: {
      validator: placementValidator
    },
    options: {
      type: Array,
      required: true,
      default() {
        return []
      }
    }
  }
}

export const parseParamsByRules = function(
  options: ApiOptions,
  apiName: string
) {
  if (!isObject(options)) {
    options = {}
  }

  const rules = apiRules[apiName]
  const ret: DataObject<any> = {}
  const PARAM_ERROR = Exception.TYPE.PARAM_ERROR

  for (const k in rules) {
    const rule = rules[k]
    const option = options[k]
    const ruleType = rule.type as Function

    if (rule.required && !notNullValidator(option)) {
      throw new Exception(
        `param0.${k} should be ${getType(
          rule.validator || ruleType()
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
      } else if (typeof ruleType() === 'object') {
        // object array
        if (getType(ruleType()) === getType(option)) {
          ret[k] = option
        } else {
          throw new Exception(
            `param0.${k} should be ${getType(ruleType())} instead of ${getType(
              option
            )}`,
            PARAM_ERROR,
            apiName
          )
        }
      } else if (ruleType(option) !== option) {
        throw new Exception(
          `param0.${k} should be ${getType(ruleType())} instead of ${getType(
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
      ret[k] = isFunction(rule.default)
        ? (rule.default as Function)()
        : rule.default
    }
  }

  return ret
}
