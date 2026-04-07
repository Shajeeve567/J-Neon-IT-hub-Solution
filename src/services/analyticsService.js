// src/services/analyticsService.js
const API_BASE_URL = 'http://localhost:8080/api/analytics';

export const fetchOverviewStats = async (startDate, endDate) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/overview?startDate=${startDate}&endDate=${endDate}`,
      { credentials: 'include' }
    );
    if (!response.ok) throw new Error('Failed to fetch overview stats');
    return await response.json();
  } catch (error) {
    console.error('Error fetching overview stats:', error);
    return null;
  }
};

export const fetchDailyTraffic = async (startDate, endDate) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/daily-traffic?startDate=${startDate}&endDate=${endDate}`,
      { credentials: 'include' }
    );
    if (!response.ok) throw new Error('Failed to fetch daily traffic');
    return await response.json();
  } catch (error) {
    console.error('Error fetching daily traffic:', error);
    return null;
  }
};

export const fetchTopServices = async (startDate, endDate) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/top-services?startDate=${startDate}&endDate=${endDate}`,
      { credentials: 'include' }
    );
    if (!response.ok) throw new Error('Failed to fetch top services');
    const data = await response.json();
    
    // Fetch actual service names from your database
    // Adjust this endpoint based on your actual service API
    try {
      const titlesResponse = await fetch('http://localhost:8080/api/services/all', {
        credentials: 'include'
      });
      
      if (titlesResponse.ok) {
        const services = await titlesResponse.json();
        const serviceMap = new Map();
        services.forEach(service => {
          serviceMap.set(service.id, service.name || service.title);
        });
        
        const servicesWithTitles = (data.services || []).map(service => {
          const match = service.path.match(/\/services?\/([a-f0-9-]+)/i);
          let title = 'Unknown Service';
          
          if (match && serviceMap.has(match[1])) {
            title = serviceMap.get(match[1]);
          } else if (match) {
            title = `Service ${match[1].substring(0, 8)}...`;
          } else {
            title = service.path.split('/').pop().replace(/-/g, ' ');
            title = title.charAt(0).toUpperCase() + title.slice(1);
          }
          
          return {
            title: title,
            views: parseInt(service.views) || 0,
            path: service.path
          };
        });
        
        servicesWithTitles.sort((a, b) => b.views - a.views);
        return { services: servicesWithTitles };
      }
    } catch (err) {
      console.log('Could not fetch service titles, using paths instead');
    }
    
    // Fallback: use paths as titles
    const servicesWithPaths = (data.services || []).map(service => ({
      title: service.path.split('/').pop().replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase()),
      views: parseInt(service.views) || 0,
      path: service.path
    }));
    
    servicesWithPaths.sort((a, b) => b.views - a.views);
    return { services: servicesWithPaths };
    
  } catch (error) {
    console.error('Error fetching top services:', error);
    return { services: [] };
  }
};

export const fetchTrafficSources = async (startDate, endDate) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/traffic-sources?startDate=${startDate}&endDate=${endDate}`,
      { credentials: 'include' }
    );
    if (!response.ok) throw new Error('Failed to fetch traffic sources');
    return await response.json();
  } catch (error) {
    console.error('Error fetching traffic sources:', error);
    return { sources: [] };
  }
};

export const fetchInquiryCount = async (startDate, endDate) => {
  try {
    const response = await fetch('http://localhost:8080/contact/get-all', {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to fetch inquiries');
    const inquiries = await response.json();
    
    const filteredInquiries = inquiries.filter(inquiry => {
      const inquiryDate = new Date(inquiry.createdAt);
      const start = new Date(startDate);
      const end = endDate === 'today' ? new Date() : new Date(endDate);
      return inquiryDate >= start && inquiryDate <= end;
    });
    
    return {
      totalInquiries: filteredInquiries.length,
      newInquiries: filteredInquiries.filter(i => i.status?.toLowerCase() === 'new').length,
      reviewedInquiries: filteredInquiries.filter(i => i.status?.toLowerCase() === 'reviewed').length,
      respondedInquiries: filteredInquiries.filter(i => i.status?.toLowerCase() === 'responded').length
    };
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return { totalInquiries: 0, newInquiries: 0, reviewedInquiries: 0, respondedInquiries: 0 };
  }
};