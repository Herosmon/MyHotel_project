const { Router } = require("express");
const { check } = require("express-validator");
const {
  login_cliente,
  menu_recuperar_contraseña,
  olvido_contraseña,
  recuperar_contraseña,
} = require("../controllers/auth");
const { validarCampos } = require("../middlewares");

const router = Router();

router.post(
  "/login",
  [
    check("correo", "El correo es obligatorio").isEmail(),
    check("clave", "La contraseña es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  login_cliente
);

router.get("/recuperar/:id", menu_recuperar_contraseña);

router.put(
  "/olvido",
  [
    check("correo", "El correo es obligatorio").isEmail(),
    validarCampos
  ],
  olvido_contraseña
);

router.put(
  "/recuperar/:c",
  [
    check("c", "url es obligatorio").not().isEmpty(),
    check("newPassword", "La contraseña es obligatoria").not().isEmpty(),
    validarCampos
  ],
  recuperar_contraseña
);

module.exports = router;
