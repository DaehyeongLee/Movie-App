const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/Favorite");

//=================================
//             Favorite
//=================================

router.post("/favoriteNumber", (req, res) => {

    //mongoDB에서 favorite 숫자를 가져오기
    Favorite.find({"movieId" : req.body.movieId}) //req.body가 가능한 이유: body-parser 사용했기 때문
    .exec((err, info) => {
        if(err) return res.status(400).send(err)

        //Front에 다시 숫자 정보를 보내주기
        res.status(200).json({success: true, favoriteNumber: info.length})
    })

});

module.exports = router;
