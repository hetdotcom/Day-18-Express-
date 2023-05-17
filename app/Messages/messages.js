/* eslint-disable linebreak-style */
const messages = {
  registeredSuccess: { messaege: "You are registered successfully" },
  alreadyRegisteredUser: { messaege: "Already registered" },
  loginSuccess: { messaege: "You are logged in successfully" },
  loginEmailNotRegistered: { messaege: "Email not registered" },
  wrongpass: { messaege: "Password doesnt match" },
  emailReq: { messaege: "Email id is required" },
  passReq: { messaege: "Password is required" },
  fistNameReq: { messaege: "Firstname required" },
  lastNameReq: { messaege: "Lastname required" },
  updatedProfile: { messaege: "Profile successfully updated" },
  invalidCredentials: { messaege: "Invalid credentials" },
  changePass: { messaege: "Password changed successfully" },
  unAuthorized: { messaege: "You are unauthorized!" },
  alreadyLoggedin: { messaege: "Already logged in" },
  productRegistered: { messaege: "Already Registered Product" },
  routeNotFound: { message: "Route Not Found!" },
  registerSucess: { message: "Registered succesfully" },
  userNamePattern: {
    message: "The pattern for username should be: user_123 or user.124",
  },
  emailPattern: {
    message: "Please enter a valid email like user123@gmail.com",
  },
  validMobile: { message: "Please enter valid mobile with country code" },
  validGender: {
    message:
      "Please enter a valid gender, the options are 1.Male 2.Female 3.Others",
  },
  mandatoryFields: { message: "Please add all fields" },

  userNotFound: { message: "User not found" },
};

module.exports = messages;
