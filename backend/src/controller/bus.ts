import { Request, RequestHandler, Response } from 'express';
import logger from '../config/winston';
import Bus from '../models/Bus';
import Line from '../models/Line';

export const getBuses: RequestHandler = async (req: Request, res: Response) => {
  try {
    const buses = await Bus.find();
    res.status(200).send(buses);
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
};

export const getBus: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { registration } = req.params;
    const bus = await Bus.findOne({ registration });
    res.status(200).send(bus);
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

export const postLineToBus: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { registration } = req.params;
  const { lineName, start } = req.body;

  try {
    const bus = await Bus.findOne({ registration });
    if (!bus) {
      return res.status(400).json({ error: `Bus ${registration} not found` });
    }

    const line = await Line.findOne({ lineName });
    if (!line) {
      return res.status(400).json({ error: `Line ${lineName} not found` });
    }
    bus.schedules.push({ line: line._id, start });

    const newBus = await line.save();

    res.status(201).send(newBus);
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
};
