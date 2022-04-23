const jwt = require("jsonwebtoken");
const Record = require("../models/attendance");

exports.handleHome = (req, res) => {
    res.status(301).redirect("/admin/dashboard");
}

exports.getLogin = (req, res) => {
    res.status(200).render("admin/login", {
        title: "Admin | BDCoE"
    });
}

exports.getDashboard = (req, res) => {
    res.status(200).send("<h1>Coming Soon</h1>");
}

// api

exports.getAttendancev1 = async (req, res) => {
    const date = req.params.date;
    try {
        const records = await Record.find({ date }).sort({ duration: -1 });
        return res.status(200).json({
            message: `Data for ${date}`,
            data: records
        });
    } catch (err) {
        return res.status(400).json({
            message: "No Records Found",
            error: err.message
        });
    }
}

exports.getAttendancev2 = async (req, res) => {
    const username = req.params.name;
    try {
        const records = await Record.find({ username });
        return res.status(200).json({
            message: `Data for ${username}`,
            data: records
        });
    } catch (err) {
        return res.status(400).json({
            message: "No Records Found",
            error: err.message
        });
    }
}

exports.getDownloadv1 = (req, res) => {
    
}

exports.postLoginv1 = (req, res) => {
    const { username, password } = req.body;
    if (username !== "admin@bdcoe") {
        return res.status(401).json({
            message: "Invalid Username",
            error: "Unauthorised"
        });
    }
    if (password !== process.env.ADMIN_PASSKEY) {
        return res.status(403).json({
            message: "Invalid Password",
            error: "Forbidden"
        });
    }
    const _id = username; //fetch from db
    const token = jwt.sign({ id: _id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 604800000
    }).status(302).redirect("/admin/dashboard");
}

exports.getLogoutv1 = (req, res) => {
    return res.cookie("jwt", '', {
        httpOnly: true,
        maxAge: 1
    }).status(200).redirect("/login");
}