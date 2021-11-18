/*
 * Project: COMP1320 Milestone 1
 * File Name: main.js
 * Description: 
 * 
 * Created Date: 
 * Author:
 * 
 */

const IOhandler = require("./IOhandler"),
  zipFilePath = `${__dirname}/myfile.zip`,
  pathUnzipped = `${__dirname}/unzipped`,
  pathProcessed = `${__dirname}/grayscaled`;

const unzip = require('./IOhandler').unzip;
const readDir = require('./IOhandler').readDir;
const grayScale = require('./IOhandler').grayScale;


unzip(zipFilePath, pathUnzipped)
.then(()=> console.log("extraction complete"))
.then(() => readDir(pathUnzipped))
.then((data) => grayScale(data, pathProcessed))
.catch((err) => console.log(err))

