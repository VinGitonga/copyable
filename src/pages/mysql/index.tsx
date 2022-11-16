import Router from 'next/router'
import React, { useEffect } from 'react'

export default function MysqlIndexPage() {
  useEffect(() => {
    Router.replace('/mysql/mysql-wizard')
  })

  return <></>
}
