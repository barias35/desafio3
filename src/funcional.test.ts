import { test, expect, request as playwright } from '@playwright/test';
import { addBook, deleteBook, fetchBook } from './utils/request';
import { validateBookStructure,validateAddtructure } from './utils/validations';
  

test('Agregar un libro', async () => {
    const payload = {
        name: "Fundamentos de Programación",
        isbn: "12345",
        aisle: "678",
        author: "Juan Pérez"
    };

    const start = Date.now();
    const response = await addBook(payload)
    const duration = Date.now() - start;

    // a. Código de respuesta exitoso
    expect(response.status).toBe(200);

    // b. Estructura del JSON y tipos
    const body = await response.json();
    validateAddtructure(body)   
    // c. Tiempo de respuesta < 500ms
    expect(duration).toBeLessThan(500);

    // d. Validar que el campo ID sea la concatenación de isbn + aisle
    expect(body.ID).toBe(payload.isbn + payload.aisle);
});


test('Agregar libro con aisle inválido (no numérico)', async () => {
    const payload = {
        name: "Libro inválido",
        isbn: "99999",
        aisle: "no-numero",
        author: "Autor Prueba"
    };

    const response = await addBook(payload);
    // e. Código de respuesta diferente a exitoso (500)
    expect(response.status).toBe(500);

});    

test('Optener un libro', async () => {
    const bookId = '12345678';   
    
    const response = await fetchBook(bookId);
    const start = Date.now();
    const duration = Date.now() - start;
  
   // a. Código de respuesta exitoso
    expect(response.status).toBe(200);

    // b. Estructura del JSON y tipos
    const body = await response.json();
    validateBookStructure(body[0]);
    
    // c. Tiempo de respuesta < 500ms
    expect(duration).toBeLessThan(500);
});

test('Obtener un libro NO existente', async () => {
    const bookId = 'noexiste99999';
    const response = await fetchBook(bookId);

    // d. Código y mensaje de validación correcto
    expect(response.status).not.toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('msg');
    expect(typeof body.msg).toBe('string');
});


test('Eliminar un libro existente', async () => {
    const id = "12345678"; 
    const start = Date.now();
    const response = await deleteBook(id);
    const duration = Date.now() - start;

    // a. Código de respuesta exitoso
    expect(response.status).toBe(200);

    // b. Estructura del JSON y tipos
    const body = await response.json();
    expect(body).toHaveProperty('msg');
    expect(typeof body.msg).toBe('string');

    // c. Tiempo de respuesta < 500ms
    expect(duration).toBeLessThan(500);
});


test('Eliminar un libro NO existente', async () => {
    const id = "noexiste99999";
    const response = await deleteBook(id);

    // d. Código y mensaje de validación correcto
    expect(response.status).not.toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('msg');
    expect(typeof body.msg).toBe('string');
});