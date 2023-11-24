
import { useEffect, useState } from 'react'
import './App.css'
import ApartmentForm from './components/ApartmentForm';

function App() {
  const [apartments, setApartments] = useState([]);

  const getApartments = async () => {
    try {
      const data = await fetch('https://ironbnb-m3.herokuapp.com/apartments');
      const jsonData = await data.json();
      setApartments(jsonData)

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getApartments();
  }, [])

  return (
    <>
      <ApartmentForm setApartments={setApartments} />
      {
        apartments.map((eachApartment) => {
          return (
            <div key={eachApartment._id}>
              <h2>{eachApartment.title}</h2>
              <img src={eachApartment.img} alt={eachApartment.title} />
              <h3>{eachApartment.pricePerDay}/day € (no taxes included)</h3>
            </div>
          )
        })
      }
    </>
  )
}

export default App
