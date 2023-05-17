/* eslint-disable linebreak-style */
const messages = {
  registeredSuccess: { messaege: "You are registered successfully" },
  alreadyRegisteredUser: { messaege: "Already registered" },
  loginSuccess: { messaege: "You are logged in successfully" },
  loginEmailNotRegistered: { messaege: "Email not registered" },
  wrongpass: { messaege: "Password doesnt match" },
  emailReq: { messaege: "Email id is required" },
  passReq: { messaege: "Password is required" },
  wrongRole: { messaege: "Enter valid role" },
  updatedProfile: { messaege: "Profile successfully updated" },
  invalidCredentials: { messaege: "Invalid credentials" },
  changePass: { messaege: "Password changed successfully" },
  unAuthorized: { messaege: "You are unauthorized!" },
  routeNotFound: { message: "Route Not Found!" },
  registerSucess: { message: "Registered succesfully" },
  mandatoryFields: { message: "Please add all fields" },
  userNotFound: { message: "User not found" },
  tokenError: {messaege: "jWT token sign error"},
  controllerError: {message: "Conroller Error"},
  validationError: {message: "validation error"},
  middlewareError: {message: "middleware error"},
  invalidToken: {message: "invalid token"},
  tokenVerificationError: {message: "token not verified"},
};

module.exports = messages;
