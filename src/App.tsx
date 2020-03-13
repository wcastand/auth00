import React, { useEffect, useState } from 'react'
import { Auth0UserProfile } from 'auth0-js'
import { useAuth } from './utils'

function App() {
  const { client, sendLink } = useAuth()
  const [email, setEmail] = useState<string>('')
  const [user, setUser] = useState<Auth0UserProfile | null>(null)

  const signin = () => {
    if (email !== '')
      sendLink(email)
        .then(res => console.log(res))
        .catch(err => console.error(err))
  }

  const logout = () => {
    localStorage.removeItem('token')
    // @ts-ignore
    window.location = '/'
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('token')
    if (accessToken) {
      client.client.userInfo(accessToken, (err, user) => {
        if (err) console.error(err)
        setUser(user)
      })
    }
  }, [client])

  useEffect(() => {
    const accessToken = localStorage.getItem('token')
    if (window && !accessToken) {
      client.parseHash({ hash: window.location.hash }, (err, authResult) => {
        if (err) return console.log(err)
        if (authResult?.accessToken)
          localStorage.setItem('token', authResult.accessToken)
      })
    }
  }, [client])
  return (
    <div>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <button onClick={signin}>Sign in</button>
      <button onClick={logout}>Log out</button>
      {user && (
        <>
          <pre>{JSON.stringify(user)}</pre>
          <img src={user.picture} alt={'avatar'} />
        </>
      )}
    </div>
  )
}

export default App
