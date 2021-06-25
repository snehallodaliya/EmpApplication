//import { User } from "../api";

const users = JSON.parse(
  window.localStorage.getItem("db_users") || "{}"
);

const blackListEmails = ["hacker@mail.com", "asd@mail.com"];

export function setUser(data) {
  if (data?.email && !blackListEmails.includes(data?.email)) {
    users[data.email] = data;
    window.localStorage.setItem("db_users", JSON.stringify(users));
    return data;
  } else {
    return null;
  }
}

export function getUser(email) {
  return users[email];
}
