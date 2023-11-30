const note_info = require("../db/user_input");

module.exports = function(app) {

    app.get("/api/notes/", function(req,res) {
        res.json(note_info);
    });
    
    app.post("/api/notes/", function(req,res) {
        note_info.push(req.body);
        res.json(true);
    })

    app.delete("/api/notes/", function(req,res) {
        note_info.length = 0;

        res.json({ok: true});
    })

};