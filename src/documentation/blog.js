/**
 * @swagger
 * /api/klab/blog/createBlog:
 *   post:
 *     summary: Post New Blog.
 *     tags: [myBlogs]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               blogTitle:
 *                 type: string
 *               blogContent:
 *                 type: string
 *               blogComment:
 *                 type: string
 *               blog_Image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Your post have been posted.
 *       500:
 *         description: Failed To Post.
 * /api/klab/blog/ViewAllBlogs:
 *   get:
 *     summary: Get a list of all posted blogs.
 *     tags: [myBlogs]
 *     responses:
 *       200:
 *         description: list of all users.
 *       500:
*         description: Failed to retrieve user data.
 * /api/klab/blog/ViewBlogById/{id}:
 *   get:
 *     summary: Get a single blog by  ID.
  *     tags: [myBlogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog retrieved.
 *     responses:
 *       200:
 *         description: Successfully retrieved the blog.
 *       404:
 *         description: User not found with the provided ID.
 *       500:
 *         description: Failed to retrieve Blog data.
 * 
 * /api/klab/blog/DeleteBlog/{id}:
 *   delete:
 *     summary: Delete a blog by their ID.
 *     tags: [myBlogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog to delete.
 *     responses:
 *       200:
 *         description: blog information deleted successfully.
 *       404:
 *         description: Any not found with the provided ID.
 *       500:
*         description: Failed to delete blog data.
 * 
 * /api/klab/blog/updateBlog/{id}:
 *   put:
 *     summary: Update a blog's information by their ID.
 *     tags: [myBlogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog to update.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               blogTitle:
 *                 type: string
 *               blogContent:
 *                 type: string
 *               blogComment:
 *                 type: string
 *               blogImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: A blog information updated successfully.
 *       404:
 *         description: A blog not found with the provided ID.
 *       500:
*         description: Failed to update blog data.
/api/klab/blog/comment/{id}:
 *   post:
 *     summary: Send comment.
 *     tags: [myBlogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *               
 *     responses:
 *       200:
 *         description: Your post have been posted.
 *       500:
 *         description: Failed To Post.
 */