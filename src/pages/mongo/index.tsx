import Router from 'next/router'
import React, { useEffect } from 'react'

export default function MongoIndexPage() {
  useEffect(() => {
    Router.replace('/mongo/mongo-wizard')
  })

  return <></>
}
