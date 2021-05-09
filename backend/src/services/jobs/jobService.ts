import { Job } from '@entities/Job'
import dbConnect from '../../databaseConnect'
import { uuid } from 'uuidv4'

// let date = new Date()
/**
 * Job Listing
 * 
 * @returns
 */
export const jobList = () => {

  return dbConnect.then(async connect => {
    let repo = connect.getRepository(Job);

    let [all_Catalogs, CatalogsCount] = await repo.findAndCount({ is_deleted: 0 });

    return {
      data: all_Catalogs,
      count: CatalogsCount
    }
  }).catch(error => console.log(error))

}

/**
 * Job Description/Details
 * 
 * @param jobID 
 */
export const jobDetails = (jobID: any) => {

  return dbConnect.then(async connect => {

    let repo = connect.getRepository(Job)

    return await repo.findOne({ uuid: jobID })

  }).catch(error => console.log(error))
}

/**
 * Job Posting
 * 
 *
 */
export const postJob = (data: any) => {

  return dbConnect.then(async connect => {

    let uniqID = uuid()
    let title = data.title
    let desc = data.description
    let pay = data.payment_amount
    let city = data.city
    let state = data.state
    let email = data.email
    let phone = data.phone_number
    let address = data.address
    let poster_name = data.poster_name
    // let date_created = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    // let date_updated = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    let date_created = new Date()
    let date_updated = new Date()
    let isDeleted = 0

    let job = new Job(uniqID, title, desc, pay, city, state, email, phone, address, poster_name, date_created, date_updated, isDeleted)

    await connect.manager.save(job)

    return {
      message: 'SUCCESS',
      getData: {
        jobID: uniqID,
        title: title,
        location: city,
        payment: pay,
        poster_name: poster_name,
        timePosted: date_created
      }
    }

  }).catch(error => console.log(error))
}

/**
 * Job Update
 * 
 * @param jobID 
 * @param data
 */
export const jobUpdate = (jobID: any, data: any) => {

  return dbConnect.then(async connect => {

    let repoData = connect.getRepository(Job)

    let updateData = {
      title: data.title,
      description: data.description,
      payment_amount: data.payment_amount,
      city: data.city,
      state: data.state,
      email: data.email,
      phone_number: data.phone_number,
      address: data.address,
      poster_name: data.poster_name,
      date_updated: new Date()
    }

    await repoData.update({ uuid: jobID }, updateData)

    return {
      message: 'UPDATED'
    }

  }).catch(error => console.log(error))
}

/**
 * Delete a Job
 * 
 * @param jobID 
 */
export const jobDelete = (jobID: any) => {

  return dbConnect.then(async connect => {

    let repoData = connect.getRepository(Job)

    await repoData.update({ uuid: jobID }, {
      is_deleted: 1
    })

    return {
      message: 'SOFT DELETED'
    }

  }).catch(error => console.log(error))
}