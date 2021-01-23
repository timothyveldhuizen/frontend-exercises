
/*
* Example of using generic class for typing
* The generic should implement Book, hence extneds Book
*/
class Shelf<T extends Book> {
    logItem(item: T) {
        console.log(item.name)
    }
}

interface Book {
    name: string;
}

// MovieBook that implements Book
class MovieBook implements Book {
    name: string;
}

// Create a bookshelf of movie books
const bookShelf: Shelf<MovieBook> = new Shelf<MovieBook>()

// Setup a moviebook
const moviebook = new MovieBook();
moviebook.name = 'Harry Potter';

// Add moviebook to shelf
bookShelf.logItem(moviebook)

// Same way of typing arrays
const array: Array<number> = [1, 2, 3, 4]
const array2: number[] = [1, 2, 3, 4]

// Generic typed function
function checkout<T, V>(item: T, item2: V): T {
    console.log('checkout: ', item2);
    return item;
}

console.log(checkout<string, number>('Hello', 123))
