import '../styles/globals.css'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot} from 'recoil'

export default function App({ Component, pageProps:{session,...pageProps} }) {
  return(
  <>
  <Head>
   <meta name="viewport" content="width=device-width, initial-scale=1" />
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" />
</Head>
<SessionProvider session={session}>
            <RecoilRoot>
            <Component {...pageProps} />
            </RecoilRoot>
              </SessionProvider>
  </>
)
}