import bcrypt from "bcryptjs";

const users = [
  {
    name: "Stephen Amade",
    email: "streuby@live.com",
    password: bcrypt.hashSync("Flip2ru45%", 10),
    isAdmin: true,
  },
  {
    name: "Obaje Arome",
    email: "austine332@gmail.com",
    password: bcrypt.hashSync("Arome2878@", 10),
    isAdmin: true,
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
