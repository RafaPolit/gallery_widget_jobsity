Gallery Widget - Jobsity JS Test
================================

Prueba de código - Jobsity, 1 de septiembre, 2014

Implementación de un Gallery Widget con capacidad para múltiples instancias en una misma página y modalidad dual: Thumbnail y Single.


Requisitos
----------
* Cualquier navegador de internet (browser) para funcionalidad básica
* Google Chrome o Safari (según soliticado en las especificaciones) para funcionalidad avanzada (animaciones)


Ejemplos
--------
En la raíz del proyecto se ha proporcionado el archivo _**index.html**_ que incluye dos instancias del Gallery Widget, una en modo Thumbnail y otra en modo Single y puede ejecutarse para ver la funcionalidad del Widget.  Si se inspecciona el archivo, se puede tener una referencia rápida de como implementar el Widget en una página WEB.


Instalación
-----------
El Widget está compuesto de scripts JavaScript y archivos de estilo CSS que deben incluirse en la cabecera (head) del documento HTML:
```html
<!-- Styles -->
<link rel="stylesheet" type="text/css" href="styles/layout.css">
<link rel="stylesheet" type="text/css" href="styles/scrollbar.css">
<link rel="stylesheet" type="text/css" href="styles/widget.css">
<link rel="stylesheet" type="text/css" href="styles/animations.css">
<!-- Scripts -->
<script type="text/javascript" src="scripts/utils.js"></script>
<script type="text/javascript" src="scripts/widgetDOMCreation.js"></script>
<script type="text/javascript" src="scripts/widget.js"></script>
<script type="text/javascript" src="scripts/galleryWidget.js"></script>
```


Modo de uso
-----------
Los Widgets se instancian automáticamente en el evento window.onload para asegurar que las imágenes requeridas están previamente cargadas.  Para crear un widget, es necesario crear un elemento DIV de HTML con la clase **'gallery-widget'** y que ésta esté contenida dentro de un elemento con al menos 960px disponibles (1).

Los modos de creación son:

#### Modo Thumbnail

```html
<div class="gallery-widget" data-mode="thumbnail">
  <img src="img-1-url.jpg" alt="">
  <img src="img-2-url.jpg" alt="">
  ...
  <img src="img-n-url.jpg" alt="">
</div>
```

#### Modo Single

```html
<div class="gallery-widget" data-mode="single">
  <img src="img-1-url.jpg" alt="">
  <img src="img-2-url.jpg" alt="">
  ...
  <img src="img-n-url.jpg" alt="">
</div>
```


Estructura
----------

#### Dentro de la carpeta _scripts_ :
* _galleryWidget.js_ con el instanciador principal del Gallery Widget.
* _widget.js_ el objeto principal con las funciones de interacción con el widget.
* _widgetDOMCreation.js_ el objeto con las funciones de creación de elementos HTML.
* _utils.js_ funciones utilitarias compartidas por los otros recursos.

#### Dentro de la carpeta _styles_ :
* archivos CSS con los estilos requeridos por el Widget.
* _animations.css_ archivo CSS con estilos requeridos para las animaciones. Si se omite este archivo de la cabecera HTML, el widget funciona correctamente obviando las animaciones.

#### Dentro de la carpeta _specs_ :
* _galleryWidgetSpec.js_ batería de pruebas de integración del Widget.
* _specInstantiation.js_ archivo requerido en el SpecRunner para instanciar la suit de testing posterior a la instanciación de los widgets.

#### En la raíz del proyecto:
* _index.html_ Ejemplos del Widget en los distintos modos.
* _SpecRunner.html_ Ejecutador de Batería de Tests.


Observaciones
-------------
El Widget se ha concebido como una 'prueba de concepto' para este ejercicio.  Sin embargo existen varias mejoras (algunas de ellas indispensables) que serían importantes para un servicio listo para usar en producción:

#### Rendimiento
* Implementar 'lazy loading' de las imágenes para que la carga inicial sea casi instantánea.
* Utilizar imágenes optimizadas para thumbnails en lugar de utilizar las imágenes 'full size'.
* Combinar y minificar los cuatro archivos JS.
* Combinar y minificar los cuatro archivos CSS.

#### Funcionalidad
* (1) Al ser una prueba de concepto, el Widget requiere un espacio de 960px para implementarse y tiene tanto sus anchos como altos definidos en el CSS.  Sería importante desarrollar un Widget 'responsive' que se adapte a múltiples tamaños y que pueda hacer 'down-size' para distintos dispositivos.
* Migrar los CSS a LESS o SASS para facilitar el mantenimiento y cambio de tamaños, etc.
* Configuraciones adicionales del widget como posición de los thumbnails, distintas animaciones, etc.
* Hacer que la versión 'single' tenga manera de ir a la siguiente o la anterior.
* Crear mensajes de 'no hay imágenes en la lista' u otra alternativa cuando el Widget se queda sin imágenes.


Fotografías
-----------
Las fotografías incluídas en el proyecto son para efectos de demostración y está prohibido su uso o distribución.


[www.rafaelpolit.com](http://www.rafaelpolit.com)











