
/**
 * sergej@2023-11-04 - Formular für den Login.
 * @returns 
 */
function Login (){
    return  (
        <div>
            <form>
            <label for="username">Benutzername:</label>
            <input type="text" className="username" name="username" required/>
            <br></br>

            <label for="password">Password:</label>
            <input type="password" className="password" name="password" required/>
            <br></br>

            <input type="submit" value="Einloggen"/>
            </form>

            <p><a href="#">Passwort vergessen</a></p>
            <p>Noch kein Account ? <a href ="#">Registrieren</a> </p>
      </div>
    )
}

export default Login;