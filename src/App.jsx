import Input from "./components/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function App() {
  const [usuario, cambiarUsuario] = useState({ campo: "", valido: null });
  const [nombre, cambiarNombre] = useState({ campo: "", valido: null });
  const [password, cambiarPassword] = useState({ campo: "", valido: null });
  const [password2, cambiarPassword2] = useState({ campo: "", valido: null });
  const [correo, cambiarCorreo] = useState({ campo: "", valido: null });
  const [telefono, cambiarTelefono] = useState({ campo: "", valido: null });
  const [terminos, cambiarTerminos] = useState(false);
  const [formularioValido, cambiarFormularioValido] = useState(null);

  const expresiones = {
    usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
  };
  const validarPassword2 = () => {
    if (password.campo.length > 0) {
      if (password.campo !== password2.campo) {
        cambiarPassword2((prevState) => {
          return { ...prevState, valido: "false" };
        });
      } else {
        cambiarPassword2((prevState) => {
          return { ...prevState, valido: "true" };
        });
      }
    }
  };
  const onChangeTerminos = (e) => {
    cambiarTerminos(e.target.checked);
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (
      usuario.valido === "true" &&
      nombre.valido === "true" &&
      password.valido === "true" &&
      password2.valido === "true" &&
      correo.valido === "true" &&
      telefono.valido === "true" &&
      terminos
    ) {
      cambiarFormularioValido(true);
      cambiarUsuario({ campo: "", valido: null });
      cambiarNombre({ campo: "", valido: null });
      cambiarPassword({ campo: "", valido: null });
      cambiarPassword2({ campo: "", valido: null });
      cambiarCorreo({ campo: "", valido: null });
      cambiarTelefono({ campo: "", valido: null });
    } else {
      cambiarFormularioValido(false);
    }
  };
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-center text-lg sm:text-2xl font-extrabold">
        Validación Formulario
      </h1>
      <form
        action=""
        onSubmit={onSubmit}
        className="max-w-[768px] grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        {/* INPUT GROUP */}
        <Input
          estado={usuario}
          cambiarEstado={cambiarUsuario}
          htmlFor="usuario"
          labelInput="Usuario"
          name="usuario"
          tipo="text"
          leyendaError="El usuario tiene que ser de 4 a 16 dígitos y solo puede contener numeros, letras y guion bajo."
          expresionRegular={expresiones.usuario}
        ></Input>
        <Input
          estado={nombre}
          cambiarEstado={cambiarNombre}
          htmlFor="nombre"
          labelInput="Nombre"
          name="nombre"
          tipo="text"
          leyendaError="El nombre solo puede contener letras y espacios."
          expresionRegular={expresiones.nombre}
        ></Input>
        <Input
          estado={password}
          cambiarEstado={cambiarPassword}
          htmlFor="pass"
          labelInput="Contraseña"
          name="pass"
          tipo="pass"
          leyendaError="La contraseña tiene que ser de 4 a 12 dígitos."
          expresionRegular={expresiones.password}
        ></Input>
        <Input
          estado={password2}
          cambiarEstado={cambiarPassword2}
          htmlFor="pass2"
          labelInput="Confirmar Contraseña"
          name="pass2"
          tipo="pass"
          leyendaError="Ambas contraseñas deben ser iguales."
          funcion={validarPassword2}
        ></Input>
        <Input
          estado={correo}
          cambiarEstado={cambiarCorreo}
          htmlFor="correo"
          labelInput="Correo"
          name="correo"
          tipo="email"
          leyendaError="El correo solo puede contener letras, numeros, puntos, guiones y guion bajo."
          expresionRegular={expresiones.correo}
        ></Input>
        <Input
          estado={telefono}
          cambiarEstado={cambiarTelefono}
          htmlFor="telefono"
          labelInput="Teléfono"
          name="telefono"
          tipo="text"
          leyendaError="El telefono solo puede contener numeros y el maximo son 14 dígitos."
          expresionRegular={expresiones.telefono}
        ></Input>
        <div>
          <label className="font-medium cursor-pointer">
            <input
              type="checkbox"
              id="terminos"
              checked={terminos}
              onChange={onChangeTerminos}
              className="mr-1 cursor-pointer"
            />
            Aceptar los Términos y Condiciones.
          </label>
        </div>
        {formularioValido === false && (
          <div className="sm:col-span-2 mx-auto">
            <p className="bg-red-600 w-fit p-1">
              <FontAwesomeIcon className="mr-1" icon={faTriangleExclamation} />
              <b>Error:</b> Por favor rellena el formulario correctamente.
            </p>
          </div>
        )}
        <div className="sm:col-span-2 flex justify-center">
          <button
            type="submit"
            className="bg-gray-950 text-white font-medium tracking-wide px-20 py-2 rounded-md transition-all duration-200 hover:bg-gray-600"
          >
            Enviar
          </button>
        </div>
        {formularioValido && (
          <div className="sm:col-span-2 mx-auto">
            <p className="bg-green-600 w-fit p-1">
              Formulario enviado exitosamente!
            </p>
          </div>
        )}
      </form>
    </div>
  );
}

export default App;
