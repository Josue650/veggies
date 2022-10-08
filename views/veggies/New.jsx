
const React = require('react')

class New extends React.Component {
    render(){
        return (
            <>
            <h1>Create A New Veggetable</h1>
            <nav>
                <a href="/veggies"> Go Back To Veggetable Home Page</a>
            </nav>
            <form method="POST" action="/veggies">
                Name: <input type="text" name="name" placeholder='Name of Veggetable Here'></input><br/>
                Color: <input type="text" name="color" placeholder='Color of Veggetable Here'></input><br/>
                Is Ready To Eat: <input type="checkbox" name="readyToEat"></input><br/>
                <input type="submit" value="Submit Veggetable"></input>
            </form>
            </>
        )
    }
}

module.exports = New
