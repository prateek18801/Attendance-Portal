const router = require("express").Router();
const adminController = require("../controllers/admin");

router.get("/", adminController.handleHome);
router.get("/login", adminController.getLogin);
router.get("/dashboard", adminController.getDashboard);

// api
router.get("/api/v1/attendance/:date", adminController.getAttendancev1);
router.get("/api/v2/attendance/:name", adminController.getAttendancev2);
router.get("/api/v1/download/:month", adminController.getDownloadv1);

router.post("/api/v1/login", adminController.postLoginv1);

module.exports = router;