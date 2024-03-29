import Book from "../../db/models/book.model.js"

export const getBooks = async (req, res) => {
	try {
		const books = await Book.find();

		res.json({ data: books });
	} catch (error) {
		console.log(error);
	}
}