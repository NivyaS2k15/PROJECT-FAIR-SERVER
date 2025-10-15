const express = require('express')
const  userController = require('../controllers/userControllers')
const  projectController   = require('../controllers/projectControllerr')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const  multerMiddleware = require('../middlewares/multerMiddleware')
const router = new express.Router()



router.post('/register', userController.registerController)
// http://localhost:3000/login

router.post('/login',userController.loginController)
// http://localhost:3000/add-project

router.post('/add-project', jwtMiddleware, multerMiddleware.single('projectImg'), projectController.addProjectController)


//http://localhost:3000/home-project
router.get('/home-project',projectController.homepageController)


//http://localhost:3000/all-project
router.get('/all-project'  , jwtMiddleware ,projectController.allProjectController)

//http://localhost:3000/user-project
router.get('/user-project'  , jwtMiddleware ,projectController.userProjectController)
//http://localhost:3000/project/id/edit
router.put('/project/:id/edit'  , jwtMiddleware,multerMiddleware.single('projectImg'),projectController.editProjectController)

//http://localhost:3000/projects/id/edit
router.delete('/projects/:id/remove'  , jwtMiddleware,projectController.deleteProjectController)

//http://localhost:3000/edit_user
router.put('/edit-user'  , jwtMiddleware,multerMiddleware.single('profilePic'),userController.editUserController)

module.exports = router
