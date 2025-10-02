"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ebayRoute = void 0;
const express_1 = require("express");
const ebay_controller_1 = require("./ebay.controller");
const route = (0, express_1.Router)();
route.get('/', ebay_controller_1.ebayController.getProducts);
exports.ebayRoute = route;
