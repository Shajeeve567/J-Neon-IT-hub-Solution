import { useState, useEffect, useCallback } from 'react';
import { fetchAllServices } from '../services/services.api';

const useServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchServices = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchAllServices();
            setServices(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch services');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        let isMounted = true;

        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchAllServices();
                if (isMounted) {
                    setServices(data);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message || 'Failed to fetch services');
                    setLoading(false);
                }
            }
        };

        load();

        return () => {
            isMounted = false;
        };
    }, []);

    return { services, loading, error, refetch: fetchServices };
};

export default useServices;
