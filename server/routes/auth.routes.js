import express from 'express'
import authCtrl from './../controllers/auth.controller'

const router = express.Router()

router.route('/auth/sign-in')
  .post(authCtrl.signin)

router.route('/auth/sign-out')
  .get(authCtrl.signout)

export default router
