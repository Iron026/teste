import { Suspense } from 'react'
import { PageLoader } from '@/components/ui/PageLoader'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'

export function SiteLayout() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
