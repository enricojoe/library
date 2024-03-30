const Book = require('../../db/models/book.model.js');

exports.getBooks = async (req, res) => {
	try {
		var filter = { stock: { $gt: 0 } };
		const books = await Book.find(filter).select('code title stock');

		res.status(200);
		res.json({ data: books });
	} catch (error) {
		console.log(error);
	}
}