import Image from 'next/image'
import styles from './page.module.css'
import GetAllPostHome from '@/components/Home'
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
    <Link href={"/blog"}>
      <button
        style={{
          height: "3rem",
          width: "15rem",
          backgroundColor: "hotpink",
          color: "white",
          border: "none",
          fontSize: "16px",
          marginBottom: "3rem",
          cursor: "pointer",
        }}
      >
        Tous les posts
      </button>
    </Link>
  </div>
  )
}
