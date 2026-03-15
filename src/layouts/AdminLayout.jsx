import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Eye, MessageSquare, LogOut, Settings } from 'lucide-react';
import styles from './adminLayout.module.css';

export default function AdminLayout({ children }) {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className={styles.adminContainer}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarLogo}>
                    <span className={styles.logoAccent}>J-NEON</span> ADMIN
                </div>

                <nav className={styles.sidebarNav}>
                    <Link
                        to="/admin/portfolio"
                        className={`${styles.navItem} ${location.pathname === '/admin/portfolio' ? styles.active : ''}`}
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>
                    <Link
                        to="/admin/services"
                        className={`${styles.navItem} ${location.pathname.startsWith('/admin/services') ? styles.active : ''}`}
                    >
                        <Settings size={20} />
                        Services
                    </Link>
                    <Link
                        to="/admin/portfolio"
                        className={`${styles.navItem} ${location.pathname.startsWith('/admin/portfolio') ? styles.active : ''}`}
                    >
                        <Eye size={20} />
                        Portfolio
                    </Link>
                    <Link
                        to="/admin/inquiries"
                        className={`${styles.navItem} ${location.pathname.startsWith('/admin/inquiries') ? styles.active : ''}`}
                    >
                        <MessageSquare size={20} />
                        Inquiries
                    </Link>
                    <Link
                        to="/admin/users"
                        className={`${styles.navItem} ${location.pathname.startsWith('/admin/users') ? styles.active : ''}`}
                    >
                        <MessageSquare size={20} />
                        Users
                    </Link>
                </nav>

                <div className={styles.sidebarFooter}>
                    <div className={styles.adminProfile}>
                        <div className={styles.avatar}>A</div>
                        <div className={styles.adminInfo}>
                            <p className={styles.adminName}>Admin User</p>
                            <p className={styles.adminEmail}>admin@jneon.com</p>
                        </div>
                    </div>
                    <button
                        className={styles.logoutBtn}
                        aria-label="Logout"
                        onClick={() => navigate('/')}
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={styles.mainContent}>
                {children}
            </main>
        </div>
    );
}
