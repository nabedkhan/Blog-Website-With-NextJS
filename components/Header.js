import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import useUser from "../utils/useUser";

function Header() {
  const router = useRouter();
  const { user, mutate } = useUser();
  // active link
  const activePath = (url) => (router.pathname === url ? "active" : "");

  const handleLogout = () => {
    fetch("/api/auth/logout", {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => mutate("/api/user"));
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container">
        <Link href="/">
          <a className="navbar-brand text-uppercase">Our Blog</a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          {user && user.isLoggedIn ? (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link href="/create">
                  <a className={`nav-link ${activePath("/create")}`}>
                    Create Post
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/my_post">
                  <a className={`nav-link ${activePath("/my_post")}`}>
                    My Posts
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/profile">
                  <a className={`nav-link ${activePath("/profile")}`}>
                    Profile
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="btn nav-link logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link href="/login">
                  <a className={`nav-link ${activePath("/login")}`}>Login</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/register">
                  <a className={`nav-link ${activePath("/register")}`}>
                    Register
                  </a>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
