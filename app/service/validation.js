const validationModule = {
    validateBody(schema) {
        return (req, res, next) => {
            const { error } = schema.validate(req.body);
            if(error) {
                res.status(500).json({message: "Internal error, wrong body schema"});
            }
            else {
                next();
            }
        }
    }
}

module.exports = validationModule;