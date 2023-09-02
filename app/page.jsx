import GetAllPostHome from '@/components/Home'
import NavigateToAllPostsButton from '@/components/NavigateToAllPostsButton'
import Link from 'next/link'

export default function Home() {
  return (<div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <GetAllPostHome />
    <NavigateToAllPostsButton />
  </div>
  )
}
