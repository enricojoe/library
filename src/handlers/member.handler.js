const Member = require('../../db/models/member.model.js');
const Book = require('../../db/models/book.model.js');

const MemberModel = Member;
const BookModel = Book;
exports.getMembers = async (req, res) => {
	try {
		const members = await MemberModel.find();

		res.json({ data: members });
	} catch (error) {
		console.log(error);
	}
}

exports.borrowBook = async (req, res) => {
	try {
		var book_code = { code: req.body.book_code };
		var book = await BookModel.findOne(book_code);
		
		if ( !book ) {
			res.status(404);
			res.json({ data: {}, message: "Book not found" });
			return
		} else if ( book.stock === 0 ) {
			res.json({ data: {}, message: "Book stock is 0"});
			return
		}
		
		var member_code = { code: req.body.member_code };
		var member = await MemberModel.findOne(member_code);
		var date = new Date();
		if ( !member ) {
			res.status(404);
			res.json({ message: "Member not found" });
			return
		} else if ( member.borrowed_book.length === 2 ) {
			res.json({ message: "You can't borrow book more than 2" });
			return
		} else if (date < member.penalize_date) {
			res.json({ message: "You're being penalized" });
			return
		}
		var updated_book = await BookModel.findOneAndUpdate(book_code, {
			$inc: { stock: -1 },
			$push: { borrowed_by: member_code.code }
		})
		var updated_member = await MemberModel.findOneAndUpdate(member_code, {
			$push: { borrowed_book: {
				book: book.code,
				return_date: date.setDate(date.getDate() + 7)
			} }
		}, { new: true });

		res.status(200);
		res.json({ data: updated_member, message: "Book borrowed" });
	} catch (error) {
		console.log(error);
	}
}

exports.returnBook = async (req, res) => {
	try {
		var book_code = { code: req.body.book_code };
		var book = await BookModel.findOne(book_code);
		if ( !book ) {
			res.status(404);
			res.json({ message: "Book not found" });
			return
		}
		
		var member_code = { code: req.body.member_code };
		var member = await MemberModel.findOne(member_code);
		if ( !member ) {
			res.status(404);
			res.json({ message: "Member not found" });
			return
		}

		var borrowed_book = member.borrowed_book.filter(borrowed_book => {
			return borrowed_book.book === book.code;
		})
		
		if ( borrowed_book.length === 0 ) {
			res.json({ message: "You're not borrowing that book" })
			return
		}
		
		var updated_book = await BookModel.findOneAndUpdate(book_code, {
			$inc: { stock: 1 }
		})

		var date = new Date('2024-04-09');
		var update = {
			$pull: {
				borrowed_book: {
					book: book_code.code
				}
			}
		}
		
		if ( borrowed_book[0].return_date < date ) {
			update.penalize_date = date.setDate(date.getDate() + 3);
		}

		var updated_member = await MemberModel.findOneAndUpdate(member_code, update, { new: true });

		res.status(200);
		res.json({ data: updated_member, message: "Book returned" });
	} catch (error) {
		console.log(error);
	}
}