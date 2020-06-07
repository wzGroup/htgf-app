/**
 * 格式化百分号颜色  大于0红色， 小于0绿色
 * @param value 格式化的值
 * @returns {{color: string}}
 * @constructor
 */
const FILTER_FORMATE_INCOME_COLOR = (value) => {
  if (value && value.toString().indexOf('-') > -1) {
    return { color: '#6DC135' }
  }
  else if (value===0) {
    return { color: '#E1312E' }
  }
  else if (value) {
    return { color: '#E1312E' }
  }
  else if (!value) {
    return { color: '#999999' }
  }
}
// 首页正负颜色判断
const FILTER_FORMATE_COLOR_RATE = (value) => {
  if (value && value.toString().indexOf('-') > -1) {
    return { color: '#6DC135' }
  } else if (value) {
    return { color: '#E1312E' }
  }
}

// 首页正负颜色判断
const FILTER_FORMATE_COLOR_INDEX = (value,col) => {
  if (value && value.toString().indexOf('-') > -1) {
    return { color: '#6DC135' }
  } else if (value) {
    return { color: col }
  }
}

const FILTER_FORMATE_NUM = (value) => {
  if (value && value.toString().indexOf('-') > -1) {
    return value
  } else if(value){
    return "+" + value
  } else if (value===0) {
    return value
  }
  else if (!value) {
    return '--'
  } else {
    return value
  }
}
// 判断空
const FILTER_FORMATE_NULL = (value) => {
  if (!value) {
    return '--'
  } else if (value && value.toString().indexOf('null')>-1) {
    return '--'
  } else{
    return value
  }
}
//去掉百分号，返回空显示--
const FILTER_FORMATE_PERCENT0 = (value) => {
  if (!value && value !== 0) {
    return '--'
  } else if (value && value.toString().indexOf('%')>-1) {
    return value.replace('%', '')
  } else{
    return value
  }
}
// 限额0万
const FILTER_FORMATE_LIMIT = (value) => {
  if (!value) {
    return '0万'
  } else if (value && value.toString().indexOf('null')>-1) {
    return '0万'
  } else{
    return value
  }
}

/**
 * 过滤%
 * @param value
 * @returns {*}
 * @constructor
 */
const FILTER_PERCENT = (value) => {
  if (value && value.toString().indexOf('%') > -1) {
    return value.replace('%', '')
  } else if (value) {
    return value
  }
}
// 用于样式不同的百分号判断，如果值带%，只返回%，如果没有%，则返回空
const FILTER_PERCENT_SHOW = (value) => {
  if (value && value.toString().indexOf('%') > -1) {
    return '%'
  } else if (value) {
    return ''
  }
}
export {
  FILTER_FORMATE_INCOME_COLOR,
  FILTER_FORMATE_NUM,
  FILTER_FORMATE_NULL,
  FILTER_FORMATE_LIMIT,
  FILTER_FORMATE_PERCENT0,
  FILTER_PERCENT_SHOW,
  FILTER_FORMATE_COLOR_INDEX,
  FILTER_FORMATE_COLOR_RATE
}
