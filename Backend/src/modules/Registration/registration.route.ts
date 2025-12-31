// import { Router } from "express";
// import { RegistrationController } from "./registration.controller";


// const router = Router();

// router.post('/register',RegistrationController.registrationUser)

// export const RegistrationRoute = router;



import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { RegistrationController } from "./registration.controller";

const router = express.Router();

// ✅ Cloudinary config
cloudinary.config({
  cloud_name: "dif2vu4cs",
  api_key: "411263815515827",
  api_secret: "Z7K88DFMDUFHVB-2CSpryDxYMck",
});

// ✅ Multer memory storage (লোকাল ফাইল নয়, buffer থেকে পড়বে)
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/register",
  upload.single("image"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let imageUrl: string | null = null;

      if (req.file) {
        const result: UploadApiResponse = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "students" },
            (error : any, result : any) => {
              if (error) reject(error);
              else resolve(result as UploadApiResponse);
            }
          );
          stream.end((req.file as Express.Multer.File).buffer);
        });

        imageUrl = result.secure_url;
      }

      // ✅ Cloudinary URL কে body তে সেট করো
      req.body.image = imageUrl;

      return RegistrationController.registrationUser(req, res);
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
);
router.get("/students", RegistrationController.getStudents);


export const RegistrationRoute = router;
