const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const {body,validationResult}=require('express-validator')

// Route 1: Get all the Notes using : GET "/api/auth/fetchallnotes".Login Required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes)
})

// Route 2: Add a new note using : POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title','Enter a valid title').isLength({min:3}),
    body('description','Description must be atleast 5 characters').isLength({min:5})
],async (req, res) => {
try{

    const {title,description,tag}=req.body
    // If there are errors , return` BAd request and the errors
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const note=new Notes({
        title,description,tag,user:req.user.id
    })
    const savedNote=await note.save()
    res.json(savedNote)
}
catch(error){
    res.status(400).send({error:"Internal Server error"})}
})


// Route 3: Update an existing Note using: PUT "/api/auth/updatenote/:id". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    // Create a newNote object with only updated fields
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    try {
        // Find the note by ID
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not found");
        }

        // Allow update only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        // Update the note
        note = await Notes.findByIdAndUpdate(
            req.params.id,
            { $set: newNote },
            { new: true } // return the updated note
        );

        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 4: Detete a existing Note using delete request "/api/auth/delete/:id". Login required

router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    try{
        
        // Find the note by id
        let note= await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Note note found")
        }
        
        // Allow delete only if user owns this state
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed")
        }
        
        let deletenote=note
        // Delete the note
        note=await Notes.findByIdAndDelete(req.params.id);  
        res.json({"Success": "Note has been deleted",deletenote:deletenote})
    }
    catch(error){
        res.status(400).send("Internal Server Error")
    }

})

module.exports = router