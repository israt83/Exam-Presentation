// import { Request, Response } from "express";
// import { RegistrationService } from "./registration.service";

// const registrationUser = async (req: Request, res: Response) => {
//   try {
//     const payload = {
//       ...req.body,
//       image: req.file?.filename || null, // ফাইলের নাম DB তে সেভ হবে
//     };

//     const result = await RegistrationService.registrationUser(payload);

//     return res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       data: result,
//     });
//   } catch (error: any) {
//     return res.status(error.statusCode || 500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


// export const RegistrationController = { registrationUser };

import { Request, Response } from "express";
import { RegistrationService } from "./registration.service";

const registrationUser = async (req: Request, res: Response) => {
  try {
    const payload = {
      ...req.body,
      image: req.body.image, // Cloudinary URL আসবে এখানে
    };

    const result = await RegistrationService.registrationUser(payload);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};
const getStudents = async (req: Request, res: Response) => {
  try {
    const result = await RegistrationService.getStudents();
    return res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const RegistrationController = { registrationUser , getStudents };
