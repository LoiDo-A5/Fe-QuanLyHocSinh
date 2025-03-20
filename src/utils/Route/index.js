const Routes = {
  Home: "/",
  Login: "/login",
  MyAccount: "/my-account",
  Signup: "/signup",
  Friendship: (id) => `/friendship/${id}`,
  ClassManagement: "/class-management",
  AddStudentToClass: "/add-student-to-class",
  Subject: "/subject",
};

export default Routes;
