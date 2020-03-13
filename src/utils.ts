import auth0 from 'auth0-js'

export const useAuth = () => {
  const client = new auth0.WebAuth({
    domain: 'dev-zx776hxd.eu.auth0.com',
    clientID: 'VI7wVOt5gsWjV1Nsi82Pr6lGksHQ3QEt',
    redirectUri: 'http://localhost:3000',
    responseType: 'token id_token',
  })

  return {
    client,
    sendLink: (email: string) => {
      return new Promise((resolve, reject) => {
        client.passwordlessStart(
          { connection: 'email', send: 'link', email },
          (err, res) => {
            if (err) reject(err)
            resolve(res)
          },
        )
      })
    },
  }
}
