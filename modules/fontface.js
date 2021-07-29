const fs = require("fs");
const { fontsmixin } = require("./fontsmixin.js");

const fontface = (cb) => {
  fs.writeFileSync("./src/scss/fonts.scss", fontsmixin);

  fs.readdir("./src/fonts", (err, fonts) => {
    for (font of fonts) {
      let filename = font.split(".")[0].toString()
      let fontname = filename.split("-")[0].toString()
      let fontWeight = filename.split("-")[1].toString()
      let fontStyle
      if (
        filename.includes("Italic" || "itaclic")
      ) {
        fontStyle = "italic"
      } else {
        fontStyle = "normal"
      }
      if(fontWeight) {
        switch (fontWeight) {
          case "Thin":
            fontWeight = 100;
            break;
          case "ExtraLight":
            fontWeight = 200;
            break;
          case "Light":
            fontWeight = 300;
            break;
          case "Medium":
            fontWeight = 500;
            break;
          case "SemiBold":
            fontWeight = 600;
            break;
          case "Bold":
            fontWeight = 700;
            break;
          case "ExtraBold":
            fontWeight = 800;
            break;
          case "Black":
            fontWeight = 900;
            break;
          default:
            fontWeight = 400;
        }
      } else {
        fontWeight = 400
      }
      

      let fileContent = fs.readFileSync("./src/scss/fonts.scss", "utf-8")

      if (!fileContent.includes(filename)) {
        fs.appendFileSync(
          "./src/scss/fonts.scss",
          `\r\n \r\n@include font("${fontname}", "${filename}", "${fontWeight}", "${fontStyle}");`
        )
      }
    }
  })
  cb()
}

const cb = () => {}

exports.fontface = fontface;
