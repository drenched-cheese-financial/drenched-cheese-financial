import express from 'express';

const router = express.Router();

router.get('/', function (req, res) {
  req.session.authenticatedUser = undefined;
  res.end();
});

export default router;
