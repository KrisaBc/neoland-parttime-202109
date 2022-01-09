class ClientFavs extends React.Component {
    constructor() {
        super()

        this.state = {
            favsVehicles: null,
        }

    }

    componentDidMount() {
        logger.debug('ClientFavs -> Component did Mount')

        try {
            retrieveFavsVehicles(sessionStorage.token, (error, favsVehicles) => {
                if (error) alert(error.message)

                this.setState({ favsVehicles })
            })

        } catch (error) {
            alert(error.message)
        }
    }

    render() {
        logger.debug('ClientFavs -> render')

        if (this.state.favsVehicles) {
            if (this.state.favsVehicles.length) {
                return <ul>
                    {this.state.favsVehicles.map(vehicle => <li key={vehicle.id}>
                        <h2>{vehicle.name}</h2>
                        <Fav selected={vehicle.isFav} onClick={() => {
                            try {
                                toggleFavVehicle(sessionStorage.token, vehicle.id, error => {
                                    if (error) return alert(error.message)

                                    const update = {}

                                    for (const key in vehicle) {

                                        update[key] = vehicle[key]
                                    }

                                    update.isFav = !update.isFav

                                    const vehicles = this.state.favsVehicles.map(_vehicle => {
                                        if (_vehicle.id === vehicle.id) {

                                            return update
                                        }
                                        return _vehicle
                                    })

                                    this.setState({ favsVehicles: vehicles })

                                })
                            } catch (error) {
                                alert(error.message)
                            }
                        }} />
                        <img src={vehicle.image} onClick={() => this.props.onItemClick(vehicle.id)} />
                        <span>{vehicle.price} $</span>
                        <button onClick={() => {
                            try {
                                toggleCartVehicle(sessionStorage.token, vehicle.id, error => {
                                    if (error) return alert(error.message)

                                    return alert('Car Added successfully')
                                })
                            } catch (error) {
                                alert(error.message)
                            }
                        }}
                        >Add to Cart</button>
                    </li>)}
                </ul>
            } else {
                return <p>You dont have selected any favs car yet</p>
            }
        }
        return null
    }
}