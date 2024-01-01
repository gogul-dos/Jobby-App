import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import JobInfoDetails from '../JobInfoDetails'
import './index.css'

class JobCardDetails extends Component {
  requestStatus = {
    progress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
  }

  state = {jobDetails: {}, urlRequestStatus: this.requestStatus.failure}

  componentDidMount() {
    this.getJobInfo()
  }

  getJobInfo = async () => {
    this.setState({urlRequestStatus: this.requestStatus.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const url = `https://apis.ccbp.in/jobs/${id}`
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: data.job_details.life_at_company,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: data.job_details.skills,
        title: data.job_details.title,
      }
      const jobDetails = {formattedDetails, similarJobs: data.similar_jobs}
      this.setState({
        jobDetails,
        urlRequestStatus: this.requestStatus.success,
      })
    } else {
      this.setState({urlRequestStatus: this.requestStatus.failure})
    }
  }

  generateView = () => {
    const {urlRequestStatus, jobDetails} = this.state
    switch (urlRequestStatus) {
      case this.requestStatus.progress:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case this.requestStatus.failure:
        return (
          <div className="jobs-details-overall-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
              className="failure-job-details-image"
            />
            <h2 className="heading-container-for-failure">
              Oops! Something Went Wrong
            </h2>
            <p className="paragraph-failure-message">
              We cannot seem to find the page you are looking for
            </p>
            <button
              onClick={this.getJobInfo}
              className="retry-button"
              type="button"
            >
              Retry
            </button>
          </div>
        )
      case this.requestStatus.success:
        return <JobInfoDetails details={jobDetails} />
      default:
        return <p style={{color: '#ffffff'}}>HAi</p>
    }
  }

  render() {
    return <div className="jobCard-details">{this.generateView()}</div>
  }
}
export default JobCardDetails
