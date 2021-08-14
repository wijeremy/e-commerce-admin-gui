const router = require('express').Router();
const { Guitars } = require('../../models');
const auth = require('../../utils/auth');

router.get('/', auth, async (req,res) =>{
     try{
          const allGuitars = await Guitars.findAll();
          res.status(200).json(allGuitars);
     } 
     catch(err){
          res.status(400).json(err);
     }
});
router.get('/:id', auth, async (req,res) =>{
     try{
          const oneGuitar = await Guitars.findOne(
               {
                    Where: { 
                         id: req.params.id
                    }
               }
          );
          if(!oneGuitar){
               res.status(404).json({ message: "We are sorry for the inconvenience, we can't find what you are looking for!"});
               return;
          }
          res.status(200).json(oneGuitar);
     } 
     catch(err){
          res.status(400).json(err);
     }
});

module.exports = router;