import {Component} from 'react'
import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

import './index.css'

const apiUrl = 'https://apis.ccbp.in/ipl'

class Home extends Component {
  state = {isLoading: true, teamData: []}

  componentDidMount() {
    this.getTeamData()
  }
  getTeamData = async () => {
    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log(data)

    const formattedData = data.teams.map(eachdata => ({
      id: eachdata.id,
      name: eachdata.name,
      teamImageUrl: eachdata.team_image_url,
    }))
    this.setState({teamData: formattedData, isLoading: false})
  }

  renderTeamList = () => {
    const {teamData} = this.state
    return (
      <ul className="teams-list">
        {teamData.map(team => (
          <TeamCard key={team.id} teamDetails={team} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="Oval" color="ffffff" width={50} height={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <div className="home-route-container ">
        <div className="teams-list-container">
          <div className="ipl-dashboard-heading-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="ipl-logo"
            />
            <h1 className="ipl-dashboard-heading">IPL Dashboard</h1>
          </div>
          {isLoading ? this.renderLoader() : this.renderTeamList()}
        </div>
      </div>
    )
  }
}
export default Home
