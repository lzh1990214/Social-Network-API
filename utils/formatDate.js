const formatDate = (now) => {
    // const dateNew = new Date(date);

    // const month = `${(dateNew.getMonth() + 1).toString().padStart(2, '0')}`;
    // const day = `${dateNew.getDate().toString().padStart(2, '0')}`;
    // const year = `${dateNew.getFullYear()}`;

    // const formattedDate = `${year}/${month}/${day}`;
    // return formattedDate;

    const date = new Date(now); // create date object from timestamp

    const formattedDate = date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC'
    }); // format date as "March 26th, 2023"
    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        timeZone: 'UTC'
    }); // format time as "01:37 pm"
    const formattedDateTime = `${formattedDate} at ${formattedTime}`; // combine date and time
    console.log(formattedDateTime); // output: "March 26th, 2023 at 01:37 pm"

};

module.exports = formatDate;
