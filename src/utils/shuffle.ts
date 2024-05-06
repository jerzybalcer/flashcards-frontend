// Fisher–Yates shuffle
export const shuffle = (array: unknown[]): unknown[] => {
    const resultArray = [...array];
    let currentIndex = array.length;

    while (currentIndex != 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // swap
        [resultArray[currentIndex], resultArray[randomIndex]] = [
        resultArray[randomIndex], resultArray[currentIndex]];
    }

    return resultArray;
}