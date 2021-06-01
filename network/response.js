exports.success = (req, res, message, status) =>{

    res.status(status || 200).send(message);
}

exports.error = (req, res, message, status, details) => {
    console.log(details);
    res.status(status || 400).send(message);
}