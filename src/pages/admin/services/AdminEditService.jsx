import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './AdminEditService.module.css';
import { fetchServiceById, updateService } from '../../../services/services.api';

const AdminEditService = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Form fields based on backend
    const [title, setTitle] = useState('');
    const [icon, setIcon] = useState('');
    const [slug, setSlug] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [sortOrder, setSortOrder] = useState(0);
    const [isActive, setIsActive] = useState(true);

    // Optional features keeping for UI consistency
    const [features, setFeatures] = useState([]);

    useEffect(() => {
        const loadService = async () => {
            try {
                setLoading(true);
                const data = await fetchServiceById(id);
                if (data) {
                    setTitle(data.title || '');
                    setIcon(data.icon || '');
                    setSlug(data.slug || '');
                    setShortDescription(data.shortDescription || '');
                    setSortOrder(data.sortOrder || 0);
                    setIsActive(data.isActive !== undefined ? data.isActive : true);
                    // Features placeholder if your backend supports it later
                    if (data.features) setFeatures(data.features.map((f, i) => ({ id: i, text: f })));
                } else {
                    setError('Service not found');
                }
            } catch (err) {
                console.error("Failed to fetch service details:", err);
                setError('Failed to fetch service details. It may have been deleted.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadService();
        }
    }, [id]);

    const handleAddFeature = () => {
        setFeatures([...features, { id: Date.now(), text: '' }]);
    };

    const handleFeatureChange = (id, newText) => {
        setFeatures(features.map(f => f.id === id ? { ...f, text: newText } : f));
    };

    const handleDeleteFeature = (id) => {
        setFeatures(features.filter(f => f.id !== id));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const serviceData = {
            title,
            shortDescription,
            slug,
            icon,
            sortOrder,
            isActive
            // Add features here if backend is updated to support it
        };

        try {
            await updateService(id, serviceData);
            alert('Service updated successfully!');
            navigate('/admin/services');
        } catch (error) {
            console.error('Update failed', error);
            alert('Failed to update service. See console for details.');
        }
    };

    if (loading) {
        return <div className={styles.container} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading service details...</div>;
    }

    if (error) {
        return (
            <div className={styles.container} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', paddingTop: '100px' }}>
                <h2 style={{ color: '#ef4444' }}>{error}</h2>
                <button className={styles.btnSecondary} onClick={() => navigate('/admin/services')}>Back to Services</button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {/* Top Header */}
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <h1 className={styles.pageTitle}>Services Management</h1>
                    <p className={styles.pageSubtitle}>Edit existing service offering</p>
                </div>
            </div>

            {/* Main Card */}
            <div className={styles.card}>
                <h2 className={styles.cardTitle}>Edit Service</h2>

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

                    <div className={styles.formGroup}>
                        <label>Sort Order</label>
                        <input
                            type="number"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(Number(e.target.value))}
                            placeholder="e.g. 1"
                            required
                        />
                    </div>

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

                    <div className={styles.featuresSection}>
                        <div className={styles.featuresHeader}>
                            <label>Features</label>
                            <button type="button" onClick={handleAddFeature} className={styles.addFeatureBtn}>
                                + Add Feature
                            </button>
                        </div>

                        <div className={styles.featuresList}>
                            {features.map((feature) => (
                                <div key={feature.id} className={styles.featureItem}>
                                    <input
                                        type="text"
                                        value={feature.text}
                                        onChange={(e) => handleFeatureChange(feature.id, e.target.value)}
                                        placeholder="Feature..."
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteFeature(feature.id)}
                                        className={styles.deleteBtn}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                            <line x1="10" y1="11" x2="10" y2="17"></line>
                                            <line x1="14" y1="11" x2="14" y2="17"></line>
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {features.length === 0 && (
                                <p style={{ fontSize: '13px', color: 'var(--color-text-dim)', margin: 0 }}>No features added yet.</p>
                            )}
                        </div>
                    </div>

                    <div className={styles.formActions}>
                        <button type="submit" className={styles.btnPrimary}>
                            Update Service
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

export default AdminEditService;
