/**
 * @swagger
 /**
 * @swagger
 * /api/Klab/user/signup:
 *   post:
 *     tags: [users Apis]
 *     summary: signup form
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: name of the user
 *               lastname:
 *                 type: string
 *                 description: last name of the user
 *               email:
 *                 type: string
 *                 description: Email of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *               profile:
 *                 type: string
 *                 format: binary 
 *           required:
 *             - firstname
 *             - lastname
 *             - email
 *             - password
 *             - profile
 *     responses:
 *       201:
 *         description: User Created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 * 
 * /api/klab/user/login:
 *   post:
 *     tags: [users Apis]
 *     summary: login form
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *           required:
 *             - email
 *             - password
 *     responses:
 *       201:
 *         description: User loggedin successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 * 
 * /api/Klab/user/read:
 *   get:
 *     summary: View All Regisred User.
 *     tags: [users Apis]
 *     responses:
 *       200:
 *         description: Successfully retrieved a list of all users.
 *       500:
 *         description: Failed to retrieve user.
 * /api/Klab/user/read/{id}:
 *   get:
 *     summary: View single user.
  *     tags: [users Apis]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved the user.
 *       404:
 *         description: User not found with the provided ID.
 *       500:
 *         description: Failed to retrieve user.
 * 
 * /api/Klab/user/delete/{id}:
 *   delete:
 *     summary: Delete User By Id.
 *     tags: [users Apis]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete.
 *     responses:
 *       200:
 *         description: User information deleted successfully.
 *       404:
 *         description: User not found with the provided ID.
 *       500:
*         description: Failed to delete user.
 * 
 * /api/Klab/user/update/{id}:
 *   put:
 *     summary: Update  User.
 *     tags: [users Apis]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               profile:
 *                 type: string
 *                 format: binary    
 *     responses:
 *       200:
 *         description: User information updated successfully.
 *       404:
 *         description: User not found with the provided ID.
 *       500:
*         description: Failed to update user.

 */