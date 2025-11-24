export async function fetchBook(id: string) {
    return await fetch(`https://rahulshettyacademy.com/Library/GetBook.php?ID=${id}`, {
        method: 'GET',
        headers: {
            'accept': 'application/json'
        }
    });
}


export async function addBook (payload) {
return await fetch('https://rahulshettyacademy.com/Library/Addbook.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'accept': 'application/json' },
        body: JSON.stringify(payload)
    });
}

export async function deleteBook (id: string) {
const payload = { ID: id };
return await fetch('https://rahulshettyacademy.com/Library/DeleteBook.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'accept': 'application/json' },
        body: JSON.stringify(payload)
    });
}
