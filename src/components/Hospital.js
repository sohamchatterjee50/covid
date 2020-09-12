import React,{useState, useEffect} from 'react';

const Hospital = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  function makeid(length) {
     var result           = '';
     var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
     var charactersLength = characters.length;
     for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
     }
     return result;
  }

  useEffect(() => {
    fetch("https://api.rootnet.in/covid19-in/hospitals/beds")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.data.regional);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {items.map(item => (
          <li key={item.state + makeid(5)}>
            {item.state} {item.ruralHospitals} {item.ruralBeds} {item.urbanHospitals} {item.urbanBeds} {item.totalHospitals} {item.totalBeds}
          </li>
        ))}
      </ul>
    );
  }
}

export default Hospital;