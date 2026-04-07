// src/components/admin/AnalyticsDashboard.jsx
import { useState, useEffect } from 'react';
import {
  TrendingUp, Users, Eye, MessageSquare, MousePointer,
  Calendar, Globe, ArrowUp, ArrowDown, Minus
} from 'lucide-react';
import {
  fetchOverviewStats,
  fetchDailyTraffic,
  fetchTopServices,
  fetchTrafficSources,
  fetchInquiryCount
} from '../../services/analyticsService';
import styles from './adminAnalytics.module.css';

export default function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState({
    startDate: getDefaultStartDate(),
    endDate: 'today'
  });
  const [overview, setOverview] = useState(null);
  const [dailyTraffic, setDailyTraffic] = useState(null);
  const [topServices, setTopServices] = useState(null);
  const [trafficSources, setTrafficSources] = useState(null);
  const [inquiryStats, setInquiryStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function getDefaultStartDate() {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split('T')[0];
  }

  useEffect(() => {
    loadAllData();
  }, [dateRange]);

  const loadAllData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [overviewData, trafficData, servicesData, sourcesData, inquiriesData] = await Promise.all([
        fetchOverviewStats(dateRange.startDate, dateRange.endDate),
        fetchDailyTraffic(dateRange.startDate, dateRange.endDate),
        fetchTopServices(dateRange.startDate, dateRange.endDate),
        fetchTrafficSources(dateRange.startDate, dateRange.endDate),
        fetchInquiryCount(dateRange.startDate, dateRange.endDate)
      ]);
      
      setOverview(overviewData);
      setDailyTraffic(trafficData);
      setTopServices(servicesData);
      setTrafficSources(sourcesData);
      setInquiryStats(inquiriesData);
    } catch (err) {
      console.error('Error loading analytics:', err);
      setError('Failed to load analytics data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (type, value) => {
    setDateRange(prev => ({ ...prev, [type]: value }));
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorState}>
          <p>{error}</p>
          <button onClick={loadAllData} className={styles.retryBtn}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Analytics Dashboard</h1>
          <p className={styles.subtitle}>Track your IT hub service performance and visitor insights</p>
        </div>
        
        {/* Date Range Picker */}
        <div className={styles.dateRange}>
          <div className={styles.dateInputGroup}>
            <Calendar size={16} />
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => handleDateChange('startDate', e.target.value)}
              className={styles.dateInput}
            />
          </div>
          <span className={styles.dateSeparator}>to</span>
          <div className={styles.dateInputGroup}>
            <Calendar size={16} />
            <input
              type="date"
              value={dateRange.endDate === 'today' ? new Date().toISOString().split('T')[0] : dateRange.endDate}
              onChange={(e) => handleDateChange('endDate', e.target.value || 'today')}
              className={styles.dateInput}
            />
          </div>
          <button onClick={loadAllData} className={styles.refreshBtn}>Refresh</button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <StatCard
          title="Total Visitors"
          value={overview?.totalUsers || '0'}
          icon={<Users size={24} />}
          color="teal"
        />
        <StatCard
          title="Page Views"
          value={overview?.totalPageViews || '0'}
          icon={<Eye size={24} />}
          color="blue"
        />
        <StatCard
          title="Total Sessions"
          value={overview?.totalSessions || '0'}
          icon={<MousePointer size={24} />}
          color="purple"
        />
        <StatCard
          title="Inquiries"
          value={inquiryStats?.totalInquiries || '0'}
          icon={<MessageSquare size={24} />}
          color="orange"
          subtext={`${inquiryStats?.newInquiries || 0} new`}
        />
      </div>

      {/* Two Column Layout */}
      <div className={styles.twoColumn}>
        {/* Traffic Chart */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3>Daily Traffic Trend</h3>
            <p className={styles.chartSubtitle}>Visitors & page views over time</p>
          </div>
          <div className={styles.chartContainer}>
            {dailyTraffic && dailyTraffic.labels?.length > 0 ? (
              <TrafficChart data={dailyTraffic} />
            ) : (
              <div className={styles.noDataMessage}>No traffic data available for this period</div>
            )}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3>Traffic Sources</h3>
            <p className={styles.chartSubtitle}>Where your visitors come from</p>
          </div>
          <div className={styles.sourcesContainer}>
            {trafficSources && trafficSources.sources?.length > 0 ? (
              <SourcesList sources={trafficSources.sources} />
            ) : (
              <div className={styles.noDataMessage}>No source data available</div>
            )}
          </div>
        </div>
      </div>

      {/* Most Viewed Services Section */}
      <div className={styles.fullWidthCard}>
        <div className={styles.chartHeader}>
          <h3>Most Viewed Services</h3>
          <p className={styles.chartSubtitle}>Your most popular IT services that attract client inquiries</p>
        </div>
        <div className={styles.servicesContainer}>
          {topServices && topServices.services?.length > 0 ? (
            <ServicesList services={topServices.services} />
          ) : (
            <div className={styles.noDataMessage}>
              <p>No service views recorded yet.</p>
              <p className={styles.hint}>Service pages need to be visited to show analytics. Data may take 24-48 hours to appear.</p>
            </div>
          )}
        </div>
      </div>

      {/* Inquiry Conversion Section */}
      <div className={styles.fullWidthCard}>
        <div className={styles.chartHeader}>
          <h3>Inquiry Performance</h3>
          <p className={styles.chartSubtitle}>Conversion metrics and inquiry status</p>
        </div>
        <div className={styles.conversionContainer}>
          <InquiryStats inquiryStats={inquiryStats} pageViews={overview?.totalPageViews} />
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ title, value, icon, color, subtext }) {
  return (
    <div className={`${styles.statCard} ${styles[color]}`}>
      <div className={styles.statIcon}>{icon}</div>
      <div className={styles.statContent}>
        <h4 className={styles.statTitle}>{title}</h4>
        <p className={styles.statValue}>{parseInt(value).toLocaleString()}</p>
        {subtext && <p className={styles.statSubtext}>{subtext}</p>}
      </div>
    </div>
  );
}

