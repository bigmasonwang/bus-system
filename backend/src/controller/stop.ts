import { Request, RequestHandler, Response } from 'express';
import logger from '../config/winston';
import Stop from '../models/Stop';

export const getStopes: RequestHandler = async (req: Request, res: Response) => {
  try {
    const stopes = await Stop.find();
    res.status(200).send(stopes);
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
};

export const postStop: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const stop = new Stop({ id });
    await stop.save();
    res.status(201).send(Stop);
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
};

export const deleteStopById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    await Stop.deleteOne({ id });
    res.status(204).send({});
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
};
