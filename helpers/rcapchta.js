function rcaptcha(text) {
  const Canvas = require('canvas');

 const canvas = Canvas.createCanvas(900, 300);
 const ctx = canvas.getContext('2d');
    
 ctx.fillStyle = "#000000";
 ctx.textAlign = "center";
 ctx.font = text.length >= 10 ? '900 100px Nunito' : text.length <= 6 ? '900 160px Nunito' : '900 140px Nunito';
 ctx.lineWidth = 5;
 ctx.fillText(text, canvas.width / 2, canvas.height / 1.7);
 ctx.strokeStyle = "#ffffff";
 ctx.strokeText(text, canvas.width / 2, canvas.height / 1.7);
  
 return canvas.toBuffer(); 
 }

module.exports = rcaptcha;
 
  

