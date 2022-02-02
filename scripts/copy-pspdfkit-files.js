import ncp from "ncp";
import fs from "fs";

if (!fs.existsSync("./assets")) {
  fs.mkdirSync("./assets");
}

ncp(
  "./node_modules/pspdfkit/dist/pspdfkit-lib",
  "./assets/pspdfkit-lib",
  (err) => {
    err && console.error(err);
  }
);

ncp(
  "./node_modules/pspdfkit/dist/pspdfkit.js",
  "./assets/pspdfkit.js",
  (err) => {
    err && console.error(err);
  }
);
