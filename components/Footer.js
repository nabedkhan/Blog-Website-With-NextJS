import React from "react";

function Footer() {
  const styles = {
    fontSize: 24,
    paddingLeft: 15,
  };
  return (
    <div className="bg-light">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <p className="text-center py-3">
            All Rights Reserved By Nabed Khan | &copy;{" "}
            {new Date().getFullYear().toString()}
          </p>
          <div className="social-icons">
            <i className="fab fa-facebook-square text-warning" style={styles} />
            <i className="fab fa-instagram text-warning" style={styles} />
            <i className="fab fa-linkedin text-warning" style={styles} />
            <i className="fab fa-github text-warning" style={styles} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
