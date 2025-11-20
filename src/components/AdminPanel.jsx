import { Link } from "react-router-dom";
import "../css/admin.css";

function AdminPanel() {
  return (
    <div className="admin-panel">
      <h1>Welcome to Admin Panel</h1>
      <div className="admin-links">
        <Link to={"/admin/createbook"}>Create Book</Link>
        <Link to={"/admin/edit"}>Edit Book</Link>
        <Link to={"/admin/deletebook"}>Delete Book</Link>
      </div>
    </div>
  );
}
export default AdminPanel;
