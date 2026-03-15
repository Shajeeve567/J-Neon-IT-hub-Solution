import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, ExternalLink } from 'lucide-react';
import { getPortfolioItems, deletePortfolioItem, getPortfolioImages } from '../../services/portfolioService';
import styles from './adminPortfolioList.module.css';

export default function AdminPortfolioList() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [projectToDelete, setProjectToDelete] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const data = await getPortfolioItems();

            // Map over each item to fetch its image array
            const projectsWithImages = await Promise.all((data || []).map(async (project) => {
                try {
                    const images = await getPortfolioImages(project.id);
                    const imageUrl = images && images.length > 0 ? images[0].imageUrl : null;
                    return { ...project, imageUrl };
                } catch (e) {
                    console.error("Failed to fetch image for project", project.id, e);
                    return { ...project, imageUrl: null };
                }
            }));

            setProjects(projectsWithImages);
        } catch (error) {
            console.error("Failed to load projects", error);
            setProjects([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        setProjectToDelete(id);
    };

    const confirmDelete = async () => {
        if (!projectToDelete) return;

        try {
            await deletePortfolioItem(projectToDelete);
            setProjects(projects.filter(p => p.id !== projectToDelete));
            setProjectToDelete(null);
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message || 'Unknown error';
            alert(`Failed to delete the project: ${errorMsg}`);
            setProjectToDelete(null);
        }
    };

    const cancelDelete = () => {
        setProjectToDelete(null);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Portfolio Management</h1>
                    <p className={styles.subtitle}>Showcase your best work</p>
                </div>
                <button
                    className={styles.addBtn}
                    onClick={() => navigate('/admin/portfolio/create')}
                >
                    <Plus size={18} /> Add Project
                </button>
            </header>

            {loading ? (
                <div className={styles.loading}>Loading projects...</div>
            ) : projects.length === 0 ? (
                <div className={styles.emptyState}>No projects found. Click "Add Project" to start.</div>
            ) : (
                <div className={styles.grid}>
                    {projects.map((project) => (
                        <div key={project.id || project.title} className={styles.card}>
                            <div className={styles.imageContainer}>
                                {/* <img
                                    src={project.imageUrl || 'https://via.placeholder.com/400x200?text=' + encodeURIComponent(project.title || 'Project')}
                                    alt={project.title}
                                    className={styles.projectImage}
                                /> */}
                                <span className={styles.categoryBadge}>{project.summary || 'Portfolio'}</span>
                            </div>

                            <div className={styles.cardContent}>
                                <h3 className={styles.projectTitle}>{project.title}</h3>
                                <p className={styles.clientName}>{project.clientName}</p>
                                <p className={styles.description}>{project.description}</p>

                                <div className={styles.techTags}>
                                    {(project.technologies || []).slice(0, 3).map((tech, index) => (
                                        <span key={index} className={styles.techTag}>{tech}</span>
                                    ))}
                                    {(project.technologies?.length > 3) && (
                                        <span className={styles.techTag}>+{project.technologies.length - 3}</span>
                                    )}
                                </div>
                            </div>

                            <div className={styles.cardActions}>
                                <button
                                    className={styles.actionBtn}
                                    onClick={() => navigate(`/admin/portfolio/edit/${project.id}`)}
                                    title="Edit"
                                >
                                    <Edit2 size={16} /> Edit
                                </button>
                                <button
                                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                                    onClick={() => handleDelete(project.id)}
                                    title="Delete"
                                >
                                    <Trash2 size={16} />
                                </button>
                                <a
                                    href={project.projectUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${styles.actionBtn} ${styles.viewBtn}`}
                                    title="View Live"
                                >
                                    <ExternalLink size={16} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Custom Delete Confirmation Modal */}
            {projectToDelete && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h3>Confirm Deletion</h3>
                        <p>Are you sure you want to delete this project? This action cannot be undone.</p>
                        <div className={styles.modalActions}>
                            <button className={styles.cancelBtn} onClick={cancelDelete}>Cancel</button>
                            <button className={styles.confirmDeleteBtn} onClick={confirmDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
