export function shortenText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
        return text; // Якщо текст коротший або дорівнює максимальній довжині, повертаємо його без змін
    } else {
        return text.substring(0, maxLength) + '...'; // Відбираємо перші maxLength символів і додаємо '...'
    }
}

