class LocalCache {
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  getCache(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }
  deleteCacheNames(...args: string[]) {
    args.forEach((key) => {
      window.localStorage.removeItem(key)
    })
  }
  clearCache() {
    window.localStorage.clear()
  }
}

export const localCache = new LocalCache()

export function useLocalCache() {
  return localCache
}

export default { useLocalCache, localCache }
