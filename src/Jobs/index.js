import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import JobCard from '../JobCard'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  requestStatus = {
    progress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
  }

  state = {
    searchInput: '',
    userDetailsStatus: this.requestStatus.progress,
    userBioDetails: {},
    salaryRange: '',
    jobType: [],
    jobDetailsRequest: this.requestStatus.progress,
    jobs: [],
  }

  componentDidMount() {
    this.getUserDetails()
    this.getJobDetails()
  }

  retryForProfileClicked = () => {
    this.getUserDetails()
  }

  searchButtonClicked = () => {
    const val = document.getElementById('input-element').value
    this.setState({searchInput: val}, this.getJobDetails)
  }

  jobTypeChanged = event => {
    const {jobType} = this.state
    let newJobType
    if (event.target.checked) {
      newJobType = [...jobType, event.target.id]
    } else {
      newJobType = jobType.filter(eachtype => eachtype !== event.target.id)
    }
    this.setState({jobType: newJobType}, this.getJobDetails)
  }

  salaryRangeChanged = event => {
    this.setState({salaryRange: event.target.id}, this.getJobDetails)
  }

  getUserDetails = async () => {
    this.setState({userDetailsStatus: this.requestStatus.progress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    if (response.ok === true) {
      const data = await response.json()

      const formattedData = {
        name: data.profile_details.name,
        imageUrl: data.profile_details.profile_image_url,
        bio: data.profile_details.short_bio,
      }
      this.setState({
        userDetailsStatus: this.requestStatus.success,
        userBioDetails: formattedData,
      })
    } else {
      this.setState({userDetailsStatus: this.requestStatus.failure})
    }
  }

  userDetailsSection = () => {
    const {userDetailsStatus, userBioDetails} = this.state
    switch (userDetailsStatus) {
      case this.requestStatus.progress:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case this.requestStatus.failure:
        return (
          <div className="retry-button-container">
            <button
              type="button"
              onClick={this.retryForProfileClicked}
              className="retry-button"
            >
              Retry
            </button>
          </div>
        )
      case this.requestStatus.success:
        return (
          <div className="user-details-success-container">
            <img
              src={userBioDetails.imageUrl}
              alt="profile"
              className="user-image"
            />
            <h2 className="user-name-element">{userBioDetails.name}</h2>
            <p>{userBioDetails.bio}</p>
          </div>
        )
      default:
        return null
    }
  }

  inputSearchChanged = event => {
    if (event.key === 'Enter') {
      this.setState({searchInput: event.target.value}, this.getJobDetails)
    }
  }

  getJobDetails = async () => {
    this.setState({jobDetailsRequest: this.requestStatus.progress})
    const {jobType, salaryRange, searchInput} = this.state
    const jobString = jobType.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${jobString}&minimum_package=${salaryRange}&search=${searchInput}&`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const formattedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobDetailsRequest: this.requestStatus.success,
        jobs: formattedData,
      })
    } else {
      this.setState({jobDetailsRequest: this.requestStatus.failure})
    }
  }

  generateJobDetails = () => {
    const {jobDetailsRequest, jobs} = this.state
    switch (jobDetailsRequest) {
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
              onClick={this.getJobDetails}
              className="retry-button"
              type="button"
            >
              Retry
            </button>
          </div>
        )
      case this.requestStatus.success:
        if (jobs.length === 0) {
          return (
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
                alt="no jobs"
                className="nojobs-container"
              />
              <h1>No Jobs Found</h1>
              <p>We could not find any jobs. Try other filters</p>
            </div>
          )
        }
        return (
          <ul>
            {jobs.map(currentJob => (
              <JobCard key={currentJob.id} jobDetails={currentJob} />
            ))}
          </ul>
        )
      default:
        return null
    }
  }

  render() {
    const {salaryRange, jobType, searchInput} = this.state
    console.log(salaryRange, jobType, searchInput)
    return (
      <div className="overall-jobs-container">
        <Header />
        <div className="jobs-main-container">
          <div className="jobs-left-side-overall-container">
            <div className="user-details-container">
              {this.userDetailsSection()}
            </div>
            <hr />
            <div>
              <h2 className="paragraph-as-heading">Type Of Employment</h2>
              <div className="for-checkbox-margin">
                <ul>
                  {employmentTypesList.map(eachType => (
                    <li
                      onChange={this.jobTypeChanged}
                      key={eachType.employmentTypeId}
                      className="for-checkbox-margin"
                    >
                      <input type="checkbox" id={eachType.employmentTypeId} />
                      <label htmlFor={eachType.employmentTypeId}>
                        {eachType.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <hr />
            <div>
              <h2 className="paragraph-as-heading">Salary Range</h2>
              <ul className="unordered-list-container">
                {salaryRangesList.map(eachSalary => (
                  <li
                    onChange={this.salaryRangeChanged}
                    className="for-checkbox-margin"
                    key={eachSalary.salaryRangeId}
                  >
                    <input
                      type="radio"
                      name="salaryRange"
                      id={eachSalary.salaryRangeId}
                    />
                    <label htmlFor={eachSalary.salaryRangeId}>
                      {eachSalary.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="jobs-right-side-overall-container">
            <div className="search-input-container">
              <input
                type="search"
                placeholder="Search"
                className="search-input-element"
                onKeyDown={this.inputSearchChanged}
                id="input-element"
              />
              <button
                label="button"
                onClick={this.searchButtonClicked}
                className="search-button"
                type="button"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.generateJobDetails()}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
