const express = require("express");
var cors = require('cors')
const multer = require("multer");
var docxConverter = require("docx-pdf");
const path = require("path");
const app = express();
app.use(cors());
const port = 3000;
// setting file stores start
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
// setting file stores end

const upload = multer({ storage: storage });

app.post("/convertFile", upload.single("file"), function (req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No files uploaded",
      });
    }

    //    __dirname is a Node.js global variable that represents the directory name of the current module. It provides the absolute path to the directory containing the currently executing script.
    //    output path variable here
    let outputPath = path.join(
      __dirname,
      "files",
      `${req.file.originalname}.pdf`
    );

    docxConverter(req.file.path, outputPath,  (err, result)=> {
      if (err) {
        console.log(err.message);
        return res.status(400).json({
            message:"Error Converting docx to pdf",
        });
      }
      res.download(outputPath,()=>{
        console.log("file downloaded");
      });
     
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
        message:"Internal Server Error"
    })
  }
});

app.get("/", (req, res) => {
  res.send("server sunny");
});

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
