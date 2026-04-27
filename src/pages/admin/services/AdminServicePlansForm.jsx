import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { createServicePlan, updateServicePlan } from '../../../services/services.api';
import styles from './AdminServicePlansForm.module.css';

const AdminServicePlansForm = () => {
    const { serviceId, planId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        planName: '',
        price: '',
        priceType: 'fixed',
        currency: 'USD',
        billingPeriod: 'monthly',
        description: '',
        features: '',
        isFeatured: false,
        sortOrder: 0,
        isActive: true
    });

    // Store the plan ID separately for updates
    const [currentPlanId, setCurrentPlanId] = useState(null);

    // Load plan data if editing
    useEffect(() => {
        console.log('Editing plan ID from URL:', planId);
        console.log('Location state:', location.state);
        
        if (planId && location.state?.planData) {
            const plan = location.state.planData;
            console.log('Plan data for edit:', plan);
            
            // Get the plan ID - could be planId or id
            const id = plan.planId || plan.id;
            
            if (!id) {
                console.error('Plan data missing ID:', plan);
                setError('Cannot edit plan: Missing ID');
                return;
            }
            
            setCurrentPlanId(id);
            
            setFormData({
                planName: plan.planName || '',
                price: plan.price || '',
                priceType: plan.priceType || 'fixed',
                currency: plan.currency || 'USD',
                billingPeriod: plan.billingPeriod || 'monthly',
                description: plan.description || '',
                features: formatFeaturesToString(plan.features),
                isFeatured: plan.isFeatured || false,
                sortOrder: plan.sortOrder || 0,
                isActive: plan.isActive !== undefined ? plan.isActive : true
            });
        } else if (planId && !location.state) {
            setError('Unable to load plan data. Please go back and try again.');
        }
    }, [planId, location.state]);

    const formatFeaturesToString = (features) => {
        if (!features) return '';
        if (typeof features === 'string') return features;
        if (Array.isArray(features)) return features.join(', ');
        return '';
    };

    const formatFeaturesForApi = (featuresString) => {
        if (!featuresString || featuresString.trim() === '') {
            return null;
        }
        const featuresArray = featuresString.split(',').map(f => f.trim()).filter(f => f);
        return JSON.stringify(featuresArray);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formattedFeatures = formatFeaturesForApi(formData.features);
        
        const payload = {
            serviceId: serviceId,
            planName: formData.planName,
            price: parseFloat(formData.price),
            priceType: formData.priceType,
            currency: formData.currency,
            billingPeriod: formData.billingPeriod,
            description: formData.description,
            features: formattedFeatures,
            isFeatured: formData.isFeatured,
            sortOrder: parseInt(formData.sortOrder),
            isActive: formData.isActive
        };

        // If editing, add planId to the payload (as per your backend DTO)
        if (planId && currentPlanId) {
            payload.planId = currentPlanId;
            console.log('Updating plan with planId:', payload.planId);
        } else if (planId) {
            console.error('Missing plan ID for update');
            alert('Cannot update plan: Missing ID');
            return;
        }

        console.log('Submitting payload:', payload);

        try {
            setLoading(true);
            if (planId) {
                await updateServicePlan(payload);
                alert('Plan updated successfully!');
            } else {
                await createServicePlan(payload);
                alert('Plan created successfully!');
            }
            navigate(`/admin/services/${serviceId}/plans`);
        } catch (error) {
            console.error('Submission failed:', error);
            if (error.response) {
                console.error('Error response data:', error.response.data);
                alert(`Failed to save plan: ${error.response.data.message || 'Server error'}`);
            } else {
                alert('Failed to save plan. Please check the console for details.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (error) {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <button className={styles.backButton} onClick={() => navigate(`/admin/services/${serviceId}/plans`)}>
                        ← Back to Plans
                    </button>
                </div>
                <div className={styles.card}>
                    <div style={{ color: '#ef4444', textAlign: 'center', padding: '40px' }}>
                        <h2>{error}</h2>
                        <button className={styles.btnSecondary} onClick={() => navigate(`/admin/services/${serviceId}/plans`)}>
                            Return to Plans
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <button 
                        className={styles.backButton}
                        onClick={() => navigate(`/admin/services/${serviceId}/plans`)}
                    >
                        ← Back to Plans
                    </button>
                    <h1 className={styles.pageTitle}>
                        {planId ? 'Edit Plan' : 'Add New Plan'}
                    </h1>
                    <p className={styles.pageSubtitle}>
                        {planId ? 'Modify existing service plan' : 'Create a new pricing plan for this service'}
                    </p>
                </div>
            </div>

            <div className={styles.card}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>Plan Name *</label>
                        <input
                            type="text"
                            name="planName"
                            value={formData.planName}
                            onChange={handleChange}
                            placeholder="e.g., Basic, Pro, Enterprise"
                            required
                        />
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label>Price *</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="0.00"
                                step="0.01"
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Currency</label>
                            <select name="currency" value={formData.currency} onChange={handleChange}>
                                <option value="USD">USD ($)</option>
                                <option value="LKR">LKR (LKR)</option>
                            </select>
                        </div>
                    </div>

                    {/* <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label>Price Type</label>
                            <select name="priceType" value={formData.priceType} onChange={handleChange}>
                                <option value="fixed">Fixed Price</option>
                                <option value="custom">Custom Pricing</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Billing Period</label>
                            <select name="billingPeriod" value={formData.billingPeriod} onChange={handleChange}>
                                <option value="monthly">Monthly</option>
                                <option value="yearly">Yearly</option>
                                <option value="one-time">One-time</option>
                                <option value="quarterly">Quarterly</option>
                            </select>
                        </div>
                    </div> */}

                    <div className={styles.formGroup}>
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Brief description of this plan..."
                            rows={3}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Features (comma-separated)</label>
                        <textarea
                            name="features"
                            value={formData.features}
                            onChange={handleChange}
                            placeholder="e.g., 24/7 Support, Custom Domain, Analytics Dashboard"
                            rows={4}
                        />
                        <div className={styles.helpText}>
                            Enter each feature separated by commas. They will be stored as a JSON array.
                        </div>
                    </div>
{/* 
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label>Sort Order</label>
                            <input
                                type="number"
                                name="sortOrder"
                                value={formData.sortOrder}
                                onChange={handleChange}
                                placeholder="0"
                            />
                        </div>

                        <div className={`${styles.formGroup} ${styles.checkboxGroup}`}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    name="isFeatured"
                                    checked={formData.isFeatured}
                                    onChange={handleChange}
                                />
                                Featured Plan
                            </label>
                        </div>
                    </div> */}
{/* 
                    <div className={`${styles.formGroup} ${styles.checkboxGroup}`}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={formData.isActive}
                                onChange={handleChange}
                            />
                            Plan is Active
                        </label>
                    </div> */}

                    <div className={styles.formActions}>
                        <button type="submit" className={styles.btnPrimary} disabled={loading}>
                            {loading ? 'Saving...' : (planId ? 'Update Plan' : 'Create Plan')}
                        </button>
                        <button
                            type="button"
                            className={styles.btnSecondary}
                            onClick={() => navigate(`/admin/services/${serviceId}/plans`)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminServicePlansForm;
