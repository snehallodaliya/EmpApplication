import React from "react";
import { useForm } from "../hooks/useForm";
import { useAuth } from "../lib/auth";

export function Login() {
  const { login } = useAuth();
  const { values, onChange } = useForm({});
  const [error, setError] = React.useState(null);
  return (
    <div>
      Login
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await login(values);
          } catch (err) {
            setError(err);
          }
        }}
      >
        <input
          placeholder="username"
          name="username"
          onChange={onChange}
        />
        <br/>
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={onChange}
        />
        <br/>
        <button type="submit">Submit</button>
      </form>
      {error && (
        <div style={{ color: "tomato" }}>{JSON.stringify(error, null, 2)}</div>
      )}
    </div>
  );
}
