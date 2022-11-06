import { isWindowAvailable } from './navigation'

export const getFromLocalStorage = (key) => {
  if (isWindowAvailable()) {
    return window.localStorage.getItem(key)
  }
}

export const setInLocalStorage = (key, value: string) => {
  if (isWindowAvailable()) {
    return window.localStorage.setItem(key, value)
  }
}
