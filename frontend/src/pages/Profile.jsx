import { useAuth } from '../context/AuthContext.jsx';
export default function Profile() {
  const { user } = useAuth();
  return (
    <div className="profile">
      <h1>My Profile</h1>
      <div className="card-body">
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Role:</b> {user.role}</p>
      </div>
    </div>
  );
}
