import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminEditService.module.css';
import { createService } from '../../../services/services.api';

const AdminAddService = () => {
    const navigate = useNavigate();

    // Form fields based on backend
    const [title, setTitle] = useState('');
    const [icon, setIcon] = useState('');
    const [slug, setSlug] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [sortOrder, setSortOrder] = useState(0);
    const [isActive, setIsActive] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const serviceData = {
            title,
            shortDescription,
            slug,
            icon,
            // sortOrder,
            isActive
        };

        try {
            const res = await createService(serviceData);
            console.log('Created Service:', res);
            alert('Service created successfully!');
            navigate('/admin/services');
        } catch (error) {
            console.error('Submission failed', error);
            alert('Failed to create service. See console for details.');
        }
    };

    return (
        <div className={styles.container}>
            {/* Top Header */}
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <h1 className={styles.pageTitle}>Services Management</h1>
                    <p className={styles.pageSubtitle}>Add a new service offering</p>
                </div>
            </div>

            {/* Main Card */}
            <div className={styles.card}>
                <h2 className={styles.cardTitle}>Create Service</h2>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>Service Name (Title)</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Web Development"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Slug</label>
                        <input
                            type="text"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            placeholder="e.g. web-development"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Icon (Emoji or Image URL)</label>
                        <input
                            type="text"
                            value={icon}
                            onChange={(e) => setIcon(e.target.value)}
                            placeholder="🌐"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Short Description</label>
                        <textarea
                            value={shortDescription}
                            onChange={(e) => setShortDescription(e.target.value)}
                            placeholder="Briefly describe this service..."
                            rows={4}
                            required
                        ></textarea>
                    </div>

                    {/* <div className={styles.formGroup}>
                        <label>Sort Order</label>
                        <input
                            type="number"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(Number(e.target.value))}
                            placeholder="e.g. 1"
                            required
                        />
                    </div> */}

                    <div className={styles.formGroup}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', width: 'auto', userSelect: 'none' }}>
                            <input
                                type="checkbox"
                                checked={isActive}
                                onChange={(e) => setIsActive(e.target.checked)}
                                style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--color-teal)' }}
                            />
                            Service is Active
                        </label>
                    </div>

                    <div className={styles.formActions}>
                        <button type="submit" className={styles.btnPrimary}>
                            Save New Service
                        </button>
                        <button
                            type="button"
                            className={styles.btnSecondary}
                            onClick={() => navigate('/admin/services')}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminAddService;
