import bcrypt from "bcrypt";
const encryptPassword = async (password) => {
  return await bcrypt.hashSync(password, Number(process.env.SALT));
};
const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
export { encryptPassword, comparePassword };
