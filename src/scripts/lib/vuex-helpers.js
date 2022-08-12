import { computed } from 'vue'

const parse = field => {
  const frags = field.split('/')
  const module = frags.shift(frags)
  const objectPath = frags[0].split('.')

  return {
    getValue (state) {
      return objectPath.reduce(
        (carry, key) => {
          return carry[key]
        },
        module ? state[module] : state
      )
    },
    getGetterValue (getters) {
      return objectPath.reduce(
        (carry, key) => {
          return carry[`${module}/${key}`]
        },
        getters
      )
    },
    setValue (commit, value) {
      const mutationType = objectPath.map(
        frag => frag[0].toUpperCase() + frag.substring(1)
      ).join('')

      commit(`${module}/set${mutationType}`, value)
    }
  }
}

const getKeyFromFieldName = fieldName => {
  const frags = fieldName.split('.')

  return frags[0] + frags.slice(1).map(
    name => name[0].toUpperCase() + name.substring(1)
  ).join('')
}

export default function (store) {
  const { state, commit, getters } = store

  const getModel = (fieldName) => {
    const field = parse(fieldName)

    return computed({
      get () {
        return field.getValue(state)
      },
      set (value) {
        field.setValue(commit, value)
      }
    })
  }

  const getState = (fieldName) => {
    const field = parse(fieldName)

    return computed(() => field.getValue(state))
  }

  const getGetter = (fieldName) => {
    const field = parse(fieldName)

    return computed(() => field.getGetterValue(getters))
  }

  const getModels = (module, fields) => fields.reduce(
    (carry, fieldName) => {
      const key = getKeyFromFieldName(fieldName)
      carry[key] = getModel(`${module}/${fieldName}`)

      return carry
    },
    {}
  )

  const getStates = (module, fields) => fields.reduce(
    (carry, fieldName) => {
      const key = getKeyFromFieldName(fieldName)
      carry[key] = getState(`${module}/${fieldName}`)

      return carry
    },
    {}
  )

  const getGetters = (module, fields) => fields.reduce(
    (carry, fieldName) => {
      const key = getKeyFromFieldName(fieldName)
      carry[key] = getGetter(`${module}/${fieldName}`)
      return carry
    },
    {}
  )

  return {
    getModel,
    getState,
    getGetter,
    getModels,
    getStates,
    getGetters
  }
}
