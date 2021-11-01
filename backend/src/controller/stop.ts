import { Request, RequestHandler, Response } from 'express';
import logger from '../config/winston';
import Stop from '../models/Stop';

export const getStops: RequestHandler = async (req: Request, res: Response) => {
  try {
    const stopes = await Stop.find();
    res.status(200).send(stopes);
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
};

export const getStopByCode: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { code } = req.params;
    const stop = await Stop.findOne({ code });
    res.status(200).send(stop);
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
};

export const postStop: RequestHandler = async (req: Request, res: Response) => {
  const { code } = req.body;
  try {
    const stop = new Stop({ code });
    await stop.save();
    res.status(201).send(stop);
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
};

export const deleteStop: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { code } = req.params;
  try {
    await Stop.deleteOne({ code });
    res.status(204).send({});
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
};
