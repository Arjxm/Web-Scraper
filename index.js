import express from "express";
import axiox from "axios";
import cheerio from "cheerio";
import fs from 'fs';


const PORT = 3000;
const url = "https://www.yelp.com/search?cflt=restaurants&find_loc=San+Francisco%2C+CA&start=20";

const app = express()
axiox(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const res = []
          $('.css-1yx1rzi , .css-dzq7l1', html).each(function(){
                 const resName =  $(this).text();
                 const cous = $(this).text();
                   res.push({
                       resName,
                       cous
                   })

              }
          )


        var file = JSON.stringify(res);
        fs.writeFile('./data.json',file, err =>{
            if(err){
                console.log(err)
            }
            else
            {
                console.log("done")
            }
        })
    })

app.listen(PORT, () => {
    console.log("Ready")
})