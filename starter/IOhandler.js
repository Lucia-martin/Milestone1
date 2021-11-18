/*
 * Project: COMP1320 Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 * 
 * Created Date: 
 * Author: 
 * 
 */

const unzipper = require('unzipper'),
  fs = require("fs"),
  PNG = require('pngjs').PNG,
  path = require('path');

const unzip = (pathIn, pathOut) => {
  return fs.createReadStream(pathIn)
    .pipe(unzipper.Extract({ path: pathOut }))
    .promise()
}

const pngArray = [];


const readDir = dir => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject("Directory doesn't exist.")
      } else {
        files.forEach((file) => {
          if (file.endsWith('png')) {
            pngArray.push(file)
          }
        })
        resolve(pngArray)
      }
    })
  })
}

const grayScale = (pathIn, pathOut) => { //pathin is array of png names, and pathout is path to write to "./grayscale"
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(pathOut)) {
      fs.mkdir(pathOut, err => {
        if (err) {
          reject("There is an error with mkdir.")
        }
      })
    }
    pathIn.forEach((pngFile) => {
      fs.createReadStream(path.join(`./unzipped/${pngFile}`))
        .pipe(new PNG({
        })
        ).on('parsed', function () {
          for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
              var idx = (this.width * y + x) << 2;

              let red = this.data[idx];
              let green = this.data[idx + 1]
              let blue = this.data[idx + 2]

              gray = (red + green + blue) / 3

              this.data[idx] = gray;
              this.data[idx + 1] = gray;
              this.data[idx + 2] = gray;
            }
          }
          this.pack().pipe(fs.createWriteStream(`${pathOut}/${pngFile}`))
        })
    })
  })

};


module.exports = {
  unzip,
  readDir,
  grayScale
};

