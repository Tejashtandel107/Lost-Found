import imagekit from "../../config/imagekit.js";

export default async function uploadRoutes(app, options) {
  app.post("/upload-image", async (req, reply) => {
    try {
      const data = await req.file();

      if (!data) {
        throw new Error("No file uploaded");
      }

      // Allow all image types
      if (!data.mimetype.startsWith("image/")) {
        throw new Error("Only image files are allowed");
      }

      const buffer = await data.toBuffer();

      // Important for webp support
      const base64File = `data:${data.mimetype};base64,${buffer.toString(
        "base64"
      )}`;

      const result = await imagekit.files.upload({
        file: base64File,
        fileName: `${Date.now()}-${data.filename}`,
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