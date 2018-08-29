const _ = require('lodash');
const request = require('request-promise');
const status = require('../libs/statusCodes');

function splitByWords(text) {
	// split string by spaces (including spaces, tabs, and newlines)
	return text.split(/\s+/);
}

function createWordMap(wordsArray) {
	// create map for word counts
	const wordsMap = {};

	wordsArray.forEach((key) => {
		if (_.has(wordsMap, key)) {
			wordsMap[key] += 1;
		} else {
			wordsMap[key] = 1;
		}
	});

	return wordsMap;
}

function sortByCount(wordsMap) {
	// sort by count in descending order
	let finalWordsArray = [];
	finalWordsArray = Object.keys(wordsMap).map((key) => {
		return {
			name: key,
			total: wordsMap[key],
		};
	});

	finalWordsArray.sort((a, b) => {
		return b.total - a.total;
	});

	return finalWordsArray;
}

class Frequency {
	async getFrequentWords(num) {
		try {
			const data = await request.get('http://terriblytinytales.com/test.txt');
			const wordsArray = splitByWords(data);
			const wordsMap = createWordMap(wordsArray);
			const finalWordsArray = sortByCount(wordsMap);

			return {
				result: _.slice(finalWordsArray, 0, parseInt(num, 10)),
				meta: status.API_SUCCESS,
			};
		} catch (err) {
			throw err;
		}
	}
}

module.exports = Frequency;
