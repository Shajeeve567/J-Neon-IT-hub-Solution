import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import styles from "./adminUsers.module.css";

export default function AdminUsers() {

  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [emailError, setEmailError] = useState(""); // Add this for error messages

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

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const createUser = async () => {
    // Clear previous error
    setEmailError("");
    
    // Check if email is empty
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/admin/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email })
      });

      if (!res.ok) throw new Error("Failed to create user");

      setEmail("");
      setEmailError(""); // Clear error on success
      fetchUsers();
    } catch (err) {
      console.error(err);
      setEmailError("Failed to create user. Please try again.");
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      createUser();
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
        <div className={styles.inputWrapper}>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              // Clear error when user starts typing
              if (emailError) setEmailError("");
            }}
            onKeyPress={handleKeyPress}
            className={`${styles.userInput} ${emailError ? styles.inputError : ''}`}
          />
          {emailError && <span className={styles.errorText}>{emailError}</span>}
        </div>

        <button className={styles.addBtn} onClick={createUser}>
          <Plus size={16} /> Add Admin
        </button>
      </div>

      {/* Users */}
      {loading ? (
        <div className={styles.loading}>Loading users...</div>
      ) : (
        <div className={styles.userGrid}>
          {users.length > 0 ? (
            users.map((user) => (
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
            ))
          ) : (
            <div className={styles.noUsers}>No admin users found</div>
          )}
        </div>
      )}
    </div>
  );
}