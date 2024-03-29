import Member from "../../db/models/member.model.js";
import Book from "../../db/models/book.model.js";

const MemberModel = Member;
const BookModel = Book;
export const getMembers = async (req, res) => {
	try {
		const members = await MemberModel.find();

		res.json({ data: members });
	} catch (error) {
		console.log(error);
	}
}

export const borrowBook = async (req, res) => {
	try {
		// Tambah pengecekan kondisi jika id buku maupun member tidak ada
		// Tambah pengecekan jika stok buku == 0, maka tidak bisa dipinjam lagi
		// Tambah pengecekan jika member sedang dipenalize
		// Tambah pengecekan kondisi, jika buku yang dipinjam < 2 maka bisa meminjam
		let book_id = { _id: req.body.book_id };
		let book = await BookModel.findOne(book_id);
		
		if ( !book ) {
			res.json({ data: {}, message: "Book not found" });
			return
		} else if ( book['stock'] === 0 ) {
			res.json({ data: {}, message: "Book stock is 0"});
			return
		}
		
		let member_id = { _id: req.body.member_id };
		let member = await MemberModel.findOne(member_id);
		let date = new Date();
		if ( !member ) {
			res.json({ data: {}, message: "Member not found" });
			return
		} else if ( member['borrowed_book'].length === 2 ) {
			res.json({ data: {}, message: "You can't borrow book more than 2" });
			return
		} else if (date < member.penalize_date) {
			res.json({ data: {}, message: "You're being penalized" });
			return
		}
		let updated_book = await BookModel.findOneAndUpdate(book_id, {
			$inc: { stock: -1 },
			$push: { borrowed_by: member_id['_id'] }
		})
		let updated_member = await MemberModel.findOneAndUpdate(member_id, {
			$push: { borrowed_book: {
				book: book['_id'],
				return_date: date.setDate(date.getDate() + 7)
			} }
		}, { new: true });

		res.json({ data: updated_member, message: "Book borrowed" });
	} catch (error) {
		console.log(error);
	}
}

export const returnBook = async (req, res) => {
	try {
		let book_id = { _id: req.body.book_id };
		let book = await BookModel.findOne(book_id);
		if ( !book ) {
			res.json({ data: {}, message: "Book not found" });
			return
		}
		
		let member_id = { _id: req.body.member_id };
		let member = await MemberModel.findOne(member_id);
		if ( !member ) {
			res.json({ data: {}, message: "Member not found" });
			return
		}

		let borrowed_book = member['borrowed_book'].filter(borrowed_book => {
			return borrowed_book.book.toString() === book._id.toString();
		})
		
		if ( borrowed_book.length === 0 ) {
			res.json({ data: {}, message: "You're not borrowing that book" })
			return
		}
		
		let updated_book = await BookModel.findOneAndUpdate(book_id, {
			$inc: { stock: 1 }
		})

		let date = new Date();
		var update = {
			$pull: {
				borrowed_book: {
					book: book_id['_id']
				}
			}
		}
		if ( borrowed_book.return_date < date ) {
			update.penalize_date = date.setDate(date.getDate() + 3);
		}

		let updated_member = await MemberModel.findOneAndUpdate(member_id, update, { new: true });

		res.json({ data: updated_member, message: "Book returned" });
	} catch (error) {
		console.log(error);
	}
}