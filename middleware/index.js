module.exports = {
    asyncErrorHandler: (fn) =>
        (req, res, next) => {
            // returns the thenable promise fn()
            Promise.resolve(fn(req, res, next))
                // if error, catch it and pass it to the (next)
                .catch(next);
        }
}