import { useState, useEffect } from 'react';
import { mediaService } from '../../services/mediaService';
import { Trash2, Upload, FileImage } from 'lucide-react';
import styles from './adminMedia.module.css';

export default function AdminMedia() {
    const [mediaList, setMediaList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [uploading, setUploading] = useState(false);
    
    // Form state
    const [file, setFile] = useState(null);
    const [altText, setAltText] = useState('');
    const [caption, setCaption] = useState('');

    useEffect(() => {
        fetchMedia();
    }, []);

    const fetchMedia = async () => {
        try {
            setLoading(true);
            const data = await mediaService.getAllMedia();
            setMediaList(data);
            setError('');
        } catch (err) {
            setError(err.message || 'Failed to fetch media');
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
            await mediaService.uploadMedia(file, altText, caption);
            // Reset form
            setFile(null);
            setAltText('');
            setCaption('');
            // Refresh list
            fetchMedia();
        } catch (err) {
            setError(err.message || 'Failed to upload media');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this photo?')) return;

        try {
            await mediaService.deleteMedia(id);
            // Refresh list
            fetchMedia();
        } catch (err) {
            setError(err.message || 'Failed to delete media');
        }
    };

    const formatBytes = (bytes) => {
        if (!bytes) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Media Library</h1>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.uploadSection}>
                <form className={styles.uploadForm} onSubmit={handleUpload}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Select File *</label>
                        <input 
                            type="file" 
                            className={styles.fileInput} 
                            onChange={handleFileChange}
                            accept="image/*"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Alt Text (Optional)</label>
                        <input 
                            type="text" 
                            className={styles.input} 
                            placeholder="Descriptive text"
                            value={altText}
                            onChange={(e) => setAltText(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Caption (Optional)</label>
                        <input 
                            type="text" 
                            className={styles.input} 
                            placeholder="Image caption"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
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
                <div className={styles.loading}>Loading media...</div>
            ) : (
                <div className={styles.grid}>
                    {mediaList.map((media) => (
                        <div key={media.id} className={styles.mediaCard}>
                            <div className={styles.imageWrapper}>
                                {media.mimeType && media.mimeType.startsWith('image/') ? (
                                    <img src={media.fileUrl} alt={media.altText || media.fileName} className={styles.image} />
                                ) : (
                                    <div style={{display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                                        <FileImage size={48} color="#cbd5e0" />
                                    </div>
                                )}
                            </div>
                            <div className={styles.info}>
                                <p className={styles.fileName} title={media.fileName}>{media.fileName}</p>
                                <p className={styles.mimeSize}>
                                    {media.mimeType || 'Unknown'} • {formatBytes(media.fileSizeBytes)}
                                </p>
                            </div>
                            <button 
                                className={styles.deleteBtn} 
                                onClick={() => handleDelete(media.id)}
                                title="Delete"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                    {mediaList.length === 0 && (
                        <div className={styles.emptyState}>
                            No media files found. Upload some to see them here.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
