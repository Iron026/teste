import { useSeo } from '@/hooks/useSeo'
import { Hero } from '@/components/home/Hero'
import { Services } from '@/components/home/Services'
import { Projects } from '@/components/home/Projects'
import { Process } from '@/components/home/Process'
import { About } from '@/components/home/About'
import { Faq } from '@/components/home/Faq'
import { Contact } from '@/components/home/Contact'

export default function HomePage() {
  useSeo()
  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <Process />
      <About />
      <Faq />
      <Contact />
    </>
  )
}
