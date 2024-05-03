// published date formatting numbers
export function formatDate(dateString) {
    const postDate = dateString;
    const date = new Date(postDate)
    const year = date.getFullYear();
    const month = String(date.getMonth() +1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}.${month}.${year}`
}

// published date formatting month in words
export function formatDateMonthWord(dateString) {
    const postDate = dateString;
    const date = new Date(postDate);
    const year = date.getFullYear();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const monthIndex = date.getMonth();
    const day = date.getDate();
    const monthName = monthNames[monthIndex];
    return `${day} ${monthName} ${year}`;
}

// remove underscore
export function removeUnderscore(textString) {
    return textString.replace(/_/g, ' ');
    
}
