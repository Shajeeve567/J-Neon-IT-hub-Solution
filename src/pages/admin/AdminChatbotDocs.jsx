import { useState, useEffect } from 'react';
import { chatbotService } from '../../services/chatbotService';
import { Upload, FileText } from 'lucide-react';
import styles from './adminChatbotDocs.module.css';

export default function AdminChatbotDocs() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [uploading, setUploading] = useState(false);
    
    // Form state
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            setLoading(true);
            const data = await chatbotService.getDocuments();
            setDocuments(data);
            setError('');
        } catch (err) {
            setError(err.message || 'Failed to fetch documents');
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        try {
            setUploading(true);
            await chatbotService.uploadDocument(file);
            setFile(null);
            fetchDocuments(); // Refresh list
            
            // clear the input
            const fileInput = document.getElementById('docFileInput');
            if (fileInput) fileInput.value = '';
            
        } catch (err) {
            setError(err.response?.data?.detail || err.message || 'Failed to upload document');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Chatbot Documents</h1>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.uploadSection}>
                <form className={styles.uploadForm} onSubmit={handleUpload}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Select PDF File *</label>
                        <input 
                            id="docFileInput"
                            type="file" 
                            className={styles.fileInput} 
                            onChange={handleFileChange}
                            accept=".pdf,application/pdf"
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className={styles.uploadBtn}
                        disabled={!file || uploading}
                    >
                        {uploading ? 'Uploading...' : 'Upload'}
                        <Upload size={16} style={{ marginLeft: '8px', display: 'inline' }} />
                    </button>
                </form>
            </div>

            {loading ? (
                <div className={styles.loading}>Loading documents...</div>
            ) : (
                <div className={styles.grid}>
                    {documents.map((doc) => (
                        <div key={doc.id} className={styles.docCard}>
                            <div className={styles.iconWrapper}>
                                <FileText size={48} color="#cbd5e0" />
                            </div>
                            <div className={styles.info}>
                                <p className={styles.fileName} title={doc.filename}>{doc.filename}</p>
                                <p className={styles.uploadTime}>
                                    Uploaded: {new Date(doc.upload_timestamp).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))}
                    {documents.length === 0 && (
                        <div className={styles.emptyState}>
                            No documents found. Upload a PDF to train the chatbot.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
