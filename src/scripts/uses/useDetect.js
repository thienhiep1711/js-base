import { computed, onBeforeUnmount, onMounted, reactive, nextTick } from 'vue'
import { onPassive, off } from 'lib/dom'
import debounce from 'lodash.debounce'

const MOBILE_BREAKPOINT = 768
const DESKTOP_BREAKPOINT = 1024

export default () => {
  const state = reactive({
    windowWidth: window.innerWidth,
    debouncedResizeCallback: null
  })

  const isMobile = computed(() => state.windowWidth < MOBILE_BREAKPOINT)

  const isTablet = computed(() => state.windowWidth >= MOBILE_BREAKPOINT && state.windowWidth < DESKTOP_BREAKPOINT)

  const isDesktop = computed(() => state.windowWidth >= DESKTOP_BREAKPOINT)

  const resizeCallback = () => {
    state.windowWidth = window.innerWidth
  }

  onMounted(() => {
    state.debouncedResizeCallback = debounce(resizeCallback, 50)
  })

  nextTick(() => {
    onPassive('resize', state.debouncedResizeCallback, window)
  })

  onBeforeUnmount(() => {
    off('resize', state.debouncedResizeCallback, window)
  })

  return {
    isMobile,
    isTablet,
    isDesktop
  }
}
