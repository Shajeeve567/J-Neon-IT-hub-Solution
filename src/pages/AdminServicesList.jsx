import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllServices, deleteService } from '../../../services/services.api';
import styles from './AdminServicesList.module.css';

const AdminServicesList = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = async () => {
        try {
            setLoading(true);
            const data = await fetchAllServices();
            // Ensure unique items or parse data properly if needed
            setServices(data || []);
            console.log('Fetched services:', data); // Debug log
        } catch (err) {
            console.error('Failed to load services:', err);
            setError('Failed to load services.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddClick = () => {
        navigate('/admin/services/add');
    };

    const handleEditClick = (id) => {
        navigate(`/admin/services/edit/${id}`);
    };

    const handleDeleteClick = async (id, title) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            try {
                await deleteService(id);
                // Remove from state
                setServices(services.filter(s => s.id !== id));
            } catch (err) {
                console.error('Failed to delete service:', err);
                alert('Failed to delete service.');
            }
        }
    };

    return (
        <div className={styles.container}>
            {/* Top Header */}
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <h1 className={styles.pageTitle}>Services Management</h1>
                    <p className={styles.pageSubtitle}>Manage your service offerings</p>
                </div>
                <button className={styles.btnPrimary} onClick={handleAddClick}>
                    <span className={styles.btnIcon}>+</span> Add Service
                </button>
            </div>

            {loading ? (
                <div className={styles.loading}>Loading services...</div>
            ) : error ? (
                <div className={styles.error}>{error}</div>
            ) : (
                <div className={styles.grid}>
                    {services.map(service => (
                        <div key={service.id} className={styles.card}>
                            <div className={styles.cardHeader}>
                                {/* Using icon text/emoji if it's text, or treating as URL if needed, placeholder otherwise */}
                                <div className={styles.cardIcon}>
                                    {service.icon || '🛠️'}
                                </div>
                                <div className={styles.cardActions}>
                                    <button
                                        className={styles.actionBtnEdit}
                                        onClick={() => handleEditClick(service.id)}
                                        title="Edit"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 20h9"></path>
                                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                        </svg>
                                    </button>
                                    <button
                                        className={styles.actionBtnDelete}
                                        onClick={() => handleDeleteClick(service.id, service.title)}
                                        title="Delete"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                            <line x1="10" y1="11" x2="10" y2="17"></line>
                                            <line x1="14" y1="11" x2="14" y2="17"></line>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <h3 className={styles.cardTitle}>{service.title}</h3>
                            <p className={styles.cardDesc}>{service.shortDescription}</p>

                            {/* Assuming features might not come from backend directly based on entity class provided, but adding placeholder UI */}
                            {service.features && service.features.length > 0 ? (
                                <ul className={styles.featureList}>
                                    {service.features.map((feature, index) => (
                                        <li key={index}>
                                            <span className={styles.featureDot}></span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            ) : null}

                            {service.active ? (
                                <div className={styles.activeBadge}>Active</div>
                            ) : (
                                <div className={styles.inactiveBadge}>Inactive</div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminServicesList;
