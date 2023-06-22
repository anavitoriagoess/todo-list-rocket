import styles from './Header.module.css'
import logo from '../images/Logo.png'

export function Header() {
    return (
        <header className={styles.header}>
            <img src={logo} />
        </header>
    )
}