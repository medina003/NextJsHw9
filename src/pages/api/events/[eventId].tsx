import { NextApiRequest, NextApiResponse } from "next";
import { events } from "../../../../data/events";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { eventId } = req.query;
  if (typeof eventId === "string") {
    const eventIndex = events.findIndex(
      (event) => event.id.toString() === eventId
    );
    const event = events.find((event) => event.id.toString() === eventId);
    if (req.method === "GET") {
      return res.status(200).json(event);
    }

    if (req.method === "PUT") {
      const updatedEvent = req.body.updatedEvent;
      events[eventIndex] = updatedEvent;
      return res.status(200).json(updatedEvent);
    }

    if (req.method === "DELETE") {
      events.splice(eventIndex, 1);
      return res.status(200).json(events);
    }
  }
}
