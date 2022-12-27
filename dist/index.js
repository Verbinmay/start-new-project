"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
let products = [
    { id: 1, title: "tomato" },
    { id: 2, title: "orange" },
];
const addresses = [
    { id: 1, value: "Nezalejnasti 12" },
    { id: 2, value: "Selickaga 11" },
];
app.get("/products", (req, res) => {
    if (req.query.title) {
        let searchString = req.query.title.toString();
        res.send(products.filter((p) => p.title.indexOf(searchString) > -1));
    }
    else {
        res.send(products);
    }
});
//ВООООООООООООООТ ТУУУУУУУТТТ
app.get("/products/:id", (req, res) => {
    let product = products.find((p) => p.id === +req.params.id);
    if (product) {
        res.send(product);
    }
    else {
        res.send(404);
    }
});
app.get("/addresses", (req, res) => {
    res.send(addresses);
});
/* нужно помнить что p.title === req.params.id разные по сути вещи ,
 число и строка, потому ставим + */
app.get("/addresses/:id", (req, res) => {
    let address = addresses.find((p) => p.id === +req.params.id);
    if (address) {
        res.send(address);
    }
    else {
        res.send(404);
    }
    res.send(addresses);
});
app.delete("/products/:id", (req, res) => {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === +req.params.id) {
            products.splice(i, 1);
            res.send(204);
            return;
        }
    }
    res.send(404);
});
app.post("/products", (req, res) => {
    const newProduct = { id: +new Date(), title: req.body.title };
    products.push(newProduct);
    res.status(201).send(newProduct);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
