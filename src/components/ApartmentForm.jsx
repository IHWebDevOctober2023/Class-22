import { useState } from "react";

const ApartmentForm = ({ setApartments }) => {
    const [title, setTitle] = useState()
    const [img, setImg] = useState("https://cdn-icons-png.flaticon.com/512/1018/1018627.png")
    const [pricePerDay, setPricePerDay] = useState(300)

    const postData = async (event) => {
        event.preventDefault();
        const apartment = {
            title,
            pricePerDay,
            img
        };

        console.log(apartment);
        try {
            const response = await fetch("https://ironbnb-m3.herokuapp.com/apartments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(apartment),
            });
            // I want to set aparments as a new array with the new apartment
            const newApartment = await response.json();
            setApartments((previousApartments) => [newApartment, ...previousApartments])

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <form onSubmit={(event) => postData(event)}>
            <label htmlFor="title">Title</label>
            <input placeholder="Amazing apartment" value={title} onChange={(event) => setTitle(event.target.value)} type="text" name="title" />
            <label htmlFor="img">Image</label>
            <input value={img} onChange={(event) => setImg(event.target.value)} type="text" name="img" />
            <label htmlFor="pricePerDay">Price Per Day</label>
            <input value={pricePerDay} onChange={(event) => setPricePerDay(event.target.value)} type="text" name="pricePerDay" />
            <button type="submit">Send</button>
        </form>
    )
}

export default ApartmentForm;