   // Example API call in your React component
   fetch('/.netlify/functions/fetchApi')
       .then(response => response.json())
       .then(data => {
           console.log(data);
           // Use your data as needed
       })
       .catch(error => console.error('Error fetching data:', error));