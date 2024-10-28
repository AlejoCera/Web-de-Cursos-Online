-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-10-2024 a las 11:12:55
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cursosonline`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aulasvirtuales`
--

CREATE TABLE `aulasvirtuales` (
  `PK_AULAVIRTUAL` int(11) NOT NULL,
  `FK_USUARIO` int(11) DEFAULT NULL,
  `FK_CURSO` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `aulasvirtuales`
--

INSERT INTO `aulasvirtuales` (`PK_AULAVIRTUAL`, `FK_USUARIO`, `FK_CURSO`) VALUES
(1, 2, 1),
(2, 2, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `PK_CATEGORIA` int(11) NOT NULL,
  `NOMBRE` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`PK_CATEGORIA`, `NOMBRE`) VALUES
(1, 'Frontend'),
(2, 'Backend'),
(3, 'Fullstack');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE `cursos` (
  `PK_CURSO` int(11) NOT NULL,
  `NOMBRE` varchar(60) NOT NULL,
  `DESCRIPCION` varchar(200) DEFAULT NULL,
  `DURACION_HS` int(3) DEFAULT NULL,
  `COSTO` decimal(10,2) DEFAULT NULL,
  `FK_CATEGORIA` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`PK_CURSO`, `NOMBRE`, `DESCRIPCION`, `DURACION_HS`, `COSTO`, `FK_CATEGORIA`) VALUES
(1, 'HTML Avan', 'Curso avanzado de HTML', 80, 90000.00, 1),
(2, 'CSS', 'Curso básico de CSS', 150, 140000.00, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripciones`
--

CREATE TABLE `inscripciones` (
  `PK_INSCRIPCION` int(11) NOT NULL,
  `FECHA` date NOT NULL,
  `ESTADO` enum('En proceso','Activa','Cancelada') NOT NULL,
  `FK_USUARIO` int(11) DEFAULT NULL,
  `FK_AULAVIRTUAL` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `inscripciones`
--

INSERT INTO `inscripciones` (`PK_INSCRIPCION`, `FECHA`, `ESTADO`, `FK_USUARIO`, `FK_AULAVIRTUAL`) VALUES
(1, '2023-10-05', 'En proceso', 3, 1),
(2, '2023-10-06', 'Activa', 4, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `PK_ROL` int(11) NOT NULL,
  `NOMBRE` varchar(50) NOT NULL,
  `DESCRIPCION` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`PK_ROL`, `NOMBRE`, `DESCRIPCION`) VALUES
(1, 'Administrador', 'Tiene acceso a todos los CRUDs del sistema'),
(2, 'Profesor', 'Puede dictar cursos en aulas virtuales'),
(3, 'Alumno', 'Puede inscribirse en cursos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `PK_USUARIO` int(11) NOT NULL,
  `NOMBRE` varchar(100) NOT NULL,
  `EMAIL` varchar(100) NOT NULL,
  `CONTRASEÑA` varchar(255) NOT NULL,
  `FECHA_REGISTRO` date NOT NULL,
  `FK_ROL` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`PK_USUARIO`, `NOMBRE`, `EMAIL`, `CONTRASEÑA`, `FECHA_REGISTRO`, `FK_ROL`) VALUES
(1, 'Juan Perez', 'juan.perez@example.com', 'password123', '2023-10-01', 1),
(2, 'Maria Gomez', 'maria.gomez@example.com', 'password456', '2023-10-02', 2),
(3, 'Carlos Ramirez', 'carlos.ramirez@example.com', 'password789', '2023-10-03', 3),
(4, 'Ana Lopez', 'ana.lopez@example.com', 'password000', '2023-10-04', 3);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `aulasvirtuales`
--
ALTER TABLE `aulasvirtuales`
  ADD PRIMARY KEY (`PK_AULAVIRTUAL`),
  ADD KEY `FK_USUARIO` (`FK_USUARIO`),
  ADD KEY `FK_CURSO` (`FK_CURSO`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`PK_CATEGORIA`);

--
-- Indices de la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`PK_CURSO`),
  ADD KEY `fk_curso_categoria` (`FK_CATEGORIA`);

--
-- Indices de la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  ADD PRIMARY KEY (`PK_INSCRIPCION`),
  ADD KEY `FK_USUARIO` (`FK_USUARIO`),
  ADD KEY `FK_AULAVIRTUAL` (`FK_AULAVIRTUAL`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`PK_ROL`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`PK_USUARIO`),
  ADD UNIQUE KEY `EMAIL` (`EMAIL`),
  ADD KEY `FK_ROL` (`FK_ROL`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `aulasvirtuales`
--
ALTER TABLE `aulasvirtuales`
  MODIFY `PK_AULAVIRTUAL` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `PK_CATEGORIA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `cursos`
--
ALTER TABLE `cursos`
  MODIFY `PK_CURSO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  MODIFY `PK_INSCRIPCION` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `PK_ROL` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `PK_USUARIO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `aulasvirtuales`
--
ALTER TABLE `aulasvirtuales`
  ADD CONSTRAINT `aulasvirtuales_ibfk_1` FOREIGN KEY (`FK_USUARIO`) REFERENCES `usuarios` (`PK_USUARIO`) ON DELETE CASCADE,
  ADD CONSTRAINT `aulasvirtuales_ibfk_2` FOREIGN KEY (`FK_CURSO`) REFERENCES `cursos` (`PK_CURSO`) ON DELETE CASCADE;

--
-- Filtros para la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD CONSTRAINT `fk_curso_categoria` FOREIGN KEY (`FK_CATEGORIA`) REFERENCES `categorias` (`PK_CATEGORIA`);

--
-- Filtros para la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  ADD CONSTRAINT `inscripciones_ibfk_1` FOREIGN KEY (`FK_USUARIO`) REFERENCES `usuarios` (`PK_USUARIO`) ON DELETE CASCADE,
  ADD CONSTRAINT `inscripciones_ibfk_2` FOREIGN KEY (`FK_AULAVIRTUAL`) REFERENCES `aulasvirtuales` (`PK_AULAVIRTUAL`) ON DELETE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`FK_ROL`) REFERENCES `roles` (`PK_ROL`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
