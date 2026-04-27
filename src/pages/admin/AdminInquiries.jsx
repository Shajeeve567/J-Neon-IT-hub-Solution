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

const statusOrder = {
  new: 1,
  reviewed: 2,
  responded: 3
};

const sortedInquiries = [...inquiries].sort((a, b) => {
  const aStatus = (a.status || "").toLowerCase().trim();
  const bStatus = (b.status || "").toLowerCase().trim();

  return statusOrder[aStatus] - statusOrder[bStatus];
});

  const fetchInquiries = async () => {
    try {
      const res = await fetch("https://j-neon-it-hub-backend-54hj.onrender.com/contact/get-all", {
        credentials: "include"
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();

      if (Array.isArray(data)) {
        setInquiries(data);
        if (data.length > 0) setSelectedId(data[0].id);
      } else {
        setInquiries([]);
      }
    } catch (err) {
      console.error(err);
      setInquiries([]);
    } finally {
      setLoading(false);
    }
  };

  const updateInquiryStatus = async (id, status) => {
    try {
      const res = await fetch("https://j-neon-it-hub-backend-54hj.onrender.com/contact/tags", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id, status })
      });

      if (!res.ok) throw new Error("Failed to update");

      const updated = await res.json();

      // update list instantly
      setInquiries(prev =>
        prev.map(i => (i.id === id ? { ...i, status: updated.status || status } : i))
      );

      setSelectedId(id);
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

const handleDelete = async (id) => {
  try {
    const res = await fetch(`https://j-neon-it-hub-backend-54hj.onrender.com/contact/delete/${id}`, {
      method: "DELETE",
      credentials: "include"
    });

    if (!res.ok) throw new Error("Failed to delete");

    // remove from UI instantly
    setInquiries(prev => prev.filter(i => i.id !== id));

    // clear selection if deleted item was selected
    if (selectedId === id) {
      setSelectedId(null);
    }

  } catch (err) {
    console.error("Delete failed", err);
  }
};
  const selectedInquiry = inquiries.find(i => i.id === selectedId);

  const getStatusClass = (status) => {
    const normalized = (status || "").toLowerCase().trim();

    switch (normalized) {
      case "new":
        return styles.statusNew;
      case "reviewed":
        return styles.statusReviewed;
      case "responded":
        return styles.statusResponded;
      default:
        return styles.statusNew;
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Customer Inquiries</h1>
          <p className={styles.subtitle}>Manage and respond to customer inquiries</p>
        </div>
      </header>

      <div className={styles.contentWrapper}>
        {/* LEFT PANEL */}
        <div className={styles.inquiryList}>
          {sortedInquiries.map(inq => (
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

                <span className={`${styles.statusBadge} ${getStatusClass(inq.status)}`}>
                  <span className={styles.statusDot} />
                  {inq.status}
                </span>
              </div>

              <p className={styles.inquiryPreview}>{inq.preview}</p>
            </div>
          ))}
        </div>

        {/* RIGHT PANEL */}
        {selectedInquiry ? (
          <div className={styles.detailsPanel}>
            <div className={styles.detailsHeader}>
              <div>
                <h2 className={styles.detailsName}>{selectedInquiry.name}</h2>
                <p className={styles.detailsCompany}>{selectedInquiry.company}</p>
              </div>

              <div className={styles.detailsActions}>
                <select
                  className={styles.actionSelect}
                  value={selectedInquiry.status}
                  onChange={(e) =>
                    updateInquiryStatus(selectedInquiry.id, e.target.value)
                  }
                >
                  <option value="new">Mark as New</option>
                  <option value="reviewed">Mark as Reviewed</option>
                  <option value="responded">Mark as Responded</option>
                </select>

<button
  className={styles.deleteBtn}
  onClick={() => handleDelete(selectedInquiry.id)}
>
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
                <div className={styles.infoBoxValue}>
                  {selectedInquiry.email}
                </div>
              </div>
            </div>

            <div className={styles.infoBox}>
              <div className={styles.infoBoxLabel}>
                <Calendar size={16} />
                <span>Submitted Date</span>
              </div>
              <div className={styles.infoBoxValue}>
                {selectedInquiry.createdAt}
              </div>
            </div>

            <div className={styles.messageBox}>
              <div className={styles.messageBoxLabel}>Message</div>
              <p className={styles.messageText}>{selectedInquiry.message}</p>
            </div>
          </div>
        ) : (
          <div className={styles.detailsPanel}>
            <p>Select an inquiry to view details.</p>
          </div>
        )}
      </div>
    </div>
  );
}
