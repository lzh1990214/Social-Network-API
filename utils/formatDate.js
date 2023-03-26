function formatDate(date) {
    const dateNew = new Date(date);

    const month = `${(dateNew.getMonth() + 1).toString().padStart(2, '0')}`;
    const day = `${dateNew.getDate().toString().padStart(2, '0')}`;
    const year = `${dateNew.getFullYear()}`;

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
    // console.log(formattedDate);
};

module.exports = formatDate;
