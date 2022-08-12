import { set, isIEorEdge, isTouch } from 'lib/utils'

document.addEventListener('DOMContentLoaded', () => {
  console.log('header.js')
  if (isIEorEdge()) set(document.body, 'ie')

  if (isTouch()) {
    document.body.classList.remove('no-touch')
  }
})
