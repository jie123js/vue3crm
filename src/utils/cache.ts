class LocalCache {
  setCache(name: string, value: any) {
    const setValue = JSON.stringify(value)
    window.localStorage.setItem(name, setValue)
  }
  getCache(key: string) {
    const getValue = window.localStorage.getItem(key)
    if (getValue) {
      return JSON.parse(getValue)
    }
  }
  removeCache(key: string) {
    window.localStorage.removeItem(key)
  }
  clearCache() {
    window.localStorage.clear()
  }
}
export default new LocalCache()
