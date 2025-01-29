const express = require(`express`);
const cloudinary = require("cloudinary").v2;
const multer = require(`multer`);
const app = express();

const upload = multer({
  storage: multer.diskStorage({}),
});

app.post("/media/multiple", upload.array("image", 10), (req, res) => {
  //   console.log(`req.body`, req.body);
  //   console.log(`req.files`, req.files);

  res.status(200).json({ message: "sent" });
});

app.post("/media/single", upload.single("image"), (req, res) => {
  //   console.log(`req.body`, req.body.image);
  //   console.log(`req.file`, req.file);

  res.status(200).json({ message: "sent" });
});

app.listen(5500, () => console.log(`webserver is online`));
