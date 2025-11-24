import { test, expect, request as playwright } from '@playwright/test';
import { addBook, deleteBook, fetchBook } from './utils/request';
import { validateBookStructure,validateAddtructure } from './utils/validations';

  

test('Prueba Integral 2 Libros', async () => {
    const payload = {
        name: "Introducción a la Programación",
        isbn: "6789",
        aisle: "123",
        author: "Pedro Juares"
    };

    const payload2 = {
            name: "Fundamentos de Pruebas",
            isbn: "12345",
            aisle: "6789",
            author: "Maria Jimenez"
    };


    //Agregar Libro 1
    const start = Date.now();
    const response = await addBook(payload)
    const duration = Date.now() - start;

    // a. Código de respuesta exitoso
    expect(response.status).toBe(200);

    // b. Estructura del JSON y tipos
    const body = await response.json();
    validateAddtructure(body);
   
    // c. Tiempo de respuesta < 500ms
    expect(duration).toBeLessThan(500);

    // d. Validar que el campo ID sea la concatenación de isbn + aisle
    expect(body.ID).toBe(payload.isbn + payload.aisle);

    //Agregar Libro 2
    const start2 = Date.now();
    const response2 = await addBook(payload2)
    const duration2 = Date.now() - start2;

    // a. Código de respuesta exitoso
    expect(response2.status).toBe(200);

    // b. Estructura del JSON y tipos
    const body2 = await response.json();
    validateAddtructure(body2);
   
    // c. Tiempo de respuesta < 500ms
    expect(duration2).toBeLessThan(500);

    // d. Validar que el campo ID sea la concatenación de isbn + aisle
    expect(body2.ID).toBe(payload2.isbn + payload2.aisle);


    //consultar libro 1
    const responseGet = await fetchBook(body.ID);
    const startGet = Date.now();
    const durationGet = Date.now() - startGet;

   // a. Código de respuesta exitoso
    expect(responseGet.status).toBe(200);

    // b. Estructura del JSON y tipos
    const bodyGet = await responseGet.json();
    validateBookStructure(bodyGet[0]);
   
    // c. Tiempo de respuesta < 500ms
    expect(durationGet).toBeLessThan(500);

    //consultar libro 2
    const responseGet2 = await fetchBook(body.ID);
    const startGet2 = Date.now();
    const durationGet2 = Date.now() - startGet2;

   // a. Código de respuesta exitoso
    expect(responseGet2.status).toBe(200);

    // b. Estructura del JSON y tipos
    const bodyGet2 = await responseGet2.json();
    await validateBookStructure(bodyGet2[0]);
   
    // c. Tiempo de respuesta < 500ms
    expect(durationGet2).toBeLessThan(500);


    //Eliminar libros
   
    const startDelete = Date.now();
    const responseDelete = await deleteBook(body.ID);
    const durationDelete = Date.now() - startDelete;

    // a. Código de respuesta exitoso
    expect(responseDelete.status).toBe(200);

    // b. Estructura del JSON y tipos
    const bodyDelete = await responseDelete.json();
    expect(bodyDelete).toHaveProperty('msg');
    expect(typeof bodyDelete.msg).toBe('string');

    // c. Tiempo de respuesta < 500ms
    expect(durationDelete).toBeLessThan(500);


    //Consultar libros eliminados
    const responseDeleted1 = await fetchBook(body.ID);   
    expect(responseDeleted1.status).not.toBe(200);
    const bodyGetDeleted1 = await responseDeleted1.json();
    expect(bodyGetDeleted1).toHaveProperty('msg');
    expect(typeof bodyGetDeleted1.msg).toBe('string');

    const responseDeleted2 = await fetchBook(body2.ID);   
    expect(responseDeleted2.status).not.toBe(200);
    const bodyGetDeleted2 = await responseDeleted1.json();
    expect(bodyGetDeleted2).toHaveProperty('msg');
    expect(typeof bodyGetDeleted2.msg).toBe('string');

});






