import Link from "next/link"
import { invoke } from "./blitz-server"
import { LogoutButton } from "./(auth)/components/LogoutButton"
import styles from "./styles/Home.module.css"
import getCurrentUser from "./users/queries/getCurrentUser"
import { Button } from "@/components/ui/button"

export default async function Home() {
  const currentUser = await invoke(getCurrentUser, null)
  return (
    <>
      <div className="bg-slate-600" />
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.wrapper}>
            <div className={styles.header}>
              <h1>Comparateur des assurances</h1>

              {/* Auth */}

              <div className={styles.buttonContainer}>
                {currentUser ? (
                  <>
                    <LogoutButton />
                    <Link href="/comparators/new">
                      <Button>Créer un comparateur</Button>
                    </Link>{" "}
                    {/* <div>
                      User id: <code>{currentUser.id}</code>
                      <br />
                      User role: <code>{currentUser.role}</code>
                    </div> */}
                  </>
                ) : (
                  <>
                    <Link href="/signup" className={styles.button}>
                      <strong>Sign Up</strong>
                    </Link>
                    <Link href="/login" className={styles.loginButton}>
                      <strong>Login</strong>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
