/**
 * 错误捕捉类
 */
class Exception extends Error {
  /**
   * 构造
   * @param {Error} error
   * @param {String} type
   * @param {String} source
   */
  constructor(error, type = Exception.TYPE.DEFAULT, source = 'Exception') {
    if (error instanceof Exception) {
      error = error.getMessage()
    }

    super(error)

    this.source = source
    this.type = type
    this.name = `[${source}] ${type}`
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

Exception.TYPE = {
  DEFAULT: 'fail',
  PARAM_ERROR: 'Invalid param'
}

export default Exception
