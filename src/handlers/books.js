export const helloWorld = async (req, res, next) => {
	res.json({ message: "Hello world" })
}