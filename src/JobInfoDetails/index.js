import {Link} from 'react-loader-spinner'
import {FaStar} from 'react-icons/fa'
import {GoLinkExternal} from 'react-icons/go'
import {BsGeoAlt, BsFillBriefcaseFill} from 'react-icons/bs'
import Header from '../Header'
import './index.css'

const JobInfoDetails = props => {
  const {details} = props
  const {formattedDetails, similarJobs} = details
  console.log(details)
  const {
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,
    id,
    jobDescription,
    lifeAtCompany,
    location,
    packagePerAnnum,
    rating,
    skills,
    title,
  } = formattedDetails
  console.log(skills)
  return (
    <div className="overall-container-for-particular-job">
      <Header />
      <div className="overall-job-info-container">
        <div className="for-flex-row">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="logo-image"
          />
          <div className="for-left-margin">
            <h2 style={{margin: '0'}}>{title}</h2>
            <div className="for-flex-row-center">
              <FaStar className="rating-icon-color" />
              <p style={{marginLeft: '5px'}}>{rating}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="location-details-container">
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
              <div className="flex-row">
                <BsGeoAlt />
                <p style={{marginLeft: '5px'}}>{location}</p>
              </div>
              <div className="flex-row" style={{marginLeft: '15px'}}>
                <BsFillBriefcaseFill />
                <p style={{marginLeft: '5px'}}>{employmentType}</p>
              </div>
            </div>
            <div className="location-details-container">
              <p style={{fontWeight: 'bold'}}>{packagePerAnnum}</p>
            </div>
          </div>
          <hr />
          <div className="location-details-container">
            <h2 style={{fontWeight: 'bold', fontSize: '25px'}}>Description</h2>
            <a href={companyWebsiteUrl}>
              Visit <GoLinkExternal />
            </a>
          </div>
          <p>{jobDescription}</p>
          <h2 style={{fontWeight: 'bold', fontSize: '25px'}}>Skills</h2>
          <ul className="skills-list-container">
            {skills.map(eachSkill => (
              <li key={eachSkill.name} className="skills-list-item">
                <img
                  src={eachSkill.image_url}
                  className="website logo"
                  alt={eachSkill.name}
                />
                <p style={{marginLeft: '10px'}}>{eachSkill.name}</p>
              </li>
            ))}
          </ul>
          <h2 style={{fontWeight: 'bold', fontSize: '25px'}}>
            {' '}
            Life at Company
          </h2>
          <div className="life-at-company-container">
            <p className="lifeAtCompany-para">{lifeAtCompany.description}</p>
            <img
              src={lifeAtCompany.image_url}
              alt="life at company"
              className="lifeAtCompany-image"
            />
          </div>
        </div>
      </div>

      <h2 style={{fontSize: '25px', fontWeight: 'bold'}}>Similar Jobs</h2>
      <ul className="similar-jobs-list-container">
        {similarJobs.map(eachJob => (
          <li className="similar-jobs-container" key={eachJob.id}>
            <div className="for-flex-row-similar-job">
              <img
                src={eachJob.company_logo_url}
                alt="similar job company logo"
                className="similar-job-logo"
              />
              <div className="title-for-company">
                <h2>{eachJob.title}</h2>
                <div className="for-flex-row-1">
                  <FaStar className="rating-icon-color" />
                  <p style={{marginLeft: '5px'}}>{eachJob.rating}</p>
                </div>
              </div>
            </div>
            <h2 style={{fontWeight: 'bold'}}>Description</h2>
            <p>{eachJob.job_description}</p>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
              <div className="flex-row">
                <BsGeoAlt />
                <p style={{marginLeft: '5px'}}>{eachJob.location}</p>
              </div>
              <div className="flex-row" style={{marginLeft: '15px'}}>
                <BsFillBriefcaseFill />
                <p>{eachJob.employment_type}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default JobInfoDetails
