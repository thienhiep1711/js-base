export default () => {
  const initLocalSelectedFilters = (items, selected) => {
    const newSelectedValues = items.reduce((acc, curr) => {
      if (!selected.value[curr.filterOptionId]) {
        acc[curr.filterOptionId] = []
      } else {
        acc[curr.filterOptionId] = selected.value[curr.filterOptionId]
      }
      return acc
    }, {})
    return newSelectedValues
  }

  return {
    initLocalSelectedFilters
  }
}
