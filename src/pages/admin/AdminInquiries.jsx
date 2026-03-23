import { useState, useEffect } from 'react';
import { Calendar, Mail, Phone, Trash2 } from 'lucide-react';
import styles from './adminInquiries.module.css';


export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

const fetchInquiries = async () => {
  try {
    const res = await fetch("http://localhost:8080/contact/get-all", {
      credentials: "include"
    });

    if (!res.ok) {
      throw new Error("Server error");
    }

    const data = await res.json();

    console.log("Fetched inquiries:", data); // Debug log
    // 🔥 SAFETY CHECK
    if (Array.isArray(data)) {
      setInquiries(data);

      if (data.length > 0) {
        setSelectedId(data[0].id);
      }
    } else {
      console.error("Unexpected response:", data);
      setInquiries([]); // prevent crash
    }

  } catch (err) {
    console.error("Failed to load inquiries", err);
    setInquiries([]); // prevent crash
  } finally {
    setLoading(false);
  }
};

  const selectedInquiry = inquiries.find(inq => inq.id === selectedId);

  const getStatusClass = (status) => {
    switch (status) {
      case 'new': return styles.statusNew;
      case 'reviewed': return styles.statusReviewed;
      case 'responded': return styles.statusResponded;
      default: return styles.statusNew;
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Customer Inquiries</h1>
          <p className={styles.subtitle}>Manage and respond to customer inquiries</p>
        </div>
        <select className={styles.filterSelect}>
          <option value="all">All Inquiries</option>
          <option value="new">New</option>
          <option value="reviewed">Reviewed</option>
          <option value="responded">Responded</option>
        </select>
      </header>

      <div className={styles.contentWrapper}>
        {/* Left Panel - Inquiry List */}
        <div className={styles.inquiryList}>
          {inquiries.map(inq => (
            <div
              key={inq.id}
              className={`${styles.inquiryCard} ${selectedId === inq.id ? styles.active : ''}`}
              onClick={() => setSelectedId(inq.id)}
            >
              <div className={styles.inquiryCardHeader}>
                <div>
                  <h3 className={styles.inquiryName}>{inq.name}</h3>
                  <p className={styles.inquiryCompany}>{inq.email}</p>
                </div>
                {/* <span className={`${styles.statusBadge} ${getStatusClass(inq.status)}`}>
                  {inq.status}
                </span> */}
              </div>
              {/* <span className={styles.serviceTag}>{inq.service}</span> */}
              <p className={styles.inquiryPreview}>{inq.preview}</p>
              {/* <div className={styles.inquiryDate}>
                <Calendar size={12} />
                <span>{inq.date}</span>
              </div> */}
            </div>
          ))}
        </div>

        {/* Right Panel - Details */}
        {selectedInquiry ? (
          <div className={styles.detailsPanel}>
            <div className={styles.detailsHeader}>
              <div>
                <h2 className={styles.detailsName}>{selectedInquiry.name}</h2>
                <p className={styles.detailsCompany}>{selectedInquiry.company}</p>
              </div>
              <div className={styles.detailsActions}>
                {/* <select
                  className={styles.actionSelect}
                  value={selectedInquiry.status}
                  onChange={() => { }}
                >
                  <option value="new">Mark as New</option>
                  <option value="reviewed">Mark as Reviewed</option>
                  <option value="responded">Mark as Responded</option>
                </select> */}
                <button className={styles.deleteBtn} title="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className={styles.contactGrid}>
              <div className={styles.infoBox}>
                <div className={styles.infoBoxLabel}>
                  <Mail size={16} />
                  <span>Email</span>
                </div>
                <div className={styles.infoBoxValue}>{selectedInquiry.email}</div>
              </div>
              {/* <div className={styles.infoBox}>
                <div className={styles.infoBoxLabel}>
                  <Phone size={16} />
                  <span>Phone</span>
                </div>
                <div className={styles.infoBoxValue}>{selectedInquiry.phone}</div>
              </div> */}
            </div>

            <div className={styles.infoBox}>
              <div className={styles.infoBoxLabel}>
                <Calendar size={16} />
                <span>Submitted Date</span>
              </div>
              <div className={styles.infoBoxValue}>{selectedInquiry.createdAt}</div>
            </div>

            {/* <div className={styles.serviceInterested}>
              <div className={styles.serviceInterestedLabel}>
                <span className={styles.dot}></span>
                <span>Service Interested In</span>
              </div>
              <span className={styles.serviceInterestedTag}>{selectedInquiry.service}</span>
            </div> */}

            <div className={styles.messageBox}>
              <div className={styles.messageBoxLabel}>Message</div>
              <p className={styles.messageText}>{selectedInquiry.message}</p>
            </div>

            <div className={styles.actionButtons}>
              <button className={styles.primaryBtn}>
                <Mail size={16} />
                Send Email Response
              </button>
              <button className={styles.secondaryBtn}>
                <Phone size={16} />
                Call Customer
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.detailsPanel} style={{ alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: 'var(--color-text-muted)' }}>Select an inquiry to view details.</p>
          </div>
        )}
      </div>
    </div>
  );
}
