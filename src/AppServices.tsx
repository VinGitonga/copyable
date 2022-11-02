import {FC, ReactNode} from 'react'
import useAuthRedirect from 'hooks/useAuthRedirect'

const AppServices: FC<{ children: ReactNode | ReactNode[] }> = ({
  children,
}) => {
  useAuthRedirect()
  return <>{children}</>
}

export default AppServices
