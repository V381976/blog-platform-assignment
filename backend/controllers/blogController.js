const Blog = require("../models/blog.model");
const slugify = require("slugify");

// CREATE BLOG
 const createBlog = async (req, res) => {
    try {
        const {
      title,
      content,
      metaTitle,
      metaDescription,
      featureImage,
      tags,
      categories,
      faq,
      internalLinks,
      externalLinks,
      status,
    } = req.body;  

    const slug = slugify(title ,{lower :true}) ;

    const existingBlog = await Blog.findOne({slug});

      if (existingBlog) {
      return res.status(400).json({
        message: "Blog with this title already exists",
      });
    }
     const blog = await Blog.create({
      title,
      slug,
      content,
      metaTitle,
      metaDescription,
      featureImage,
      tags,
      categories,
      faq,
      internalLinks,
      externalLinks,
      author: req.user._id,
      status,
    });

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



const getallBlog = async(req, res) =>{
      try {
    const blogs = await Blog.find().populate("author", "name email");

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
    }).populate("author", "name email");

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

 const updateBlog  = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    if (
      req.user.role === "Author" &&
      blog.author.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "You can update only your own blogs",
      });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedBlog);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

 const deleteBlog  = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    if (
      req.user.role === "Author" &&
      blog.author.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "You can delete only your own blogs",
      });
    }

    await blog.deleteOne();

    res.status(200).json({
      message: "Blog deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.status(200).json(blog);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getBlogById,
     createBlog,
  getallBlog ,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
}