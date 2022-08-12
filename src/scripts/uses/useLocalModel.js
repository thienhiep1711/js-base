import { computed, toRef } from 'vue'

export default function (props, { emit }, modelNames = ['modelValue']) {
  return modelNames.reduce(
    (carry, modelName) => {
      const localName = 'local' + modelName[0].toUpperCase() + modelName.slice(1)
      const propRef = toRef(props, modelName)

      carry[localName] = computed({
        get () {
          return propRef.value
        },
        set (value) {
          emit(`update:${modelName}`, value)
        }
      })

      return carry
    },
    {}
  )
}
