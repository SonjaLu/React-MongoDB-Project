function Register() {
    return (
        <div>

            <h1>Registerieren</h1>
            <p>Bitte Formular ausfüllen</p>
            <hr />

            <form>
                <label for="username">Benutzername:</label>
                <input type="text" className="rg_username" name="username" required />
                <br></br>


                <label for="email">E-Mail:</label>
                <input type="email" className="rg_email" name="email" required />
                <br></br>

                <label for="password">Password:</label>
                <input type="password" className="rg_password" name="password" required />
                <br></br>

                <label for="password_repeat">Password wiederholen:</label>
                <input type="password" className="rg_password_repeat" name="password" required />
                <br></br>

                <input type="submit" className="rg_submit" value="Registrieren" />
                <input type="submit" className="rg_cancel" value="Abbrechen" />

            </form>
        </div>
    )
}

export default Register;