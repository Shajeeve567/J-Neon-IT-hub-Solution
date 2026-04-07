import { useState, useEffect } from 'react';
import { chatbotService } from '../../services/chatbotService';
import { Upload, FileText, Trash2 } from 'lucide-react';
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
            const selectedFile = e.target.files[0];
            // Check if file is a PDF
            if (selectedFile.type !== 'application/pdf' && !selectedFile.name.toLowerCase().endsWith('.pdf')) {
                setError('Warning: Only PDF files are allowed for the chatbot. Please select a valid PDF document.');
                setFile(null);
                e.target.value = ''; // Clear the input
                return;
            }
            setError(''); // Clear any previous errors
            setFile(selectedFile);
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

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this document? It will be removed from the chatbot completely.')) return;
        
        try {
            await chatbotService.deleteDocument(id);
            // Refresh list
            fetchDocuments();
        } catch (err) {
            setError(err.response?.data?.error || err.message || 'Failed to delete document');
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
                        <label htmlFor="docFileInput" className={styles.label}>Select PDF File *</label>
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
                            <button 
                                className={styles.deleteBtn} 
                                onClick={() => handleDelete(doc.id)}
                                title="Delete Document"
                            >
                                <Trash2 size={16} />
                            </button>
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
