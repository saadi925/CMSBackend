import { User } from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECURITYKEY } from "../keys";
const createAdminUser = async () => {
  try {
    const name = "Admin";
    const email = "code@codestacklab.com";
    const password = "saad";
    const checkExists = await User.findOne({ email });
    if (!checkExists) {
      const salt = await bcrypt.genSalt(10);
      const secretPassword = await bcrypt.hash(password, salt);

      const adminUser = await User.create({
        name,
        email,
        password: secretPassword,
        isAdmin: true,
      });

      const data = {
        adminUser: {
          id: adminUser.id,
        },
      };
      await adminUser.save();
      const authtoken = jwt.sign(data, JWT_SECURITYKEY);
      console.log(`Auth token : ${authtoken}`);

      console.log("Admin user created successfully");
    }
    console.log("Admin User Available ! Login as Admin to use Services");
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

export default createAdminUser;
