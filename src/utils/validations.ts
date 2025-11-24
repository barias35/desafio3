import { expect } from '@playwright/test';

export function validateBookStructure(book: any): void {
    expect(book).toHaveProperty('book_name');
    expect(typeof book.book_name).toBe('string');
    expect(book).toHaveProperty('isbn');
    expect(typeof book.isbn).toBe('string');
    expect(book).toHaveProperty('aisle');
    expect(typeof book.aisle).toBe('string');
    expect(book).toHaveProperty('author');
    expect(typeof book.author).toBe('string');
}

export function validateAddtructure(body: any): void {
    expect(body).toHaveProperty('Msg');
    expect(typeof body.Msg).toBe('string');
    expect(body).toHaveProperty('ID');
    expect(typeof body.ID).toBe('string');
}