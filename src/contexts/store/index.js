import {DECREMENT_CURRENT_STEP, INCREMENT_CURRENT_STEP, SET_STEPS,} from './constants'

export const defaultStepperState = {
  steps: [],
  currentStep: 0,
}

export const reducer = (state = defaultStepperState, action) => {
  const { steps, currentStep } = state
  const { type, payload } = action

  switch (type) {
    case SET_STEPS:
      return {
        ...state,
        steps: payload.steps,
      }

    case INCREMENT_CURRENT_STEP:
      return {
        ...state,
        currentStep:
          currentStep < steps.length - 1 ? currentStep + 1 : currentStep,
      }

    case DECREMENT_CURRENT_STEP:
      return {
        ...state,
        currentStep: currentStep > 0 ? currentStep - 1 : currentStep,
      }

    default:
      return state
  }
}
