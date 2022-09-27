
const fs = require("fs");
const [,, ...args] = process.argv
const Folders = [{name:"Routers"},{name:"Controllers"},{name:"Modules"},{name:"Schema"}]
const FolderFonction =  {
    Schema: function SchemaContent(){
        return `
        const mongoose = require('mongoose');
const ${process.argv[2]} = mongoose.Schema({
},{timestamps:true})
mongoose.model('${process.argv[2]}',${process.argv[2]});
module.exports = mongoose.model('${process.argv[2]}',${process.argv[2]} );
        `
    },
    Modules: function ModuleContent(){
        return `const ${process.argv[2]}Schema = require('../Schema/${process.argv[2]}.Schema')
    
        module.exports={
            Create: async (req, res) => {
                try{

                }catch(err){
                    return res.status(400).json(err)
                }
            },
            GetAll: async (req, res) => {
                try{

                }catch(err){
                    return res.status(400).json(err)
                }
            },
            GetOne: async (req, res) => {
                try{

                }catch(err){
                    return res.status(400).json(err)
                }
            },
            Update: async (req, res) => {
                try{

                }catch(err){
                    return res.status(400).json(err)
                }
            },
            Delete: async (req, res) => {
                try{

                }catch(err){
                    return res.status(400).json(err)
                }
            },
        }
        `
    },
    Controllers:function ControllersContent(){
        return `const ${process.argv[2]}Module = require('../Modules/${process.argv[2]}.Modules')
            
        module.exports={
            Create: async (req, res) => {
                try{

                }catch(err){
                    return res.status(400).json(err)
                }
            },
            GetAll: async (req, res) => {
                try{

                }catch(err){
                    return res.status(400).json(err)
                }
            },
            GetOne: async (req, res) => {
                try{

                }catch(err){
                    return res.status(400).json(err)
                }
            },
            Update: async (req, res) => {
                try{

                }catch(err){
                    return res.status(400).json(err)
                }
            },
            Delete: async (req, res) => {
                try{

                }catch(err){
                    return res.status(400).json(err)
                }
            },
        }
        
        `
    },
    Routers:function RoutersFunction(){
        return`
        const express = require('express')
        const router = express.Router()
        const ${process.argv[2]}Controller = require('../Controllers/${process.argv[2]}.Controllers')
        router.post('/',${process.argv[2]}Controller.Create)
        router.get('/',${process.argv[2]}Controller.GetAll)
        router.get('/:id',${process.argv[2]}Controller.GetOne)
        router.put('/:id',${process.argv[2]}Controller.Update)
        router.delete('/:id',${process.argv[2]}Controller.Delete)
        module.exports = router
    `
    }
};


const CreateFile =(Folder) => {
        const path = `./${Folder}/${process.argv[2]}.${Folder}.js`
        if(!fs.existsSync(path)){
            fs.writeFile(path,FolderFonction[Folder](), err => {
                if (err) {
                    console.error(err);
                }
            });
            Folder == 'Routers' && fs.appendFile(`./${Folder}/index.js`, 
                `
const ${process.argv[2]}Routers = require('./${process.argv[2]}.Routers');
router.use("/${process.argv[2]}", ${process.argv[2]}Routers);
                `, function (err) {
                if (err) throw err;
            });
            console.log(`New  ${Folder}  created successfully !!`);
        }
        else{
            console.log(`file already exists with  name ${process.argv[2]} in Folder ${Folder}`);
        }

}

const CreateFolder = (Folder) =>{
    fs.access(`./${Folder}`, (error) => {
        if (error) {
          fs.mkdir(`./${Folder}`, (error) => {
            if (error) {
              console.log(error);
            } else {
                Folder == 'Routers' && fs.writeFile(`./${Folder}/index.js`,
`
const express = require("express");
const router = express.Router()
module.exports = router
`
                , err => {
                    if (err) {
                        console.error(err);
                    }
                });
              CreateFile(Folder)
            }
          });
        } else {
            CreateFile(Folder)
        }
      });
}

Folders.map(item =>{
    CreateFolder(item.name)
})




