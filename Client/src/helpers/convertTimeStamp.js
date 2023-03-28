


export const convertTimestamp = (timestamp) => {
    if (timestamp === null) return
    try {
        let date = timestamp.toDate();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();
        let yyyy = date.getFullYear();
        date = `${mm}/${dd}/${yyyy}`;

        return date;

    } catch (error) {
        
    }
}