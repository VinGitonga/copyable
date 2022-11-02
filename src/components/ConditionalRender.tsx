import React, {ReactNode, useEffect, useState} from 'react'

export interface ConditionallyRenderProps {
  client?: boolean
  server?: boolean
  children?: ReactNode | ReactNode[]
}

const ConditionalRender: React.FC<ConditionallyRenderProps> = (props) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => setIsMounted(true), [])

  if (!isMounted && props.client) {
    return null
  }

  if (isMounted && props.server) {
    return null
  }

  return props.children as React.ReactElement
}

export default ConditionalRender
