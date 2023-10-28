var express = require('express')
var router = express.Router()
var fs = require('fs')
var { parse } = require('csv-parse')

/* GET home page. */
router.get('/', function (req, res, next) {
	if (req.query.hasOwnProperty('search')) {
		const searchKeys = req.query.search
			.split(' ')
			.map((str) => str.toLowerCase())

		const csvData = []

		fs.createReadStream('./csv/SPR_31.csv')
			.pipe(parse({ delimiter: ':' }))
			.on('data', function (csvrow) {
				let state = false
				for (let i = 0; i < searchKeys.length; i++) {
					if (csvrow.join().toLowerCase().indexOf(searchKeys[i]) !== -1) {
						if (i === searchKeys.length - 1) {
							csvData.push(csvrow.join().split(';'))
						} else {
							state = true
							continue
						}
					} else if (state) {
						csvData.push(csvrow.join().split(';'))
					}
				}
				state = false
			})
			.on('end', function () {
				res.send(
					JSON.stringify({
						result: csvData,
					})
				)
			})
	} else {
		res.render('index')
	}
})

module.exports = router
