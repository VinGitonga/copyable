import {Children, useEffect} from 'react'
import {useStepper} from 'contexts'

export const StepperSteps = ({ children }) => {
  const { currentStep, steps, setSteps } = useStepper()

  useEffect(() => {
    const stepperSteps = Children.toArray(children)
      .filter((step) => {
        return step.type.name === 'StepperStep'
      })
      .map((step) => step.props)
    setSteps(stepperSteps)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSteps])

  return (
    <div>
      {children &&
        Children.map(children, (child) => {
          if (steps.length) {
            return child.props.id === steps[currentStep].id ? child : null
          }
        })}
    </div>
  )
}

export const StepperStep = ({ children }) => {
  return <>{children}</>
}
