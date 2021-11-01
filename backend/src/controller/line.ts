import { Request, RequestHandler, Response } from 'express';
import logger from '../config/winston';
import Line from '../models/Line';
import Route from '../models/Route';

export const getLines: RequestHandler = async (req: Request, res: Response) => {
  try {
    const lines = await Line.find();
    res.status(200).send(lines);
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
};

export const getLineByName: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { lineName } = req.params;
    const line = await Line.findOne({ lineName });
    res.status(200).send(line);
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
};

export const postLine: RequestHandler = async (req: Request, res: Response) => {
  const { lineName } = req.body;
  try {
    const line = new Line({ lineName });
    await line.save();
    res.status(201).send(line);
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
};

export const deleteLine: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { lineName } = req.params;
  try {
    await Line.deleteOne({ lineName });
    res.status(204).send({});
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
};

export const postRoutesToLine: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { lineName } = req.params;
  const { forwordRouteName, backwordRouteName } = req.body;

  try {
    const line = await Line.findOne({ lineName });
    if (!line) {
      return res.status(400).json({ error: `line ${lineName} not found` });
    }

    const forwordRoute = await Route.findOne({ name: forwordRouteName });
    if (forwordRoute) {
      line.routes.forward = forwordRoute._id;
    }
    const backwordRoute = await Route.findOne({ name: backwordRouteName });
    if (backwordRoute) {
      line.routes.backword = backwordRoute._id;
    }
    const newLine = await line.save();

    res.status(201).send(newLine);
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
};
