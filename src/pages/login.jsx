import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import styles from './login.module.css'

const googleLogo = "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"

export default function LoginPage() {

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/google"
    }

    return (
        <>
            <Navbar />
            <main className={`page ${styles.page}`}>
                <section className={styles.loginSection}>
                    <div className={styles.loginCard}>
                        <h1 className={styles.loginTitle}>Welcome Back</h1>
                        <p className={styles.loginSubtitle}>Sign in to continue to your account</p>

                        <button
                            className={styles.loginBtnGoogle}
                            onClick={handleGoogleLogin}
                        >
                            Sign in with Google
                        </button>

                        <p className={styles.loginNote}>
                            By signing in, you agree to our <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>.
                        </p>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}