const express = require("express");
const router = express.Router();

const { protect,
   authorizeRoles } = require("../middleware/authMiddleware");

   const {
  createBlog,
  getallBlog,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
  getBlogById,
} = require("../controllers/blogController") ;


router.post("/" , 
   protect,
  authorizeRoles("Super Admin", "Editor", "Author"),
   createBlog);

router.get("/" , getallBlog) ;

router.get("/edit/:id", protect, getBlogById);

router.get("/:slug", getBlogBySlug);

router.put("/:id" ,
  protect,
  authorizeRoles("Super Admin", "Editor", "Author"),
   updateBlog);
   
router.delete("/:id" ,
   protect,
  authorizeRoles("Super Admin", "Editor", "Author"),
  deleteBlog );



module.exports = router;