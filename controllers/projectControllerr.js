const projects = require("../models/projectModel")

// add project 
exports.addProjectController = async (req, res) => {
    console.log("inside add project controller");
    const userId = req.userId
    console.log(userId);


    const { title, languages, overview, github, website } = req.body
    const projectImg = req.file?.path; // or req.file.filename
    console.log(title, languages, overview, github, website, projectImg, userId);


    try {
        const existingProject = await projects.findOne({ github })
        if (existingProject) {
            res.status(406).json("Project already exist .....please upload another one ")

        } else {
            const newProject = new projects({
                title, languages, overview, github, website, projectImg, userId
            })
            await newProject.save()
            res.status(200).json(newProject)

        }
    } catch (error) {
        res.status(401).json(error)
    }

}

exports.homepageController = async (req, res) => {
    console.log("inside home page controller");


    try {
        const allHomeProject = await projects.find().limit(3)

        res.status(200).json(allHomeProject)

    }
    catch (error) {
        res.status(401).json(error)
    }

}

//get all projects 

exports.allProjectController = async (req, res) => {
    console.log("inside  all projects inside controller");
    const searchKey = req.query.search
    console.log(searchKey);
    const query = {
        languages: {
            $regex: searchKey, $options: 'i'
        }
    }


    try {
        const allProject = await projects.find(query)

        res.status(200).json(allProject)

    }
    catch (error) {
        res.status(401).json(error)
    }

}


//get user project = need of authorization

exports.userProjectController = async (req, res) => {
    console.log("inside userproject get controller");
    const userId = req.userId



    try {
        const allProject = await projects.find({userId})

        res.status(200).json(allProject)

    }
    catch (error) {
        res.status(401).json(error)
    }

}

  // edit projects - need authorization
exports.editProjectController = async (req, res) => {
    console.log("inside user edit  update projectcontroller");
    const id = req.params.id  // project id
    const userId = req.userId  // userid
   const {title,languages,overview,github,website,projectImg}  =req.body
   const reUploadProjectImg = req.file?req.file.filename: projectImg


    try {
        const updateProject = await projects.findByIdAndUpdate({_id:id},{title,languages,overview,
          github,website,projectImg:reUploadProjectImg,userId},{new:true})
        await updateProject.save()

        res.status(200).json(updateProject)

    }
    catch (error) {
        res.status(401).json(error)
    }

}


//delete project - need authorization

exports.deleteProjectController = async (req,res)=>{
    console.log("Delete the  project controller");
    const {id} = req.params

    try {
        const deleteproject = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(deleteproject)
    } catch (error) {
      res.status(401).json(error)
        
    }
    
}



// 