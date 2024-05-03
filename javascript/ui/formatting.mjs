// published date formatting numbers
export function formatDate(dateString) {
    const postDate = dateString;
    // console.log(postDate);
    const date = new Date(postDate)
    console.log(date);
    const year = date.getFullYear();
    const month = String(date.getMonth() +1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}.${month}.${year}`
}

// published date formatting month in words

