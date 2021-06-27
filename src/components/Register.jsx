import React from "react";
import { useAuth } from "../lib/auth";
import { useForm } from "../hooks/useForm";

export function Register() {
  const { register } = useAuth();
  const { values, onChange } = useForm({});
  const [error, setError] = React.useState(null);

  return (
    <div>
      Register
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await register(values);
          } catch (err) {
            console.log("error")
            setError(err);
          }
        }}
      >
        <input
          placeholder="email"
          name="email"
          onChange={onChange}
        />
        <br/>
        <input placeholder="name" name="name" onChange={onChange} />
        <br/>
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={onChange}
        />
        <br/>
        <input placeholder="username" name="username" onChange={onChange} />
        <br/>
        <input placeholder="mobileNo" name="mobileNo" onChange={onChange} />
        <br/>
        <input placeholder="role" name="role" onChange={onChange} />
        <br/>
        
        <button type="submit">Submit</button>
        {error && (
          <div style={{ color: "tomato" }}>
            {JSON.stringify(error, null, 2)}
          </div>
        )}
      </form>
    </div>
  );
}
