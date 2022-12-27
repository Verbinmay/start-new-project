import express, { request, Request, Response } from "express";


import { Router } from "express";

export const addressesRouter = Router();

const addresses = [
  { id: 1, value: "Nezalejnasti 12" },
  { id: 2, value: "Selickaga 11" },
];

addressesRouter.get("/", (req: Request, res: Response) => {
  res.send(addresses);
});

/* нужно помнить что p.title === req.params.id разные по сути вещи ,
   число и строка, потому ставим + */
addressesRouter.get("/:id", (req: Request, res: Response) => {
  let address = addresses.find((p) => p.id === +req.params.id);
  if (address) {
    res.send(address);
  } else {
    res.send(404);
  }

  res.send(addresses);
});
