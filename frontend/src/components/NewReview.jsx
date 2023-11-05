
/**
 * sergej@2023-11-04 
 * Formular um die neue Bewertungen zu erstellen.
 * @returns 
 */
function NewReview (){
    return  (
        <div className="restaurant-form">
            <h1>Neue Restaurant Bewertung erstellen</h1>
            <hr />

            <div>
                <label className="username">Benutzername: </label>
                <hr />
            </div>

            <form>
                <label htmlFor="nr_restaurant_name">Restaurantname:</label>
                <input type="text" className="nr_restaurant_name" name="nr_restaurant_name" required />

                <label>Bewertung:</label>
                <div className="rating">
                    <input type ="radio" className="star5" name="rating" value ="5"/>
                    <label htmlFor="star5"></label>
                    <input type ="radio" className="star4" name="rating" value ="4"/>
                    <label htmlFor="star4"></label>
                    <input type ="radio" className="star3" name="rating" value ="3"/>
                    <label htmlFor="star3"></label>
                    <input type ="radio" className="star2" name="rating" value ="2"/>
                    <label htmlFor="star2"></label>
                    <input type ="radio" className="star1" name="rating" value ="1"/>
                    <label htmlFor="star1"></label>
                </div>

                <label htmlFor="review">Bewertungstext:</label>
                <textarea className="review" name ="review" required></textarea>
                <input type="submit" className="submit" value="Bewertung abschicken" />

            </form>
      </div>
    )
}

export default NewReview;