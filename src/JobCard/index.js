import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {BsGeoAlt, BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="link-decoration">
      <li className="list-item-for-individual-job">
        <div className="for-flex-row">
          <img src={companyLogoUrl} alt="company logo" className="logo-image" />
          <div className="for-left-margin">
            <h2 style={{margin: '0'}}>{title}</h2>
            <div className="for-flex-row-center">
              <FaStar className="rating-icon-color" />
              <p style={{marginLeft: '5px'}}>{rating}</p>
            </div>
          </div>
        </div>
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
          <div>
            <p style={{fontWeight: 'bold'}}>{packagePerAnnum}</p>
          </div>
        </div>
        <hr />
        <h2>Description</h2>
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
