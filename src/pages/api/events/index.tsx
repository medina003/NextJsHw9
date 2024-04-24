import { NextApiRequest, NextApiResponse } from "next";
import { events } from "../../../../data/events";
import { Event } from "@/types/Event";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Event[]>
) {
  if (req.method === "GET") {
    return res.status(200).json(events);
  }

  if (req.method === "POST") {
    const newEvent = req.body.newEvent;

    events.push({ id: events.length + 1, ...newEvent });
    return res.status(200).json(events);
  }
}
