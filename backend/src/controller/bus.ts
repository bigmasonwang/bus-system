import { Request, RequestHandler, Response } from 'express';
import logger from '../config/winston';
import Bus from '../models/Bus';

export const getBuses: RequestHandler = async (req: Request, res: Response) => {
  try {
    const buses = await Bus.find();
    res.status(200).send(buses);
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
};

export const postBus: RequestHandler = async (req: Request, res: Response) => {
  const { registration } = req.body;
  try {
    const bus = new Bus({ registration });
    await bus.save();
    res.status(201).send(bus);
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
};

export const deleteBus: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { registration } = req.params;
  try {
    await Bus.deleteOne({ registration });
    res.status(204).send({});
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
};
