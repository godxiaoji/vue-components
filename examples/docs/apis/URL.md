# URL

## queryString(queryName, defaultValue)

查询当前 URL 的 query 参数值。

### Params

| 属性         | 类型   | 默认值    | 必填 | 说明                   |
| ------------ | ------ | --------- | ---- | ---------------------- |
| queryName    | string |           | 是   | 要查询的字段名         |
| defaultValue | any    | undefined | 否   | 查询不到时的默认返回值 |

### Return

any value

queryName 对应的参数值

### Usage

```
this.$queryString('name, '')
```
