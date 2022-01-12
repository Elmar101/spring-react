import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import XInput from "../../x-lib/components/XInput";
import XInputPassword from "../../x-lib/components/XInputPassword";
import { signUp } from "../../api/apiCalls";

export const UserSignupPage = () => {
  const [values, setValues] = React.useState({
    username: "",
    displayname: "",
    password: "",
    passwordRepeat: "",
    pendingApiCall: false,
    showPassword: false,
    errors: {
      username: "",
      displayname: "",
      password: "",
      passwordRepeat: "",
    },
  });

  const handleChange = (prop) => (event) => {
    let { value } = event.target;
    if (prop === "password" || prop === "passwordRepeat") {
      if (prop === "password" && value !== values.passwordRepeat) {
        setValues({
          ...values,
          [prop]: value,
          errors: { ...values.errors, passwordRepeat: "Password mismatch" },
        });
      } else if (prop === "passwordRepeat" && value !== values.password) {
        setValues({
          ...values,
          [prop]: value,
          errors: { ...values.errors, passwordRepeat: "Password mismatch" },
        });
      } else {
        setValues({
          ...values,
          [prop]: value,
          errors: { ...values.errors, passwordRepeat: undefined },
        });
      }
    } else
      setValues({
        ...values,
        [prop]: value,
        errors: { ...values.errors, [prop]: undefined },
      });
  };

  const handleClickShowPassword = (prop) => () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSignUp = (e) => {
    e.preventDefault();
    const { username, displayname, password } = values;
    const body = { username, displayname, password };
    setValues({ ...values, pendingApiCall: true });
    signUp(body)
      .then((response) => {
        setValues({ ...values, pendingApiCall: false });
      })
      .catch((error) => {
        console.log(error.response.data.validationErrors);
        if (Object.keys(error).length > 0) {
          setValues({
            ...values,
            pendingApiCall: false,
            errors: {
              ...values.errors,
              username: error.response.data.validationErrors.username,
              displayname: error.response.data.validationErrors.displayname,
              password: error.response.data.validationErrors.password,
            },
          });
        }
      });
  };
  return (
    <form onSubmit={onSignUp}>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <Container maxWidth="sm">
          <Container maxWidth="sm">
            <XInput
              label="User Name"
              value={values.username}
              error={values.errors.username}
              onChange={handleChange("username")}
            />
          </Container>
          <Container maxWidth="sm">
            <XInput
              label="Display Name"
              value={values.displayname}
              error={values.errors.displayname}
              onChange={handleChange("displayname")}
            />
          </Container>

          <Container maxWidth="sm">
            <XInputPassword
              type={values.showPassword}
              label="Password"
              error={values.errors.password}
              value={values.password}
              onChange={handleChange("password")}
              onMouseDown={handleMouseDownPassword}
              onClick={handleClickShowPassword("password")}
            />
          </Container>

          <Container maxWidth="sm">
            <XInputPassword
              type={values.showPassword}
              label="Password Repeat"
              error={values.errors.passwordRepeat}
              value={values.passwordRepeat}
              onChange={handleChange("passwordRepeat")}
              onMouseDown={handleMouseDownPassword}
              onClick={handleClickShowPassword("passwordRepeat")}
            />
          </Container>

          <Container maxWidth="sm">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={
                values.pendingApiCall ||
                values.errors.passwordRepeat !== undefined
              }
            >
              {values.pendingApiCall && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span
                style={{
                  paddingLeft: values.pendingApiCall && "16px",
                  paddingRight: values.pendingApiCall && "16px",
                }}
              >
                Sign up
              </span>
            </Button>
          </Container>
        </Container>
      </Box>
    </form>
  );
};
