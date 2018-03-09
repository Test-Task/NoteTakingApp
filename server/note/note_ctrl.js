var Note = require('./note_model');
var User = require('../user/users_model');
module.exports = {
    addNote: function (req, res) {
        var noteRecord = new Note({
            userId: req.body.userId,
            title: req.body.title,
            description: req.body.description
        });
        console.log(noteRecord);
        noteRecord.save(function (err,note) {
            if (err) {
                res.json({ status: 201, message: err });
            } else {
                res.json({ status: 200, message: 'Note added successfully',data:note });
            }
        });
    },
    
    getallNotes: function (req, res) {
        var userId = req.params.userId;
        console.log('Get all Note controller', userId);
        Note.find({ userId: userId, isDeleted: false }, { _id: 1, userId: 1, title: 1, description: 1}).sort({ createdAt: -1 })
        .populate('userId', 'username email')
        .exec(function (err, notes) {
            if (err) {
                res.json({ status: 201, messages: err});
            } else {
                res.json({ status: 200,messages:"Record fatched successfully",notes:notes });

            }
        });
    },
    


    //Delete note using note id
    deleteNote: function (req, res) {
        console.log('Calling Note delete controller before- Id-:' + req.params.id);
        Note.findOneAndUpdate({_id: req.params.id},{$set:{isDeleted:true}}, function (err){
            if (err) {
                res.json({ status: 201, messages: err});
            }else{
                console.log('Note has been deleted');
                res.json({ status: 200, message: "Note has been deleted" });
            }
        });

    },
    getNoteById: function (req, res) {
        Note.findOne({_id: req.params.id}, function (err,note){
            if (err) {
                res.json({ status: 201, messages: err});
            }else{
                console.log('Note has been deleted');
                res.json({ status: 200, message: "Note has been fetched successfully", data:note });
            }
        });

    },
    //Update note using note id
    updateNote: function (req, res) {
        console.log('Calling Note delete controller before- Id-:' + req.params.id);
        Note.findOneAndUpdate({_id: req.body.id},{$set:{userId:req.body.userId,title:req.body.title,description:req.body.description}},{new:true}, function (err,updatedNote){
            if (err) {
                res.json({ status: 201, messages: err});
            }else{
                console.log('Note has been updated successfully');
                res.json({ status: 200, message: "Note has been updated successfully",updatedNote:updatedNote });
            }
        });

    },

}


