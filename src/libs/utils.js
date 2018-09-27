export const TOKEN_KEY = 'token'

export const setToken = (token) => {
  sessionStorage.setItem(TOKEN_KEY, token)
}

export const getToken = () => {
  const token = sessionStorage.getItem(TOKEN_KEY)
  if (token) return token
  else return false
}

export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    let str = o[k] + ''
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
};

export function formatSize (data) {
  if (data) {
    const unitArr = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    let srcsize = parseFloat(data)
    let index = Math.floor(Math.log(srcsize) / Math.log(1024))
    let size = (srcsize / Math.pow(1024, index)).toFixed(2)
    return size + unitArr[index]
  } else {
    return '0'
  }
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}
