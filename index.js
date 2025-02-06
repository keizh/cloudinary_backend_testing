const express = require(`express`);
const cloudinary = require("cloudinary").v2;
const multer = require(`multer`);
const app = express();
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

const upload = multer({
  storage: multer.diskStorage({}),
  //   limiting size of each file , not array of files
  limits: {
    fileSize: 4.4 * 1024 * 1024,
  },
});

app.post("/media/multiple", upload.array("image", 10), (req, res) => {
  //   console.log(`req.body`, req.body);
  //   console.log(`req.files`, req.files);
});

app.post("/media/single", upload.single("image"), async (req, res) => {
  //   console.log(`req.body`, req.body.image);
  //   console.log(`req.file`, req.file);
  //   console.log(`req.file.path`, req.file.path);
  //   req.file.path serves as the URL for the image or the file

  console.log(req.file);
  try {
    // importance of resource_type : "auto"( must use )
    // irrespective of which file type you are sending , auto will detect itself and set the resource_type
    const data = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",
    });
    console.log(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
  res.status(200).json({ message: `great` });
});

app.listen(5500, () => console.log(`webserver is online`));

//  use secure_url
// use public_id for deletion

// cloudinary.uploader.destroy(public_id); <-- images

// cloudinary.uploader.destroy(public_id, {
//     resource_type: "video" <-- Required for audio/video
//   });

//  resource_type: "raw" <-- for pdf/doc

/*
image data file
{
  fieldname: 'image',
  originalname: 'Screenshot (2) - Copy - Copy.png',
  encoding: '7bit',
  mimetype: 'image/png',
  destination: 'C:\\Users\\krish\\AppData\\Local\\Temp',
  filename: '3ca1bfaabe4f2535a3105daf4d4b8ba2',
  path: 'C:\\Users\\krish\\AppData\\Local\\Temp\\3ca1bfaabe4f2535a3105daf4d4b8ba2',
  size: 1626236
}
  response of image uploaded
{
  asset_id: '7ee62dfd1f0593a864ebb6f58739130c',
  public_id: 'urt7elmmatuw4w9ln265',
  version: 1738142991,
  version_id: '6fb14a02988a12f64c34416d813b7e40',
  signature: '7bd83fb12c07ada0a5fd15594c7e054049735a1e',
  width: 1920,
  height: 1080,
  format: 'png',
  resource_type: 'image',
  created_at: '2025-01-29T09:29:51Z',
  tags: [],
  bytes: 1626236,
  type: 'upload',
  etag: 'f72873b16011803db71e9f2c6704bfcb',
  placeholder: false,
  url: 'http://res.cloudinary.com/dddkhewor/image/upload/v1738142991/urt7elmmatuw4w9ln265.png',
  secure_url: 'https://res.cloudinary.com/dddkhewor/image/upload/v1738142991/urt7elmmatuw4w9ln265.png',
  asset_folder: '',
  display_name: 'urt7elmmatuw4w9ln265',
  original_filename: '3ca1bfaabe4f2535a3105daf4d4b8ba2',
  api_key: '596457694329466'
  bytes: 1626236,
  type: 'upload',
  etag: 'f72873b16011803db71e9f2c6704bfcb',
  placeholder: false,
  url: 'http://res.cloudinary.com/dddkhewor/image/upload/v1738142991/urt7elmmatuw4w9ln265.png',
  secure_url: 'https://res.cloudinary.com/dddkhewor/image/upload/v1738142991/urt7elmmatuw4w9ln265.png',
  asset_folder: '',
  display_name: 'urt7elmmatuw4w9ln265',
  original_filename: '3ca1bfaabe4f2535a3105daf4d4b8ba2',
  api_key: '596457694329466'
}
*/