// Traffic Chart Component
function TrafficChart({ data }) {
  const maxValue = Math.max(...[...data.users, ...data.pageViews].map(Number));
  
  if (maxValue === 0) {
    return <div className={styles.noDataMessage}>No traffic data available</div>;
  }
  
  return (
    <div className={styles.chartWrapper}>
      <div className={styles.chartLegend}>
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.usersDot}`}></span>
          Visitors
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.viewsDot}`}></span>
          Page Views
        </span>
      </div>
      <div className={styles.barChart}>
        {data.labels.slice(-14).map((label, index) => {
          const userValue = parseInt(data.users[data.users.length - 14 + index]) || 0;
          const viewValue = parseInt(data.pageViews[data.pageViews.length - 14 + index]) || 0;
          return (
            <div key={index} className={styles.barGroup}>
              <div className={styles.bars}>
                <div 
                  className={`${styles.bar} ${styles.usersBar}`}
                  style={{ height: `${(userValue / maxValue) * 100}%` }}
                >
                  <span className={styles.barValue}>{userValue}</span>
                </div>
                <div 
                  className={`${styles.bar} ${styles.viewsBar}`}
                  style={{ height: `${(viewValue / maxValue) * 100}%` }}
                >
                  <span className={styles.barValue}>{viewValue}</span>
                </div>
              </div>
              <div className={styles.barLabel}>{label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Sources List Component
function SourcesList({ sources }) {
  const total = sources.reduce((sum, s) => sum + parseInt(s.sessions), 0);
  
  return (
    <div className={styles.sourcesList}>
      {sources.map((source, index) => {
        const percentage = total > 0 ? (parseInt(source.sessions) / total) * 100 : 0;
        return (
          <div key={index} className={styles.sourceItem}>
            <div className={styles.sourceInfo}>
              <span className={styles.sourceName}>{source.channel}</span>
              <span className={styles.sourceCount}>{parseInt(source.sessions).toLocaleString()} sessions</span>
            </div>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <span className={styles.sourcePercentage}>{percentage.toFixed(1)}%</span>
          </div>
        );
      })}
    </div>
  );
}

// Services List Component
function ServicesList({ services }) {
  const total = services.reduce((sum, s) => sum + s.views, 0);
  
  if (!services || services.length === 0) {
    return <div className={styles.noDataMessage}>No service views recorded yet.</div>;
  }
  
  return (
    <div className={styles.servicesTable}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Service Name</th>
            <th>Page Views</th>
            <th>% of Total</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => {
            const percentage = total > 0 ? (service.views / total) * 100 : 0;
            return (
              <tr key={index} className={styles.serviceRow}>
                <td className={styles.rankCell}>
                  <span className={`${styles.rankBadge} ${index === 0 ? styles.topRank : ''}`}>
                    {index + 1}
                  </span>
                </td>
                <td className={styles.serviceTitle}>
                  {service.title}
                </td>
                <td className={styles.serviceViews}>
                  <strong>{service.views.toLocaleString()}</strong> views
                </td>
                <td className={styles.servicePercent}>
                  <div className={styles.percentBarWrapper}>
                    <div className={styles.percentBar}>
                      <div 
                        className={styles.percentFill}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className={styles.percentValue}>{percentage.toFixed(1)}%</span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// Inquiry Stats Component
function InquiryStats({ inquiryStats, pageViews }) {
  const pageViewsNum = parseInt(pageViews) || 0;
  const totalInquiries = inquiryStats?.totalInquiries || 0;
  const conversionRate = pageViewsNum > 0 ? (totalInquiries / pageViewsNum) * 100 : 0;
  
  return (
    <div className={styles.inquiryStats}>
      <div className={styles.inquiryMetric}>
        <div className={styles.metricLabel}>Total Inquiries</div>
        <div className={styles.metricValue}>{totalInquiries.toLocaleString()}</div>
      </div>
      <div className={styles.inquiryMetric}>
        <div className={styles.metricLabel}>New Inquiries</div>
        <div className={`${styles.metricValue} ${styles.newValue}`}>{inquiryStats?.newInquiries || 0}</div>
      </div>
      <div className={styles.inquiryMetric}>
        <div className={styles.metricLabel}>Conversion Rate</div>
        <div className={styles.metricValue}>{conversionRate.toFixed(2)}%</div>
        <div className={styles.metricSubtext}>of visitors who inquire</div>
      </div>
      <div className={styles.statusBreakdown}>
        <div className={styles.statusItem}>
          <span className={styles.statusLabel}>Reviewed</span>
          <span className={styles.statusCount}>{inquiryStats?.reviewedInquiries || 0}</span>
        </div>
        <div className={styles.statusItem}>
          <span className={styles.statusLabel}>Responded</span>
          <span className={styles.statusCount}>{inquiryStats?.respondedInquiries || 0}</span>
        </div>
      </div>
    </div>
  );
}