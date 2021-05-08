import dayjs from 'dayjs'
import toArray from 'dayjs/plugin/toArray'
// import minMax from 'dayjs/plugin/minMax'
import CustomParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(toArray)
// dayjs.extend(minMax)
dayjs.extend(CustomParseFormat)

export default dayjs
