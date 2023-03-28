const formatDate = (created_at) => {
    // Format the timestamp to a readable string
    // create date object from timestamp
    const date = new Date(created_at);
    const formattedDate = date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'America/New_York'
    }); // format date as "Month Day, Year"
    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        timeZone: 'America/New_York'
    }); // format time as "HH:MM am/pm"
    const formattedDateTime = `${formattedDate} at ${formattedTime}`; // combine date and time
    console.log(formattedDateTime);
    return formattedDateTime;
};

module.exports = formatDate;
