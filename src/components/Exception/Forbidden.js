import React from 'react';

const Forbidden = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-10 my-5 text-center">
          <div className="card">
            <div className="card-body p-5">
              <img src="../assets/ctx_main_logo_1.png" height="50" alt="Logo" />
              <h1 className="mt-5 mb-3">403</h1>
              <p>Sorry, you don't have permission to access this page.</p>
              <a href="/dashboard" className="btn btn-primary mt-5">
                Back to dashboard
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
