const fs = require('fs');

module.exports = {
    writeDataToFile,
};

// fs.readFile('../data/products.json',(err,res)=>{
//     try{
//         return (JSON.stringify(res));
//     }catch (err){
//         console.log ('Read json data file error:',err);

//     }
// })

function writeDataToFile(filename,content){
    fs.writeFileSync(filename,JSON.stringify(content),'utf8',(err)=>{
        if(err){
            console.log(err);
        };
    })
}


