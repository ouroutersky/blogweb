const { Router } = require("express");
const { OK } = require("http-status");
const TokenController = require("../tokenController");

const tokenRouter = Router();
const tokenController = new TokenController();

tokenRouter.post("/", async (req, res) => {
  const { name } = req.body;

  const data = await tokenController.generateToken({ name });

  return res.status(OK).json(data);
});

module.exports = tokenRouter;