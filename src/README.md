# Proyecto de Facturación

[Ver en vivo](https://geninvoicesebaasg.netlify.app/)

Este proyecto es una aplicación web de facturación desarrollada con **Lit** y **Web Components**. Permite a los usuarios seleccionar productos, agregar detalles de facturación, calcular totales y guardar las facturas generadas. La aplicación también emplea **`localStorage`** para la persistencia temporal y simula un backend para el almacenamiento de las facturas.

## Estructura del Proyecto

El proyecto está dividido en componentes reutilizables y modulares, desarrollados utilizando **Lit**. Los componentes principales son:

- **`user-component`**: Componente para ingresar los datos del cliente (nombre, documento de identidad, dirección, correo electrónico) y detalles de la factura.
- **`prod-component`**: Componente que muestra una lista de productos disponibles y permite seleccionar productos para agregar a la factura.
- **`table-component`**: Componente que gestiona la tabla de productos seleccionados, mostrando código, nombre, cantidad, valor unitario y subtotal de cada producto.
- **`summary-component`**: Componente que muestra el resumen de la factura, incluyendo el subtotal, IVA (19%) y el total a pagar.

## Funcionalidades

### 1. **Selección de productos**

Los usuarios pueden seleccionar productos desde un **dropdown**. Al seleccionar un producto, los detalles del producto (código, nombre, valor) se actualizan en los campos correspondientes de la tabla de productos.

### 2. **Gestión de productos en la tabla**

Los productos seleccionados se agregan a una tabla dinámica en la cual se visualizan el código, nombre, cantidad, valor unitario y subtotal de cada producto. Si el producto ya está presente en la tabla, su cantidad y subtotal se actualizan automáticamente.

### 3. **Cálculo de totales**

A medida que se agregan productos a la tabla, el sistema calcula en tiempo real:

- **Subtotal**: Suma de los subtotales de cada producto.
- **IVA (19%)**: 19% del subtotal.
- **Total**: Subtotal + IVA.

Los valores se actualizan dinámicamente a medida que se cambia la tabla.

### 4. **Envío de la factura**

Una vez que el usuario ha completado la selección de productos y los datos del cliente, puede guardar la factura. Los detalles se envían a un **servidor simulado** para almacenar la factura, y también se guarda en **`localStorage`** para que el usuario pueda continuar más tarde.

### 5. **Almacenamiento en `localStorage`**

Toda la información de la factura (productos seleccionados, datos del cliente, totales) se guarda temporalmente en el **`localStorage`** del navegador. Esto permite que los usuarios puedan continuar su proceso de facturación en futuras visitas.


