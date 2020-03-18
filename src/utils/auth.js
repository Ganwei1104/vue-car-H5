/* 我是处理浏览器缓存的文件 */
import Cookies from 'js-cookie'

const TokenKey = 'admin_token'

export function getToken(key) {
  if (key) {
    return Cookies.get(key)
  } else {
    return Cookies.get(TokenKey)
  }
}

export function setToken(value, key) {
  if (key) {
    return Cookies.set(key, value, { expires: 7 })
  } else {
    return Cookies.set(TokenKey, value)
  }
}

export function removeToken(key) {
  if (key) {
    return Cookies.remove(key)
  } else {
    return Cookies.remove(TokenKey)
  }
}
