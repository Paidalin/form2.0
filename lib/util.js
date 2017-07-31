function _standardError(code, message) {
    const e = new Error(message);
    e.code = code;
    return e;
}

function logs_info(msg, params) {
    console.info(msg, params);
}

function logs_error(err, params) {
    console.error(err, params);
}

const logs ={
    info: logs_info,
    error: logs_error,
};

module.exports = {
    standardError: _standardError,
    logs: logs,
}