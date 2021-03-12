import Head from 'next/head'
import { ContainerGlobal } from '../infra/components/Container'
import  HomeMain  from './home/index'

export default function Home() {
  return (
    <ContainerGlobal>
      <HomeMain />
    </ContainerGlobal>
    
  )
}
