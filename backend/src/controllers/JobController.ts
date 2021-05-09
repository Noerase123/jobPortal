import StatusCodes from 'http-status-codes'
import { Request, Response } from 'express'
import { paramMissingError } from '@shared/constants'
const { BAD_REQUEST, CREATED, OK } = StatusCodes
import {
  jobList, jobDetails, postJob, jobUpdate, jobDelete
} from '../services/jobs/jobService'

/**
 * Get List of Jobs
 * 
 * @param req
 * @param res
 * @returns
 */
export const getAll = async (req: Request, res: Response) => {
  const data = await jobList()
  return res.status(OK).json(data)
}

/**
 * Get Job Details
 * 
 * @param req 
 * @param res 
 */
export const getOne = async (req: Request, res: Response) => {
  const data = await jobDetails(req.params.id)
  return res.status(OK).json(data)
}

/**
 * Add Job posting
 * 
 * @param req
 * @param res
 * @returns
 */
export const addItem = async (req: Request, res: Response) => {
  const data = await postJob(req.body)
  return res.status(CREATED).json(data)
}

/**
 * Update Job
 * 
 * @param req 
 * @param res 
 */
export const updateItem = async (req: Request, res: Response) => {
  const data = await jobUpdate(req.params.id, req.body)
  return res.status(OK).json(data)
}

/**
 * Delete Job
 * 
 * @param req 
 * @param res 
 */
export const deleteItem = async (req: Request, res: Response) => {
  const data = await jobDelete(req.params.id)
  return res.status(OK).json(data)
}