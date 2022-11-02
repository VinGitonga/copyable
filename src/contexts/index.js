import {createContext, useCallback, useContext, useReducer} from 'react'
import {defaultStepperState, reducer} from './store'
import {DECREMENT_CURRENT_STEP, INCREMENT_CURRENT_STEP, SET_STEPS,} from './store/constants'

export const StepperContext = createContext()

export const StepperProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultStepperState)

  return (
    <StepperContext.Provider value={[state, dispatch]}>
      {children}
    </StepperContext.Provider>
  )
}

export const useStepper = () => {
  const [state, dispatch] = useContext(StepperContext)

  const { currentStep, steps } = state

  if (!StepperContext) {
    throw new Error('useStepper hook should be used inside StepperProvider')
  }

  const incrementCurrentStep = useCallback(() => {
    dispatch({
      type: INCREMENT_CURRENT_STEP,
    })
  }, [dispatch])

  const decrementCurrentStep = useCallback(() => {
    dispatch({
      type: DECREMENT_CURRENT_STEP,
    })
  }, [dispatch])

  const setSteps = useCallback(
    (steps) => dispatch({ type: SET_STEPS, payload: { steps } }),
    [dispatch]
  )

  return {
    incrementCurrentStep,
    decrementCurrentStep,
    setSteps,
    currentStep,
    steps,
  }
}
