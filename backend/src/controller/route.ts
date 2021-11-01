import { Request, RequestHandler, Response } from 'express';
import logger from '../config/winston';
import Route from '../models/Route';
import Stop from '../models/Stop';

export const getRoutes: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const routes = await Route.find();
    res.status(200).send(routes);
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
};

export const getRouteByName: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { name } = req.params;
    const route = await Route.findOne({ name });
    res.status(200).send(route);
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
};

export const postRoute: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { name } = req.body;
  try {
    const route = new Route({ name });
    await route.save();
    res.status(201).send(route);
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
};

export const deleteRoute: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { name } = req.params;
  try {
    await Route.deleteOne({ name });
    res.status(204).send({});
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
};

export const postStopToRoute: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { name } = req.params;
  const { stopCodes } = req.body;
  if (!Array.isArray(stopCodes)) {
    return res.status(400).json({ error: 'stopCodes should be array' });
  }

  try {
    const route = await Route.findOne({ name });
    if (!route) {
      return res.status(400).json({ error: `Route ${name} not found` });
    }

    stopCodes.map(async (stopCode) => {
      const stop = await Stop.findOne({ code: stopCode });
      // skip this stop if not exist
      if (stop) {
        await route.updateOne({ $addToSet: { stops: stop._id } }, { new: true });
        await stop.updateOne({ $addToSet: { routes: route._id } }, { new: true });
      }
    });

    res.sendStatus(201);
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
};
