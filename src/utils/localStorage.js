export const loadState = name => {
  try {
    const serializedState = localStorage.getItem(name)
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState = (name, state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(name, serializedState)
    return JSON.parse(serializedState)
  } catch (err) {
    throw new Error("saveState: unable to persist state to localStorage")
  }
}
