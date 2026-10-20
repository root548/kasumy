const express = require('express');

const authenticate = require("../../middlewares/auth.middleware");
const authorizeRoles = require("../../middlewares/role.middleware");

const userController = require('./user.controller');
const {
    validateCreateUser,
    validateUserId,
    validateUpdateUser,
    validateStatus
} = require('./user.validator');

const router = express.Router();

// Todas las rutas requieren un token JWT válido
router.use(authenticate);


// Crear usuario solo accesible para administradores
router.post(
    '/',authorizeRoles(1),
    validateCreateUser,
    userController.createUser
);



// Listar usuarios 
router.get(
    '/', authorizeRoles(1),
    userController.getUsers
);

router.get(
    "/me",
    userController.getMyProfile
);

// Consultar usuario por ID

router.get(
    '/:id', authorizeRoles(1),
    validateUserId,
    userController.getUserById
);
// Actualizar usuario
router.put(
    '/:id',
    authorizeRoles(1),
    validateUserId,
    validateUpdateUser,
    userController.updateUser
);
// Cambiar estado
router.patch(
    '/:id/status', authorizeRoles(1),
    validateUserId,
    validateStatus,
    userController.changeUserStatus
);
// Eliminación lógica
router.delete(
    '/:id', authorizeRoles(1),
    validateUserId,
    userController.deleteUser
);




module.exports = router;