/*
video data file
{
  fieldname: 'image',
  originalname: 'CSSP1.mp4',
  encoding: '7bit',
  mimetype: 'video/mp4',
  destination: 'C:\\Users\\krish\\AppData\\Local\\Temp',    
  filename: 'a156da6884c565438f0931aa98b397df',
  path: 'C:\\Users\\krish\\AppData\\Local\\Temp\\a156da6884c565438f0931aa98b397df',
  size: 2875500
}
response of video uploaded
{
  asset_id: '2323eaaf977a95d235e79c48f140710c',
  public_id: 'fy08aqrjmeenpomqmhpw',
  version: 1738143874,
  version_id: '8cc2b2e2c92cd3d51603c8245e0b0ab2',
  signature: 'f97b746ea6c6fa8319fda927d344549f796e8920',
  width: 1920,
  height: 1080,
  format: 'mp4',
  resource_type: 'video',
  created_at: '2025-01-29T09:44:34Z',
  tags: [],
  pages: 0,
  bytes: 2875500,
  type: 'upload',
  etag: 'bbf05168744b7e4781f251eccad13fac',
  placeholder: false,
  url: 'http://res.cloudinary.com/dddkhewor/video/upload/v1738143874/fy08aqrjmeenpomqmhpw.mp4',
  secure_url: 'https://res.cloudinary.com/dddkhewor/video/upload/v1738143874/fy08aqrjmeenpomqmhpw.mp4',
  playback_url: 'https://res.cloudinary.com/dddkhewor/video/upload/sp_auto/v1738143874/fy08aqrjmeenpomqmhpw.m3u8',      
  asset_folder: '',
  display_name: 'fy08aqrjmeenpomqmhpw',
  audio: {
    codec: 'aac',
    bit_rate: '128214',
    frequency: 48000,
    channels: 2,
    channel_layout: 'stereo'
  },
  video: {
    pix_format: 'yuv420p',
    codec: 'h264',
    level: 41,
    profile: 'Main',
  },
  video: {
    pix_format: 'yuv420p',
    codec: 'h264',
    level: 41,
    profile: 'Main',
    pix_format: 'yuv420p',
    codec: 'h264',
    level: 41,
    profile: 'Main',
    profile: 'Main',
    bit_rate: '1187071',
    dar: '16:9',
    time_base: '1/30000'
  },
  is_audio: false,
  frame_rate: 60,
  bit_rate: 2066852,
  duration: 11.093312,
  rotation: 0,
  original_filename: 'a156da6884c565438f0931aa98b397df',    
  nb_frames: 68,
  api_key: '596457694329466'
    bit_rate: '1187071',
    dar: '16:9',
    time_base: '1/30000'
  },
  is_audio: false,
  frame_rate: 60,
  bit_rate: 2066852,
  duration: 11.093312,
  rotation: 0,
  original_filename: 'a156da6884c565438f0931aa98b397df',    
  nb_frames: 68,
  api_key: '596457694329466'
    dar: '16:9',
    time_base: '1/30000'
  },
  is_audio: false,
  frame_rate: 60,
  bit_rate: 2066852,
  duration: 11.093312,
  rotation: 0,
  original_filename: 'a156da6884c565438f0931aa98b397df',    
  nb_frames: 68,
  api_key: '596457694329466'
  duration: 11.093312,
  rotation: 0,
  original_filename: 'a156da6884c565438f0931aa98b397df',    
  nb_frames: 68,
  api_key: '596457694329466'
  nb_frames: 68,
  api_key: '596457694329466'
  api_key: '596457694329466'
}

*/

/*


The discrepancy between sequential uploads (working) and parallel uploads (failing) is likely due to race conditions in Cloudinary's authentication parameters,
specifically the timestamp and signature generation.
Here's the root cause and solution:
Problem: Shared Timestamp Across Parallel Uploads
When using Promise.allSettled, all files are uploaded simultaneously. 
If you generate a single timestamp/signature outside the loop (or reuse the same one for all files), Cloudinary rejects concurrent requests with the same cryptographic signature, as it expects a unique timestamp-signature pair per request.
Solution: Generate Unique Timestamp/Signature for Each File
Modify your code to generate a new timestamp and signature for each individual file upload inside the map function:

Why Sequential Uploads Worked
In sequential uploads (using for loop), each iteration generates a new timestamp implicitly (due to the delay between iterations). 
This avoids signature collisions, but it’s not reliable for production.

Using a for…of loop with await inside guarantees that each asynchronous operation completes before the next one starts. 
This behavior makes the iterations truly sequential. 
In contrast:
.map: When you use .map with an async function, it immediately returns an array of promises without waiting for each promise to settle.
If you then pass that array to Promise.all or Promise.allSettled, all the async operations run concurrently rather than in order.
.forEach: Similarly, .forEach executes its callback on every element without waiting for any promises to resolve, and it doesn’t return a promise that you can await. This means you can’t easily enforce a sequential order with .forEach.
In summary, while all three methods iterate over an array synchronously, a for…of loop combined with await processes each asynchronous call one after the other, ensuring sequential execution. In contrast, .map and .forEach (without additional control flow) do not wait for each asynchronous operation to complete, resulting in concurrent execution which can lead to issues if your code relies on sequential behavior.

*/
