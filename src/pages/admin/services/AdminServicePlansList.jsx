import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchServicePlans, deleteServicePlan } from '../../../services/services.api';
import styles from './AdminServicePlansList.module.css';

const AdminServicePlansList = () => {
    const { serviceId } = useParams();
    const navigate = useNavigate();
    const [plans, setPlans] = useState([]);
    const [serviceTitle, setServiceTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadPlans();
    }, [serviceId]);

    const loadPlans = async () => {
        try {
            setLoading(true);
            const data = await fetchServicePlans(serviceId);
            console.log('Fetched plans:', data);
            setPlans(data || []);
            if (data && data.length > 0 && data[0].serviceType) {
                setServiceTitle(data[0].serviceType);
            }
        } catch (err) {
            console.error('Failed to load plans:', err);
            setError('Failed to load service plans.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddPlan = () => {
        navigate(`/admin/services/${serviceId}/plans/add`);
    };

    const handleEditPlan = (plan) => {
        console.log('Editing plan:', plan);
        
        // Use planId from the plan object
        const planId = plan.planId || plan.id;
        
        if (!planId) {
            console.error('Plan has no ID. Plan object:', plan);
            alert('Cannot edit plan: Missing ID');
            return;
        }
        
        console.log('Using plan ID:', planId);
        
        navigate(`/admin/services/${serviceId}/plans/edit/${planId}`, { 
            state: { planData: { ...plan, planId: planId } }
        });
    };

    const handleDeletePlan = async (plan, planName) => {
        // Use planId from the plan object
        const planId = plan.planId || plan.id;
        
        console.log('Deleting plan:', plan);
        console.log('Plan ID found:', planId);
        
        if (!planId) {
            console.error('Cannot delete plan: Missing ID. Plan object:', plan);
            alert('Cannot delete plan: Missing ID');
            return;
        }
        
        if (window.confirm(`Are you sure you want to delete "${planName}"?`)) {
            try {
                await deleteServicePlan(planId);
                setPlans(plans.filter(p => {
                    const pId = p.planId || p.id;
                    return pId !== planId;
                }));
                alert('Plan deleted successfully!');
            } catch (err) {
                console.error('Failed to delete plan:', err);
                alert('Failed to delete plan.');
            }
        }
    };

    const formatPrice = (price, currency) => {
        if (!price && price !== 0) return 'Contact for pricing';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency || 'USD'
        }).format(price);
    };

    const formatFeatures = (features) => {
        if (!features) return [];
        if (typeof features === 'string') {
            try {
                const parsed = JSON.parse(features);
                if (Array.isArray(parsed)) return parsed;
            } catch (e) {
                return features.split(',').map(f => f.trim()).filter(f => f);
            }
        }
        if (Array.isArray(features)) {
            return features;
        }
        return [];
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <button 
                        className={styles.backButton}
                        onClick={() => navigate('/admin/services')}
                    >
                        ← Back to Services
                    </button>
                    <h1 className={styles.pageTitle}>
                        {serviceTitle || 'Service'} Plans
                    </h1>
                    <p className={styles.pageSubtitle}>Manage pricing plans for this service</p>
                </div>
                <button className={styles.btnPrimary} onClick={handleAddPlan}>
                    <span className={styles.btnIcon}>+</span> Add Plan
                </button>
            </div>

            {loading ? (
                <div className={styles.loading}>Loading plans...</div>
            ) : error ? (
                <div className={styles.error}>{error}</div>
            ) : plans.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>No plans added yet for this service.</p>
                    <button className={styles.btnPrimary} onClick={handleAddPlan}>
                        Create your first plan
                    </button>
                </div>
            ) : (
                <div className={styles.plansGrid}>
                    {plans.map((plan, index) => {
                        const planKey = plan.planId || plan.id || index;
                        const planId = plan.planId || plan.id;
                        
                        return (
                            <div key={planKey} className={`${styles.planCard} ${plan.isFeatured ? styles.featured : ''}`}>
                                {plan.isFeatured && (
                                    <div className={styles.featuredBadge}>Featured</div>
                                )}
                                
                                <div className={styles.planHeader}>
                                    <h3 className={styles.planName}>{plan.planName}</h3>
                                    <div className={styles.planActions}>
                                        <button
                                            className={styles.actionBtnEdit}
                                            onClick={() => handleEditPlan(plan)}
                                            title="Edit"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                                            </svg>
                                        </button>
                                        <button
                                            className={styles.actionBtnDelete}
                                            onClick={() => handleDeletePlan(plan, plan.planName)}
                                            title="Delete"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="3 6 5 6 21 6"/>
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className={styles.price}>
                                    {formatPrice(plan.price, plan.currency)}
                                    {plan.billingPeriod && (
                                        <span className={styles.billingPeriod}>/{plan.billingPeriod}</span>
                                    )}
                                </div>

                                {plan.description && (
                                    <p className={styles.description}>{plan.description}</p>
                                )}

                                {plan.features && formatFeatures(plan.features).length > 0 && (
                                    <div className={styles.features}>
                                        <h4>Features</h4>
                                        <ul>
                                            {formatFeatures(plan.features).map((feature, idx) => (
                                                <li key={idx}>
                                                    <span className={styles.checkmark}>✓</span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className={styles.planFooter}>
                                    <div className={styles.priceType}>
                                        {plan.priceType === 'fixed' ? 'Fixed Price' : 'Custom Pricing'}
                                    </div>
                                    {!plan.isActive && (
                                        <div className={styles.inactiveBadge}>Inactive</div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default AdminServicePlansList;