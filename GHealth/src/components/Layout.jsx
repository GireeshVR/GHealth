import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../components/Layout.css";

const Layout = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <section className="containerr">
      <div className="nav_content">
        {/* LEFT SIDEBAR */}
        <div className="left_nav">
          <ul className="left_nav_ul">
            <li>
              <NavLink to="/dashboard">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <ion-icon name="grid-outline"></ion-icon>
                <div>Dashboard</div>
              </NavLink>
            </li>

            <li>
              <NavLink to="/profile">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <ion-icon name="person-outline"></ion-icon>
                <div>Profile</div>
              </NavLink>
            </li>

            <li>
              <NavLink to="/trainer">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <ion-icon name="accessibility-outline"></ion-icon>
                <div>Trainer</div>
              </NavLink>
            </li>

            <li>
              <NavLink to="/community">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <ion-icon name="git-compare-outline"></ion-icon>
                <div>Community</div>
              </NavLink>
            </li>

            <li>
              <NavLink to="/about">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <ion-icon name="golf-outline"></ion-icon>
                <div>About</div>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* RIGHT CONTENT */}
        <div className="right_nav">
          <div className="navb">
            <div className="navb_wrap">
              <div className="user_name">Hi, {username}</div>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>

          <div className="content">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Layout;
