import express from "express";
const router=express.Router();

router.get("/",(req,res)=>{
  req.logout();
  res.json({
    success:true,
    message:"log-out successfull"
  });
});
export default router;
