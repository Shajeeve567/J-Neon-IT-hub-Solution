import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AnalyticsDashboard from '../pages/admin/AnalyticsDashboard';
import * as analyticsService from '../services/analyticsService';

// Mock all analytics service functions
vi.mock('../services/analyticsService', () => ({
  fetchOverviewStats: vi.fn(),
  fetchDailyTraffic: vi.fn(),
  fetchTopServices: vi.fn(),
  fetchTrafficSources: vi.fn(),
  fetchInquiryCount: vi.fn()
}));

const mockOverview = {
  totalUsers: 1500,
  totalPageViews: 4500,
  totalSessions: 1200
};

const mockDailyTraffic = {
  labels: ['2024-03-01', '2024-03-02'],
  users: [50, 60],
  pageViews: [150, 180]
};

const mockTopServices = {
  services: [
    { title: 'Web Development', views: 500, path: '/services/web-dev' },
    { title: 'UI/UX Design', views: 300, path: '/services/ui-ux' }
  ]
};

const mockTrafficSources = {
  sources: [
    { channel: 'Direct', sessions: 600 },
    { channel: 'Organic Search', sessions: 400 }
  ]
};

const mockInquiryStats = {
  totalInquiries: 25,
  newInquiries: 5,
  reviewedInquiries: 10,
  respondedInquiries: 10
};

describe('AnalyticsDashboard Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    
    // Setup successful mock returns
    analyticsService.fetchOverviewStats.mockResolvedValue(mockOverview);
    analyticsService.fetchDailyTraffic.mockResolvedValue(mockDailyTraffic);
    analyticsService.fetchTopServices.mockResolvedValue(mockTopServices);
    analyticsService.fetchTrafficSources.mockResolvedValue(mockTrafficSources);
    analyticsService.fetchInquiryCount.mockResolvedValue(mockInquiryStats);
  });

  it('renders the loading state initially', async () => {
    // Make one fetch slow to capture loading state
    analyticsService.fetchOverviewStats.mockReturnValue(new Promise(() => {}));
    
    render(<AnalyticsDashboard />);
    
    expect(screen.getByText(/Loading analytics data/i)).toBeInTheDocument();
  });

  it('renders all dashboard sections after successful data fetch', async () => {
    await act(async () => {
      render(<AnalyticsDashboard />);
    });

    await waitFor(() => {
      // Check for titles
      expect(screen.getByText('Analytics Dashboard')).toBeInTheDocument();
      
      // Check for stats cards values
      expect(screen.getByText('1,500')).toBeInTheDocument(); // Total Visitors
      expect(screen.getByText('4,500')).toBeInTheDocument(); // Page Views
      expect(screen.getByText('1,200')).toBeInTheDocument(); // Total Sessions
      
      // Check for chart sections
      expect(screen.getByText('Daily Traffic Trend')).toBeInTheDocument();
      expect(screen.getByText('Traffic Sources')).toBeInTheDocument();
      expect(screen.getByText('Most Viewed Services')).toBeInTheDocument();
      
      // Check for table data
      expect(screen.getByText('Web Development')).toBeInTheDocument();
      expect(screen.getByText('500')).toBeInTheDocument();
    });
  });

  it('handles error state properly', async () => {
    analyticsService.fetchOverviewStats.mockRejectedValue(new Error('Fetch failed'));
    
    await act(async () => {
      render(<AnalyticsDashboard />);
    });

    await waitFor(() => {
      expect(screen.getByText(/Failed to load analytics data/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Retry/i })).toBeInTheDocument();
    });
  });

  it('triggers a data refresh when the "Refresh" button is clicked', async () => {
    await act(async () => {
      render(<AnalyticsDashboard />);
    });

    const refreshBtn = screen.getByRole('button', { name: /Refresh/i });
    
    await act(async () => {
      fireEvent.click(refreshBtn);
    });

    // Each service should be called twice (initial + refresh)
    expect(analyticsService.fetchOverviewStats).toHaveBeenCalledTimes(2);
  });

  it('handles empty data states gracefully', async () => {
    analyticsService.fetchTopServices.mockResolvedValue({ services: [] });
    analyticsService.fetchDailyTraffic.mockResolvedValue({ labels: [], users: [], pageViews: [] });
    
    await act(async () => {
      render(<AnalyticsDashboard />);
    });

    await waitFor(() => {
      expect(screen.getByText(/No service views recorded yet/i)).toBeInTheDocument();
      expect(screen.getByText(/No traffic data available/i)).toBeInTheDocument();
    });
  });
});
