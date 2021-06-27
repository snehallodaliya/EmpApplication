import { useAuth } from '../lib/auth';

export function UserInfo() {
  const { user, logout } = useAuth();
  console.log("check user data",user);
  return (
    <div>
      Welcome {user?.username}
      <button onClick={() => logout()}>Log Out</button>
    </div>
  );
}
