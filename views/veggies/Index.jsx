const React = require('react');

class Index extends React.Component{
    render(){
        const {veggies} = this.props
        return(
            <div>
                <h1>Veggetables Index Page</h1>
                <nav>
                    <a href='/veggies/new'>Create a New Veggetable</a>
                </nav>
                <ul>
                    {
                        veggies.map((veggie) => {
                            const {name, color, readyToEat} = veggie
                            return (
                                <li key={veggie._id}>
                                    <a href={`/veggies/${veggie._id}`}>
                                    {name}</a> is {color}

                                     <br/>
                                    {
                                        readyToEat?
                                        'It\'s ready to eat':
                                        'It\'s not ready to eat'
                                    }
                                    <br/>
                                    <form method='POST' action={`/veggies/${veggie._id}?_method=DELETE`}>
                                        <input type='submit' value={`Delete ${color} ${name}`}/>
                                    </form>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

module.exports = Index
