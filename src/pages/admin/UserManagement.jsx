import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import styles from "./adminUsers.module.css";

export default function AdminUsers() {

  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:8080/admin/users", {
        credentials: "include"
      });

      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async () => {
    if (!email) return;

    try {
      const res = await fetch("http://localhost:8080/admin/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email })
      });

      if (!res.ok) throw new Error("Failed to create user");

      setEmail("");
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await fetch(`http://localhost:8080/admin/delete/${id}`, {
        method: "DELETE",
        credentials: "include"
      });

      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className={styles.container}>
      
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>User Management</h1>
          <p className={styles.subtitle}>Manage admin accounts</p>
        </div>
      </header>

      {/* Add User */}
      <div className={styles.addUserBox}>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.userInput}
        />

        <button className={styles.addBtn} onClick={createUser}>
          <Plus size={16} /> Add Admin
        </button>
      </div>

      {/* Users */}
      {loading ? (
        <div className={styles.loading}>Loading users...</div>
      ) : (
        <div className={styles.userGrid}>
          {users.map((user) => (
            <div key={user.id} className={styles.userCard}>

              <div className={styles.userInfo}>
                <p className={styles.userEmail}>{user.email}</p>
                <p className={styles.userId}>ID: {user.id}</p>
              </div>

              <button
                className={styles.deleteBtn}
                onClick={() => deleteUser(user.id)}
              >
                <Trash2 size={16} />
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
