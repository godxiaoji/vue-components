const TYPE = {
  DEFAULT: 'fail',
  PARAM_ERROR: 'Invalid param',
  CONFIG_ERROR: 'Invalid config',
  PROP_ERROR: 'Invalid Prop'
}

/**
 * 错误捕捉类
 */
class Exception extends Error {
  private source: string
  private type: string

  static TYPE = TYPE

  /**
   * 构造
   * @param error 错误
   * @param type 出错类型
   * @param source 出错来源
   */
  constructor(
    error: string | Exception | Error,
    type = TYPE.DEFAULT,
    source = 'Exception'
  ) {
    if (error instanceof Exception) {
      error = error.getMessage()
    } else if (error instanceof Error) {
      error = error.message
    }

    super(error as string)

    this.source = source
    this.type = type
  }

  getMessage() {
    return this.message
  }

  toString() {
    return `[${this.source}] ${this.type}: ${this.getMessage()}`
  }

  getFailError() {
    return {
      errMsg: `${this.type}: ${this.getMessage()}`
    }
  }

  toLocaleString() {
    return this.toString()
  }
}

export default Exception
