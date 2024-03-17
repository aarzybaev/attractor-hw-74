import express from 'express';
import fileHandler from '../fileHandler';

const messagesRouter = express.Router();
messagesRouter.post('/', async (req, res) => {
  const datetime = new Date().toISOString();
  const message = {message: req.body.message, datetime};

  await fileHandler.saveMessage(message);
  res.send(message);
});

messagesRouter.get('/', async (req, res) => {
  const messages = await fileHandler.getMessages();
  res.json(messages);
});



export default messagesRouter;