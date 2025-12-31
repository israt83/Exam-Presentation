import { pool } from "../../Database/db";
import bcrypt from "bcryptjs";

const registrationUser = async (payload: Record<string, any>) => {
  const {
    roll,
    firstName,
    lastName,
    fatherName,
    dob,
    mobile,
    email,
    password,
    gender,
    department,
    course,
    passingYear,
    address,
    image,
  } = payload;

  if (!password || password.length < 6) {
    const error: any = new Error("Password must be at least 6 characters long");
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const name = `${firstName} ${lastName}`;

  const result = await pool.query(
    `
    INSERT INTO students (
      roll, name, father_name, dob, phone, email, password,
      gender, department, course, passing_year, image, address
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
    RETURNING *
    `,
    [
      roll,
      name,
      fatherName,
      dob,
      mobile,
      email.toLowerCase(),
      hashedPassword,
      gender,
      department,
      course,
      passingYear,
      image,
      address
    ]
  );

  delete result.rows[0].password;
  return result.rows[0];
};
const getStudents = async () => {
  const result = await pool.query("SELECT * FROM students ORDER BY id DESC");
  return result.rows;
};


export const RegistrationService = { registrationUser , getStudents };
