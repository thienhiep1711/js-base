import { ref } from 'vue'

const HOVER_INTENT_TIMEOUT = 0

export default () => {
  const activeId = ref(null)

  let timeout = null

  const isActive = new Proxy(
    {},
    {
      get (target, prop) {
        return activeId.value === prop
      },
      set (target, prop, value) {
        if (timeout) {
          clearTimeout(timeout)
        }

        timeout = setTimeout(
          () => {
            if (value) {
              activeId.value = prop
            } else if (activeId.value === prop) {
              activeId.value = null
            }
          },
          activeId.value ? HOVER_INTENT_TIMEOUT : 0
        )

        return true
      }
    }
  )

  return {
    isActive
  }
}
