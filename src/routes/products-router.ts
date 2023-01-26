import express, { request, Request, Response } from "express";

import { Router } from "express";
import {
  productsRepository,
  ProductType,
} from "../repositories/products-repository";
import { body, validationResult } from "express-validator";
import { inputValidationMiddleware } from "../midlewares/input-validation-middleware";

export const productsRouter = Router({});

const titleValidation = body("title")
  .trim()
  .isLength({ min: 3, max: 10 })
  .withMessage("Title error ");

productsRouter.get("/", async (req: Request, res: Response) => {
  const foundProductsPromise: Promise<ProductType[]> =
    productsRepository.findProducts(req.query.title?.toString());
  const foundProducts: ProductType[] = await foundProductsPromise;
  res.send(foundProducts);
});

//ВООООООООООООООТ ТУУУУУУУТТТ
productsRouter.get("/:id", (req: Request, res: Response) => {
  let product = productsRepository.findProductById(+req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.send(404);
  }
});

productsRouter.delete("/:id", (req: Request, res: Response) => {
  const isDeleted = productsRepository.deleteProduct(+req.params.id);
  if (isDeleted) {
    res.send(204);
  } else {
    res.send(404);
  }
});

productsRouter.post(
  "/",
  titleValidation,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const newProduct:ProductType =await productsRepository.createProduct(req.body.title);
    res.status(201).send(newProduct);
  }
);

productsRouter.put(
  "/:id",
  titleValidation,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const isUpdated = await productsRepository.updateProduct(
      +req.params.id,
      req.body.title
    );
    if (isUpdated) {
      const product = productsRepository.findProductById(+req.params.id);
      res.send(product);
    } else {
      res.send(404);
    }
  }
);
