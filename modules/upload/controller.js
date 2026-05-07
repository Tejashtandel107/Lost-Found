import path from "path";
import imagekit from "../../config/imagekit.js";

export default async function uploadRoutes(app, options) {
  app.post("/upload-image", async (req, reply) => {
    try {
      const data = await req.file();

      if (!data) {
        throw new Error("No file uploaded");
      }

      console.log("Mimetype:", data.mimetype);

      // Allow only images
      if (!data.mimetype.startsWith("image/")) {
        throw new Error("Only image files are allowed");
      }

      const buffer = await data.toBuffer();

      // Keep original extension
      const ext = path.extname(data.filename);

      // Proper filename
      const fileName = `${Date.now()}${ext}`;

      // Convert buffer to base64 with mime type
      const file = `data:${data.mimetype};base64,${buffer.toString(
        "base64"
      )}`;

      const result = await imagekit.files.upload({
        file,
        fileName,
        useUniqueFileName: false,
      });

      return reply.send({
        status: true,
        url: result.url,
      });

    } catch (err) {
      console.error("UPLOAD ERROR:", err);

      return reply.code(400).send({
        status: false,
        message: err.message || "Image upload failed",
      });
    }
  });
}