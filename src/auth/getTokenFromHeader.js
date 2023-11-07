const getTokenFromHeader = (headers) => {
    if (headers && headers.authorization) {
        const parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null
        }
    } else {
<<<<<<< HEAD
        return null
    }
}

module.exports = getTokenFromHeader;
=======
        return null;
    }
}

module.exports = getTokenFromHeader; 
>>>>>>> 20f8501567e5ef4831e3dd523beb31fd07f5e979
