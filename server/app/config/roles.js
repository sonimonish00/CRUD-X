// https://github.com/hagopj13/node-express-boilerplate/blob/master/src/config/roles.js

const allRoles = {
  user: [],
  admin: ["getUsers", "manageUsers"],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

export { roles, roleRights };
