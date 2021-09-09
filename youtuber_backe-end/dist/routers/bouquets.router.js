"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bouquets_model_1 = require("../models/bouquets.model");
const router = express_1.Router();
router.post("/add", async (req, res, next) => {
    try {
        const { playlistRequired, title, dailyWorkingHours, numberOfGrids, monthlyInternetConsumption, daysOff, dailySubscriberSum, collectorOfDailyHours, price, date, numberOfDays, keyword, des, } = await req.body;
        const { error } = bouquets_model_1.validateAdmin(req.body);
        if (error)
            return res.status(404).send(error.details[0].message);
        const Vtitle = await bouquets_model_1.Bouquet.findOne({ title: title });
        if (Vtitle)
            return res.status(400).send({
                error_en: "that title already  exicted",
                error_ar: "هذا العنوان مسجل بالفعل",
            });
        const bouquet = new bouquets_model_1.Bouquet({
            playlistRequired: playlistRequired,
            dailyWorkingHours: dailyWorkingHours,
            title: title,
            numberOfGrids: numberOfGrids,
            monthlyInternetConsumption: monthlyInternetConsumption,
            daysOff: daysOff,
            dailySubscriberSum: dailySubscriberSum,
            collectorOfDailyHours: collectorOfDailyHours,
            price: price,
            date: date,
            numberOfDays: numberOfDays,
            keyword: keyword,
            des: des,
        });
        return bouquet.save((err) => {
            if (err) {
                res.status(400).send({
                    error_en: "please enter vaild data",
                    error_ar: "الرجاء إدخال بيانات صحيحة",
                    error: err,
                });
            }
            else {
                res.status(200).send({ bouquet: bouquet });
            }
        });
    }
    catch (err) {
        throw new Error(err);
    }
});
router.get("/", async (req, res) => {
    const bouquet = await bouquets_model_1.Bouquet.find().sort({ date: -1 });
    res.status(200).send(bouquet);
});
router.get("/:id", async (req, res) => {
    try {
        const bouquet = await bouquets_model_1.Bouquet.findById(req.params.id);
        if (!bouquet)
            return res.status(404).send("invalid bouquet");
        return res.send(bouquet);
    }
    catch (err) {
        res.status(404).send(err);
        throw new Error(err);
    }
});
router.put("/:id", async (req, res) => {
    try {
        const { playlistRequired, title, dailyWorkingHours, numberOfGrids, monthlyInternetConsumption, daysOff, dailySubscriberSum, collectorOfDailyHours, price, date, keyword, des, numberOfDays, } = await req.body;
        const { error } = bouquets_model_1.validateAdmin(req.body);
        if (error)
            return res.status(400).send(error.details[0].message);
        let bouquet = await bouquets_model_1.Bouquet.findByIdAndUpdate(req.params.id, {
            playlistRequired: playlistRequired,
            dailyWorkingHours: dailyWorkingHours,
            title: title,
            numberOfGrids: numberOfGrids,
            monthlyInternetConsumption: monthlyInternetConsumption,
            daysOff: daysOff,
            dailySubscriberSum: dailySubscriberSum,
            collectorOfDailyHours: collectorOfDailyHours,
            price: price,
            date: date,
            keyword: keyword,
            des: des,
            numberOfDays: numberOfDays,
        });
        if (!bouquet)
            return res.status(404).send("invalid bouquet");
        bouquet = await bouquet.save();
        return res.status(200).send(bouquet);
    }
    catch (err) {
        res.status(404).send(err);
        throw new Error(err);
    }
});
router.delete("/delete/:id", async (req, res, next) => {
    try {
        if ((req.body.password = "hellomyadmin")) {
            const bouquet = await bouquets_model_1.Bouquet.findByIdAndDelete(req.params.id);
            if (!bouquet)
                return res.status(404).send("invalid bouquet ");
        }
        return res.send({
            message: "done well, the bouquet was deleted successfully",
        });
    }
    catch (err) {
        throw new Error(err);
    }
});
exports.default = router;
//# sourceMappingURL=bouquets.router.js.map