import React from "react";
import UserSignupPage from "../pages/signUpPage/UserSignupPage";
import LoginPage from "../pages/loginPage/LoginPage";
function App() {
  return (
    <div className="row">
      <div className="col">
          <UserSignupPage />
      </div>
      <div className="col">
          <LoginPage />
      </div>
    </div>
  );
}

export default App;
