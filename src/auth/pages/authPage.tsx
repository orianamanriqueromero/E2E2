import { useState } from "react";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"PASSENGER" | "DRIVER">("PASSENGER");

  return (
    <div>
      <h1>Uber Clone</h1>

      <button onClick={() => setIsLogin(true)}>Login</button>
      <button onClick={() => setIsLogin(false)}>Register</button>

      <hr />

      <form>
        {!isLogin && (
          <>
            <div>
              <label>First Name</label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div>
              <label>Last Name</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </>
        )}

        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {!isLogin && (
          <div>
            <label>Role</label>

            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value as "PASSENGER" | "DRIVER")
              }
            >
              <option value="PASSENGER">Passenger</option>
              <option value="DRIVER">Driver</option>
            </select>
          </div>
        )}

        <button type="submit">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
}

export default AuthPage;