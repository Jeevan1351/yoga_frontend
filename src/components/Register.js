function Register() {
    return (
        <div>
            <h2>Register</h2>
            <div>
                <p>Email: </p>
                <input type="text" name="email" />
                <p>Password: </p>
                <input type="password" name="password" />
                <p>Confirm Password: </p>
                <input type="password" name="confirmPassword" />
                <p>Name: </p>
                <input type="text" name="name" />
                <p>Age: </p>
                <input type="text" name="age" />
                <select defaultValue={1}>
                    <option value={1} >6:00 AM - 7:00 AM</option>
                    <option value={2} >7:00 AM - 8:00 AM</option>
                    <option value={3} >8:00 AM - 9:00 AM</option>
                    <option value={4} >5:00 PM - 6:00 PM</option>
                </select>
            </div>
        </div>
    )
}

export default Register;